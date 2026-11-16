// C topics part 2: String Functions through Header Files (topics 14-28)
export default [
  {
    id: "string-functions",
    title: "String Handling Functions",
    difficulty: "medium",
    definition: "The <string.h> library provides functions for string operations: strlen (length), strcpy/strncpy (copy), strcat/strncat (concatenate), strcmp/strncmp (compare), and strchr/strstr (search). The 'n' variants take a length limit to prevent buffer overflows — always prefer them.",
    coreUnderstanding: "The <string.h> functions are the workhorses of C string manipulation. They all rely on the null terminator to find the end of a string. The dangerous ones (strcpy, strcat, strcmp) have NO bounds checking — if the destination buffer is too small, you get a buffer overflow. The 'n' variants (strncpy, strncat, strncmp) take a length limit, making them safer. However, strncpy has a quirk: if the source is longer than the limit, it does NOT add a null terminator. Always prefer the 'n' variants and manually ensure null termination.",
    howItWorks: "1. `strlen(s)` — returns length without null terminator. O(n) — it scans for '\\0'.\n2. `strcpy(dest, src)` — copies src to dest. No bounds checking. dest must be large enough.\n3. `strncpy(dest, src, n)` — copies at most n chars. If src < n, pads with '\\0'. If src >= n, NO null terminator added.\n4. `strcat(dest, src)` — appends src to dest. No bounds checking.\n5. `strncat(dest, src, n)` — appends at most n chars. Always adds a null terminator (unlike strncpy).\n6. `strcmp(s1, s2)` — compares. Returns 0 if equal, <0 if s1<s2, >0 if s1>s2.\n7. `strncmp(s1, s2, n)` — compares at most n chars.\n8. `strchr(s, c)` — finds first occurrence of char c. `strstr(s, sub)` — finds first occurrence of substring sub.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char src[] = \"Hello, World!\";\n    char dest[20];\n\n    // strlen — length without null terminator\n    printf(\"len = %zu\\n\", strlen(src));  // 13\n\n    // strcpy vs strncpy\n    strncpy(dest, src, sizeof(dest) - 1);\n    dest[sizeof(dest) - 1] = '\\0';  // ensure null termination\n    printf(\"dest = %s\\n\", dest);\n\n    // strcmp — comparison\n    printf(\"strcmp = %d\\n\", strcmp(\"abc\", \"abc\"));  // 0 (equal)\n    printf(\"strcmp = %d\\n\", strcmp(\"abc\", \"abd\"));  // <0 (abc < abd)\n\n    // strchr — find character\n    char* comma = strchr(src, ',');\n    if (comma) {\n        printf(\"Found comma at index %zu\\n\", comma - src);  // 5\n    }\n\n    // strstr — find substring\n    char* world = strstr(src, \"World\");\n    if (world) {\n        printf(\"Found 'World' at index %zu\\n\", world - src);  // 7\n    }\n    return 0;\n}",
        output: "len = 13\ndest = Hello, World!\nstrcmp = 0\nstrcmp = -1\nFound comma at index 5\nFound 'World' at index 7",
        note: "strncpy does NOT add a null terminator if the source is longer than the limit. Always manually null-terminate after strncpy."
      }
    ],
    marginNotes: [
      "strncpy does NOT add a null terminator if src >= n. Always manually null-terminate: `dest[n-1] = '\\0'`.",
      "strncat DOES add a null terminator (unlike strncpy). But it writes at most n chars from src, plus the '\\0'.",
      "strcmp returns 0 for equal — don't confuse this with 'false'. `if (strcmp(a,b))` is true when they're NOT equal.",
      "strchr/strstr return a pointer to the match, or NULL if not found. The index is `ptr - original_string`."
    ],
    commonMistakes: [
      "Using strcpy without checking buffer size — buffer overflow. Use strncpy with a limit and manual null termination.",
      "Forgetting that strncpy doesn't null-terminate when src >= n — always add `dest[n-1] = '\\0'`.",
      "Confusing strcmp's return: 0 means equal, not 'false'. `if (!strcmp(a,b))` means 'if equal'."
    ],
    relatedTopics: ["Strings & Character Arrays", "Pointers: The Fundamentals", "File Handling"],
    externalLinks: [
      { label: "cppreference: string.h", url: "https://en.cppreference.com/w/c/string/byte" },
      { label: "C String Functions — GeeksforGeeks", url: "https://www.geeksforgeeks.org/string-functions-in-c/" }
    ],
    mcqs: [
      {
        question: "What does strncpy NOT do when the source is longer than the limit n?",
        options: ["It truncates", "It does NOT add a null terminator", "It crashes", "It adds extra padding"],
        answer: 1,
        explanations: ["It does truncate.", "Correct — strncpy copies at most n chars but doesn't add '\\0' if src >= n. Always manually null-terminate.", "It doesn't crash.", "It doesn't add padding in this case."],
        difficulty: "medium"
      },
      {
        question: "What does strcmp return when two strings are equal?",
        options: ["1", "0", "-1", "true"],
        answer: 1,
        explanations: ["Not 1.", "Correct — strcmp returns 0 for equal. This is confusing because 0 is 'false' in conditions. Use `if (strcmp(a,b) == 0)` for equality.", "Not -1.", "Not a boolean."],
        difficulty: "medium"
      },
      {
        question: "What does strchr return if the character is not found?",
        options: ["-1", "0", "NULL", "The string length"],
        answer: 2,
        explanations: ["Not -1.", "Not 0 (0 is NULL, but the answer is NULL specifically).", "Correct — strchr returns NULL if the character is not found. Always check before using the result.", "Not the length."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "pointers-basics",
    title: "Pointers: The Fundamentals",
    difficulty: "medium",
    definition: "A pointer is a variable that stores the memory address of another variable. The & operator gets an address; the * operator dereferences a pointer to read or write the value at that address. Pointers are C's most powerful and most dangerous feature — they enable direct memory manipulation, dynamic allocation, and efficient parameter passing.",
    coreUnderstanding: "Pointers are the heart of C. A pointer is a variable that holds a memory address. The & operator (address-of) gets the address of a variable: `&x` gives the address where x is stored. The * operator (dereference) reads or writes the value at an address: `*p` gives the value stored at the address p holds. Pointers enable: (1) passing large data without copying (pass a pointer), (2) dynamic memory allocation (malloc returns a pointer), (3) implementing data structures (linked lists, trees), (4) direct hardware access (embedded systems). They're also the #1 source of bugs: dereferencing a null or invalid pointer crashes the program.",
    howItWorks: "1. Declaration: `int *p;` — p is a pointer to int. The type tells the compiler what type of data the pointer points to.\n2. Address-of: `int x = 5; p = &x;` — p now holds the address of x.\n3. Dereference: `*p` reads the value at the address (5). `*p = 10` writes 10 to that address (x becomes 10).\n4. NULL: a pointer that points to nothing. Dereferencing NULL is undefined behavior (crash).\n5. Pointer size: on 64-bit systems, pointers are 8 bytes. On 32-bit, 4 bytes. `sizeof(int*)` gives the size.\n6. `int *p, *q;` — both are pointers. `int *p, q;` — p is a pointer, q is an int (the * doesn't carry over).",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\nint main(void) {\n    int x = 5;\n    int *p = &x;  // p holds the address of x\n\n    printf(\"x = %d\\n\", x);        // 5\n    printf(\"&x = %p\\n\", &x);      // address of x\n    printf(\"p = %p\\n\", p);        // same address\n    printf(\"*p = %d\\n\", *p);      // 5 (dereference)\n\n    // Modify x through the pointer\n    *p = 100;\n    printf(\"x = %d\\n\", x);      // 100 — x changed!\n\n    // NULL pointer — dereferencing is undefined behavior\n    int *null_ptr = NULL;\n    // *null_ptr = 5;  // CRASH: segmentation fault\n    if (null_ptr != NULL) {\n        *null_ptr = 5;  // safe — but null_ptr is NULL so this won't run\n    }\n    return 0;\n}",
        output: "x = 5\n&x = 0x7ffd12345678\np = 0x7ffd12345678\n*p = 5\nx = 100",
        note: "Dereferencing a NULL or invalid pointer is undefined behavior — usually a segmentation fault crash. Always check pointers before dereferencing."
      }
    ],
    marginNotes: [
      "& (address-of) and * (dereference) are inverse operations: `*(&x)` == x, `&(*p)` == p.",
      "Dereferencing NULL is undefined behavior — usually a segmentation fault. Always check `if (p != NULL)` before dereferencing.",
      "Pointer size depends on the architecture: 8 bytes on 64-bit, 4 bytes on 32-bit. `sizeof(int*)` gives the size.",
      "`int *p, q;` — only p is a pointer. q is an int. The * doesn't carry over. Write `int *p, *q;` for two pointers."
    ],
    commonMistakes: [
      "Dereferencing an uninitialized pointer — it contains a garbage address, causing a crash or memory corruption.",
      "Dereferencing NULL — segmentation fault. Always check `if (p != NULL)` before dereferencing.",
      "Confusing `int *p, q;` — only p is a pointer. q is an int. The * doesn't carry over to q."
    ],
    relatedTopics: ["Pointer Arithmetic", "Pointers and Arrays", "Dynamic Memory Allocation"],
    externalLinks: [
      { label: "cppreference: Pointers", url: "https://en.cppreference.com/w/c/language/pointer" },
      { label: "C Pointers — GeeksforGeeks", url: "https://www.geeksforgeeks.org/c-pointers/" }
    ],
    mcqs: [
      {
        question: "What does the & operator do?",
        options: ["Dereferences a pointer", "Gets the address of a variable", "Multiplies two values", "Logical AND"],
        answer: 1,
        explanations: ["That's *.", "Correct — & (address-of) returns the memory address of a variable.", "Not multiplication.", "That's &&."],
        difficulty: "easy"
      },
      {
        question: "What does dereferencing a NULL pointer cause?",
        options: ["Nothing", "Undefined behavior — usually a segmentation fault", "It returns 0", "A compile error"],
        answer: 1,
        explanations: ["It's not safe.", "Correct — dereferencing NULL is undefined behavior. On most systems, it causes a segmentation fault crash.", "It doesn't return 0.", "It compiles fine."],
        difficulty: "easy"
      },
      {
        question: "In `int *p, q;`, what is q?",
        options: ["A pointer to int", "An int (not a pointer)", "A double", "A compile error"],
        answer: 1,
        explanations: ["Only p is a pointer.", "Correct — the * only applies to p. q is a regular int. Write `int *p, *q;` for two pointers.", "Not a double.", "Valid syntax."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "pointer-arithmetic",
    title: "Pointer Arithmetic",
    difficulty: "medium",
    definition: "You can add or subtract integers from pointers, and the pointer moves by that many elements (not bytes) — the compiler scales by the pointed-to type's size. Subtracting two pointers of the same type gives the number of elements between them. Pointer arithmetic is only defined within a single array (or one past the end).",
    coreUnderstanding: "Pointer arithmetic is one of C's most distinctive features. When you add 1 to a pointer, it doesn't move 1 byte — it moves 1 element (sizeof(type) bytes). So `int *p; p + 1` moves 4 bytes (on a system where int is 4 bytes). This is why `arr[i]` and `*(arr + i)` are identical. Pointer arithmetic is only defined within a single array (or one past the end) — going beyond is undefined behavior. You can subtract two pointers of the same type to get the number of elements between them (ptrdiff_t).",
    howItWorks: "1. `p + n` — moves the pointer forward by n elements (n * sizeof(type) bytes). `int *p; p + 1` moves 4 bytes.\n2. `p - n` — moves backward by n elements.\n3. `p++` / `p--` — moves forward/backward by 1 element. Common for iterating arrays.\n4. `p2 - p1` — gives the number of elements between p1 and p2 (ptrdiff_t). Both must point into the same array.\n5. `p1 < p2` — compares addresses. Useful for loop bounds: `for (p = arr; p < arr + n; p++)`.\n6. Only defined within a single array (or one past the end). Arithmetic on unrelated pointers is undefined behavior.\n7. `void*` pointers can't do arithmetic — the compiler doesn't know the element size.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\nint main(void) {\n    int arr[] = {10, 20, 30, 40, 50};\n    int *p = arr;  // points to arr[0]\n\n    // p + n moves by n elements, not n bytes\n    printf(\"*p = %d\\n\", *p);        // 10\n    printf(\"*(p+1) = %d\\n\", *(p+1)); // 20 (moved 4 bytes)\n    printf(\"*(p+2) = %d\\n\", *(p+2)); // 30\n\n    // p++ moves to the next element\n    p++;\n    printf(\"*p = %d\\n\", *p);  // 20\n\n    // Pointer subtraction — elements between\n    int *q = &arr[4];\n    printf(\"q - p = %td\\n\", q - p);  // 3 (elements between)\n\n    // Iterating with pointer arithmetic\n    for (int *ptr = arr; ptr < arr + 5; ptr++) {\n        printf(\"%d \", *ptr);  // 20 30 40 50 (p is at arr[1])\n    }\n    printf(\"\\n\");\n    return 0;\n}",
        output: "*p = 10\n*(p+1) = 20\n*(p+2) = 30\n*p = 20\nq - p = 3\n20 30 40 50 ",
        note: "Pointer arithmetic moves by elements, not bytes. p + 1 on an int* moves 4 bytes (sizeof(int))."
      }
    ],
    marginNotes: [
      "Pointer arithmetic moves by ELEMENTS, not bytes. `p + 1` on an int* moves sizeof(int) bytes forward.",
      "Pointer arithmetic is only defined within a single array (or one past the end). Going beyond is undefined behavior.",
      "`void*` pointers can't do arithmetic — the compiler doesn't know the element size. Cast to a typed pointer first.",
      "Subtracting two pointers gives the number of elements between them (ptrdiff_t), not bytes. Both must point into the same array."
    ],
    commonMistakes: [
      "Assuming `p + 1` moves 1 byte — it moves sizeof(type) bytes. `int *p; p + 1` moves 4 bytes.",
      "Doing pointer arithmetic on unrelated pointers — undefined behavior. Both pointers must be in the same array.",
      "Using arithmetic on void* pointers — the compiler doesn't know the element size. Cast to a typed pointer first."
    ],
    relatedTopics: ["Pointers: The Fundamentals", "Pointers and Arrays", "One-Dimensional Arrays"],
    externalLinks: [
      { label: "cppreference: Pointer Arithmetic", url: "https://en.cppreference.com/w/c/language/pointer#Pointer_arithmetic" },
      { label: "C Pointer Arithmetic — GeeksforGeeks", url: "https://www.geeksforgeeks.org/pointer-arithmetic-in-c/" }
    ],
    mcqs: [
      {
        question: "If `int *p` points to address 1000, what is `p + 1`?",
        options: ["1001", "1004 (sizeof(int) = 4)", "1000", "Depends on the compiler"],
        answer: 1,
        explanations: ["That would be byte arithmetic.", "Correct — pointer arithmetic moves by elements. p + 1 moves sizeof(int) = 4 bytes forward.", "It moves forward.", "It's deterministic: sizeof(int) bytes."],
        difficulty: "medium"
      },
      {
        question: "What does subtracting two pointers give you?",
        options: ["The difference in bytes", "The number of elements between them", "A pointer", "Nothing useful"],
        answer: 1,
        explanations: ["Not bytes — elements.", "Correct — p2 - p1 gives the number of elements between them (ptrdiff_t). Both must be in the same array.", "Not a pointer.", "It's useful for computing array offsets."],
        difficulty: "medium"
      },
      {
        question: "Can you do arithmetic on a void* pointer?",
        options: ["Yes, it moves 1 byte", "No — the compiler doesn't know the element size", "Yes, it moves 4 bytes", "Only in C++"],
        answer: 1,
        explanations: ["void* arithmetic is not defined in C.", "Correct — the compiler doesn't know the element size for void*, so arithmetic is not allowed. Cast to a typed pointer first.", "Not 1 byte.", "Not in C++ either (as standard)."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "pointers-and-arrays",
    title: "Pointers and Arrays",
    difficulty: "medium",
    definition: "In C, the name of an array decays into a pointer to its first element in most contexts. This means array[i] and *(array + i) are identical. You can pass arrays to functions as pointers, which is why functions receiving arrays also receive the size separately — the array length is lost.",
    coreUnderstanding: "The relationship between pointers and arrays is one of C's most important concepts. In most expressions, an array name 'decays' into a pointer to its first element. This means `arr` and `&arr[0]` are the same, and `arr[i]` is identical to `*(arr + i)`. You can use pointer arithmetic on array names, and you can use array indexing on pointers. The key consequence: when you pass an array to a function, it decays to a pointer — the function doesn't know the array's length. That's why you always pass the size as a separate parameter.",
    howItWorks: "1. Array name decays: `arr` in most expressions becomes `&arr[0]` (pointer to first element).\n2. `arr[i]` == `*(arr + i)` — array indexing IS pointer arithmetic. They're identical.\n3. `&arr` is different from `arr` — `&arr` is a pointer to the whole array (type: `int (*)[5]`), `arr` is a pointer to the first element.\n4. Passing to functions: `void f(int arr[])` is the same as `void f(int *arr)` — the array decays to a pointer.\n5. The function doesn't know the array length — `sizeof(arr)` inside the function gives the pointer size, not the array size.\n6. Always pass the size: `void f(int *arr, int size)` — the caller must provide the length.\n7. Exceptions to decay: `sizeof(arr)`, `&arr`, and string literal initialization don't decay.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\n// arr decays to a pointer — size is lost\nvoid print_array(int *arr, int size) {\n    printf(\"sizeof(arr) in function = %zu\\n\", sizeof(arr));  // 8 (pointer size)\n    for (int i = 0; i < size; i++) {\n        printf(\"%d \", arr[i]);  // or *(arr + i)\n    }\n    printf(\"\\n\");\n}\n\nint main(void) {\n    int arr[] = {1, 2, 3, 4, 5};\n    int size = sizeof(arr) / sizeof(arr[0]);\n\n    printf(\"sizeof(arr) in main = %zu\\n\", sizeof(arr));  // 20 (5 * 4)\n\n    // arr[i] and *(arr + i) are identical\n    printf(\"arr[2] = %d, *(arr+2) = %d\\n\", arr[2], *(arr + 2));  // 3, 3\n\n    // Pass to function — array decays to pointer\n    print_array(arr, size);\n    // sizeof(arr) in function = 8 (pointer, not array)\n    // 1 2 3 4 5\n    return 0;\n}",
        output: "sizeof(arr) in main = 20\narr[2] = 3, *(arr+2) = 3\nsizeof(arr) in function = 8\n1 2 3 4 5 ",
        note: "When an array is passed to a function, it decays to a pointer. sizeof(arr) inside the function gives the pointer size, not the array size."
      }
    ],
    marginNotes: [
      "`arr[i]` and `*(arr + i)` are identical — array indexing IS pointer arithmetic. The compiler converts one to the other.",
      "When you pass an array to a function, it decays to a pointer. The function doesn't know the length — always pass the size separately.",
      "`sizeof(arr)` only gives the array byte size when arr is the actual array variable, not a pointer. Inside a function, it gives the pointer size.",
      "`&arr` is a pointer to the whole array (type `int (*)[5]`), while `arr` is a pointer to the first element (type `int*`). They have the same address but different types."
    ],
    commonMistakes: [
      "Using `sizeof(arr)` inside a function to get the array length — it gives the pointer size (8 on 64-bit), not the array size.",
      "Forgetting to pass the array size to functions — the function can't determine it from the pointer alone.",
      "Confusing `&arr` (pointer to the whole array) with `arr` (pointer to the first element) — same address, different types."
    ],
    relatedTopics: ["Pointers: The Fundamentals", "Pointer Arithmetic", "One-Dimensional Arrays"],
    externalLinks: [
      { label: "cppreference: Arrays and Pointers", url: "https://en.cppreference.com/w/c/language/array#Array_to_pointer_conversion" },
      { label: "C Pointers and Arrays — GeeksforGeeks", url: "https://www.geeksforgeeks.org/difference-between-array-and-pointer/" }
    ],
    mcqs: [
      {
        question: "What is the relationship between `arr[i]` and `*(arr + i)`?",
        options: ["They're different", "They're identical — array indexing is pointer arithmetic", "arr[i] is faster", "*(arr+i) is faster"],
        answer: 1,
        explanations: ["They're the same.", "Correct — arr[i] is defined as *(arr + i). They compile to the same machine code.", "Same speed.", "Same speed."],
        difficulty: "easy"
      },
      {
        question: "What happens when you pass an array to a function?",
        options: ["The whole array is copied", "It decays to a pointer — the length is lost", "It's passed by reference", "A compile error"],
        answer: 1,
        explanations: ["Arrays are not copied.", "Correct — the array decays to a pointer. The function doesn't know the length, so you must pass the size separately.", "It's a pointer, which is similar but not the same concept.", "Valid syntax."],
        difficulty: "medium"
      },
      {
        question: "What does `sizeof(arr)` give inside a function that received `int arr[]`?",
        options: ["The array byte size", "The pointer size (e.g., 8 on 64-bit)", "The number of elements", "A compile error"],
        answer: 1,
        explanations: ["Only in the original scope.", "Correct — inside the function, arr is a pointer, so sizeof gives the pointer size (8 on 64-bit), not the array size.", "Not the element count.", "Valid syntax."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "pointers-to-pointers",
    title: "Pointers to Pointers",
    difficulty: "medium",
    definition: "A pointer to a pointer (type**) stores the address of another pointer. This is used for arrays of strings, dynamic 2D arrays, and modifying a pointer passed to a function (so the caller's pointer changes). Each level of indirection adds one * in the declaration.",
    coreUnderstanding: "A pointer to a pointer is exactly what it sounds like: a variable that stores the address of another pointer. `int **pp` — pp holds the address of an `int*`, which holds the address of an `int`. This is used for: (1) arrays of strings (char** is an array of char*), (2) dynamic 2D arrays (int** where each row is a separate allocation), (3) modifying a pointer passed to a function — if you want a function to change where the caller's pointer points, you pass a pointer to that pointer. Each level of indirection adds one * in the declaration and one * in the dereference.",
    howItWorks: "1. Declaration: `int **pp;` — pp is a pointer to a pointer to int.\n2. `int x = 5; int *p = &x; int **pp = &p;` — pp points to p, which points to x.\n3. `*pp` gives p (the pointer). `**pp` gives x (the value). `***pp` would be invalid (too many levels).\n4. Arrays of strings: `char *strings[] = {\"hello\", \"world\"};` — strings is a `char**`.\n5. Dynamic 2D arrays: `int **grid = malloc(rows * sizeof(int*));` — each grid[i] is a separate `int*`.\n6. Modifying a caller's pointer: `void alloc(int **pp) { *pp = malloc(100); }` — caller: `int *p; alloc(&p);`.\n7. Command-line args: `int main(int argc, char **argv)` — argv is an array of string pointers.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n#include <stdlib.h>\n\n// Modify the caller's pointer — needs pointer to pointer\nvoid allocate(int **pp, int size) {\n    *pp = malloc(size * sizeof(int));  // changes the caller's pointer\n    if (*pp) {\n        for (int i = 0; i < size; i++)\n            (*pp)[i] = i * 10;\n    }\n}\n\nint main(void) {\n    // Basic pointer to pointer\n    int x = 42;\n    int *p = &x;\n    int **pp = &p;\n\n    printf(\"x = %d\\n\", x);      // 42\n    printf(\"*p = %d\\n\", *p);     // 42\n    printf(\"**pp = %d\\n\", **pp); // 42\n\n    // Modify x through pp\n    **pp = 100;\n    printf(\"x = %d\\n\", x);      // 100\n\n    // Allocate through a function\n    int *arr = NULL;\n    allocate(&arr, 5);  // pass address of pointer\n    if (arr) {\n        for (int i = 0; i < 5; i++)\n            printf(\"%d \", arr[i]);  // 0 10 20 30 40\n        printf(\"\\n\");\n        free(arr);\n    }\n    return 0;\n}",
        output: "x = 42\n*p = 42\n**pp = 42\nx = 100\n0 10 20 30 40 ",
        note: "To modify a caller's pointer from a function, pass a pointer to that pointer: `void f(int **pp)` and call `f(&p)`."
      }
    ],
    marginNotes: [
      "To modify a caller's pointer from a function, pass a pointer to that pointer: `void f(int **pp)` and call `f(&p)`.",
      "char** is commonly used for arrays of strings: `char *strings[] = {\"hello\", \"world\"}` — strings is a char**.",
      "Dynamic 2D arrays use int**: `int **grid = malloc(rows * sizeof(int*));` — each row is a separate allocation.",
      "Command-line args use char**: `int main(int argc, char **argv)` — argv is an array of string pointers."
    ],
    commonMistakes: [
      "Trying to modify a caller's pointer by passing the pointer itself — C passes by value, so the function gets a copy. Pass a pointer to the pointer.",
      "Confusing the levels of dereference: `*pp` gives the pointer, `**pp` gives the value. One * per level.",
      "Forgetting to free each row of a dynamic 2D array before freeing the row pointer array."
    ],
    relatedTopics: ["Pointers: The Fundamentals", "Dynamic Memory Allocation", "Command Line Arguments"],
    externalLinks: [
      { label: "cppreference: Pointer to Pointer", url: "https://en.cppreference.com/w/c/language/pointer#Pointers_to_pointers" },
      { label: "C Pointer to Pointer — GeeksforGeeks", url: "https://www.geeksforgeeks.org/c-pointer-to-pointer/" }
    ],
    mcqs: [
      {
        question: "What does `int **pp` declare?",
        options: ["A pointer to int", "A pointer to a pointer to int", "An array of ints", "A two-dimensional int"],
        answer: 1,
        explanations: ["That's int*.", "Correct — int** is a pointer to a pointer to int. It stores the address of an int*.", "Not an array.", "Not a 2D int."],
        difficulty: "medium"
      },
      {
        question: "How do you modify a caller's pointer from a function?",
        options: ["Pass the pointer directly", "Pass a pointer to the pointer: f(int **pp), call f(&p)", "Use a global variable", "You can't"],
        answer: 1,
        explanations: ["C passes by value — the function gets a copy.", "Correct — pass a pointer to the pointer so the function can modify the original pointer's value.", "Globals work but are bad practice.", "You can, via pointer-to-pointer."],
        difficulty: "medium"
      },
      {
        question: "What is `char **argv` in main?",
        options: ["A single string", "An array of string pointers", "A character", "A 2D char array"],
        answer: 1,
        explanations: ["Not a single string.", "Correct — argv is an array of pointers to char (strings). Each argv[i] is a command-line argument string.", "Not a single char.", "It's an array of pointers, not a 2D array."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "dynamic-memory",
    title: "Dynamic Memory Allocation",
    difficulty: "medium",
    definition: "malloc, calloc, realloc, and free (from <stdlib.h>) let you request memory at runtime from the heap. malloc returns uninitialized bytes; calloc zeros them; realloc resizes an existing block. Every allocation MUST be matched by a free — failing to do so leaks memory; freeing twice or using freed memory causes undefined behavior.",
    coreUnderstanding: "Dynamic memory allocation is how C programs get memory at runtime. The stack (local variables) is fixed and automatic; the heap (malloc/calloc) is flexible and manual. malloc returns a pointer to uninitialized memory; calloc returns zeroed memory; realloc resizes an existing block (may move it). The critical rule: every malloc/calloc MUST be matched by exactly one free. Forgetting to free causes memory leaks (the program slowly consumes memory). Freeing twice (double free) or using memory after freeing (use-after-free) causes undefined behavior — crashes, corruption, security holes.",
    howItWorks: "1. `malloc(size)` — allocates `size` bytes, returns void* (cast to your type). Memory is UNINITIALIZED (garbage).\n2. `calloc(count, size)` — allocates count*size bytes, all ZEROED. Slower than malloc but safer.\n3. `realloc(ptr, new_size)` — resizes the block. May move the data to a new location. Returns the new pointer.\n4. `free(ptr)` — releases the memory back to the heap. ptr must be from malloc/calloc/realloc.\n5. Always check for NULL: `int *p = malloc(100 * sizeof(int)); if (!p) { /* error */ }`.\n6. After free, set the pointer to NULL: `free(p); p = NULL;` — prevents use-after-free and double-free.\n7. Memory leaks: if you lose the pointer (overwrite it without freeing), the memory is leaked — it can't be freed.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    // malloc — uninitialized memory\n    int *arr = malloc(5 * sizeof(int));\n    if (!arr) {\n        fprintf(stderr, \"malloc failed\\n\");\n        return 1;\n    }\n    for (int i = 0; i < 5; i++) arr[i] = i * 10;\n    printf(\"malloc: %d %d %d\\n\", arr[0], arr[1], arr[4]);  // 0 10 40\n\n    // calloc — zeroed memory\n    int *zeroed = calloc(5, sizeof(int));\n    printf(\"calloc: %d %d %d\\n\", zeroed[0], zeroed[1], zeroed[4]);  // 0 0 0\n\n    // realloc — resize\n    arr = realloc(arr, 10 * sizeof(int));  // grow to 10 elements\n    if (!arr) { /* handle error */ }\n    for (int i = 5; i < 10; i++) arr[i] = i * 10;\n    printf(\"realloc: %d %d\\n\", arr[5], arr[9]);  // 50 90\n\n    // Free and NULL\n    free(arr);\n    arr = NULL;  // prevent use-after-free\n    free(zeroed);\n    zeroed = NULL;\n    return 0;\n}",
        output: "malloc: 0 10 40\ncalloc: 0 0 0\nrealloc: 50 90",
        note: "Every malloc/calloc MUST be matched by exactly one free. After free, set the pointer to NULL to prevent use-after-free."
      }
    ],
    marginNotes: [
      "Every malloc/calloc MUST be matched by exactly one free. Forgetting causes memory leaks; freeing twice causes undefined behavior.",
      "malloc returns UNINITIALIZED memory (garbage). calloc returns ZEROED memory. Use calloc when you need zeroed data.",
      "After free, set the pointer to NULL: `free(p); p = NULL;` — this prevents use-after-free and double-free bugs.",
      "realloc may move the block to a new location. Always use the returned pointer: `p = realloc(p, new_size);` — never assume the old pointer is valid."
    ],
    commonMistakes: [
      "Forgetting to free memory — memory leak. Every malloc/calloc must have a matching free.",
      "Double-free: freeing the same pointer twice — undefined behavior. Set the pointer to NULL after free.",
      "Use-after-free: using memory after it's been freed — undefined behavior. Set the pointer to NULL after free.",
      "Not checking malloc's return for NULL — if allocation fails, dereferencing NULL crashes."
    ],
    relatedTopics: ["Pointers: The Fundamentals", "Memory Layout", "Data Structures in C"],
    externalLinks: [
      { label: "cppreference: malloc", url: "https://en.cppreference.com/w/c/memory/malloc" },
      { label: "C Dynamic Memory — GeeksforGeeks", url: "https://www.geeksforgeeks.org/dynamic-memory-allocation-in-c/" }
    ],
    mcqs: [
      {
        question: "What is the difference between malloc and calloc?",
        options: ["malloc is faster", "malloc doesn't zero memory; calloc does", "calloc is for arrays only", "They're identical"],
        answer: 1,
        explanations: ["Speed isn't the main difference.", "Correct — malloc returns uninitialized memory; calloc returns zeroed memory. calloc also takes count and size separately.", "Both can allocate arrays.", "They differ in initialization."],
        difficulty: "medium"
      },
      {
        question: "What happens if you forget to free memory?",
        options: ["Nothing", "Memory leak — the program slowly consumes memory", "Compile error", "The OS frees it automatically"],
        answer: 1,
        explanations: ["Something does happen.", "Correct — unfreed memory is leaked. The program slowly consumes memory until it crashes or the OS kills it.", "It compiles fine.", "C has no garbage collector."],
        difficulty: "easy"
      },
      {
        question: "What is a double-free?",
        options: ["Freeing two blocks", "Freeing the same pointer twice — undefined behavior", "Calling free twice in a row on different pointers", "A fast free operation"],
        answer: 1,
        explanations: ["Not the same.", "Correct — freeing the same pointer twice is undefined behavior. Set the pointer to NULL after free to prevent this.", "That's fine.", "Not a thing."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "function-pointers",
    title: "Function Pointers",
    difficulty: "hard",
    definition: "A function pointer stores the address of a function, allowing you to call it indirectly. Declared as returnType (*name)(paramTypes), they enable callbacks, strategy patterns, and dispatch tables. qsort from the standard library takes a function pointer as its comparison callback — a classic example.",
    coreUnderstanding: "Function pointers are one of C's most powerful features. They let you store the address of a function and call it indirectly — enabling callbacks, strategy patterns, and dispatch tables. The syntax is notoriously ugly: `int (*compare)(int, int)` declares a pointer to a function taking two ints and returning an int. The parentheses around *compare are essential — without them, `int *compare(int, int)` would be a function returning a pointer. The classic use case is qsort, which takes a comparison function pointer as a callback. Function pointers are the C equivalent of object-oriented polymorphism.",
    howItWorks: "1. Declaration: `int (*fp)(int, int);` — fp is a pointer to a function taking (int, int) and returning int.\n2. The parentheses around *fp are essential: `int *fp(int, int)` is a function returning int*, not a function pointer.\n3. Assignment: `fp = &some_function;` or just `fp = some_function;` (the & is optional).\n4. Call: `fp(3, 4)` or `(*fp)(3, 4)` — both work. The first is more common.\n5. qsort: `qsort(arr, n, sizeof(int), compare)` — compare is a function pointer: `int compare(const void*, const void*)`.\n6. Dispatch tables: `int (*ops[])(int, int) = {add, sub, mul};` — array of function pointers, call `ops[0](3, 4)`.\n7. typedef simplifies: `typedef int (*CompareFn)(const void*, const void*);` — then `CompareFn cmp = compare;`.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n#include <stdlib.h>\n\n// Functions to point to\nint add(int a, int b) { return a + b; }\nint sub(int a, int b) { return a - b; }\nint mul(int a, int b) { return a * b; }\n\n// Comparison function for qsort\nint compare(const void *a, const void *b) {\n    return (*(int*)a - *(int*)b);\n}\n\nint main(void) {\n    // Function pointer\n    int (*fp)(int, int) = add;\n    printf(\"add(3, 4) = %d\\n\", fp(3, 4));  // 7\n\n    fp = sub;\n    printf(\"sub(3, 4) = %d\\n\", fp(3, 4));  // -1\n\n    // Dispatch table (array of function pointers)\n    int (*ops[])(int, int) = {add, sub, mul};\n    printf(\"ops[2](3, 4) = %d\\n\", ops[2](3, 4));  // 12 (mul)\n\n    // qsort with function pointer callback\n    int arr[] = {5, 2, 8, 1, 9, 3};\n    qsort(arr, 6, sizeof(int), compare);\n    for (int i = 0; i < 6; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");  // 1 2 3 5 8 9\n    return 0;\n}",
        output: "add(3, 4) = 7\nsub(3, 4) = -1\nops[2](3, 4) = 12\n1 2 3 5 8 9 ",
        note: "The parentheses around *fp are essential: int (*fp)(int,int) is a function pointer; int *fp(int,int) is a function returning a pointer."
      }
    ],
    marginNotes: [
      "The parentheses around *fp are essential: `int (*fp)(int,int)` is a function pointer; `int *fp(int,int)` is a function returning a pointer.",
      "Function pointers enable callbacks — qsort's comparison function is the classic example.",
      "Dispatch tables (arrays of function pointers) are the C equivalent of polymorphism — call different functions by index.",
      "Use typedef to simplify: `typedef int (*CompareFn)(const void*, const void*);` — then `CompareFn cmp = compare;`."
    ],
    commonMistakes: [
      "Forgetting the parentheses: `int *fp(int, int)` is a function returning a pointer, not a function pointer. Must be `int (*fp)(int, int)`.",
      "Calling a function pointer with the wrong parameter types — undefined behavior. The types must match exactly.",
      "Not checking if a function pointer is NULL before calling — dereferencing NULL is a crash."
    ],
    relatedTopics: ["Pointers: The Fundamentals", "Structures", "Typedef"],
    externalLinks: [
      { label: "cppreference: Function Pointers", url: "https://en.cppreference.com/w/c/language/pointer#Pointers_to_functions" },
      { label: "C Function Pointers — GeeksforGeeks", url: "https://www.geeksforgeeks.org/function-pointer-in-c/" }
    ],
    mcqs: [
      {
        question: "What is the correct syntax for a function pointer taking (int, int) and returning int?",
        options: ["int *fp(int, int)", "int (*fp)(int, int)", "int fp*(int, int)", "function int fp(int, int)"],
        answer: 1,
        explanations: ["That's a function returning a pointer.", "Correct — the parentheses around *fp are essential. Without them, it's a function returning int*.", "Invalid syntax.", "Not C syntax."],
        difficulty: "medium"
      },
      {
        question: "What is a common use of function pointers in C?",
        options: ["Memory allocation", "Callbacks (e.g., qsort's comparison function)", "String manipulation", "File I/O"],
        answer: 1,
        explanations: ["That's malloc.", "Correct — function pointers enable callbacks. qsort takes a comparison function pointer as a callback.", "That's string.h.", "That's stdio.h."],
        difficulty: "medium"
      },
      {
        question: "What is a dispatch table?",
        options: ["A table of variables", "An array of function pointers — call different functions by index", "A hash table", "A sorting algorithm"],
        answer: 1,
        explanations: ["Not variables.", "Correct — a dispatch table is an array of function pointers. You call different functions by indexing into the array.", "Not a hash table.", "Not a sorting algorithm."],
        difficulty: "hard"
      }
    ]
  },
  {
    id: "structures",
    title: "Structures (struct)",
    difficulty: "medium",
    definition: "A struct groups related variables of different types under one name, forming a record. You access members with the dot operator (.) or, via a pointer, the arrow operator (->). Structs are the foundation of data organization in C — they model real-world entities and are passed by value (copied) unless you pass a pointer.",
    coreUnderstanding: "Structs are C's way of grouping related data into a single unit — like a record or a row in a table. A struct can contain members of different types (unlike arrays, which are all the same type). You access members with the dot operator (.) for direct access, or the arrow operator (->) when you have a pointer to a struct. Structs are passed by value (copied) by default — for large structs, pass a pointer to avoid the copy. Structs are the foundation of data organization in C and are used to build linked lists, trees, and other data structures.",
    howItWorks: "1. Definition: `struct Point { int x; int y; };` — defines a struct type. The semicolon after the closing brace is required.\n2. Declaration: `struct Point p;` — creates a variable of type struct Point. `struct` keyword is required in C (not in C++).\n3. Initialization: `struct Point p = {3, 4};` — initialize members in order.\n4. Access: `p.x` and `p.y` — dot operator for direct access.\n5. Pointer access: `struct Point *ptr = &p; ptr->x` — arrow operator for pointer access. `ptr->x` == `(*ptr).x`.\n6. Passed by value: `void f(struct Point p)` — the struct is COPIED. For large structs, pass a pointer: `void f(struct Point *p)`.\n7. typedef: `typedef struct { int x; int y; } Point;` — then `Point p;` (no `struct` keyword needed).",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\n// Define a struct\nstruct Point {\n    int x;\n    int y;\n};\n\n// typedef for convenience\ntypedef struct {\n    char name[50];\n    int age;\n    float gpa;\n} Student;\n\nvoid print_point(struct Point p) {\n    printf(\"(%d, %d)\\n\", p.x, p.y);\n}\n\nvoid move_point(struct Point *p, int dx, int dy) {\n    p->x += dx;  // arrow operator for pointer\n    p->y += dy;\n}\n\nint main(void) {\n    struct Point p1 = {3, 4};\n    print_point(p1);  // (3, 4)\n\n    // Pointer and arrow operator\n    struct Point *ptr = &p1;\n    ptr->x = 10;  // same as (*ptr).x = 10\n    printf(\"p1.x = %d\\n\", p1.x);  // 10\n\n    // Modify through pointer\n    move_point(&p1, 5, 5);\n    print_point(p1);  // (15, 9)\n\n    // typedef struct\n    Student s = {\"Alice\", 20, 3.8};\n    printf(\"%s, age %d, GPA %.1f\\n\", s.name, s.age, s.gpa);\n    return 0;\n}",
        output: "(3, 4)\np1.x = 10\n(15, 9)\nAlice, age 20, GPA 3.8",
        note: "Use . for direct access, -> for pointer access. ptr->x is the same as (*ptr).x. Structs are passed by value (copied) — pass a pointer for large structs."
      }
    ],
    marginNotes: [
      "Use . for direct access (p.x), -> for pointer access (ptr->x). ptr->x is the same as (*ptr).x.",
      "Structs are passed by VALUE (copied). For large structs, pass a pointer to avoid the copy: `void f(struct Point *p)`.",
      "The `struct` keyword is required in C: `struct Point p;`. Use typedef to omit it: `typedef struct { ... } Point;` then `Point p;`.",
      "Don't forget the semicolon after the struct definition: `struct Point { ... };` — the semicolon is required."
    ],
    commonMistakes: [
      "Using . when you have a pointer (should use ->), or -> when you have a direct struct (should use .).",
      "Forgetting the semicolon after the struct definition — `struct Point { ... }` without `;` is a compile error.",
      "Passing large structs by value — it copies the entire struct. Pass a pointer for efficiency."
    ],
    relatedTopics: ["Nested & Self-Referential Structures", "Unions", "Typedef"],
    externalLinks: [
      { label: "cppreference: Structures", url: "https://en.cppreference.com/w/c/language/struct" },
      { label: "C Structures — GeeksforGeeks", url: "https://www.geeksforgeeks.org/structures-in-c/" }
    ],
    mcqs: [
      {
        question: "Which operator accesses a struct member through a pointer?",
        options: [".", "->", "::", "*"],
        answer: 1,
        explanations: ["That's for direct access.", "Correct — the arrow operator -> accesses a member through a pointer. ptr->x == (*ptr).x.", "That's C++.", "That's dereference, not member access."],
        difficulty: "easy"
      },
      {
        question: "How are structs passed to functions in C?",
        options: ["By reference", "By value (copied)", "By name", "Automatically as pointers"],
        answer: 1,
        explanations: ["Not by reference.", "Correct — structs are passed by value (copied). For large structs, pass a pointer to avoid the copy.", "Not by name.", "Not automatic."],
        difficulty: "medium"
      },
      {
        question: "What does `typedef struct { int x; int y; } Point;` allow?",
        options: ["Using Point without the struct keyword", "Creating a pointer", "Dynamic allocation", "Nothing special"],
        answer: 0,
        explanations: ["Correct — typedef lets you write `Point p;` instead of `struct Point p;`.", "Not about pointers.", "Not about allocation.", "It simplifies usage."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "nested-structures",
    title: "Nested & Self-Referential Structures",
    difficulty: "medium",
    definition: "Structures can contain other structures (nesting) and pointers to their own type (self-referential). A self-referential struct is how linked lists, trees, and graphs are built in C — each node holds data plus a pointer to the next node. A struct cannot contain itself by value (infinite size), but can contain a pointer to itself.",
    coreUnderstanding: "Structs can be nested (a struct containing another struct) or self-referential (a struct containing a pointer to its own type). Nesting models hierarchical data: a Rectangle contains two Points. Self-referential structs are the foundation of dynamic data structures: a linked list node contains data and a pointer to the next node; a tree node contains data and pointers to left/right children. A struct CANNOT contain itself by value (that would be infinite size), but it CAN contain a pointer to itself (a pointer has a fixed size regardless of what it points to).",
    howItWorks: "1. Nested: `struct Rect { struct Point tl; struct Point br; };` — Rect contains two Points.\n2. Access: `rect.tl.x` — chain the dots for nested members.\n3. Self-referential: `struct Node { int data; struct Node *next; };` — linked list node.\n4. A struct can't contain itself by value: `struct Node { struct Node next; };` — infinite size, compile error.\n5. A struct CAN contain a pointer to itself: `struct Node { struct Node *next; };` — pointer is fixed size.\n6. Linked list: each node has data + a pointer to the next node. The last node's next is NULL.\n7. Tree: `struct TreeNode { int data; struct TreeNode *left, *right; };` — binary tree node.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n#include <stdlib.h>\n\n// Nested structure\nstruct Point { int x, y; };\nstruct Rect { struct Point tl, br; };  // top-left, bottom-right\n\n// Self-referential — linked list node\nstruct Node {\n    int data;\n    struct Node *next;  // pointer to itself — OK!\n};\n\nint main(void) {\n    // Nested struct access\n    struct Rect r = {{0, 10}, {5, 0}};\n    printf(\"tl: (%d, %d), br: (%d, %d)\\n\",\n           r.tl.x, r.tl.y, r.br.x, r.br.y);\n    // tl: (0, 10), br: (5, 0)\n\n    // Build a linked list: 1 -> 2 -> 3 -> NULL\n    struct Node *head = malloc(sizeof(struct Node));\n    head->data = 1;\n    head->next = malloc(sizeof(struct Node));\n    head->next->data = 2;\n    head->next->next = malloc(sizeof(struct Node));\n    head->next->next->data = 3;\n    head->next->next->next = NULL;  // end of list\n\n    // Traverse the list\n    for (struct Node *p = head; p != NULL; p = p->next) {\n        printf(\"%d -> \", p->data);  // 1 -> 2 -> 3 ->\n    }\n    printf(\"NULL\\n\");\n\n    // Free the list\n    struct Node *p = head;\n    while (p != NULL) {\n        struct Node *next = p->next;\n        free(p);\n        p = next;\n    }\n    return 0;\n}",
        output: "tl: (0, 10), br: (5, 0)\n1 -> 2 -> 3 -> NULL",
        note: "A struct can't contain itself by value (infinite size), but CAN contain a pointer to itself. This is how linked lists and trees are built."
      }
    ],
    marginNotes: [
      "A struct CANNOT contain itself by value (infinite size, compile error). It CAN contain a pointer to itself (pointer is fixed size).",
      "Self-referential structs are the foundation of linked lists, trees, and graphs in C. Each node has data + a pointer to the next/child node.",
      "Access nested members by chaining dots: `rect.tl.x` — top-left point's x coordinate.",
      "Always free linked list nodes: traverse and free each node. Don't lose the next pointer before freeing the current node."
    ],
    commonMistakes: [
      "Trying to put a struct inside itself by value (not a pointer) — infinite size, compile error. Use a pointer.",
      "Losing the next pointer before freeing a linked list node — save `next = p->next` before `free(p)`.",
      "Forgetting to set the last node's next to NULL — the list has no end, causing infinite traversal or crash."
    ],
    relatedTopics: ["Structures", "Dynamic Memory Allocation", "Data Structures in C"],
    externalLinks: [
      { label: "cppreference: Nested Structures", url: "https://en.cppreference.com/w/c/language/struct" },
      { label: "C Linked Lists — GeeksforGeeks", url: "https://www.geeksforgeeks.org/linked-list-in-c/" }
    ],
    mcqs: [
      {
        question: "Can a struct contain itself by value (not a pointer)?",
        options: ["Yes", "No — it would be infinite size. Use a pointer to itself", "Only in C++", "Only if it's small"],
        answer: 1,
        explanations: ["It would be infinite.", "Correct — a struct containing itself by value would have infinite size. Use a pointer to itself instead.", "Not even in C++.", "Size is irrelevant."],
        difficulty: "medium"
      },
      {
        question: "What is a self-referential struct used for?",
        options: ["Memory management", "Building linked lists, trees, and graphs", "String manipulation", "File I/O"],
        answer: 1,
        explanations: ["Not for memory management.", "Correct — self-referential structs (containing a pointer to their own type) build linked lists, trees, and graphs.", "Not for strings.", "Not for files."],
        difficulty: "medium"
      },
      {
        question: "How do you access a nested struct member like `rect.tl.x`?",
        options: ["rect:tl:x", "rect.tl.x — chain the dots", "rect->tl->x", "rect[tl][x]"],
        answer: 1,
        explanations: ["Not valid syntax.", "Correct — chain the dot operator for nested struct access: rect.tl.x.", "That's for pointers.", "Not array syntax."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "unions",
    title: "Unions",
    difficulty: "medium",
    definition: "A union is like a struct, but all members share the same memory location — only one member is valid at a time. The union's size equals its largest member. Unions are used for type punning, memory-efficient tagged values, and interpreting the same bytes as different types.",
    coreUnderstanding: "A union is like a struct, but all members share the same memory. Only one member can be active at a time — writing to one overwrites the others. The union's size is the size of its largest member. Unions are used for: (1) type punning — interpreting the same bytes as different types (e.g., reading a float's bit pattern as an int), (2) memory-efficient tagged values — a struct with a tag enum and a union, where only one variant is active, (3) hardware register access — reading the same register as different field layouts. Reading a member that wasn't last written is undefined behavior in C (but defined in C++).",
    howItWorks: "1. Declaration: `union Value { int i; float f; char s[4]; };` — all members share the same memory.\n2. Size: sizeof(union Value) = max(sizeof(int), sizeof(float), sizeof(char[4])) = 4 (on most systems).\n3. Only one member is valid at a time: writing to i overwrites f and s.\n4. Access: same as struct — `v.i`, `v.f`, `v.s` (dot for direct, -> for pointer).\n5. Type punning: write a float, read its bit pattern as an int: `v.f = 3.14; printf(\"%x\", v.i);` — undefined behavior in C, but commonly used.\n6. Tagged union: `struct { enum Type type; union Value val; } tagged;` — the tag tells which union member is active.\n7. Initialization: `union Value v = { .i = 42 };` — designated initializer (C99).",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\n// Union — all members share the same memory\nunion Value {\n    int i;\n    float f;\n    char bytes[4];\n};\n\n// Tagged union (discriminated union)\nenum ValueType { INT, FLOAT };\nstruct TaggedValue {\n    enum ValueType type;\n    union {\n        int i;\n        float f;\n    } val;\n};\n\nint main(void) {\n    union Value v;\n\n    printf(\"sizeof(union Value) = %zu\\n\", sizeof(v));  // 4\n\n    // Write as int, read as int\n    v.i = 0x42434445;\n    printf(\"as int: %d\\n\", v.i);  // 1111572605\n\n    // Same bytes, read as char array\n    printf(\"as bytes: %c%c%c%c\\n\",\n           v.bytes[0], v.bytes[1], v.bytes[2], v.bytes[3]);\n    // EDCB (little-endian)\n\n    // Write as float — overwrites the int!\n    v.f = 3.14f;\n    printf(\"as float: %f\\n\", v.f);  // 3.140000\n    // v.i is now garbage — only f is valid\n\n    // Tagged union — safe usage\n    struct TaggedValue tv = {INT, .val.i = 42};\n    if (tv.type == INT) printf(\"int: %d\\n\", tv.val.i);  // int: 42\n    return 0;\n}",
        output: "sizeof(union Value) = 4\nas int: 1111572605\nas bytes: EDCB\nas float: 3.140000\nint: 42",
        note: "Only one union member is valid at a time. Writing to one overwrites the others. Use a tagged union (enum + union) for safe access."
      }
    ],
    marginNotes: [
      "Only one union member is valid at a time. Writing to one overwrites the others. Reading a non-active member is undefined behavior.",
      "A union's size equals its largest member. All members share the same starting address.",
      "Type punning (reading a different type than was written) is undefined behavior in C but commonly used for bit manipulation.",
      "Tagged unions (enum + union) are the safe way to use unions — the tag tells which member is active."
    ],
    commonMistakes: [
      "Reading a union member that wasn't last written — undefined behavior. Use a tag (enum) to track which member is active.",
      "Assuming all union members are independent — they share the same memory. Writing to one overwrites the others.",
      "Forgetting that the union size is the largest member, not the sum of all members (that's a struct)."
    ],
    relatedTopics: ["Structures", "Enumerations", "Type Qualifiers"],
    externalLinks: [
      { label: "cppreference: Unions", url: "https://en.cppreference.com/w/c/language/union" },
      { label: "C Unions — GeeksforGeeks", url: "https://www.geeksforgeeks.org/union-in-c/" }
    ],
    mcqs: [
      {
        question: "How is a union different from a struct?",
        options: ["Unions are faster", "Union members share the same memory; struct members have separate memory", "Unions can't have pointers", "Structs are smaller"],
        answer: 1,
        explanations: ["Speed isn't the difference.", "Correct — all union members share the same memory location. Struct members each have their own memory.", "Unions can have pointers.", "Unions are smaller (largest member only)."],
        difficulty: "medium"
      },
      {
        question: "What is the size of a union?",
        options: ["The sum of all member sizes", "The size of the largest member", "Always 4 bytes", "Always 8 bytes"],
        answer: 1,
        explanations: ["That's a struct.", "Correct — a union's size is the size of its largest member, since all members share the same memory.", "Not always 4.", "Not always 8."],
        difficulty: "easy"
      },
      {
        question: "How many union members are valid at a time?",
        options: ["All of them", "Only one — the last one written", "Two", "It depends on the size"],
        answer: 1,
        explanations: ["Not all.", "Correct — only one member is valid at a time (the last one written). Reading a different member is undefined behavior.", "Not two.", "It's always one."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "enums",
    title: "Enumerations (enum)",
    difficulty: "easy",
    definition: "An enum defines a set of named integer constants, making code more readable. By default values start at 0 and increment by 1, but you can assign explicit values. Enums improve code clarity — instead of magic numbers, you write RED, GREEN, BLUE.",
    coreUnderstanding: "Enums are a way to give names to integer constants. Instead of using magic numbers (0, 1, 2), you write meaningful names (RED, GREEN, BLUE). By default, the first value is 0 and each subsequent value increments by 1. You can assign explicit values: `RED = 1, GREEN = 2, BLUE = 4` (for bit flags). In C, enums are integers — the compiler doesn't enforce that a variable only holds enum values. Enums are primarily for readability and maintainability.",
    howItWorks: "1. Definition: `enum Color { RED, GREEN, BLUE };` — RED=0, GREEN=1, BLUE=2.\n2. Explicit values: `enum Color { RED = 1, GREEN = 2, BLUE = 4 };` — for bit flags.\n3. Declaration: `enum Color c = GREEN;` — c is an int with value 1.\n4. In C, enums are ints — the compiler doesn't prevent `c = 999` (not a valid Color).\n5. Use in switch: `switch (c) { case RED: ...; case GREEN: ...; }` — clear and readable.\n6. Enums are often used with tagged unions: `enum Type type; union { ... } val;`.\n7. Anonymous enums: `enum { DEBUG = 1, INFO = 2, ERROR = 4 };` — constants without a type name.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\n// Basic enum\nenum Color { RED, GREEN, BLUE };  // 0, 1, 2\n\n// Explicit values (bit flags)\nenum Permission {\n    READ = 1,\n    WRITE = 2,\n    EXEC = 4\n};\n\n// Enum with switch\nconst char* color_name(enum Color c) {\n    switch (c) {\n        case RED: return \"Red\";\n        case GREEN: return \"Green\";\n        case BLUE: return \"Blue\";\n        default: return \"Unknown\";\n    }\n}\n\nint main(void) {\n    enum Color c = GREEN;\n    printf(\"Color: %s (value %d)\\n\", color_name(c), c);  // Green, 1\n\n    // Bit flags with enum\n    enum Permission p = READ | WRITE;  // 1 | 2 = 3\n    printf(\"Permission: %d\\n\", p);  // 3\n    if (p & READ) printf(\"Has READ\\n\");\n    if (p & EXEC) printf(\"Has EXEC\\n\");  // won't print\n    return 0;\n}",
        output: "Color: Green (value 1)\nPermission: 3\nHas READ",
        note: "Enums give names to integer constants. In C, they're just ints — the compiler doesn't enforce valid values."
      }
    ],
    marginNotes: [
      "Enums are just ints in C — the compiler doesn't prevent `c = 999` (not a valid Color). They're for readability, not type safety.",
      "By default, enum values start at 0 and increment by 1. You can assign explicit values: `RED = 1, GREEN = 2, BLUE = 4`.",
      "Enums are great for bit flags: `enum Perm { READ = 1, WRITE = 2, EXEC = 4 };` — combine with | and check with &.",
      "Use enums in switch statements for clear, readable code. Always include a default case."
    ],
    commonMistakes: [
      "Expecting the compiler to enforce enum values — in C, enums are ints. `c = 999` compiles fine.",
      "Forgetting that enum values start at 0 by default — RED is 0, not 1. Use explicit values if you need 1-based.",
      "Using = instead of sequential values when you don't need explicit values — `RED, GREEN, BLUE` auto-increments."
    ],
    relatedTopics: ["Structures", "Unions", "Typedef"],
    externalLinks: [
      { label: "cppreference: Enumerations", url: "https://en.cppreference.com/w/c/language/enum" },
      { label: "C Enums — GeeksforGeeks", url: "https://www.geeksforgeeks.org/enumeration-enum-c/" }
    ],
    mcqs: [
      {
        question: "What is the default value of the first enum constant?",
        options: ["1", "0", "-1", "Undefined"],
        answer: 1,
        explanations: ["Not 1.", "Correct — the first enum constant defaults to 0, and each subsequent one increments by 1.", "Not -1.", "It's defined: 0."],
        difficulty: "easy"
      },
      {
        question: "Does C enforce that a variable only holds valid enum values?",
        options: ["Yes", "No — enums are ints, the compiler doesn't enforce valid values", "Only with a cast", "Only in C++"],
        answer: 1,
        explanations: ["C doesn't enforce.", "Correct — in C, enums are just ints. `enum Color c = 999;` compiles fine. They're for readability, not type safety.", "No cast needed.", "C++ has stricter enum classes."],
        difficulty: "medium"
      },
      {
        question: "How are enums commonly used with bit flags?",
        options: ["Sequential values", "Powers of 2 (1, 2, 4, 8) so they can be combined with |", "Random values", "Negative values"],
        answer: 1,
        explanations: ["Sequential values don't work for flags.", "Correct — use powers of 2 (1, 2, 4, 8) so flags can be combined with | and checked with &.", "Not random.", "Not negative."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "typedef",
    title: "typedef & #define",
    difficulty: "easy",
    definition: "typedef creates an alias (a new name) for an existing type, making complex types readable — typedef unsigned long size_t. #define is a preprocessor macro that does text substitution before compilation. typedef is type-safe and scoped; #define is unchecked text replacement and can cause subtle bugs.",
    coreUnderstanding: "typedef and #define both create names, but they're fundamentally different. typedef creates a type alias — a new name for an existing type. It's type-safe and scoped. #define is a preprocessor macro — it does pure text substitution before the compiler even sees the code. It's not type-safe and can cause subtle bugs (e.g., `#define SQUARE(x) x*x` gives `SQUARE(2+3)` = 2+3*2+3 = 11, not 25). Use typedef for type aliases and #define for constants and conditional compilation. For inline functions, use `static inline` instead of macros.",
    howItWorks: "1. typedef: `typedef unsigned long size_t;` — size_t is now an alias for unsigned long.\n2. typedef with struct: `typedef struct { int x; int y; } Point;` — then `Point p;` (no `struct` keyword).\n3. typedef with function pointers: `typedef int (*Compare)(const void*, const void*);` — then `Compare cmp = compare;`.\n4. #define constant: `#define MAX_SIZE 100` — text replacement: every MAX_SIZE becomes 100.\n5. #define macro: `#define SQUARE(x) ((x)*(x))` — always parenthesize arguments to avoid precedence bugs.\n6. #define without value: `#define DEBUG` — used for conditional compilation with #ifdef.\n7. typedef is scoped (block or file), #define is file-scoped (or until #undef).",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\n// typedef — type alias\ntypedef unsigned long size_t;\ntypedef struct { int x, y; } Point;\ntypedef int (*CompareFn)(const void*, const void*);\n\n// #define — text substitution (preprocessor)\n#define MAX_SIZE 100\n#define SQUARE(x) ((x) * (x))\n#define MIN(a, b) ((a) < (b) ? (a) : (b))\n\nint compare_ints(const void *a, const void *b) {\n    return *(int*)a - *(int*)b;\n}\n\nint main(void) {\n    // typedef usage\n    Point p = {3, 4};\n    printf(\"Point: (%d, %d)\\n\", p.x, p.y);\n\n    size_t len = 42;\n    printf(\"size: %zu\\n\", len);\n\n    CompareFn cmp = compare_ints;\n    int arr[] = {3, 1, 2};\n    // qsort(arr, 3, sizeof(int), cmp);  // works!\n\n    // #define usage\n    int data[MAX_SIZE];  // int data[100]\n    printf(\"SQUARE(5) = %d\\n\", SQUARE(5));  // 25\n    printf(\"MIN(3, 7) = %d\\n\", MIN(3, 7));  // 3\n    return 0;\n}",
        output: "Point: (3, 4)\nsize: 42\nSQUARE(5) = 25\nMIN(3, 7) = 3",
        note: "Always parenthesize macro arguments: #define SQUARE(x) ((x)*(x)). Without parens, SQUARE(2+3) gives 2+3*2+3 = 11, not 25."
      }
    ],
    marginNotes: [
      "Always parenthesize macro arguments: `#define SQUARE(x) ((x)*(x))`. Without parens, SQUARE(2+3) = 2+3*2+3 = 11, not 25.",
      "typedef is type-safe and scoped; #define is unchecked text replacement. Prefer typedef for type aliases.",
      "For constants, prefer `const` or `enum` over #define — they're type-safe and visible to the debugger. #define constants aren't visible to the debugger.",
      "For inline functions, prefer `static inline` over macros — they're type-safe and don't have precedence issues."
    ],
    commonMistakes: [
      "Not parenthesizing macro arguments: `#define SQUARE(x) x*x` — SQUARE(2+3) = 11, not 25. Always use ((x)*(x)).",
      "Using #define for typed constants instead of const or enum — #define isn't type-safe or visible to the debugger.",
      "Confusing typedef (type alias, compiled) with #define (text substitution, preprocessed)."
    ],
    relatedTopics: ["Structures", "Function Pointers", "Preprocessor Directives"],
    externalLinks: [
      { label: "cppreference: typedef", url: "https://en.cppreference.com/w/c/language/typedef" },
      { label: "cppreference: #define", url: "https://en.cppreference.com/w/c/preprocessor/replace" }
    ],
    mcqs: [
      {
        question: "What is the key difference between typedef and #define?",
        options: ["They're the same", "typedef is a type alias (type-safe); #define is text substitution (not type-safe)", "typedef is faster", "#define is newer"],
        answer: 1,
        explanations: ["They're different.", "Correct — typedef creates a type alias that the compiler understands. #define does text substitution before compilation.", "Speed isn't the difference.", "#define is older."],
        difficulty: "medium"
      },
      {
        question: "What is wrong with `#define SQUARE(x) x*x` and `SQUARE(2+3)`?",
        options: ["Nothing", "It gives 2+3*2+3 = 11, not 25. Always parenthesize: ((x)*(x))", "It's a syntax error", "It's too slow"],
        answer: 1,
        explanations: ["It has a bug.", "Correct — without parentheses, SQUARE(2+3) expands to 2+3*2+3 = 11. Always parenthesize: ((x)*(x)).", "Valid syntax.", "Speed isn't the issue."],
        difficulty: "medium"
      },
      {
        question: "Which is better for a typed constant: #define or const?",
        options: ["#define", "const — it's type-safe and visible to the debugger", "They're the same", "Neither"],
        answer: 1,
        explanations: ["#define isn't type-safe.", "Correct — const is type-safe, scoped, and visible to the debugger. #define is none of these.", "They differ.", "const is better."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "file-handling",
    title: "File Handling",
    difficulty: "medium",
    definition: "C file I/O uses a FILE* stream and functions from <stdio.h>: fopen opens a file, fclose closes it, fprintf/fscanf do formatted I/O, fread/fwrite handle binary blocks, and fgetc/fputc handle single characters. Always check fopen's return for NULL (failure) and always close files to flush buffers and release resources.",
    coreUnderstanding: "C file I/O is stream-based: you open a file with fopen, which returns a FILE* pointer. You then read/write through this pointer using functions like fprintf, fscanf, fread, fwrite, fgetc, fputc. When done, you close the file with fclose — this flushes buffers and releases the file handle. Always check fopen's return for NULL (the file might not exist or you might not have permission). Always close files — forgetting to close leaks file descriptors and may not flush buffered data. Binary mode ('rb', 'wb') prevents newline translation on Windows.",
    howItWorks: "1. `FILE *f = fopen(path, mode)` — opens a file. Modes: 'r' (read), 'w' (write/truncate), 'a' (append), 'b' (binary), '+' (read+write).\n2. Always check: `if (!f) { perror(\"fopen\"); return 1; }` — fopen returns NULL on failure.\n3. `fprintf(f, format, ...)` — formatted write (like printf to a file).\n4. `fscanf(f, format, &var)` — formatted read (like scanf from a file).\n5. `fread(ptr, size, count, f)` — read binary blocks. `fwrite(ptr, size, count, f)` — write binary blocks.\n6. `fgetc(f)` / `fputc(c, f)` — read/write a single character.\n7. `fclose(f)` — close the file, flush buffers, release the handle. Always do this.\n8. `feof(f)` — check for end of file. `ferror(f)` — check for errors.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    // Write to a file\n    FILE *out = fopen(\"data.txt\", \"w\");\n    if (!out) {\n        perror(\"fopen\");\n        return 1;\n    }\n    fprintf(out, \"Name: %s\\n\", \"Alice\");\n    fprintf(out, \"Age: %d\\n\", 30);\n    fclose(out);  // always close\n\n    // Read from a file (line by line)\n    FILE *in = fopen(\"data.txt\", \"r\");\n    if (!in) {\n        perror(\"fopen\");\n        return 1;\n    }\n    char line[256];\n    while (fgets(line, sizeof(line), in)) {\n        line[strcspn(line, \"\\n\")] = '\\0';  // remove newline\n        printf(\"Read: %s\\n\", line);\n    }\n    fclose(in);\n\n    // Binary I/O\n    int numbers[] = {1, 2, 3, 4, 5};\n    FILE *bin = fopen(\"data.bin\", \"wb\");\n    fwrite(numbers, sizeof(int), 5, bin);\n    fclose(bin);\n    return 0;\n}",
        output: "Read: Name: Alice\nRead: Age: 30",
        note: "Always check fopen for NULL and always fclose when done. Forgetting to close leaks file descriptors and may not flush buffered data."
      }
    ],
    marginNotes: [
      "Always check fopen's return for NULL — the file might not exist or you might not have permission. `if (!f) { perror(\"fopen\"); }`",
      "Always fclose when done — it flushes buffers and releases the file handle. Forgetting to close leaks file descriptors.",
      "Use binary mode ('rb', 'wb') on Windows to prevent newline translation (\\n <-> \\r\\n). Text mode ('r', 'w') translates newlines.",
      "fgets is safer than gets (which is removed from C11) — it takes a size limit to prevent buffer overflow."
    ],
    commonMistakes: [
      "Not checking fopen's return for NULL — if the file doesn't exist, using the NULL pointer crashes.",
      "Forgetting to fclose — leaks file descriptors and may not flush buffered data.",
      "Using text mode on Windows for binary data — newline translation corrupts binary files. Use 'rb', 'wb'."
    ],
    relatedTopics: ["Input & Output", "Error Handling", "Preprocessor Directives"],
    externalLinks: [
      { label: "cppreference: File I/O", url: "https://en.cppreference.com/w/c/io" },
      { label: "C File Handling — GeeksforGeeks", url: "https://www.geeksforgeeks.org/basics-file-handling-c/" }
    ],
    mcqs: [
      {
        question: "What does fopen return on failure?",
        options: ["-1", "NULL", "0", "EOF"],
        answer: 1,
        explanations: ["Not -1.", "Correct — fopen returns NULL if the file can't be opened. Always check before using.", "0 is NULL, but the answer is NULL specifically.", "EOF is for read errors."],
        difficulty: "easy"
      },
      {
        question: "Why must you always fclose files?",
        options: ["To save memory", "To flush buffers and release the file handle", "It's required by the standard", "To prevent crashes"],
        answer: 1,
        explanations: ["Not just memory.", "Correct — fclose flushes buffered data to disk and releases the file descriptor. Forgetting to close leaks descriptors.", "It is required.", "It helps prevent issues but the main reason is flushing and releasing."],
        difficulty: "medium"
      },
      {
        question: "When should you use binary mode ('rb', 'wb')?",
        options: ["Always", "For binary data, especially on Windows (prevents newline translation)", "Never", "Only for text files"],
        answer: 1,
        explanations: ["Not always needed.", "Correct — binary mode prevents \\n <-> \\r\\n translation on Windows. Use it for binary data to avoid corruption.", "Binary mode is useful.", "Text mode is for text files."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "preprocessor",
    title: "Preprocessor Directives",
    difficulty: "medium",
    definition: "The preprocessor runs before compilation, processing directives starting with #. #include pastes file contents, #define creates macros, #ifdef/#endif enable conditional compilation, and #pragma gives compiler-specific instructions. The preprocessor does pure text substitution — it knows nothing about C types or scope.",
    coreUnderstanding: "The preprocessor is a text-substitution tool that runs before the compiler. It processes directives starting with #: #include pastes file contents, #define creates macros (constants and function-like macros), #ifdef/#ifndef/#endif enable conditional compilation (include code only if a macro is defined), and #pragma gives compiler-specific instructions. The preprocessor knows nothing about C types, scope, or syntax — it just does text replacement. This is powerful but dangerous: macros can cause subtle bugs because they don't respect C's type system or precedence rules.",
    howItWorks: "1. `#include <header>` — pastes system header contents. `#include \"header\"` — pastes your header (current dir first).\n2. `#define NAME value` — text substitution: every NAME becomes value.\n3. `#define FUNC(x) ((x)*(x))` — function-like macro. Always parenthesize arguments.\n4. `#ifdef NAME ... #endif` — include code only if NAME is defined. Used for conditional compilation.\n5. `#ifndef NAME ... #endif` — include code only if NAME is NOT defined. Used for include guards.\n6. `#if expr ... #elif ... #else ... #endif` — conditional compilation based on constant expressions.\n7. `#pragma` — compiler-specific directives (e.g., #pragma once, #pragma pack).\n8. `#undef NAME` — undefine a macro.",
    codeExamples: [
      {
        lang: "c",
        code: "#include <stdio.h>\n\n// Object-like macro (constant)\n#define MAX_SIZE 100\n#define VERSION \"2.1.0\"\n\n// Function-like macro — ALWAYS parenthesize!\n#define MAX(a, b) ((a) > (b) ? (a) : (b))\n#define SQUARE(x) ((x) * (x))\n\n// Conditional compilation\n#ifdef DEBUG\n#define LOG(msg) printf(\"[DEBUG] %s\\n\", msg)\n#else\n#define LOG(msg)  // nothing when DEBUG is not defined\n#endif\n\n// Include guard pattern (in header files)\n// #ifndef MYHEADER_H\n// #define MYHEADER_H\n// ... header contents ...\n// #endif\n\nint main(void) {\n    printf(\"Version: %s\\n\", VERSION);\n    printf(\"MAX(3, 7) = %d\\n\", MAX(3, 7));  // 7\n    printf(\"SQUARE(5) = %d\\n\", SQUARE(5));  // 25\n\n    int data[MAX_SIZE];  // int data[100]\n    LOG(\"Starting program\");  // prints only if DEBUG defined\n    return 0;\n}",
        output: "Version: 2.1.0\nMAX(3, 7) = 7\nSQUARE(5) = 25",
        note: "The preprocessor does pure text substitution — it knows nothing about C types or scope. Always parenthesize macro arguments."
      }
    ],
    marginNotes: [
      "The preprocessor does pure text substitution — it knows nothing about C types, scope, or syntax. This is why macros can cause subtle bugs.",
      "Always parenthesize macro arguments: `#define SQUARE(x) ((x)*(x))`. Without parens, SQUARE(2+3) = 11, not 25.",
      "Use include guards (#ifndef / #define / #endif) in header files to prevent double-inclusion. `#pragma once` is a non-standard but widely supported alternative.",
      "Conditional compilation (#ifdef DEBUG) lets you include debug code in development and exclude it in production without runtime cost."
    ],
    commonMistakes: [
      "Not parenthesizing macro arguments — `#define SQUARE(x) x*x` gives SQUARE(2+3) = 11, not 25.",
      "Forgetting include guards in header files — double-inclusion causes redefinition errors.",
      "Using macros for complex logic — they're hard to debug and don't respect scope. Use functions instead."
    ],
    relatedTopics: ["Header Files", "Typedef", "Compilation Process"],
    externalLinks: [
      { label: "cppreference: Preprocessor", url: "https://en.cppreference.com/w/c/preprocessor" },
      { label: "C Preprocessor — GeeksforGeeks", url: "https://www.geeksforgeeks.org/cc-preprocessors/" }
    ],
    mcqs: [
      {
        question: "What does the preprocessor do?",
        options: ["Compiles code", "Text substitution before compilation", "Links object files", "Optimizes code"],
        answer: 1,
        explanations: ["That's the compiler.", "Correct — the preprocessor does text substitution (#include, #define, #ifdef) before the compiler runs.", "That's the linker.", "That's the optimizer."],
        difficulty: "easy"
      },
      {
        question: "What is the purpose of include guards (#ifndef / #define / #endif)?",
        options: ["To speed up compilation", "To prevent double-inclusion of a header file", "To define constants", "To include libraries"],
        answer: 1,
        explanations: ["Not about speed.", "Correct — include guards prevent a header from being processed twice, which would cause redefinition errors.", "That's #define.", "That's #include."],
        difficulty: "medium"
      },
      {
        question: "Why must you parenthesize macro arguments?",
        options: ["For readability", "To avoid operator precedence bugs (SQUARE(2+3) = 11 without parens)", "It's required by the standard", "For performance"],
        answer: 1,
        explanations: ["Not just readability.", "Correct — without parens, SQUARE(2+3) expands to 2+3*2+3 = 11. With parens, ((2+3)*(2+3)) = 25.", "Not required but essential.", "Not about performance."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "header-files",
    title: "Header Files & Modular Programming",
    difficulty: "medium",
    definition: "Header files (.h) declare interfaces — function prototypes, type definitions, and macros — while .c files define the implementations. This separation enables modular programming: compile units independently and link them. Use #ifndef include guards to prevent a header from being processed twice.",
    coreUnderstanding: "Header files are the key to modular programming in C. A .h file declares the interface (function prototypes, type definitions, macros), while the .c file defines the implementation. This separation lets you compile each .c file independently and link them together. The golden rule: header files declare, .c files define. Never put function definitions or global variable definitions in a header — only declarations. Use include guards (#ifndef / #define / #endif) or #pragma once to prevent a header from being processed twice if it's included multiple times.",
    howItWorks: "1. Header file (math_utils.h): declares function prototypes and types.\n2. Source file (math_utils.c): includes the header and defines the functions.\n3. Main file (main.c): includes the header and calls the functions.\n4. Compile: `gcc -c math_utils.c -o math_utils.o` and `gcc -c main.c -o main.o`.\n5. Link: `gcc main.o math_utils.o -o program`.\n6. Include guard: `#ifndef MATH_UTILS_H / #define MATH_UTILS_H / ... / #endif` — prevents double-inclusion.\n7. `#pragma once` — non-standard but widely supported alternative to include guards.\n8. Header declares, .c defines: never put function bodies or variable definitions in headers.",
    codeExamples: [
      {
        lang: "c",
        code: "// === math_utils.h ===\n#ifndef MATH_UTILS_H\n#define MATH_UTILS_H\n\n// Function prototypes (declarations)\nint add(int a, int b);\nint factorial(int n);\n\n// Type definition\ntypedef struct {\n    int x, y;\n} Point;\n\n// Constant\n#define MAX_INPUT 1000\n\n#endif // MATH_UTILS_H\n\n// === math_utils.c ===\n#include \"math_utils.h\"\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\n// === main.c ===\n#include <stdio.h>\n#include \"math_utils.h\"\n\nint main(void) {\n    printf(\"add(3, 4) = %d\\n\", add(3, 4));\n    printf(\"5! = %d\\n\", factorial(5));\n    Point p = {3, 4};\n    printf(\"Point: (%d, %d)\\n\", p.x, p.y);\n    return 0;\n}\n\n// Compile: gcc -c math_utils.c && gcc -c main.c && gcc main.o math_utils.o -o prog",
        output: "add(3, 4) = 7\n5! = 120\nPoint: (3, 4)",
        note: "Header files declare (prototypes, types, macros); .c files define (implementations). Use include guards to prevent double-inclusion."
      }
    ],
    marginNotes: [
      "Header files declare (prototypes, types, macros); .c files define (implementations). Never put function bodies in headers.",
      "Always use include guards: #ifndef HEADER_H / #define HEADER_H / ... / #endif. #pragma once is a widely-supported alternative.",
      "Compile each .c file independently (-c flag), then link the .o files. This enables incremental builds — only recompile changed files.",
      "Use `#include \"header.h\"` for your own headers (current directory first), `#include <header.h>` for system headers."
    ],
    commonMistakes: [
      "Putting function definitions (bodies) in header files — they get defined in every file that includes the header, causing linker errors.",
      "Forgetting include guards — if a header is included twice (directly or transitively), you get redefinition errors.",
      "Confusing `#include \"header.h\"` (your headers, current dir first) with `#include <header.h>` (system headers)."
    ],
    relatedTopics: ["Preprocessor Directives", "Functions", "Compilation Process"],
    externalLinks: [
      { label: "cppreference: Header Files", url: "https://en.cppreference.com/w/c/preprocessor/include" },
      { label: "C Header Files — GeeksforGeeks", url: "https://www.geeksforgeeks.org/header-files-in-c-cpp/" }
    ],
    mcqs: [
      {
        question: "What goes in a header file (.h)?",
        options: ["Function definitions (bodies)", "Declarations (prototypes, types, macros)", "Global variable definitions", "Main function"],
        answer: 1,
        explanations: ["Definitions go in .c files.", "Correct — headers declare (prototypes, types, macros). .c files define (implementations).", "Not in headers.", "main goes in a .c file."],
        difficulty: "easy"
      },
      {
        question: "Why use include guards in header files?",
        options: ["To speed up compilation", "To prevent double-inclusion and redefinition errors", "To define constants", "To include system headers"],
        answer: 1,
        explanations: ["Not about speed.", "Correct — include guards (#ifndef / #define / #endif) prevent a header from being processed twice, which would cause redefinition errors.", "That's #define.", "That's #include <...>."],
        difficulty: "medium"
      },
      {
        question: "What is the difference between #include \"header.h\" and #include <header.h>?",
        options: ["They're the same", "\"...\" searches the current directory first; <...> searches system directories", "<...> is faster", "\"...\" is for C++ only"],
        answer: 1,
        explanations: ["They differ in search path.", "Correct — \"...\" searches the current directory first (your headers), <...> searches system directories (standard library).", "Same speed.", "Both work in C."],
        difficulty: "medium"
      }
    ]
  }
];