// Operating Systems — the foundational "why & how" note, placed first in the syllabus.
export default {
  id: "domain-basics",
  title: "OS Basics — Why & How",
  difficulty: "easy",
  definition: `An Operating System is the software layer between your programs and the hardware. You study it to understand the environment every program runs in — processes, memory, files, and concurrency — and to debug, optimize, and answer interview questions about how the machine shares its resources.`,
  coreUnderstanding: `The OS exists to share one machine fairly and safely among many programs. It manages the CPU (scheduling who runs when), memory (giving each process a private address space), storage (files and directories), and I/O devices. It provides abstractions — processes, virtual memory, files — that make programming practical; without it, each app would drive hardware directly. You learn OS concepts because every program you write is shaped by them: why your app pauses (scheduling), why it crashes (memory protection), why I/O is slow (system calls), and how to write correct concurrent code.`,
  howItWorks: `1. WHY: every program runs inside an OS. Understanding it explains performance, crashes, and concurrency. It's a core interview subject.
2. WHERE: systems programming, debugging hangs/crashes, writing concurrent code, performance tuning, and any backend that manages resources.
3. KEY ABSTRACTIONS: a PROCESS is a running program (virtual CPU + private memory); VIRTUAL MEMORY is the illusion of infinite private RAM; a FILE is a named chunk of disk.
4. USER vs KERNEL MODE: user programs run restricted (can't touch hardware); the kernel runs privileged. A SYSTEM CALL (read, write, fork) is the bridge — it switches to kernel mode, does the work, and returns. System calls are expensive (~1µs), so batch them.
5. THE SHELL & SYNTAX: you interact via shell commands. Commands end at a newline; use \`;\` to run two in sequence (\`a ; b\`), \`&&\` to run the second only if the first succeeds (\`a && b\`), and \`|\` to pipe one command's output into another (\`a | b\`). Braces \`{ }\` group commands; quotes \`" "\` protect strings with spaces.
6. CONCURRENCY PRIMITIVES: threads share memory (fast but need locks/mutexes); processes are isolated (safe but IPC is costly). A CRITICAL SECTION is code touching shared data — protect it with a mutex so only one thread enters at a time.
7. SYSTEM CALL CODE (C): braces delimit functions/blocks; semicolons end statements; \`fork()\` creates a process, \`exec()\` replaces its program, \`wait()\` waits for a child.`,
  codeExamples: [
    {
      lang: "bash",
      code: `# shell syntax basics
ls -l              # a command ends at the newline
echo "done"        # another command

ls ; echo "both run regardless"      # ; runs sequentially
mkdir newdir && cd newdir           # && runs 2nd only if 1st succeeds
ls -l | grep "txt"                   # | pipes output of ls into grep

# braces group commands; the space after { and the ; before } matter
{ date; uptime; } > stats.txt        # run both, send output to a file`,
      output: `(shell session)`,
      note: "Shell commands end at a newline. Use ; to sequence, && to chain on success, | to pipe. Braces { } group commands (note the spaces and trailing ;)."
    },
    {
      lang: "c",
      code: `#include <stdio.h>      // braces delimit blocks; ; ends statements
#include <unistd.h>
#include <sys/wait.h>

int main(void) {            // the OS calls main
    pid_t pid = fork();      // create a child process (a system call)
    if (pid == 0) {
        printf("child\\n");  // child branch
    } else {
        wait(NULL);          // parent waits for child to finish
        printf("parent\\n");
    }
    return 0;               // 0 = success to the OS
}`,
      output: `child
parent`,
      note: "fork() creates a process; the parent wait()s for the child. Braces delimit blocks, semicolons end statements — standard C syntax the OS APIs use."
    }
  ],
  marginNotes: [
    "A process is a running program; a thread is a unit of execution within a process. Threads share memory (fast, but need locks); processes are isolated (safe, but IPC is costly).",
    "System calls are the user↔kernel boundary. They're expensive (~1µs each) — reading a file byte-by-byte with read() is slow; use buffered I/O to batch.",
    "Shell `;` runs commands in sequence regardless of success; `&&` runs the next only if the previous succeeded; `|` pipes output to input. Mixing these up is a common scripting bug.",
    "A critical section is any code that touches shared data. Protect it with a mutex so only one thread enters at a time — otherwise you get race conditions."
  ],
  commonMistakes: [
    "Confusing process (separate memory, isolated) with thread (shared memory, needs synchronization).",
    "Using `;` when you meant `&&` — `cd newdir ; rm *` runs rm even if cd failed, deleting files in the wrong directory.",
    "Forgetting to protect a critical section with a mutex — race conditions corrupt shared data."
  ],
  relatedTopics: ["Introduction to Operating Systems", "Processes & Process Control Block", "Threads & Multithreading"],
  externalLinks: [
    { label: "Operating Systems: Three Easy Pieces", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/" },
    { label: "Bash Guide", url: "https://www.gnu.org/software/bash/manual/bash.html" }
  ],
  mcqs: [
    {
      question: "What is the difference between a process and a thread?",
      options: ["Threads are faster to create", "A process has separate memory; threads share memory (and so need synchronization)", "Processes can't run on multiple cores", "There is no difference"],
      answer: 1,
      explanations: ["Creation cost is a symptom, not the definition.", "Correct — processes have isolated address spaces (safe, but IPC is costly); threads share an address space (fast communication, but require locks to avoid races).", "Processes run on cores too.", "They differ fundamentally in memory sharing."],
      difficulty: "medium"
    },
    {
      question: "Why are system calls expensive?",
      options: ["They use a lot of memory", "Each involves a user→kernel mode switch, saving/restoring registers and security checks (~1µs)", "They require the network", "They must be compiled"],
      answer: 1,
      explanations: ["Memory isn't the cost.", "Correct — a syscall switches CPU privilege level, saves/restores state, and validates arguments. Batch them (buffered I/O) to amortize the cost.", "No network — it's local.", "No runtime compilation."],
      difficulty: "medium"
    },
    {
      question: "In the shell, what does `a && b` do?",
      options: ["Run both regardless of outcome", "Run b only if a succeeds", "Run a only if b succeeds", "Run them in parallel"],
      answer: 1,
      explanations: ["That's `a ; b`.", "Correct — `&&` runs the second command only if the first succeeds. `;` runs both regardless. Mixing them up (e.g. `cd dir ; rm *`) is dangerous.", "That's `b && a` reversed.", "Neither runs them in parallel."],
      difficulty: "easy"
    }
  ]
};