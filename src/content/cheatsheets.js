/**
 * Comprehensive cheatsheet data for all languages.
 * Java and C are expanded to full one-page syntax references.
 */

export const SHEETS = {
  java: {
    name: "Java",
    sections: [
      {
        title: "Hello World",
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
      },
      {
        title: "Primitives & Vars",
        code: `int x = 10;
long big = 1_000_000L;
double d = 3.14;
float f = 3.14f;
boolean ok = true;
char c = 'A';
String s = "text";
var inferred = 42;   // Java 10+
final int MAX = 100; // constant`
      },
      {
        title: "Type Casting",
        code: `int i = 100;
long l = i;          // implicit widen
double dd = l;       // implicit widen
int n = (int) dd;    // explicit narrow
byte b = (byte) 128; // overflow → -128`
      },
      {
        title: "Operators",
        code: `int a = 10, b = 3;
a + b;  a - b;  a * b;
a / b;  // 3 (integer div)
a % b;  // 1 (remainder)
a++;  ++a;  a--;  --a;
a += 5; a -= 5; a *= 2;
boolean eq = (a == b);
boolean and = (a > 0 && b > 0);
boolean or  = (a > 0 || b > 0);
String result = a > b ? "yes" : "no";`
      },
      {
        title: "Control Flow",
        code: `if (x > 0) { ... }
else if (x == 0) { ... }
else { ... }

switch (day) {
    case "MON" -> System.out.println(1);
    case "FRI" -> System.out.println(5);
    default    -> System.out.println(0);
}`
      },
      {
        title: "Loops",
        code: `for (int i = 0; i < n; i++) { ... }
for (int v : arr) { ... }       // enhanced
while (cond) { ... }
do { ... } while (cond);

break;     // exit loop
continue;  // skip iteration`
      },
      {
        title: "Arrays",
        code: `int[] a = {1, 2, 3};
int[] b = new int[5];
int[][] grid = new int[3][3];
a.length;        // 3
Arrays.sort(a);
Arrays.toString(a);`
      },
      {
        title: "Methods & Varargs",
        code: `static int add(int a, int b) {
    return a + b;
}
static void log(String... msgs) {  // varargs
    for (String m : msgs) System.out.println(m);
}
add(3, 4);
log("a", "b", "c");`
      },
      {
        title: "Class & Constructor",
        code: `class Person {
    private String name;
    public Person(String name) { this.name = name; }
    public String getName() { return name; }
    public void setName(String n) { name = n; }
}
Person p = new Person("Ada");
p.getName();`
      },
      {
        title: "Inheritance & Override",
        code: `class Animal {
    void speak() { System.out.println("?"); }
}
class Dog extends Animal {
    @Override
    void speak() { System.out.println("Woof"); }
}
Animal a = new Dog();
a.speak();  // "Woof" — dynamic dispatch`
      },
      {
        title: "Interface",
        code: `interface Drawable {
    void draw();
    default void info() { System.out.println("drawable"); }
}
class Circle implements Drawable {
    public void draw() { System.out.println("O"); }
}`
      },
      {
        title: "Abstract & Static",
        code: `abstract class Shape {
    abstract double area();
    static String type() { return "shape"; }
}
class Square extends Shape {
    double area() { return 1.0; }
}`
      },
      {
        title: "String Methods",
        code: `String s = "Hello";
s.length();        // 5
s.charAt(0);       // 'H'
s.substring(1, 3); // "el"
s.toUpperCase();   // "HELLO"
s.indexOf("l");    // 2
s.split(",");      // String[]
s.equals("Hi");    // false
String.format("%d-%s", 1, "a");`
      },
      {
        title: "StringBuilder",
        code: `StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(" World");
sb.insert(5, ",");
sb.reverse();
String result = sb.toString();`
      },
      {
        title: "Collections",
        code: `List<Integer> list = new ArrayList<>();
list.add(1); list.get(0); list.size();
Map<String,Integer> map = new HashMap<>();
map.put("a",1); map.get("a"); map.containsKey("a");
Set<String> set = new HashSet<>();
set.add("x"); set.contains("x");
Queue<Integer> q = new LinkedList<>();
q.offer(1); q.poll();`
      },
      {
        title: "Generics",
        code: `class Box<T> {
    private T item;
    void set(T item) { this.item = item; }
    T get() { return item; }
}
Box<String> b = new Box<>();
b.set("hi");
<T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) > 0 ? a : b;
}`
      },
      {
        title: "Exceptions",
        code: `try {
    risky();
} catch (IOException | SQLException e) {
    e.printStackTrace();
} finally {
    cleanup();
}
// throw & throws
static void check(int x) throws IllegalArgumentException {
    if (x < 0) throw new IllegalArgumentException("neg");
}`
      },
      {
        title: "try-with-resources",
        code: `try (var br = new BufferedReader(
        new FileReader("f.txt"))) {
    String line = br.readLine();
} // auto-closed`
      },
      {
        title: "Lambda & Stream",
        code: `list.stream()
     .filter(x -> x > 0)
     .map(x -> x * 2)
     .sorted()
     .forEach(System.out::println);

list.stream().reduce(0, Integer::sum);
list.stream().collect(Collectors.toList());`
      },
      {
        title: "Optional",
        code: `Optional<String> opt = findUser();
opt.ifPresent(System.out::println);
String name = opt.orElse("unknown");
opt.map(String::toUpperCase).orElse("N/A");`
      },
      {
        title: "Enum",
        code: `enum Color { RED, GREEN, BLUE }
Color c = Color.RED;
switch (c) {
    case RED -> System.out.println("r");
}
Color.values();
Color.valueOf("RED");`
      },
      {
        title: "File I/O (NIO)",
        code: `import java.nio.file.*;
String text = Files.readString(Path.of("f.txt"));
Files.writeString(Path.of("out.txt"), "hi");
Files.lines(Path.of("f.txt"))
     .forEach(System.out::println);`
      },
      {
        title: "Threading",
        code: `Thread t = new Thread(() -> {
    System.out.println("running");
});
t.start();
t.join();

// Executor
var pool = Executors.newFixedThreadPool(4);
pool.submit(() -> doWork());
pool.shutdown();`
      },
      {
        title: "Date & Time",
        code: `import java.time.*;
LocalDate today = LocalDate.now();
LocalTime now = LocalTime.now();
LocalDateTime dt = LocalDateTime.now();
ZonedDateTime zdt = ZonedDateTime.now();
Duration d = Duration.ofMinutes(5);
Period p = Period.ofDays(7);`
      }
    ]
  },
  c: {
    name: "C",
    sections: [
      {
        title: "Hello World",
        code: `#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}`
      },
      {
        title: "Variables & Types",
        code: `int x = 10;
long big = 100000L;
unsigned int u = 42U;
float f = 3.14f;
double d = 3.14;
char c = 'A';
char str[] = "text";
const int MAX = 100;
size_t sz = sizeof(int);`
      },
      {
        title: "Format Specifiers",
        code: `printf("%d\\n", 42);      // int
printf("%u\\n", 42U);     // unsigned
printf("%ld\\n", 42L);    // long
printf("%f\\n", 3.14);    // double
printf("%.2f\\n", 3.14);  // 2 decimals
printf("%c\\n", 'A');     // char
printf("%s\\n", "hi");    // string
printf("%p\\n", &x);      // pointer
printf("%x\\n", 255);     // hex
printf("%zu\\n", sz);     // size_t
printf("|%5d|", 42);      // width`
      },
      {
        title: "Operators",
        code: `int a = 10, b = 3;
a + b; a - b; a * b;
a / b;  // 3 (integer div)
a % b;  // 1 (remainder)
a++; ++a; a--; --a;
a += 5; a &= 1;
a == b; a != b; a < b;
a && b; a || b; !a;
a & b;  a | b;  a ^ b;
a << 2; a >> 2; ~a;
int max = (a > b) ? a : b;`
      },
      {
        title: "Control Flow",
        code: `if (x > 0) { ... }
else if (x == 0) { ... }
else { ... }

switch (x) {
    case 1: ...; break;
    case 2: ...; break;
    default: ...;
}`
      },
      {
        title: "Loops",
        code: `for (int i = 0; i < n; i++) { ... }
while (cond) { ... }
do { ... } while (cond);

break;     // exit loop
continue;  // skip iteration
goto label; // (avoid)`
      },
      {
        title: "Input (scanf)",
        code: `int age;
char name[20];
scanf("%d", &age);           // & for address!
scanf("%19s", name);         // bounded %s
int n = scanf("%d %s", &age, name);
if (n != 2) { /* error */ }`
      },
      {
        title: "Functions",
        code: `int add(int a, int b) {
    return a + b;
}
void greet(void) {
    printf("Hi\\n");
}
// prototype (declaration)
int add(int, int);
int s = add(3, 4);`
      },
      {
        title: "Arrays",
        code: `int arr[5] = {1, 2, 3, 4, 5};
int zeros[10] = {0};
int matrix[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
int len = sizeof(arr)/sizeof(arr[0]);
arr[0] = 10;`
      },
      {
        title: "Strings (char arrays)",
        code: `char s[] = "Hello";
strlen(s);          // 5
char dst[20];
strcpy(dst, s);     // copy
strcat(dst, "!");   // concat
strcmp(s, "Hi");    // compare
strncpy(dst, s, 19);// safe copy
char *p = strchr(s, 'l'); // find char`
      },
      {
        title: "Pointers",
        code: `int x = 5;
int *p = &x;     // p holds address of x
*p = 10;         // dereference → x = 10
printf("%d", x); // 10
int **pp = &p;   // pointer to pointer
*pp;             // p
**pp;            // x (10)`
      },
      {
        title: "Pointer Arithmetic",
        code: `int arr[] = {10,20,30};
int *p = arr;
*p;        // 10
*(p + 1);  // 20
p[2];      // 30
p++;       // move to next element
int *end = arr + 3;
end - arr; // 3 (element count)`
      },
      {
        title: "Dynamic Memory",
        code: `#include <stdlib.h>
int *a = malloc(5 * sizeof(int));
int *b = calloc(5, sizeof(int)); // zeroed
b = realloc(b, 10 * sizeof(int));
free(a); free(b);  // ALWAYS free
// check for NULL
if (!a) { /* alloc failed */ }`
      },
      {
        title: "Structures",
        code: `struct Point {
    int x, y;
};
struct Point p = {3, 4};
p.x;  // 3
struct Point *pp = &p;
pp->y;  // 4 (arrow operator)
typedef struct { int x, y; } Pt;
Pt a = {1, 2};`
      },
      {
        title: "Unions & Enums",
        code: `union Data {
    int i;
    float f;
    char s[4];
}; // shares memory, one valid at a time

enum Color { RED, GREEN, BLUE };
enum Color c = GREEN; // c == 1
typedef enum { OFF, ON } State;`
      },
      {
        title: "Storage Classes",
        code: `int global = 5;        // file scope
void f(void) {
    auto int local = 1;  // default
    static int count = 0;// persists
    count++;
    extern int ext;      // defined elsewhere
    register int fast;   // hint to CPU reg
}`
      },
      {
        title: "Bitwise Ops",
        code: `int flags = 0;
flags |= (1 << 3);   // set bit 3
flags &= ~(1 << 3);  // clear bit 3
flags ^= (1 << 3);   // toggle bit 3
if (flags & (1 << 3)) // test bit 3
int x = 0xFF;
x & 0x0F;  // mask lower nibble
x >> 4;    // shift right`
      },
      {
        title: "Function Pointers",
        code: `int (*cmp)(int, int);
cmp = &add;     // or just add
int r = cmp(3, 4);
// qsort callback
qsort(arr, n, sizeof(int),
      (int(*)(const void*,const void*))mycmp);`
      },
      {
        title: "File I/O",
        code: `FILE *fp = fopen("f.txt", "r");
if (!fp) { perror("open"); return 1; }
char buf[256];
fgets(buf, sizeof(buf), fp);
fprintf(fp, "written\\n");
fread(buf, 1, 10, fp);   // binary
fclose(fp);              // always close`
      },
      {
        title: "Preprocessor",
        code: `#include <stdio.h>
#include "myheader.h"
#define MAX 100
#define SQ(x) ((x) * (x))
#ifdef DEBUG
    printf("debug\\n");
#endif
#ifndef GUARD
#define GUARD
// header content
#endif`
      },
      {
        title: "typedef & const",
        code: `typedef unsigned long ulong;
typedef int (*FnPtr)(int, int);
const int x = 5;      // read-only
const int *p;         // ptr to const int
int *const q = &x;    // const pointer
const int *const r;   // both const`
      },
      {
        title: "Command Line Args",
        code: `int main(int argc, char *argv[]) {
    for (int i = 0; i < argc; i++)
        printf("%s\\n", argv[i]);
    return 0;
}
// ./prog arg1 arg2
// argc=3, argv[0]="./prog"`
      },
      {
        title: "Error Handling",
        code: `#include <errno.h>
#include <string.h>
FILE *fp = fopen("x.txt", "r");
if (!fp) {
    perror("fopen");   // "fopen: No such file"
    // or: strerror(errno)
    exit(1);
}`
      },
      {
        title: "Compilation",
        code: `gcc main.c -o main        # basic
gcc -Wall -Wextra main.c   # warnings
gcc -g main.c -o main      # debug symbols
gcc -O2 main.c -o main     # optimize
gcc -c lib.c -o lib.o      # compile only
gcc main.o lib.o -o prog   # link`
      }
    ]
  },
  python: {
    name: "Python",
    sections: [
      {
        title: "Hello World",
        code: `print("Hello, World!")`
      },
      {
        title: "Variables & Types",
        code: `x = 10            # int
s = "text"        # str
f = 3.14          # float
b = True          # bool
lst = [1, 2, 3]
t = (1, 2)        # tuple
d = {"k": "v"}    # dict
st = {1, 2, 3}    # set`
      },
      {
        title: "Control Flow",
        code: `if x > 0:
    ...
elif x == 0:
    ...
else:
    ...

for i in range(n): ...
for item in lst: ...
while cond: ...

# comprehension
squares = [i*i for i in range(10) if i % 2 == 0]`
      },
      {
        title: "Function & Lambda",
        code: `def add(a, b=0):
    """Return a + b."""
    return a + b

add(3, 4)

double = lambda x: x * 2`
      },
      {
        title: "Dict & Set",
        code: `d = {"a": 1, "b": 2}
d.get("z", 0)        # 0 default
d["c"] = 3
del d["a"]

s = {1, 2, 3}
s.add(4)
s | {5}               # union
s & {2, 3}            # intersection`
      },
      {
        title: "File I/O",
        code: `with open("file.txt") as f:
    text = f.read()

with open("out.txt", "w") as f:
    f.write("hello")`
      }
    ]
  },
  cpp: {
    name: "C++",
    sections: [
      {
        title: "Hello World",
        code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`
      },
      {
        title: "STL Containers",
        code: `vector<int> v = {1, 2, 3};
v.push_back(4);

map<string, int> m;
m["a"] = 1;

set<int> s;
s.insert(5);

string str = "hello";
str.length();`
      },
      {
        title: "Range-for & Auto",
        code: `for (int x : v) cout << x;
for (auto& [k, val] : m) cout << k;
auto y = 42;          // type deduced`
      },
      {
        title: "Function & Lambda",
        code: `int add(int a, int b) { return a + b; }

auto sq = [](int x) { return x * x; };
sq(5);                // 25`
      },
      {
        title: "Class",
        code: `class Point {
    int x, y;
public:
    Point(int x, int y) : x(x), y(y) {}
    int sum() const { return x + y; }
};
Point p(3, 4);
p.sum();              // 7`
      },
      {
        title: "Smart Pointers",
        code: `#include <memory>
auto sp = make_shared<int>(42);
auto up = make_unique<int>(42);
// freed automatically — no delete needed`
      }
    ]
  },
  dsa: {
    name: "DSA — Complexity & Patterns",
    sections: [
      {
        title: "Complexity Classes",
        code: `Class        Name          n=10      n=100      n=1000
─────────────────────────────────────────────────
O(1)        constant      1         1          1
O(log n)    logarithmic   3         7          10
O(n)        linear        10        100        1K
O(n log n)  linearithmic  33        664        10K
O(n^2)      quadratic     100       10K        1M
O(n^3)      cubic         1K        1M         1B
O(2^n)      exponential   1K        10^30      heat death
O(n!)       factorial     3.6M      10^158     universe ends

  Rule: drop constants & lower-order terms.
  3n + 5  ->  O(n)
  n^2 + n  ->  O(n^2)`
      },
      {
        title: "Loop -> Big O Cheat Codes",
        code: `# Single loop                     -> O(n)
for i in range(n): ...

# Two nested loops                 -> O(n^2)
for i in range(n):
    for j in range(n): ...

# k nested loops                   -> O(n^k)
for i: for j: for k: ...           # O(n^3)

# Loop halving each step           -> O(log n)
while n > 0: n //= 2

# Loop + halving inside            -> O(n log n)
for i in range(n):
    while m > 0: m //= 2

# Sorting call                     -> O(n log n)
arr.sort()

# Hash map loop (n lookups)        -> O(n)
for x in arr: seen[x] = True

# Recursion, one branch            -> O(n)
def f(n): return f(n-1)

# Recursion, two branches          -> O(2^n)
def f(n): return f(n-1) + f(n-2)

# Recursion, halving                -> O(n log n) or O(log n)
def f(n): return f(n//2) + f(n//2)  # O(n)`
      },
      {
        title: "Input Size -> Target Complexity",
        code: `Constraint      Max Target        Patterns to try
──────────────────────────────────────────────────
n <= 10          O(n!) / O(2^n)    Backtracking, brute force
n <= 20          O(2^n)            Bitmask DP, backtracking
n <= 100         O(n^3)            Floyd-Warshall, 3-loop DP
n <= 500         O(n^2)            2D DP, nested loops
n <= 10^4        O(n^2)            Nested loops, 2D DP
n <= 10^5        O(n log n)        Sort + sweep, heap, merge
n <= 10^6        O(n)              Hash map, two pointers, sliding
n <= 10^9        O(log n) / O(1)   Binary search, math, bit trick

  Golden rule: read the constraint, pick the
  complexity class that fits, then find the
  pattern that delivers it.`
      },
      {
        title: "Pattern -> When to Use",
        code: `Pattern            Signal                        Complexity
──────────────────────────────────────────────────────────
Two Pointers       sorted + find pair            O(n)
Sliding Window     contiguous subarray/substr   O(n)
Prefix Sum         range sum queries             O(n) pre
Binary Search      sorted + search / monotonic   O(log n)
Hash Map           O(1) lookup, pairs, counting  O(n)
Monotonic Stack    next greater/smaller          O(n)
BFS                shortest path unweighted      O(V+E)
DFS                connectivity, cycles         O(V+E)
Dijkstra           shortest path weighted       O(E log V)
Topological Sort   DAG, dependencies             O(V+E)
Union-Find         components, cycle detect      O(a(n))
DP                 optimal substructure +        O(states)
                   overlapping subproblems
Backtracking       all combos/permutations      O(2^n) / O(n!)
Greedy            local opt = global opt         O(n log n)
Trie               prefix matching              O(L)
Segment Tree       range query + point update    O(log n)
Heap               k-th / top-K element          O(n log k)`
      },
      {
        title: "Space Complexity Quick Ref",
        code: `Structure / Pattern           Space
──────────────────────────────────────
No extra data, no recursion    O(1)
Hash map / set of size n       O(n)
Auxiliary array (dp[], buf)    O(n)
Recursion depth d              O(d)
2D DP table (n x m)            O(n*m)
Memoization cache              O(states)
Segment tree array             O(4n)
Trie (total chars)             O(total length)

  Space = extra data structures
         + recursion stack depth.
  Optimize: rolling array, in-place
  mutation, iterative DFS.`
      },
      {
        title: "Recursion -> Master Theorem",
        code: `T(n) = a * T(n/b) + O(n^d)

  a  = # of recursive calls
  b  = input shrink factor
  d  = work per call exponent

Cases:
  a < b^d   ->  O(n^d)
  a = b^d   ->  O(n^d  log n)
  a > b^d   ->  O(n^(log_b a))

Examples:
  Merge sort:  a=2, b=2, d=1 -> O(n log n)
  Binary search: a=1, b=2, d=0 -> O(log n)
  Strassen:  a=7, b=2, d=2  -> O(n^2.81)
  Naive fib: a=2, b=1, d=0  -> O(2^n)`
      }
    ]
  },
  javascript: {
    name: "JavaScript",
    sections: [
      {
        title: "Hello World",
        code: `console.log("Hello, World!");`
      },
      {
        title: "Variables",
        code: `let x = 10;          // reassignable
const y = 20;        // cannot reassign
var old = 30;        // function-scoped (avoid)
let s = \`x is \${x}\`; // template literal`
      },
      {
        title: "Functions",
        code: `function add(a, b) { return a + b; }
const sq = (x) => x * x;
const greet = (name = "world") => \`Hi, \${name}\`;`
      },
      {
        title: "Arrays",
        code: `const a = [1, 2, 3];
a.map(x => x * 2);        // [2, 4, 6]
a.filter(x => x > 1);     // [2, 3]
a.reduce((s, x) => s + x, 0); // 6
[...a, 4];                // spread -> [1,2,3,4]`
      },
      {
        title: "Objects & Destructure",
        code: `const obj = { name: "Ada", age: 30 };
const { name, age } = obj;
const { name: who } = obj;  // rename
const merged = { ...obj, role: "dev" };`
      },
      {
        title: "Async / Await",
        code: `async function getData() {
  const res = await fetch("/api");
  const data = await res.json();
  return data;
}`
      }
    ]
  }
};