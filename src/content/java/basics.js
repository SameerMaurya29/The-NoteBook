// Java — the foundational "why & how" note, placed first in the syllabus.
export default {
  id: "language-basics",
  title: "Java Basics — Why & How",
  difficulty: "easy",
  definition: `Java is a strongly-typed, compiled-to-bytecode, JVM-borne language — the lingua franca of enterprise backends and Android. You use it for large, long-lived systems where compile-time safety, tooling, and a massive ecosystem matter.`,
  coreUnderstanding: `Java's promise is "write once, run anywhere": source compiles to bytecode that the JVM executes on any platform. It is statically typed (errors surface at compile time), object-oriented (everything lives in a class), and garbage-collected (no manual free). You reach for Java in enterprise backends, Android apps, big data (Hadoop/Spark), and large teams that need maintainability. The trade-offs: verbose syntax, slower startup than native code, and more ceremony than Python.`,
  howItWorks: `1. WHY: compile-time type safety, "write once run anywhere" via the JVM, huge ecosystem, excellent tooling. Trade-off: verbose, slower startup, more ceremony.
2. WHERE: enterprise backends (Spring), Android, big data, large team codebases. Avoid for tiny scripts or ultra-low-latency.
3. EVERYTHING IS A CLASS: there are no free-standing functions or global variables. Code lives inside classes; execution starts at \`public static void main(String[] args)\`.
4. BRACES \`{ }\` delimit classes, methods, and blocks (\`if\`/\`for\`/\`while\`). Every \`{\` needs a matching \`}\`. The class opens with \`class Foo {\` and closes with \`}\`.
5. SEMICOLONS \`;\` end every statement. Declarations, assignments, method calls — all end with \`;\`. A method declaration/signature does NOT end with \`;\` (it opens a body with \`{\`); an abstract method or interface method DOES end with \`;\`.
6. COMMAS separate: parameters \`int add(int a, int b)\`, arguments \`add(1, 2)\`, array elements \`{1, 2, 3}\`, and generics bounds.
7. METHODS (Java's "functions"): \`accessModifier returnType name(params) { body; return value; }\`. Example: \`public int add(int a, int b) { return a + b; }\`. \`void\` means no return.
8. STATEMENTS vs EXPRESSIONS: \`int x = 5;\` is a statement (ends with \`;\`); \`a + b\` is an expression. The ternary \`cond ? a : b\` is an expression.
9. ENTRY POINT: \`public static void main(String[] args)\` — the JVM calls this. \`static\` so no instance is needed.`,
  codeExamples: [
    {
      lang: "java",
      code: `public class Demo {              // class opens with {

    // method: modifier returnType name(params) { body }
    public int add(int a, int b) {   // no semicolon after ) — body follows
        return a + b;                 // statement ends with ;
    }

    public static void main(String[] args) {   // entry point
        Demo d = new Demo();          // create an object
        int sum = d.add(3, 4);         // method call; args separated by commas
        System.out.println(sum);      // statement ends with ;
    }
}                                  // class closes with } — no semicolon after`,
      output: `7`,
      note: "Everything lives in a class. Braces { } delimit classes/methods/blocks; semicolons end statements (but not method signatures that open a body). main(String[] args) is the entry point."
    }
  ],
  marginNotes: [
    "A method that opens a body with { does NOT end with ;. Only abstract/interface methods (no body) end with ; — e.g. `abstract void run();`.",
    "Every { needs a }. The class's closing } is the last character of the file. Count braces when you get a 'reached end of file while parsing' error.",
    "main must be `public static void main(String[] args)` exactly — public (JVM access), static (no instance), void (no return), String[] args (command-line args).",
    "Java is pass-by-value always. For objects, the reference is copied — you can mutate fields but not reassign the caller's variable."
  ],
  commonMistakes: [
    "Putting a semicolon after a method signature that has a body — compile error.",
    "Forgetting that everything must be inside a class — no top-level functions like in C/Python.",
    "Mismatched braces — the classic 'reached end of file while parsing' error."
  ],
  relatedTopics: ["Variables & Data Types", "OOP: Classes & Objects", "Methods, Parameters & Return"],
  externalLinks: [
    { label: "Oracle: Getting Started", url: "https://docs.oracle.com/javase/tutorial/getStarted/" },
    { label: "JLS — Lexical Structure", url: "https://docs.oracle.com/javase/specs/jls/se17/html/jls-3.html" }
  ],
  mcqs: [
    {
      question: "Where does a Java program's execution begin?",
      options: ["The first line of the file", "public static void main(String[] args)", "The class constructor", "A function named start()"],
      answer: 1,
      explanations: ["Java doesn't run top-down.", "Correct — the JVM invokes `public static void main(String[] args)`. It must be public (JVM access), static (no instance needed), and void.", "Constructors run when objects are created, not at startup.", "There is no start() convention."],
      difficulty: "easy"
    },
    {
      question: "Does a method signature with a body end with a semicolon?",
      options: ["Yes, always", "No — only abstract/interface methods (no body) end with ;", "Only public methods", "Only static methods"],
      answer: 1,
      explanations: ["A body method opens with {, no ;.", "Correct — `int add(int a, int b) { ... }` has no semicolon after the signature. Only methods WITHOUT a body (abstract, interface) end with ;, e.g. `abstract void run();`.", "Access modifier is irrelevant.", "static is irrelevant."],
      difficulty: "medium"
    },
    {
      question: "Why choose Java for a large backend?",
      options: ["It's the fastest language", "Compile-time type safety, JVM portability, huge ecosystem and tooling for maintainable large systems", "It has no boilerplate", "It's dynamically typed"],
      answer: 1,
      explanations: ["Java is not the fastest at runtime.", "Correct — static typing catches errors at compile time, the JVM runs anywhere, and the ecosystem/tooling (Spring, Maven, IDEs) support large teams and long-lived code.", "Java is famously verbose.", "Java is statically typed."],
      difficulty: "easy"
    }
  ]
};