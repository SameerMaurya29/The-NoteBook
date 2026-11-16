// Scoped teaching curriculum. Original notes; primary materials remain at their linked sources.
export const osBuildPath={
  "id": "os",
  "title": "Build an Operating System",
  "subtitle": "From C and machine instructions to a small Unix-like teaching kernel.",
  "target": "QEMU RISC-V virt; C + a small amount of RISC-V assembly. Choose own-kernel implementation or MIT xv6 labs and keep the route explicit.",
  "scope": "24 units cover the defined teaching-kernel core plus separately labeled networking, hardening, multicore and virtualization extensions. This is not every OS research topic, a complete POSIX system or a production kernel. Reading checkboxes are self-reported; lab checkboxes mean you have produced the listed evidence.",
  "resourceReview": "2026-11-13: MIT 2024 schedule/book/lab references and MIT 2020 schedule-linked videos checked at source-index level. Videos are recommended for fit and source provenance, not claimed objectively best. The architecture OCW video uses x86-64; the implementation route uses RISC-V. External availability and lab tool requirements may change.",
  "units": [
    {
      "id": "scope",
      "title": "Choose the Target & Keep Your Host Safe",
      "phase": "Prepare",
      "syllabus": [
        {
          "id": "s01",
          "label": "Kernel versus full OS"
        },
        {
          "id": "s02",
          "label": "Teaching versus production scope"
        },
        {
          "id": "s03",
          "label": "RISC-V versus x86"
        },
        {
          "id": "s04",
          "label": "User/kernel boundary"
        },
        {
          "id": "s05",
          "label": "Emulator safety"
        },
        {
          "id": "s06",
          "label": "Build journal"
        }
      ],
      "lesson": "The finish line is a small Unix-like teaching kernel for the QEMU RISC-V virt machine, with user programs, processes, memory protection and a basic persistent filesystem. It is not a Linux replacement. C is the main implementation language; a small amount of RISC-V assembly handles entry, traps and context switching. Shell/Make and GDB support the work. Rust, C++, GUI, USB, production TCP and real-hardware boot are optional later extensions, not prerequisites hidden in the main path.",
      "walkthrough": [
        "Draw hardware, kernel and user space",
        "Pick the QEMU RISC-V target and document its memory map",
        "Use disposable project-local disk images only",
        "Record build/tool versions and a checkpoint for every milestone"
      ],
      "lab": "Write a scope document and architecture diagram before setting up tools. Choose either implementing your own kernel with xv6 as reference, or the MIT xv6 lab route; record which route you follow. Do not combine architecture-specific snippets blindly.",
      "criteria": [
        "Target architecture and route are explicit",
        "No host disk/device is used for experiments",
        "Finish-line features and exclusions are listed"
      ],
      "internal": [
        {
          "subject": "os",
          "topic": "domain-basics"
        },
        {
          "subject": "coa",
          "topic": "instruction-set"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — Introduction and examples",
          "url": "https://youtu.be/L6YqHxYHa7A"
        }
      ],
      "reading": "xv6 chapter 1 for interfaces; chapter 2 for organization. OSDev is a secondary index, not the RISC-V boot contract.",
      "prerequisites": []
    },
    {
      "id": "c-foundations",
      "title": "C for Systems: Types, Pointers & Lifetime",
      "phase": "Prepare",
      "syllabus": [
        {
          "id": "s01",
          "label": "Integer widths and signedness"
        },
        {
          "id": "s02",
          "label": "Arrays/pointers"
        },
        {
          "id": "s03",
          "label": "Structs/unions"
        },
        {
          "id": "s04",
          "label": "Bit operations"
        },
        {
          "id": "s05",
          "label": "Stack/static/heap lifetime"
        },
        {
          "id": "s06",
          "label": "Undefined behavior"
        },
        {
          "id": "s07",
          "label": "Alignment and padding"
        }
      ],
      "lesson": "A kernel cannot rely on a hosted runtime to hide memory errors. Learn pointer arithmetic in units of the pointed-to type, object lifetime and bounds before touching device registers. Struct padding and alignment affect layouts; signed overflow is not defined wrapping arithmetic in C. An integer that looks like an address is not automatically a valid pointer in a chosen address space.",
      "walkthrough": [
        "Write small hosted C programs first",
        "Trace pointers and storage lifetime on paper",
        "Implement checked bit-field operations",
        "Test empty and boundary inputs",
        "Inspect object size and padding rather than assuming it"
      ],
      "lab": "Implement a bounded byte buffer and a small freelist simulator in normal user space. Test full/empty buffers, invalid lengths and repeated allocation/free. Use warnings and a memory-error checker available on your host; do not install toolchains silently.",
      "criteria": [
        "No unchecked array access in the exercises",
        "Can explain size_t and integer conversion risks",
        "Can distinguish object lifetime from pointer value"
      ],
      "internal": [
        {
          "subject": "c",
          "topic": "pointers-basics"
        },
        {
          "subject": "c",
          "topic": "arrays-1d"
        },
        {
          "subject": "c",
          "topic": "storage-classes"
        },
        {
          "subject": "c",
          "topic": "structures"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT OCW — Assembly Language & Computer Architecture (x86-64 concepts; not RISC-V syntax)",
          "url": "https://www.youtube.com/watch?v=L1ung0wil9Y"
        }
      ],
      "reading": "Read the C-related notes linked from MIT’s schedule. The OCW video uses x86-64; use it for concepts, not RISC-V register names.",
      "prerequisites": [
        "scope"
      ]
    },
    {
      "id": "isa-and-abi",
      "title": "RISC-V ISA, Privilege & Calling Convention",
      "phase": "Prepare",
      "syllabus": [
        {
          "id": "s01",
          "label": "Registers"
        },
        {
          "id": "s02",
          "label": "Loads/stores"
        },
        {
          "id": "s03",
          "label": "Branches"
        },
        {
          "id": "s04",
          "label": "Stack frames"
        },
        {
          "id": "s05",
          "label": "Calling convention"
        },
        {
          "id": "s06",
          "label": "Caller/callee-saved registers"
        },
        {
          "id": "s07",
          "label": "Privilege modes"
        },
        {
          "id": "s08",
          "label": "CSRs"
        }
      ],
      "lesson": "The ISA defines machine instructions; the ABI defines agreements between compiled functions. A trap frame stores interrupted program state, while a function stack frame follows call conventions. Keep user, supervisor and machine privilege rules separate. A function can work in an ordinary call yet fail during a trap if registers or stack alignment are not preserved correctly.",
      "walkthrough": [
        "Disassemble one compiled C function",
        "Map arguments and return values to ABI registers",
        "Trace call/return and stack movement",
        "Separate ordinary return from trap return",
        "Identify which registers each boundary must save"
      ],
      "lab": "Hand-trace a nested RISC-V function call with two arguments. Compare optimized and unoptimized disassembly; annotate saved registers and stack alignment. Use the ABI lecture rather than copying the x86 example.",
      "criteria": [
        "Can trace a call and return without losing saved state",
        "Can distinguish a virtual address from an instruction immediate",
        "Can explain why trap entry needs a separate save protocol"
      ],
      "internal": [
        {
          "subject": "coa",
          "topic": "instruction-set"
        },
        {
          "subject": "coa",
          "topic": "registers"
        },
        {
          "subject": "coa",
          "topic": "addressing-modes"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — RISC-V calling conventions",
          "url": "https://youtu.be/s-Z5t_yTyTM"
        }
      ],
      "reading": "xv6 chapters 2 and 4, with the schedule’s RISC-V calling-convention material.",
      "prerequisites": [
        "c-foundations"
      ]
    },
    {
      "id": "tools",
      "title": "Build Tools, ELF, Linker Scripts & GDB",
      "phase": "Prepare",
      "syllabus": [
        {
          "id": "s01",
          "label": "Shell and Git"
        },
        {
          "id": "s02",
          "label": "Make dependencies"
        },
        {
          "id": "s03",
          "label": "Cross-compilation"
        },
        {
          "id": "s04",
          "label": "Freestanding C"
        },
        {
          "id": "s05",
          "label": "ELF sections"
        },
        {
          "id": "s06",
          "label": "Linker scripts"
        },
        {
          "id": "s07",
          "label": "Symbols/disassembly"
        },
        {
          "id": "s08",
          "label": "GDB/QEMU debugging"
        }
      ],
      "lesson": "A kernel build targets a machine and runtime different from the host application environment. The cross-compiler, linker script and boot entry must agree about instruction set, ABI and addresses. Freestanding C does not promise a full standard library. ELF sections and symbols explain what is loaded, where BSS lives and where a debugger can set a meaningful breakpoint.",
      "walkthrough": [
        "Follow the course tool guidance for your operating system",
        "Record versions without changing system defaults",
        "Compile a small freestanding object",
        "Inspect sections/symbols/disassembly",
        "Set a breakpoint before the first C instruction"
      ],
      "lab": "Create a reproducible build/readme and inspect one ELF file with the toolchain’s object tools. Explain the entry symbol, text/data/BSS and the difference between link address and file offset. Commands are reference tasks, not executed by this website.",
      "criteria": [
        "A clean build is reproducible",
        "ELF entry and memory layout are documented",
        "Debugger can stop at a known symbol"
      ],
      "internal": [
        {
          "subject": "os",
          "topic": "shell-essentials"
        },
        {
          "subject": "c",
          "topic": "makefiles"
        },
        {
          "subject": "c",
          "topic": "debugging-gdb-valgrind"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — RISC-V calling conventions",
          "url": "https://youtu.be/s-Z5t_yTyTM"
        }
      ],
      "reading": "MIT course tool/reference links and xv6 source Makefile. Tool installation is a separate manual step.",
      "prerequisites": [
        "isa-and-abi"
      ]
    },
    {
      "id": "read-xv6",
      "title": "Read a Small Kernel Before Rebuilding It",
      "phase": "Prepare",
      "syllabus": [
        {
          "id": "s01",
          "label": "Source navigation"
        },
        {
          "id": "s02",
          "label": "Boot-to-init call graph"
        },
        {
          "id": "s03",
          "label": "Kernel/user directories"
        },
        {
          "id": "s04",
          "label": "Invariants"
        },
        {
          "id": "s05",
          "label": "Lab workflow"
        },
        {
          "id": "s06",
          "label": "Regression evidence"
        }
      ],
      "lesson": "Use xv6 as an inspectable reference, not an opaque solution dump. Follow a complete path such as a user write call through the trap handler, file layer and console driver. Record the invariants that let each layer trust the next. For MIT labs, use the branch and course-year instructions for that lab; the general xv6 source branch is not guaranteed to contain every lab scaffold.",
      "walkthrough": [
        "Build a source map by subsystem",
        "Trace one user request end to end",
        "Annotate ownership and failure returns",
        "Choose own-kernel or lab-route deliverables",
        "Record original behavior before changing code"
      ],
      "lab": "Produce a one-page call graph for write and a boot-to-first-user-process diagram. If using xv6 labs, run the provided baseline tests before modifying your selected course branch.",
      "criteria": [
        "Call graph names actual source files/functions",
        "Baseline behavior recorded",
        "Can explain which code runs with privilege"
      ],
      "internal": [
        {
          "subject": "os",
          "topic": "os-structure"
        },
        {
          "subject": "os",
          "topic": "system-calls"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — OS organization and system calls",
          "url": "https://youtu.be/o44d---Dk4o"
        }
      ],
      "reading": "xv6 chapters 1–2. Read rather than copy the full source path.",
      "prerequisites": [
        "tools"
      ]
    },
    {
      "id": "boot",
      "title": "Boot, Memory Map & First Console Output",
      "phase": "Kernel core",
      "syllabus": [
        {
          "id": "s01",
          "label": "Reset/firmware contract"
        },
        {
          "id": "s02",
          "label": "Entry assembly"
        },
        {
          "id": "s03",
          "label": "Stack setup"
        },
        {
          "id": "s04",
          "label": "BSS initialization"
        },
        {
          "id": "s05",
          "label": "Link/load addresses"
        },
        {
          "id": "s06",
          "label": "Early console"
        },
        {
          "id": "s07",
          "label": "Panic path"
        }
      ],
      "lesson": "Boot begins with the contract supplied by firmware or the emulator’s chosen loader. Do not assume an x86 BIOS sequence on RISC-V. Entry assembly establishes a valid stack and transfers control into the kernel’s C environment; the linker and loader determine where sections live. Early console output is a debugging tool, and panic must stop safely enough to preserve evidence.",
      "walkthrough": [
        "Document the selected loader/firmware contract",
        "Validate load addresses and entry point",
        "Initialize required stack and zeroed state",
        "Print a deterministic boot banner",
        "Stop at entry and first C function in GDB"
      ],
      "lab": "For your own kernel, boot a minimal image in QEMU and print a banner through the target’s console mechanism. For the xv6 route, trace entry.S/start.c/main.c and add a controlled diagnostic. Never write an image to a host drive.",
      "criteria": [
        "Boot is reproducible from a clean build",
        "Can explain how the first stack is established",
        "Panic output identifies the failure location"
      ],
      "internal": [
        {
          "subject": "coa",
          "topic": "instruction-cycle"
        },
        {
          "subject": "os",
          "topic": "user-kernel-mode"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — OS organization and system calls",
          "url": "https://youtu.be/o44d---Dk4o"
        }
      ],
      "reading": "xv6 chapter 2 and entry/start/main source. Hardware addresses must match the chosen QEMU virt configuration.",
      "prerequisites": [
        "read-xv6"
      ]
    },
    {
      "id": "traps",
      "title": "Traps, Exceptions, Interrupts & Timers",
      "phase": "Kernel core",
      "syllabus": [
        {
          "id": "s01",
          "label": "Trap vector"
        },
        {
          "id": "s02",
          "label": "Saved context"
        },
        {
          "id": "s03",
          "label": "Synchronous exceptions"
        },
        {
          "id": "s04",
          "label": "External/timer interrupts"
        },
        {
          "id": "s05",
          "label": "Privilege transitions"
        },
        {
          "id": "s06",
          "label": "Interrupt acknowledgement"
        },
        {
          "id": "s07",
          "label": "Nested trap policy"
        }
      ],
      "lesson": "A trap transfers control for an exception or interrupt. It does not necessarily switch to a different process. Entry must preserve enough state to resume or terminate the interrupted context. Timer interrupts make preemption possible; external interrupts need device/controller acknowledgement according to the target. A broken save/restore protocol often appears as a random crash far from the original trap.",
      "walkthrough": [
        "Install a trap vector and documented frame",
        "Decode cause and faulting address",
        "Handle a known synchronous exception",
        "Add timer interrupts and safe acknowledgement",
        "Return only after restoring the agreed state"
      ],
      "lab": "Cause a deliberate invalid user instruction and a periodic timer event. Log cause, program counter and disposition. Verify an exception from a user program cannot silently corrupt kernel state.",
      "criteria": [
        "Exception and interrupt traces are distinguishable",
        "Repeated timer events do not wedge the kernel",
        "Saved state can be inspected in the debugger"
      ],
      "internal": [
        {
          "subject": "coa",
          "topic": "interrupt-handling"
        },
        {
          "subject": "os",
          "topic": "user-kernel-mode"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — Interrupts",
          "url": "https://youtu.be/zRnGNndcVEA"
        }
      ],
      "reading": "xv6 chapters 4–5; trap.c, trampoline.S, kernelvec.S and interrupt-controller code.",
      "prerequisites": [
        "boot"
      ]
    },
    {
      "id": "syscalls",
      "title": "System Calls & Safe User-Memory Access",
      "phase": "Kernel core",
      "syllabus": [
        {
          "id": "s01",
          "label": "Syscall ABI"
        },
        {
          "id": "s02",
          "label": "Dispatch"
        },
        {
          "id": "s03",
          "label": "Argument validation"
        },
        {
          "id": "s04",
          "label": "copyin/copyout"
        },
        {
          "id": "s05",
          "label": "Error conventions"
        },
        {
          "id": "s06",
          "label": "Permissions"
        },
        {
          "id": "s07",
          "label": "Pointer overflow"
        }
      ],
      "lesson": "A syscall is a privileged service boundary. Arguments originating in user space are untrusted even when the program was compiled by you. Validate address ranges, length overflow and page permissions; use a copy protocol that handles page boundaries and faults. A syscall can enter and return to the same process without a scheduling switch.",
      "walkthrough": [
        "Define number/arguments/return convention",
        "Dispatch only recognized calls",
        "Validate lengths before arithmetic",
        "Copy through checked user-memory helpers",
        "Return explicit errors for invalid requests"
      ],
      "lab": "Implement a simple getpid-style syscall, then a bounded write call. Try a null pointer, an unmapped page, a buffer crossing a page boundary and an overflowing length.",
      "criteria": [
        "Invalid syscall returns an error or controlled process termination",
        "Kernel does not dereference raw user pointers",
        "Boundary-crossing buffer tests are documented"
      ],
      "internal": [
        {
          "subject": "os",
          "topic": "system-calls"
        },
        {
          "subject": "c",
          "topic": "pointers-basics"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — OS organization and system calls",
          "url": "https://youtu.be/o44d---Dk4o"
        }
      ],
      "reading": "xv6 syscall/trap chapters and the MIT syscall lab linked from the schedule.",
      "prerequisites": [
        "traps"
      ]
    },
    {
      "id": "physical-memory",
      "title": "Physical Pages, Ownership & Allocation",
      "phase": "Memory",
      "syllabus": [
        {
          "id": "s01",
          "label": "Physical memory map"
        },
        {
          "id": "s02",
          "label": "Reserved regions"
        },
        {
          "id": "s03",
          "label": "Page allocator"
        },
        {
          "id": "s04",
          "label": "Alignment"
        },
        {
          "id": "s05",
          "label": "Double free"
        },
        {
          "id": "s06",
          "label": "Zeroing"
        },
        {
          "id": "s07",
          "label": "Allocation failure"
        }
      ],
      "lesson": "A page allocator manages a known set of usable physical pages, excluding kernel images and reserved regions. Every page needs an ownership rule. Zero newly exposed memory when confidentiality requires it, and reject invalid/double frees in debug builds. Allocation failure is normal kernel behavior to handle, not an excuse to write through a null pointer.",
      "walkthrough": [
        "Enumerate usable/reserved physical ranges",
        "Choose a page size matching the design",
        "Maintain a freelist or bitmap invariant",
        "Validate alignment and ownership",
        "Exercise exhaustion and recovery"
      ],
      "lab": "Build a page-allocator test that allocates until exhaustion, verifies uniqueness/alignment, frees in a different order and allocates again. Keep the test inside emulator memory.",
      "criteria": [
        "No page is allocated twice simultaneously",
        "Reserved pages never enter the free pool",
        "Exhaustion has an explicit result"
      ],
      "internal": [
        {
          "subject": "c",
          "topic": "pointers-basics"
        },
        {
          "subject": "coa",
          "topic": "main-memory"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — Page tables",
          "url": "https://youtu.be/f1Hpjty3TT8"
        }
      ],
      "reading": "xv6 chapter 3 and kalloc.c; distinguish physical allocation from virtual mapping.",
      "prerequisites": [
        "syscalls"
      ]
    },
    {
      "id": "virtual-memory",
      "title": "Page Tables, Translation & Protection",
      "phase": "Memory",
      "syllabus": [
        {
          "id": "s01",
          "label": "Sv39 concept"
        },
        {
          "id": "s02",
          "label": "Virtual/physical addresses"
        },
        {
          "id": "s03",
          "label": "PTE flags"
        },
        {
          "id": "s04",
          "label": "Kernel/user mappings"
        },
        {
          "id": "s05",
          "label": "Guard pages"
        },
        {
          "id": "s06",
          "label": "TLB invalidation"
        },
        {
          "id": "s07",
          "label": "Address-space lifecycle"
        }
      ],
      "lesson": "A page table maps virtual pages to physical frames with permissions. Allocating a frame does not create a valid user mapping. Protect kernel-only memory from user access and validate every permission bit. The TLB caches translations; changes may require architecture-defined invalidation and, later, coordination across cores. Guard pages deliberately leave a gap unmapped to catch certain overruns.",
      "walkthrough": [
        "Draw the virtual address layout",
        "Walk a multi-level translation on paper",
        "Map/unmap with explicit permissions",
        "Validate user/kernel isolation",
        "Invalidate translations under the ISA’s rules"
      ],
      "lab": "Implement or inspect a page-table walk and a mapping dumper. Map two virtual pages to chosen frames, verify translations, and demonstrate a user write denied by permissions.",
      "criteria": [
        "Can translate an example address by hand",
        "User code cannot access kernel-only mappings",
        "Unmap behavior accounts for stale TLB entries"
      ],
      "internal": [
        {
          "subject": "os",
          "topic": "user-kernel-mode"
        },
        {
          "subject": "coa",
          "topic": "memory-hierarchy"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — Page tables",
          "url": "https://youtu.be/f1Hpjty3TT8"
        }
      ],
      "reading": "xv6 chapter 3 and MIT page-table lab. Follow RISC-V rules, not x86 page-table bit layouts.",
      "prerequisites": [
        "physical-memory"
      ]
    },
    {
      "id": "faults-and-cow",
      "title": "Page Faults, Lazy Allocation & Copy-on-Write",
      "phase": "Memory",
      "syllabus": [
        {
          "id": "s01",
          "label": "Fault classification"
        },
        {
          "id": "s02",
          "label": "Demand allocation"
        },
        {
          "id": "s03",
          "label": "Copy-on-write"
        },
        {
          "id": "s04",
          "label": "Reference counts"
        },
        {
          "id": "s05",
          "label": "Fault cleanup"
        },
        {
          "id": "s06",
          "label": "Out-of-memory"
        },
        {
          "id": "s07",
          "label": "mmap concepts"
        }
      ],
      "lesson": "A page fault is information about a failed access, not always a fatal error. Lazy allocation materializes a permitted page on demand. Copy-on-write shares read-only pages until a write needs a private copy; reference counts and permissions must stay consistent through fork, faults and exit. Never transform an arbitrary invalid access into an authorized allocation.",
      "walkthrough": [
        "Classify fault cause and address",
        "Check whether the access is permitted by process policy",
        "Allocate/copy only when justified",
        "Update reference counts/mappings atomically enough for the model",
        "Handle out-of-memory without leaking pages"
      ],
      "lab": "For a COW exercise, fork two processes sharing a page, write in one and prove the other remains unchanged. Test parent-first/child-first exit and allocation failure during the fault.",
      "criteria": [
        "Writes isolate data correctly",
        "Reference counts return to baseline after exits",
        "Invalid addresses do not gain access"
      ],
      "internal": [
        {
          "subject": "os",
          "topic": "process-concept"
        },
        {
          "subject": "c",
          "topic": "storage-classes"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — Page faults",
          "url": "https://youtu.be/KSYO-gTZo0A"
        }
      ],
      "reading": "xv6 page-fault sections and MIT COW/mmap labs as extensions. Add lazy allocation only after basic mappings work.",
      "prerequisites": [
        "virtual-memory"
      ]
    },
    {
      "id": "processes",
      "title": "Processes, ELF Loading, fork/exec & wait",
      "phase": "Processes",
      "syllabus": [
        {
          "id": "s01",
          "label": "Process table"
        },
        {
          "id": "s02",
          "label": "Kernel/user stacks"
        },
        {
          "id": "s03",
          "label": "ELF validation"
        },
        {
          "id": "s04",
          "label": "Address-space ownership"
        },
        {
          "id": "s05",
          "label": "fork/exec/exit/wait"
        },
        {
          "id": "s06",
          "label": "Zombies"
        },
        {
          "id": "s07",
          "label": "Resource cleanup"
        }
      ],
      "lesson": "A process bundles execution state with an address space and resources. exec replaces the current program; fork creates a child under a defined copying policy. A process can finish executing yet remain as a zombie until a parent collects status. Error paths in loading and process creation must release partially acquired pages, descriptors and table entries.",
      "walkthrough": [
        "Define process states and ownership",
        "Validate ELF ranges and permissions",
        "Create an initial user stack",
        "Implement exit and parent collection",
        "Test cleanup after partially failed creation"
      ],
      "lab": "Run a small user program, replace it with another, create a child and collect its exit status. Repeatedly create failing processes and compare page/descriptor counts to baseline.",
      "criteria": [
        "Program load rejects malformed ranges",
        "wait returns the intended child status",
        "Repeated failures do not grow resource use"
      ],
      "internal": [
        {
          "subject": "os",
          "topic": "process-concept"
        },
        {
          "subject": "os",
          "topic": "process-states"
        },
        {
          "subject": "os",
          "topic": "context-switching"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — OS organization and system calls",
          "url": "https://youtu.be/o44d---Dk4o"
        }
      ],
      "reading": "xv6 chapters 2 and 7, exec.c and process lifecycle code.",
      "prerequisites": [
        "faults-and-cow"
      ]
    },
    {
      "id": "scheduler",
      "title": "Context Switching & a Fair First Scheduler",
      "phase": "Processes",
      "syllabus": [
        {
          "id": "s01",
          "label": "Saved kernel context"
        },
        {
          "id": "s02",
          "label": "Runnable queue"
        },
        {
          "id": "s03",
          "label": "Round robin"
        },
        {
          "id": "s04",
          "label": "Preemption"
        },
        {
          "id": "s05",
          "label": "Quantum trade-offs"
        },
        {
          "id": "s06",
          "label": "Blocking versus spinning"
        },
        {
          "id": "s07",
          "label": "Fairness metrics"
        }
      ],
      "lesson": "A context switch changes the execution context, unlike a trap that may return to the same one. Begin with a simple round-robin scheduler and a precisely defined runnable state. Preemption introduces interleavings inside kernel paths, so add it only when locking and interrupt policies are understood. Measure fairness with workloads instead of assuming equal time from a diagram.",
      "walkthrough": [
        "Specify saved registers and switch boundary",
        "Maintain runnable-state invariants",
        "Add voluntary yield before timer preemption",
        "Test CPU-bound and blocking tasks",
        "Measure progress and switching overhead"
      ],
      "lab": "Run two counters and one periodically blocking task. Record switch order and prove all runnable tasks progress. Change the quantum and explain the observed trade-off.",
      "criteria": [
        "No runnable process is lost from scheduling",
        "Switch preserves register/stack state",
        "Blocking work does not busy-wait indefinitely"
      ],
      "internal": [
        {
          "subject": "os",
          "topic": "round-robin"
        },
        {
          "subject": "os",
          "topic": "context-switching"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — Thread switching",
          "url": "https://youtu.be/vsgrTHY5tkg"
        }
      ],
      "reading": "xv6 scheduling chapter and swtch.S. Advanced policies are extensions after the simple scheduler passes tests.",
      "prerequisites": [
        "processes"
      ]
    },
    {
      "id": "locks",
      "title": "Race Conditions, Spinlocks & Memory Ordering",
      "phase": "Concurrency",
      "syllabus": [
        {
          "id": "s01",
          "label": "Atomic operations"
        },
        {
          "id": "s02",
          "label": "Critical sections"
        },
        {
          "id": "s03",
          "label": "Interrupt disabling"
        },
        {
          "id": "s04",
          "label": "Memory ordering"
        },
        {
          "id": "s05",
          "label": "Spinlock ownership"
        },
        {
          "id": "s06",
          "label": "Lock ordering"
        },
        {
          "id": "s07",
          "label": "Deadlock"
        }
      ],
      "lesson": "A lock protects an invariant, not a line of code in isolation. Disabling interrupts on one core does not exclude another core. Atomic read-modify-write and acquire/release ordering provide the synchronization model; volatile alone is not a lock. A spinlock must not be held across work that sleeps when the kernel’s rules prohibit it.",
      "walkthrough": [
        "Write the protected invariant",
        "Find all access paths",
        "Choose atomic primitives for the ISA",
        "Document interrupt and lock-order rules",
        "Stress the invariant under multiple interleavings"
      ],
      "lab": "Protect a shared counter or allocator with a lock. Demonstrate a lost update without the lock and repeat the workload with synchronization. Add debug ownership checks and an explicit lock-order table.",
      "criteria": [
        "Stress test preserves the invariant",
        "Can explain why volatile is insufficient",
        "No sleeping while holding a prohibited spinlock"
      ],
      "internal": [
        {
          "subject": "os",
          "topic": "race-conditions"
        },
        {
          "subject": "os",
          "topic": "mutex-locks"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — Multiprocessors and locking",
          "url": "https://youtu.be/NGXu3vN7yAk"
        }
      ],
      "reading": "xv6 locking chapter and spinlock.c. RISC-V memory ordering must be respected.",
      "prerequisites": [
        "scheduler"
      ]
    },
    {
      "id": "sleep-ipc",
      "title": "Sleep/Wakeup, Pipes & Coordination",
      "phase": "Concurrency",
      "syllabus": [
        {
          "id": "s01",
          "label": "Condition predicates"
        },
        {
          "id": "s02",
          "label": "Lost wakeups"
        },
        {
          "id": "s03",
          "label": "Sleep/wakeup protocol"
        },
        {
          "id": "s04",
          "label": "Pipes"
        },
        {
          "id": "s05",
          "label": "Blocking reads"
        },
        {
          "id": "s06",
          "label": "Close semantics"
        },
        {
          "id": "s07",
          "label": "Cancellation and cleanup"
        }
      ],
      "lesson": "A condition is a predicate about state; wakeup is only a signal to recheck it. Checking the predicate and going to sleep must coordinate with the waker or a wakeup can be lost. Pipes add bounded buffering and lifetime semantics: a reader must distinguish temporary emptiness from EOF after all writers close. Errors and process exit must release waiters safely.",
      "walkthrough": [
        "Write the condition predicate",
        "Hold the required lock during predicate decisions",
        "Atomically arrange sleep and release under the design",
        "Recheck after waking",
        "Handle peer exit and close"
      ],
      "lab": "Implement a bounded producer/consumer pipe. Test full buffer, empty buffer, last writer close, blocked reader exit and repeated wakeups without new data.",
      "criteria": [
        "No lost wakeup under a forced interleaving",
        "EOF is distinct from empty-but-open",
        "All wait paths eventually release locks/resources"
      ],
      "internal": [
        {
          "subject": "os",
          "topic": "inter-process-communication"
        },
        {
          "subject": "os",
          "topic": "race-conditions"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — Sleep and wakeup",
          "url": "https://youtu.be/gP67sJ4PTnc"
        }
      ],
      "reading": "xv6 sleep/wakeup and pipe sections. Follow the source lock protocol rather than inventing an unlock-then-sleep gap.",
      "prerequisites": [
        "locks"
      ]
    },
    {
      "id": "devices",
      "title": "Drivers, MMIO, Interrupt Controllers & DMA",
      "phase": "Devices",
      "syllabus": [
        {
          "id": "s01",
          "label": "MMIO"
        },
        {
          "id": "s02",
          "label": "Volatile access versus synchronization"
        },
        {
          "id": "s03",
          "label": "Polling/interrupts"
        },
        {
          "id": "s04",
          "label": "UART"
        },
        {
          "id": "s05",
          "label": "VirtIO concepts"
        },
        {
          "id": "s06",
          "label": "DMA ownership"
        },
        {
          "id": "s07",
          "label": "Buffer lifetime"
        }
      ],
      "lesson": "A driver translates a hardware contract into a kernel interface. Device registers may require volatile accesses, but that does not synchronize shared software state. DMA lets a device access memory whose ownership and visibility must remain valid until completion. Start with one documented virtual device; broad USB/GPU support is outside the core teaching target.",
      "walkthrough": [
        "Read the selected virtual-device contract",
        "Identify register width and ordering requirements",
        "Implement a minimal polling path",
        "Add completion interrupts with safe acknowledgement",
        "Document buffer ownership before/after DMA"
      ],
      "lab": "Trace a console read or virtual block request from submission to completion. Introduce a delayed completion and show why the buffer cannot be freed or reused early.",
      "criteria": [
        "Device requests have bounded error handling",
        "Interrupts are acknowledged correctly",
        "Buffer ownership remains valid through completion"
      ],
      "internal": [
        {
          "subject": "coa",
          "topic": "io-techniques"
        },
        {
          "subject": "coa",
          "topic": "interrupt-handling"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — Interrupts",
          "url": "https://youtu.be/zRnGNndcVEA"
        }
      ],
      "reading": "xv6 device chapter and UART/VirtIO driver source. Do not mix physical-device addresses from another machine.",
      "prerequisites": [
        "sleep-ipc"
      ]
    },
    {
      "id": "block-storage",
      "title": "Block I/O & a Buffer Cache",
      "phase": "Storage",
      "syllabus": [
        {
          "id": "s01",
          "label": "Sectors/blocks"
        },
        {
          "id": "s02",
          "label": "Block-device abstraction"
        },
        {
          "id": "s03",
          "label": "Request completion"
        },
        {
          "id": "s04",
          "label": "Buffer cache"
        },
        {
          "id": "s05",
          "label": "Dirty/pinned buffers"
        },
        {
          "id": "s06",
          "label": "Eviction"
        },
        {
          "id": "s07",
          "label": "I/O errors"
        }
      ],
      "lesson": "A buffer cache maps disk blocks to memory buffers and must coordinate concurrent requests for the same block. Dirty means memory differs from persisted data; pinned means a subsystem requires that buffer to stay resident. A completed write and durable storage are distinct concepts under a device’s flush/barrier model. Use disposable emulator image files only.",
      "walkthrough": [
        "Define a block interface and errors",
        "Ensure one coherent buffer identity per block",
        "Protect cache lookup and eviction",
        "Track dirty/pinned state",
        "Test read/write failures without touching host devices"
      ],
      "lab": "Write and read patterns in a project-local QEMU disk image. Access the same block concurrently and verify consistent buffer identity. Fill the cache and test an eviction policy that respects pinned buffers.",
      "criteria": [
        "Only the designated disposable image is modified",
        "Pinned buffers cannot be evicted incorrectly",
        "I/O failure returns through the filesystem boundary"
      ],
      "internal": [
        {
          "subject": "coa",
          "topic": "secondary-memory"
        },
        {
          "subject": "os",
          "topic": "shell-essentials"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — File systems",
          "url": "https://youtu.be/ADzLv1nRtR8"
        }
      ],
      "reading": "xv6 buffer-cache and VirtIO disk implementation. A host path such as /dev/disk is never a practice target.",
      "prerequisites": [
        "devices"
      ]
    },
    {
      "id": "filesystem",
      "title": "Inodes, Directories & a Basic Filesystem",
      "phase": "Storage",
      "syllabus": [
        {
          "id": "s01",
          "label": "Superblock"
        },
        {
          "id": "s02",
          "label": "Allocation bitmap"
        },
        {
          "id": "s03",
          "label": "Inodes"
        },
        {
          "id": "s04",
          "label": "Direct/indirect blocks"
        },
        {
          "id": "s05",
          "label": "Directories"
        },
        {
          "id": "s06",
          "label": "Paths"
        },
        {
          "id": "s07",
          "label": "File descriptors"
        },
        {
          "id": "s08",
          "label": "Hard links"
        },
        {
          "id": "s09",
          "label": "Unlink/open lifetime"
        }
      ],
      "lesson": "A filesystem links names to persistent objects and exposes per-process open-file state. A filename is not the inode itself: multiple names may refer to one inode and an unlinked open file may remain usable until its final reference closes. Separate block allocation, inode metadata and file offsets so concurrent operations preserve their own invariants.",
      "walkthrough": [
        "Draw on-disk structures and bounds",
        "Resolve paths with clear ownership rules",
        "Allocate and free blocks consistently",
        "Implement read/write and descriptor offsets",
        "Test link/unlink while an object is open"
      ],
      "lab": "Create files and directories in the emulator image, write across a block boundary, reopen and verify bytes. Test a full image, invalid path, duplicate name and unlink of an open file.",
      "criteria": [
        "Data survives clean reboot",
        "Block/inode allocation remains consistent",
        "Descriptor offsets and inode identity are distinct"
      ],
      "internal": [
        {
          "subject": "os",
          "topic": "inter-process-communication"
        },
        {
          "subject": "c",
          "topic": "structures"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — File systems",
          "url": "https://youtu.be/ADzLv1nRtR8"
        }
      ],
      "reading": "xv6 filesystem chapter, fs.c/file.c and MIT filesystem lab.",
      "prerequisites": [
        "block-storage"
      ]
    },
    {
      "id": "crash-recovery",
      "title": "Logging, Crash Consistency & Recovery Tests",
      "phase": "Storage",
      "syllabus": [
        {
          "id": "s01",
          "label": "Write ordering"
        },
        {
          "id": "s02",
          "label": "Atomicity"
        },
        {
          "id": "s03",
          "label": "Write-ahead logging"
        },
        {
          "id": "s04",
          "label": "Commit records"
        },
        {
          "id": "s05",
          "label": "Replay"
        },
        {
          "id": "s06",
          "label": "Idempotence"
        },
        {
          "id": "s07",
          "label": "Crash injection"
        },
        {
          "id": "s08",
          "label": "Consistency checker"
        }
      ],
      "lesson": "A sequence of correct in-memory writes can leave corrupt disk metadata if the machine stops between writes. A log groups filesystem updates under a recoverable commit protocol. Recovery must distinguish committed from incomplete work and be safe to repeat. Durability depends on the device model, ordering and flush guarantees, not merely the presence of a log function.",
      "walkthrough": [
        "Choose a small metadata operation",
        "List possible crash points",
        "Write log data before a durable commit indication",
        "Replay only committed operations under the protocol",
        "Reboot at each crash point and check invariants"
      ],
      "lab": "Inject emulator termination before and after the commit point of a file create/unlink. Reboot a copy of the disposable image and run checks for leaked or multiply owned blocks.",
      "criteria": [
        "Recovery can run twice safely",
        "Uncommitted work is not exposed as committed",
        "Crash tests cover more than clean shutdown"
      ],
      "internal": [
        {
          "subject": "os",
          "topic": "os-structure"
        },
        {
          "subject": "coa",
          "topic": "secondary-memory"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — Crash recovery",
          "url": "https://youtu.be/7Hk2dIorDkk"
        }
      ],
      "reading": "xv6 logging chapter and log.c. Never interpret clean-reboot persistence as proof of crash consistency.",
      "prerequisites": [
        "filesystem"
      ]
    },
    {
      "id": "userland",
      "title": "User Library, Shell & End-to-End Utilities",
      "phase": "User experience",
      "syllabus": [
        {
          "id": "s01",
          "label": "Startup code"
        },
        {
          "id": "s02",
          "label": "Minimal libc subset"
        },
        {
          "id": "s03",
          "label": "File descriptors"
        },
        {
          "id": "s04",
          "label": "Pipes/redirection"
        },
        {
          "id": "s05",
          "label": "Shell parsing"
        },
        {
          "id": "s06",
          "label": "Error reporting"
        },
        {
          "id": "s07",
          "label": "Process cleanup"
        }
      ],
      "lesson": "A kernel becomes usable when small user programs compose its interfaces. The user library supplies syscall wrappers and a minimal runtime, not an implicit full C library. A shell wires processes and descriptors together; descriptor leaks can keep a pipe open forever. Parse only a clearly documented grammar rather than claiming a fully POSIX-compatible shell.",
      "walkthrough": [
        "Define the supported runtime subset",
        "Implement small commands with error returns",
        "Add redirection and pipelines",
        "Close unused pipe ends in parent and children",
        "Test failure and process collection"
      ],
      "lab": "Run echo, cat and a line-count utility, then connect a pipeline. Try a missing command and invalid redirection. Verify the shell stays usable and no zombie/descriptor count grows after many commands.",
      "criteria": [
        "At least three utilities run as user processes",
        "Pipelines terminate when writers close",
        "Unsupported shell syntax produces an honest error"
      ],
      "internal": [
        {
          "subject": "os",
          "topic": "shell-essentials"
        },
        {
          "subject": "os",
          "topic": "inter-process-communication"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — OS organization and system calls",
          "url": "https://youtu.be/o44d---Dk4o"
        }
      ],
      "reading": "xv6 user programs and sh.c. Treat this as a small shell, not a complete POSIX implementation.",
      "prerequisites": [
        "crash-recovery"
      ]
    },
    {
      "id": "network",
      "title": "Networking Fundamentals & a Bounded Driver Lab",
      "phase": "Extensions",
      "syllabus": [
        {
          "id": "s01",
          "label": "Ethernet/ARP"
        },
        {
          "id": "s02",
          "label": "IP/UDP"
        },
        {
          "id": "s03",
          "label": "Sockets concept"
        },
        {
          "id": "s04",
          "label": "Packet lengths"
        },
        {
          "id": "s05",
          "label": "Checksums"
        },
        {
          "id": "s06",
          "label": "Receive buffers"
        },
        {
          "id": "s07",
          "label": "Driver ring ownership"
        },
        {
          "id": "s08",
          "label": "Timeouts"
        }
      ],
      "lesson": "Networking adds untrusted packet parsing and asynchronous buffer ownership. Start with a bounded UDP or course-driver exercise rather than a production TCP stack. Validate every length before accessing a header, and separate a network protocol from the virtual device used to move bytes. A successful ping-like demo is not evidence of Internet-safe networking.",
      "walkthrough": [
        "Trace link, network and transport headers",
        "Validate packet size and checksum policy",
        "Follow ring-buffer ownership in a reference driver",
        "Bound queues and timeouts",
        "Test malformed and truncated packets"
      ],
      "lab": "Use the MIT network lab on its documented branch or an isolated equivalent with the teaching kernel. Capture one packet path and test a too-short frame and a full receive queue. Do not expose the experimental kernel as a public service.",
      "criteria": [
        "Truncated input cannot read past its buffer",
        "RX/TX buffers have documented ownership",
        "Demo uses an isolated emulator environment"
      ],
      "internal": [
        {
          "subject": "networks",
          "topic": "tcp-ip-model"
        },
        {
          "subject": "networks",
          "topic": "udp"
        },
        {
          "subject": "networks",
          "topic": "mac-addressing"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — Networking",
          "url": "https://youtu.be/Fcjychg4Tvk"
        }
      ],
      "reading": "MIT network lab and xv6 networking lecture. This is an extension gate, not a full TCP/IPv6 implementation.",
      "prerequisites": [
        "userland"
      ]
    },
    {
      "id": "hardening",
      "title": "Kernel Security, Permissions & Adversarial Tests",
      "phase": "Extensions",
      "syllabus": [
        {
          "id": "s01",
          "label": "User pointer validation"
        },
        {
          "id": "s02",
          "label": "Least privilege"
        },
        {
          "id": "s03",
          "label": "W^X concept"
        },
        {
          "id": "s04",
          "label": "Stack guards"
        },
        {
          "id": "s05",
          "label": "Information leaks"
        },
        {
          "id": "s06",
          "label": "Resource quotas"
        },
        {
          "id": "s07",
          "label": "Fuzzing"
        },
        {
          "id": "s08",
          "label": "Side channels"
        }
      ],
      "lesson": "Even a teaching OS needs an explicit threat model. User programs can supply malicious addresses, lengths and syscall sequences. Memory protection prevents some direct accesses, but uninitialized memory, unchecked arithmetic and resource exhaustion can still cross boundaries. Side channels such as speculative-execution attacks are advanced study topics, not solved by the basic page permissions.",
      "walkthrough": [
        "List user-controlled inputs",
        "Test invalid pointer and integer boundaries",
        "Zero newly exposed memory as required",
        "Bound process/file/memory consumption",
        "Record security limitations rather than claiming hardening completeness"
      ],
      "lab": "Write a small adversarial test suite for syscall numbers, pointers, lengths and repeated process creation. Verify controlled process failure instead of kernel corruption, and test resource limits.",
      "criteria": [
        "Bad user requests do not panic the entire kernel under the tested cases",
        "No known uninitialized page is exposed",
        "Unsupported security guarantees are listed"
      ],
      "internal": [
        {
          "subject": "os",
          "topic": "user-kernel-mode"
        },
        {
          "subject": "networks",
          "topic": "network-security"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — Meltdown",
          "url": "https://youtu.be/WpKVr3p5rjE"
        }
      ],
      "reading": "xv6 isolation/trap sections and the Meltdown lecture for limits. No production security claim.",
      "prerequisites": [
        "network"
      ]
    },
    {
      "id": "multicore-and-vms",
      "title": "Multicore, TLB Shootdowns & Virtualization",
      "phase": "Extensions",
      "syllabus": [
        {
          "id": "s01",
          "label": "Per-CPU state"
        },
        {
          "id": "s02",
          "label": "Atomicity"
        },
        {
          "id": "s03",
          "label": "Lock contention"
        },
        {
          "id": "s04",
          "label": "TLB shootdown"
        },
        {
          "id": "s05",
          "label": "Memory barriers"
        },
        {
          "id": "s06",
          "label": "Virtual machines"
        },
        {
          "id": "s07",
          "label": "Resource isolation"
        },
        {
          "id": "s08",
          "label": "RCU overview"
        }
      ],
      "lesson": "Code correct on one CPU can fail on several because state, caches and translations are no longer implicitly serialized. Per-CPU data reduces contention but complicates aggregation and migration. A translation removed on one core can remain cached on another until a coordinated invalidation protocol completes. Virtualization adds another privileged boundary and address-translation layer; it is a separate extension after the base kernel works.",
      "walkthrough": [
        "Run single-core and multicore stress separately",
        "Identify shared and per-CPU invariants",
        "Measure lock contention",
        "Trace one cross-core invalidation",
        "Study virtualization without mixing guest and host addresses"
      ],
      "lab": "Run allocator/process stress with multiple virtual CPUs. Record invariant failures and contention. For an advanced write-up, draw a TLB-shootdown protocol and a guest-to-host address translation path.",
      "criteria": [
        "Multicore results compared with single-core baseline",
        "Cross-core assumptions are documented",
        "Advanced virtualization is not required for the core kernel milestone"
      ],
      "internal": [
        {
          "subject": "coa",
          "topic": "parallel-processing"
        },
        {
          "subject": "os",
          "topic": "race-conditions"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — Virtual machines",
          "url": "https://youtu.be/R8obXHAIPY0"
        }
      ],
      "reading": "xv6 multicore/locking material; virtualization and RCU lectures as advanced reading.",
      "prerequisites": [
        "hardening"
      ]
    },
    {
      "id": "capstone",
      "title": "Capstone: Boot, Run, Recover & Explain",
      "phase": "Release",
      "syllabus": [
        {
          "id": "s01",
          "label": "Reproducible build"
        },
        {
          "id": "s02",
          "label": "Boot test"
        },
        {
          "id": "s03",
          "label": "User isolation"
        },
        {
          "id": "s04",
          "label": "Scheduling"
        },
        {
          "id": "s05",
          "label": "Filesystem recovery"
        },
        {
          "id": "s06",
          "label": "Regression suite"
        },
        {
          "id": "s07",
          "label": "License/attribution"
        },
        {
          "id": "s08",
          "label": "Demo and limitations"
        }
      ],
      "lesson": "The capstone is a reproducible teaching artifact, not an unsupported claim of completeness. On the own-kernel route, integrate the incrementally implemented subsystems. On the xv6 route, present original lab changes and explain their mechanisms; do not call an unmodified clone your own OS. Record architecture, emulator/tool versions, assumptions and licenses for any reused code.",
      "walkthrough": [
        "Build from a clean checkout",
        "Run boot, syscall, memory, scheduling and storage tests",
        "Crash and restore a disposable image",
        "Present one failure trace per subsystem",
        "Publish only after a separate review of safety, licensing and scope"
      ],
      "lab": "Prepare a local demo showing boot → shell → two processes → pipe → persistent file → controlled crash/recovery. Include a test matrix and a short architecture document with unresolved limitations.",
      "criteria": [
        "Clean build and repeatable emulator demo",
        "Regression evidence includes failure cases",
        "Original versus reused code is identified",
        "No host disk access or production-readiness claim"
      ],
      "internal": [
        {
          "subject": "os",
          "topic": "os-structure"
        },
        {
          "subject": "os",
          "topic": "process-concept"
        }
      ],
      "docs": [
        {
          "label": "xv6 RISC-V — teaching OS book",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/xv6/book-riscv-rev4.pdf"
        },
        {
          "label": "MIT 6.1810 — complete schedule and labs",
          "url": "https://pdos.csail.mit.edu/6.1810/2024/schedule.html"
        },
        {
          "label": "MIT xv6-riscv — reference source",
          "url": "https://github.com/mit-pdos/xv6-riscv"
        }
      ],
      "videos": [
        {
          "label": "MIT 6.S081 — Introduction and examples",
          "url": "https://youtu.be/L6YqHxYHa7A"
        }
      ],
      "reading": "Review the xv6 book and course lab tests. External videos/books remain online resources, not bundled copies.",
      "prerequisites": [
        "multicore-and-vms"
      ]
    }
  ]
};
