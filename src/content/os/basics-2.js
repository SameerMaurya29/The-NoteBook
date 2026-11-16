// Operating Systems — more foundational "things you have to know" notes (part 2).
// Condensed mental models that complement the "Why & How" basics note.
export default [
  {
    id: "shell-essentials",
    title: "The Shell & Command Line",
    difficulty: "easy",
    definition: `The shell is the program that takes commands you type and asks the OS to run them. It is your direct interface to the OS — every command spawns a process, every pipe connects two processes, and every redirect changes where a process's input/output goes.`,
    coreUnderstanding: `The shell is itself just a user program (bash, zsh, sh) that loops: print a prompt, read a line, parse it, fork a child, exec the command, wait for it, repeat. When you type \`ls -l | grep txt > out.txt\`, the shell forks two processes, connects ls's stdout to grep's stdin via a pipe, and connects grep's stdout to the file out.txt. Understanding the shell is understanding process creation (fork), program replacement (exec), and I/O redirection — the same OS primitives every program uses. The shell is the best lens for "the OS manages processes and I/O."`,
    howItWorks: `1. THE READ-EVAL LOOP: the shell reads a line, parses it into a command + arguments, forks a child process, execs the command in the child, and waits for it (unless you add \`&\` for background).
2. PIPES (\`|\`): connect one command's stdout to the next command's stdin. \`a | b\` — the shell creates a pipe, forks a for the writer and b for the reader, and connects them.
3. REDIRECTS: \`>\` sends stdout to a file (overwrite), \`>>\` appends, \`<\` reads stdin from a file, \`2>\` redirects stderr.
4. SEQUENCING: \`;\` runs commands one after another regardless of success; \`&&\` runs the next only if the previous succeeded; \`||\` runs the next only if the previous failed.
5. ENVIRONMENT: each process inherits environment variables (PATH, HOME, USER). \`VAR=value command\` sets a variable for one command; \`export VAR\` makes it persist for children.
6. JOBS: \`&\` runs a command in the background; \`Ctrl+Z\` suspends; \`bg\` resumes in background; \`fg\` brings it back; \`jobs\` lists them.
7. GLOBING: \`*\` matches any filename, \`?\` matches one char — the shell expands these BEFORE the command runs (the command never sees the *).`,
    codeExamples: [
      {
        lang: "bash",
        code: `# pipe: ls's output becomes grep's input
ls -l | grep ".txt"

# redirect: save output to a file (>) or append (>>)
echo "log entry" > app.log
echo "another" >> app.log

# redirect stdin from a file (<) and stderr (2>)
sort < unsorted.txt > sorted.txt
command 2> errors.log

# sequencing: ; (always), && (on success), || (on failure)
cd /tmp && rm oldfile.txt          # rm only if cd succeeded
cd /tmp || echo "no /tmp dir"      # echo only if cd failed
mkdir d ; cd d                      # cd even if mkdir failed (risky!)

# environment variables
echo $HOME                          # /home/user
PATH=$PATH:/opt/bin myprogram       # add to PATH for one command
export EDITOR=nano                  # persists for all child processes

# background jobs
sleep 60 &                          # run in background, prints job number
jobs                                # [1]+ Running sleep 60 &
fg %1                               # bring job 1 to foreground

# globbing — the SHELL expands * before the command sees it
echo *.txt                          # the command receives: a.txt b.txt c.txt`,
        output: `(shell session)`,
        note: "The shell forks a process per command, connects them with pipes, and redirects their I/O. ; sequences, && chains on success, | pipes stdout to stdin. Globbing (* ?) is expanded by the shell before the command runs."
      }
    ],
    marginNotes: [
      "The shell expands globs (* and ?) BEFORE the command runs — `rm *.txt` passes the expanded filenames to rm, never the `*` itself. If no file matches, the literal `*` may be passed (set `set -o nullglob` to pass nothing instead).",
      "`cd dir && rm *` is safe; `cd dir ; rm *` is dangerous — if cd fails, rm deletes files in the WRONG directory. Always use && when the second command depends on the first.",
      "A pipe connects processes in memory — data flows through a kernel buffer. The writer blocks when the buffer is full; the reader blocks when it is empty. This is producer-consumer at the OS level.",
      "Environment variables are inherited by child processes (fork copies them). `export` marks a variable so children see it; a non-exported variable is shell-local only."
    ],
    commonMistakes: [
      "Using `;` instead of `&&` — `cd dir ; rm *` runs rm even if cd failed, deleting files in the wrong directory.",
      "Forgetting that globbing is done by the shell, not the command — `echo '*'` prints a literal * because quotes prevent expansion, but `echo *` prints all filenames.",
      "Confusing `>` (overwrite) with `>>` (append) — `>` silently destroys the file's previous content."
    ],
    relatedTopics: ["OS Basics — Why & How", "System Calls", "Inter-Process Communication (IPC)"],
    externalLinks: [
      { label: "Bash Manual", url: "https://www.gnu.org/software/bash/manual/bash.html" },
      { label: "The Art of Command Line", url: "https://github.com/jlevy/the-art-of-command-line" }
    ],
    mcqs: [
      {
        question: "What does a pipe (`|`) do?",
        options: ["Runs two commands in parallel", "Connects one command's stdout to the next command's stdin", "Saves output to a file", "Runs the second only if the first succeeds"],
        answer: 1,
        explanations: ["Not parallel — they run concurrently but are connected.", "Correct — `a | b` makes a's output flow into b's input through a kernel buffer. It's producer-consumer at the OS level.", "That's `>`.", "That's `&&`."],
        difficulty: "easy"
      },
      {
        question: "Why is `cd dir ; rm *` dangerous?",
        options: ["rm is too slow", "If cd fails, rm runs anyway and deletes files in the wrong directory", "The semicolon is invalid", "It creates too many processes"],
        answer: 1,
        explanations: ["Speed isn't the issue.", "Correct — `;` runs rm regardless of cd's result. Use `cd dir && rm *` so rm only runs if cd succeeded.", "The semicolon is valid sequencing.", "It's one process."],
        difficulty: "medium"
      },
      {
        question: "Who expands `*.txt` — the shell or the command?",
        options: ["The command expands it", "The shell expands it before the command runs", "The kernel expands it", "It is not expanded"],
        answer: 1,
        explanations: ["The command never sees the *.", "Correct — the shell expands globs (*, ?) into matching filenames before passing them as arguments. Quoting '*' prevents expansion.", "The kernel doesn't do globbing.", "It is expanded by the shell."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "process-lifecycle-essentials",
    title: "Process Lifecycle at a Glance",
    difficulty: "medium",
    definition: `A process is born when its parent calls fork(), becomes a new program when it calls exec(), and dies when it calls exit() (or is killed by a signal). The parent calls wait() to collect its exit status. These four calls — fork, exec, wait, exit — plus signals, are the entire lifecycle of every process on the machine.`,
    coreUnderstanding: `Every process on a Unix system is created by fork() — the calling process (parent) gets an almost-identical copy (child). The child then calls exec() to replace its memory image with a new program. The parent calls wait() to block until the child finishes and to reap its exit status. If the parent doesn't wait, the dead child becomes a zombie (it has finished but its entry in the process table remains until reaped). If the parent dies first, the child becomes an orphan and is adopted by init (PID 1). Signals (SIGKILL, SIGTERM, SIGINT) are the OS's way to notify or kill a process asynchronously. This four-call model (fork/exec/wait/exit) is how every shell command, every server, and every daemon is launched.`,
    howItWorks: `1. FORK: the parent calls fork(). The OS creates a child — a copy of the parent's address space (copy-on-write), with a new PID. fork() returns the child's PID to the parent and 0 to the child (this is how code tells them apart).
2. EXEC: the child calls exec("program"). The OS replaces the child's entire memory image (code, data, heap, stack) with the new program, but keeps the same PID and open files. Execution starts at the new program's main().
3. RUN: the child runs the new program. It goes through the ready/running/blocked state cycle.
4. EXIT: the child calls exit(status) or returns from main(). The OS frees its memory and closes files, but KEEPS its process-table entry (PID, exit status) until the parent reaps it.
5. WAIT: the parent calls wait(&status). It blocks until a child exits, then retrieves the child's exit status. The child's process-table entry is now freed.
6. ZOMBIE: if the child exits but the parent hasn't called wait() yet, the child is a zombie — finished, not reaped. It holds a PID and a process-table slot. Too many zombies exhaust the PID table.
7. ORPHAN: if the parent exits before calling wait(), the child becomes an orphan and is re-parented to init (PID 1), which automatically reaps it.
8. SIGNALS: kill(pid, SIGKILL) terminates a process immediately (cannot be caught). SIGTERM asks it to terminate gracefully. SIGINT is Ctrl+C. SIGCHLD tells a parent a child changed state.`,
    codeExamples: [
      {
        lang: "c",
        code: `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();          // create a child

    if (pid == 0) {
        // CHILD: pid is 0 here
        printf("child (PID %d) about to exec ls\\n", getpid());
        execlp("ls", "ls", "-l", NULL);   // replace image with ls
        // exec only returns on ERROR
        perror("exec failed");
        _exit(1);
    } else if (pid > 0) {
        // PARENT: pid is the child's PID
        int status;
        wait(&status);          // block until child exits, reap it
        if (WIFEXITED(status))
            printf("child exited with %d\\n", WEXITSTATUS(status));
    }
    return 0;
}`,
        output: `child (PID 1235) about to exec ls
total 4
-rw-r--r-- 1 user user 0 Oct 12 note.txt
child exited with 0`,
        note: "fork() creates the child (returns child PID to parent, 0 to child). exec() replaces the child's image with a new program (same PID). wait() reaps the exit status. Without wait, the child becomes a zombie."
      },
      {
        lang: "bash",
        code: `# signals
kill 1234              # send SIGTERM (graceful) to PID 1234
kill -9 1234           # send SIGKILL (force, cannot be caught)
Ctrl+C                 # send SIGINT to the foreground process
kill -l                # list all signal names and numbers

# zombies: a process that finished but wasn't reaped
ps aux | grep Z        # state Z = zombie
# fix: kill the parent (it will reap children on exit) or
#      have the parent call wait()

# orphans: parent died, child adopted by init (PID 1)
ps -o ppid= -p 1234    # show the parent PID; if it's 1, it's orphaned`,
        output: "(process inspection)",
        note: "SIGKILL (9) cannot be caught or ignored — it always kills. SIGTERM can be caught for graceful shutdown. Zombies are reaped by the parent's wait(); orphans are adopted by init (PID 1)."
      }
    ],
    marginNotes: [
      "fork() returns TWICE — once in the parent (with the child's PID) and once in the child (with 0). This is the only system call that returns twice. Code uses the return value to tell parent from child.",
      "exec() does NOT create a new process — it replaces the current process's program image. The PID stays the same. This is why fork+exec is the pattern: fork to create the process, exec to load the program.",
      "A zombie is a process that has exited but whose parent hasn't called wait() yet. It holds a PID. If the parent never reaps, zombies accumulate and exhaust the process table. Fix: kill the parent, or fix the parent to call wait().",
      "SIGKILL (9) cannot be caught, blocked, or ignored — the OS kills the process immediately. SIGTERM (15) can be caught for graceful shutdown (close files, flush buffers). Always try SIGTERM before SIGKILL."
    ],
    commonMistakes: [
      "Thinking exec() creates a new process — it doesn't. It replaces the current process's image. fork() creates; exec() replaces. The PID is unchanged by exec.",
      "Not calling wait() — children become zombies that hold PIDs. A server that forks children and never reaps them will eventually run out of PIDs.",
      "Using SIGKILL when SIGTERM would work — SIGKILL can't be caught, so the process can't clean up (flush buffers, close files). Try SIGTERM first."
    ],
    relatedTopics: ["OS Basics — Why & How", "Processes & Process Control Block", "Process States & Transitions"],
    externalLinks: [
      { label: "fork, exec, wait (OSTEP)", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/processes/" },
      { label: "Signals (man page)", url: "https://man7.org/linux/man-pages/man7/signal.7.html" }
    ],
    mcqs: [
      {
        question: "What does fork() return to the child process?",
        options: ["The parent's PID", "0 (the child uses this to tell itself apart)", "The child's own PID", "An error"],
        answer: 1,
        explanations: ["The parent gets the child's PID.", "Correct — fork() returns 0 to the child and the child's PID to the parent. This is how code distinguishes parent from child after fork.", "The child can get its own PID via getpid().", "fork returns -1 on error (to the parent)."],
        difficulty: "medium"
      },
      {
        question: "Does exec() create a new process?",
        options: ["Yes, a new PID is assigned", "No — it replaces the current process's image; the PID stays the same", "Only if fork was called first", "It depends on the OS"],
        answer: 1,
        explanations: ["The PID is unchanged.", "Correct — exec() replaces the process's memory image (code, data, heap, stack) with a new program, but the PID and open files remain. fork() creates the process; exec() loads the program.", "exec doesn't require fork.", "It's always the same behavior."],
        difficulty: "medium"
      },
      {
        question: "What is a zombie process?",
        options: ["A process that is stuck in a deadlock", "A process that has exited but whose parent hasn't called wait() to reap it", "A process with no parent", "A process using too much CPU"],
        answer: 1,
        explanations: ["That's a deadlock, not a zombie.", "Correct — a zombie has finished (exited) but its process-table entry remains until the parent calls wait() to collect its exit status. It holds a PID. Fix: have the parent wait(), or kill the parent.", "That's an orphan (adopted by init).", "CPU usage is unrelated."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "concurrency-mental-model",
    title: "The Concurrency Mental Model",
    difficulty: "medium",
    definition: `Concurrency is multiple threads making progress on shared work at the same time. The core tension: sharing memory is fast but creates race conditions; protecting shared data with locks is safe but creates contention and the risk of deadlocks. Every concurrent program is a balance between parallelism (go fast) and safety (don't corrupt data).`,
    coreUnderstanding: `Concurrency rests on one fact: threads in the same process share memory, so two threads can read and write the same variable simultaneously — and the CPU can interleave their instructions in any order. Without protection, a shared counter increment (count++) can lose updates (read 5, read 5, write 6, write 6 — one increment lost). The fix is a critical section: code that touches shared data, protected by a mutex so only one thread enters at a time. But locks introduce their own problems: contention (threads waiting for a lock slow each other down) and deadlocks (two threads each holding a lock the other needs). The mental model: identify shared mutable state, wrap it in a critical section, protect with a mutex, and always acquire locks in a consistent order to avoid deadlocks.`,
    howItWorks: `1. SHARED STATE: any variable two threads both read and write is shared mutable state. It MUST be protected. Read-only shared data is safe.
2. THE CRITICAL SECTION: the code that accesses shared data. Make it as short as possible (lock late, unlock early) to minimize contention.
3. MUTEX: lock() before the critical section, unlock() after. Only one thread inside at a time. Others block (wait) until it's free.
4. RACE CONDITION: unprotected shared state. count++ looks atomic but is read-modify-write — two threads can lose an increment. Symptom: correct code gives wrong totals intermittently.
5. DEADLOCK: Thread A holds Lock1 and waits for Lock2; Thread B holds Lock2 and waits for Lock1. Both block forever. Fix: always acquire locks in the same global order.
6. STARvation: a thread never gets the lock because higher-priority threads always grab it. Fix: fair locks or aging.
7. THE GOLDEN RULE: shared mutable state + unprotected access = bug. Either remove the sharing (give each thread its own copy), remove the mutation (make it immutable), or protect it (mutex).`,
    codeExamples: [
      {
        lang: "c",
        code: `// RACE CONDITION: count++ is NOT atomic
int count = 0;
void* worker(void* arg) {
    for (int i = 0; i < 1000000; i++)
        count++;          // read count, add 1, write count — RACE!
    return NULL;
}
// Two threads running worker -> count is ~1.5M, not 2M (lost updates)

// FIX: protect the critical section with a mutex
#include <pthread.h>
int count = 0;
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
void* safe_worker(void* arg) {
    for (int i = 0; i < 1000000; i++) {
        pthread_mutex_lock(&lock);    // enter critical section
        count++;                       // protected — only one thread here
        pthread_mutex_unlock(&lock);  // exit critical section
    }
    return NULL;
}
// Two threads -> count is exactly 2M (correct)

// DEADLOCK: inconsistent lock ordering
// Thread A: lock(L1); lock(L2);   //  A holds L1, waits for L2
// Thread B: lock(L2); lock(L1);   //  B holds L2, waits for L1  -> DEADLOCK
// FIX: both threads acquire L1 then L2 (same order)`,
        output: "(race vs safe)",
        note: "Shared mutable state + unprotected access = race condition. Fix: mutex around the critical section. Deadlock comes from inconsistent lock ordering — always acquire locks in the same global order."
      }
    ],
    marginNotes: [
      "count++ looks like one operation but is three: read count, add 1, write count. The CPU can interleave two threads' reads and writes, losing increments. This is the canonical race condition.",
      "The golden rule of concurrency: shared mutable state + unprotected access = bug. Fix it by removing the sharing (thread-local copies), removing the mutation (immutable data), or protecting it (mutex).",
      "Deadlocks come from inconsistent lock ordering. If all threads acquire locks in the same global order, circular wait is impossible and deadlocks can't happen.",
      "Keep critical sections short — lock as late as possible and unlock as early as possible. A long critical section serializes all threads, killing the parallelism you added concurrency for."
    ],
    commonMistakes: [
      "Assuming count++ or `balance += amount` is atomic — it's read-modify-write. Two threads can lose an update. Use a mutex or atomic operations.",
      "Acquiring locks in different orders across threads — causes deadlocks. Always acquire locks in a consistent global order.",
      "Making critical sections too large — locking at the start of a function and unlocking at the end serializes all threads. Lock late, unlock early."
    ],
    relatedTopics: ["OS Basics — Why & How", "Race Conditions & Critical Sections", "Mutex Locks", "Deadlocks"],
    externalLinks: [
      { label: "Concurrency (OSTEP)", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro/" },
      { label: "Race Condition (Wiki)", url: "https://en.wikipedia.org/wiki/Race_condition" }
    ],
    mcqs: [
      {
        question: "Why is `count++` not safe with two threads?",
        options: ["It uses too much memory", "It's read-modify-write — two threads can read the same value and both write count+1, losing an increment", "It's too slow", "It's not a real operation"],
        answer: 1,
        explanations: ["Memory isn't the issue.", "Correct — count++ is three steps: read count, add 1, write count. The CPU can interleave two threads so both read 5 and both write 6 — one increment is lost. Fix: mutex or atomic operations.", "Speed isn't the safety issue.", "It's a real operation that isn't atomic."],
        difficulty: "medium"
      },
      {
        question: "What is the golden rule for avoiding race conditions?",
        options: ["Use more threads", "Shared mutable state + unprotected access = bug — remove sharing, remove mutation, or protect with a lock", "Never use threads", "Use faster hardware"],
        answer: 1,
        explanations: ["More threads increase races.", "Correct — any shared mutable state that is accessed without synchronization is a race. Fix it by making the data thread-local (no sharing), immutable (no mutation), or mutex-protected.", "Threads are useful when done safely.", "Hardware doesn't fix races."],
        difficulty: "medium"
      },
      {
        question: "How do you prevent deadlocks from lock ordering?",
        options: ["Use more locks", "Always acquire locks in the same global order across all threads", "Use shorter critical sections", "Avoid locks entirely"],
        answer: 1,
        explanations: ["More locks increase deadlock risk.", "Correct — if all threads acquire locks in the same order (e.g., always L1 before L2), circular wait is impossible and deadlocks can't occur.", "Shorter sections help performance but not deadlocks.", "Avoiding locks means race conditions."],
        difficulty: "medium"
      }
    ]
  }
];