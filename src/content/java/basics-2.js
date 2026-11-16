// Java — more foundational "things you have to know" notes (part 2).
export default [
  {
    id: "compilation-and-jvm",
    title: "Compilation & the JVM",
    difficulty: "easy",
    definition: `Java source (.java) compiles to bytecode (.class) which the JVM executes. This two-step "compile once, run anywhere" model is what makes Java portable. The JVM also provides garbage collection, security, and a runtime.`,
    coreUnderstanding: `Unlike C (source -> machine code for one CPU), Java splits the job: javac compiles source to portable bytecode, then the JVM runs that bytecode on any platform. The same .class file runs on Windows, Linux, and macOS because each has a JVM that translates bytecode to native instructions (often via the Just-In-Time compiler, which optimizes hot code at runtime). The JVM also runs the garbage collector (automatic memory cleanup), enforces security (bytecode verification), and provides the runtime libraries. This is why Java is portable but has startup overhead (the JVM must load).`,
    howItWorks: `1. WRITE: you write Hello.java (source code, human-readable).
2. COMPILE: javac Hello.java produces Hello.class — bytecode, NOT machine code. Bytecode is a compact, platform-neutral instruction set for the JVM.
3. RUN: java Hello starts the JVM, which loads Hello.class, verifies it (security), and executes the bytecode.
4. INTERPRET + JIT: the JVM starts by interpreting bytecode (slow-ish), then the Just-In-Time compiler compiles frequently-run ("hot") methods to native machine code for speed.
5. GARBAGE COLLECTION: the JVM automatically frees objects no longer referenced — no manual free(). This prevents memory leaks (mostly) and use-after-free bugs.
6. PORTABILITY: the same .class runs on any OS with a JVM. "Write once, run anywhere."
7. STARTUP COST: the JVM takes time to load and warm up — why Java apps have slower startup than native C/Rust. Server apps don't care; short CLI tools do.
8. JDK vs JRE: JDK = dev kit (javac + tools + JRE); JRE = just the runtime (java + libraries) to RUN apps. Modern Java ships the JDK for development.`,
    codeExamples: [
      {
        lang: "bash",
        code: `# 1. write source
cat > Hello.java <<'EOF'
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, JVM!");
    }
}
EOF

# 2. compile: .java -> .class (bytecode, NOT machine code)
javac Hello.java        # produces Hello.class

# 3. run: the JVM loads and executes the bytecode
java Hello              # Hello, JVM!

# the .class is portable — copy it to another OS with a JVM and it runs
file Hello.class        # compiled Java class data

# bytecode is NOT human-readable; disassemble with:
javap -c Hello          # shows the bytecode instructions`,
        output: `Hello, JVM!`,
        note: "javac compiles .java to portable .class bytecode (not machine code). java starts the JVM, which loads, verifies, and runs the bytecode — interpreting first, then JIT-compiling hot code to native. The same .class runs on any OS with a JVM."
      }
    ],
    marginNotes: [
      "Bytecode is NOT machine code — it's a platform-neutral instruction set the JVM interprets and JIT-compiles. That's why one .class runs everywhere a JVM exists.",
      "The JIT compiler is why Java is fast after warmup: it compiles frequently-run methods to native machine code at runtime. Short programs may never benefit (they finish before JIT kicks in).",
      "Garbage collection means you don't call free(). But you can still leak memory by holding references (e.g., a static list that never shrinks) — the GC can't collect what's still reachable.",
      "JDK = for developing (includes javac + tools + JRE); JRE = for running (just java + libraries). Install the JDK to compile."
    ],
    commonMistakes: [
      "Thinking javac produces machine code — it produces bytecode; the JVM (with JIT) turns it native at runtime.",
      "Assuming GC prevents ALL memory leaks — reachable objects are never collected; holding references (static collections, caches) leaks.",
      "Confusing JDK (develop) with JRE (run) — you need the JDK to compile."
    ],
    relatedTopics: ["Variables & Data Types", "OOP: Classes & Objects", "Garbage Collection"],
    externalLinks: [
      { label: "Oracle: The Java Virtual Machine", url: "https://docs.oracle.com/javase/specs/jvms/se17/html/jvms-1.html" },
      { label: "JIT Compilation (Wiki)", url: "https://en.wikipedia.org/wiki/Just-in-time_compilation" }
    ],
    mcqs: [
      {
        question: "What does `javac` produce?",
        options: ["Machine code for your CPU", "Portable bytecode (.class) that the JVM runs", "An executable (.exe)", "JavaScript"],
        answer: 1,
        explanations: ["That's a native compiler (C).", "Correct — javac compiles .java to .class bytecode, which is platform-neutral. The JVM (with JIT) turns it native at runtime, so the same .class runs on any OS.", "Java doesn't produce .exe by default.", "No."],
        difficulty: "easy"
      },
      {
        question: "Why is Java portable ('write once, run anywhere')?",
        options: ["It compiles to machine code", "The same bytecode runs on any OS that has a JVM", "It's interpreted from source", "It uses a single OS"],
        answer: 1,
        explanations: ["Machine code is per-CPU.", "Correct — .class bytecode is platform-neutral; any OS with a JVM can run it. The JVM translates bytecode to that platform's native instructions.", "Java isn't interpreted from source (unlike Python).", "Java runs on many OSes."],
        difficulty: "easy"
      },
      {
        question: "What does the JIT compiler do?",
        options: ["Compiles source to bytecode", "Compiles frequently-run bytecode to native machine code at runtime for speed", "Garbage collects", "Verifies classes"],
        answer: 1,
        explanations: ["That's javac.", "Correct — the JIT (Just-In-Time) compiler translates hot methods from bytecode to native machine code while the program runs, making Java fast after warmup.", "That's the garbage collector.", "That's the bytecode verifier."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "packages-imports-classpath",
    title: "Packages, Imports & Classpath",
    difficulty: "easy",
    definition: `A package is a namespace for classes (like a folder). Imports let you use a class by its short name. The classpath is where the JVM looks for compiled classes. Together they organize and locate Java code.`,
    coreUnderstanding: `Java uses packages to avoid name clashes and group related classes — java.util, com.myapp.models. A class declares its package at the top (package com.myapp;), and the file must live in a matching folder (com/myapp/). To use a class from another package, you import it (import java.util.List;) or use its fully-qualified name. java.lang (String, System, Math) is auto-imported. The classpath is the list of folders/jars the JVM searches for .class files — if the JVM "cannot find symbol" or "class not found", it's usually a classpath/import issue.`,
    howItWorks: `1. PACKAGE: declared at the very top of a file: package com.myapp.models;. The file MUST live in a matching directory: com/myapp/models/.
2. IMPORT: import java.util.List; lets you write List instead of java.util.List. import java.util.*; imports the whole package (less precise).
3. AUTO-IMPORT: java.lang.* (String, System, Math, Integer, Exception) is imported automatically — no import needed.
4. CLASS NAME: a public class's name must match its filename: public class Foo lives in Foo.java.
5. CLASSPATH: where the JVM looks for classes — folders and .jar files. java -cp out:lib/* MyApp. Default is the current directory.
6. "Cannot find symbol": usually a missing import or a typo in the class name. "NoClassDefFoundError": the class was present at compile time but missing at run time (classpath issue).
7. JAR: a .jar is a zip of .class files — a packaged library. Add it to the classpath to use its classes.
8. STATIC IMPORT: import static java.lang.Math.PI; lets you use PI without the Math. prefix (use sparingly).`,
    codeExamples: [
      {
        lang: "java",
        code: `// file: src/com/myapp/models/User.java
package com.myapp.models;            // package = namespace, matches folder

import java.util.List;               // import one class
import java.util.ArrayList;          // use short names below
// import java.util.*;              // wildcard: whole package (less precise)

public class User {
    private String name;             // String is in java.lang -> auto-imported
    private List<String> tags;       // List needs the import above

    public User(String name) {
        this.name = name;
        this.tags = new ArrayList<>();
    }

    public static void main(String[] args) {
        User u = new User("Ada");
        System.out.println(u.name);  // System is java.lang -> auto
    }
}

// compile + run from the project root:
//   javac -d out src/com/myapp/models/User.java
//   java  -cp out com.myapp.models.User`,
        output: `Ada`,
        note: "A package is a namespace matching the folder (com/myapp/models). Imports give short names; java.lang is auto-imported. The classpath (-cp) tells the JVM where to find .class files."
      }
    ],
    marginNotes: [
      "The package declaration must match the folder path: `package com.myapp.models;` means the file lives in com/myapp/models/. Mismatch = compile error.",
      "java.lang (String, System, Math, Integer, Exception) is auto-imported — you never need `import java.lang.String`. Everything else needs an import or a fully-qualified name.",
      "A public class's name must EXACTLY match its filename: `public class User` lives in `User.java`. Mismatch is a compile error.",
      "'Cannot find symbol' = missing import or typo. 'NoClassDefFoundError'/'ClassNotFoundException' = the class was there at compile time but not at runtime — fix the classpath (-cp)."
    ],
    commonMistakes: [
      "Folder path not matching the package declaration — compile error.",
      "Forgetting to import non-java.lang classes (List, ArrayList, Scanner) — 'cannot find symbol'.",
      "A public class name not matching its filename — compile error.",
      "Wrong classpath at runtime — code compiles but throws NoClassDefFoundError when run."
    ],
    relatedTopics: ["OOP: Classes & Objects", "The Collections Framework", "Access Modifiers"],
    externalLinks: [
      { label: "Oracle: Packages", url: "https://docs.oracle.com/javase/tutorial/java/package/index.html" },
      { label: "Oracle: Classpath", url: "https://docs.oracle.com/javase/tutorial/essential/environment/paths.html" }
    ],
    mcqs: [
      {
        question: "What must match a `package com.myapp.models;` declaration?",
        options: ["The class name", "The folder path: the file must live in com/myapp/models/", "The file size", "Nothing"],
        answer: 1,
        explanations: ["The class name matches the filename, not the package.", "Correct — the package is a namespace tied to the directory: a file with `package com.myapp.models;` must live in com/myapp/models/. Mismatch is a compile error.", "Unrelated.", "It must match the folder."],
        difficulty: "easy"
      },
      {
        question: "Which package is auto-imported (no import statement needed)?",
        options: ["java.util", "java.io", "java.lang (String, System, Math)", "com.myapp"],
        answer: 2,
        explanations: ["java.util needs imports (List, ArrayList).", "java.io needs imports.", "Correct — java.lang is auto-imported: String, System, Math, Integer, Exception need no import. Everything else does.", "Your own packages need imports too."],
        difficulty: "easy"
      },
      {
        question: "What does 'NoClassDefFoundError' usually mean?",
        options: ["A syntax error", "The class existed at compile time but is missing from the runtime classpath", "A missing import", "A typo in a method name"],
        answer: 1,
        explanations: ["Syntax errors are caught at compile time.", "Correct — the class compiled fine but the JVM can't find it at runtime. Fix the classpath (-cp) to include the needed folder or .jar.", "A missing import is a compile-time 'cannot find symbol'.", "That's a compile-time error."],
        difficulty: "medium"
      }
    ]
  }
];