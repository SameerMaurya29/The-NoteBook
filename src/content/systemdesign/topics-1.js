// System Design — Low-Level Design (LLD) topics with working code.
export default [
  {
    id: "lld-parking-lot",
    title: "LLD: Parking Lot System",
    difficulty: "hard",
    definition: `A parking lot system models a lot with multiple floors, each with parking spots of different types (car, bike, truck), vehicles that occupy spots, and tickets that track entry/exit and compute fees. The LLD exercise is to model the entities and write working code for park/unpark with fee calculation.`,
    coreUnderstanding: `The nouns become classes: ParkingLot, Floor, ParkingSpot, Vehicle, Ticket. The verbs become methods: park(vehicle) finds a free spot of the right type and issues a ticket; unpark(ticket) frees the spot and computes the fee. Key decisions: a Vehicle has a type (CAR/BIKE/TRUCK), a ParkingSpot has a type and a free/occupied state, and the spot-assignment strategy can vary (nearest, random) — so make it a strategy class. Fees depend on duration and spot type, so a FeeStrategy computes the amount. The lot is a singleton (one lot). SOLID shows up: Open/Closed — adding a new vehicle type or fee model doesn't change existing code; the strategy pattern keeps assignment and pricing pluggable.`,
    howItWorks: `1. ENTITIES: ParkingLot (singleton, has Floors), Floor (has ParkingSpots), ParkingSpot (type, free/occupied, vehicle), Vehicle (type, number), Ticket (vehicle, spot, entryTime, exitTime, fee).
2. ENUMS: VehicleType {CAR, BIKE, TRUCK}, SpotType {CAR, BIKE, TRUCK} — a CAR fits a CAR spot (or larger).
3. PARK: given a Vehicle, find a Floor with a free Spot of matching type -> assign the spot, mark occupied, create a Ticket with entryTime.
4. UNPARK: given a Ticket, mark the Spot free, set exitTime, compute fee = FeeStrategy.calculate(spotType, duration).
5. STRATEGY: ParkingStrategy (findSpot) — NearestFirst, Random. FeeStrategy — Flat, Hourly, MinuteBased. Inject the strategy so it's pluggable.
6. SINGLETON: ParkingLot.getInstance() — one lot in the system.
7. CONCURRENCY (mention): park/unpark should lock the spot to avoid two cars taking it; use synchronized or a lock per spot.
8. EXTENSIBILITY: add EV charging (a new SpotType or a mixin), add a display board (observer pattern) showing free counts.`,
    codeExamples: [
      {
        lang: "java",
        code: `// Java — Parking Lot LLD (core)
enum VehicleType { CAR, BIKE, TRUCK }
enum SpotType { CAR, BIKE, TRUCK }

class Vehicle {
    String number; VehicleType type;
    Vehicle(String n, VehicleType t) { number = n; type = t; }
}

class ParkingSpot {
    int id; SpotType type; boolean free = true; Vehicle vehicle;
    boolean canFit(Vehicle v) { return type == spotFor(v.type); }
    void park(Vehicle v) { vehicle = v; free = false; }
    void vacate() { vehicle = null; free = true; }
    static SpotType spotFor(VehicleType vt) {
        return SpotType.valueOf(vt.name());
    }
}

class Floor {
    int id; List<ParkingSpot> spots;
    ParkingSpot findFree(SpotType t) {
        return spots.stream().filter(s -> s.free && s.type == t).findFirst().orElse(null);
    }
}

class Ticket {
    Vehicle vehicle; ParkingSpot spot; long entryTime, exitTime; double fee;
    Ticket(Vehicle v, ParkingSpot s) { vehicle = v; spot = s; entryTime = System.currentTimeMillis(); }
}

// Strategy: pluggable fee model
interface FeeStrategy { double calculate(SpotType t, long hours); }
class HourlyFee implements FeeStrategy {
    public double calculate(SpotType t, long hours) {
        double rate = t == SpotType.BIKE ? 10 : t == SpotType.CAR ? 20 : 40;
        return rate * Math.max(1, hours);
    }
}

class ParkingLot {  // singleton
    private static ParkingLot instance;
    List<Floor> floors; FeeStrategy fee = new HourlyFee();
    static ParkingLot getInstance() {
        if (instance == null) instance = new ParkingLot();
        return instance;
    }
    Ticket park(Vehicle v) {
        SpotType need = ParkingSpot.spotFor(v.type);
        for (Floor f : floors) {
            ParkingSpot s = f.findFree(need);
            if (s != null) { s.park(v); return new Ticket(v, s); }
        }
        return null;  // lot full
    }
    double unpark(Ticket t) {
        t.exitTime = System.currentTimeMillis();
        long hours = (t.exitTime - t.entryTime) / 3_600_000;
        t.fee = fee.calculate(t.spot.type, hours);
        t.spot.vacate();
        return t.fee;
    }
}`,
        output: `(parking lot core)`,
        note: "Entities: ParkingLot (singleton) -> Floor -> ParkingSpot; Vehicle, Ticket. park() finds a free matching spot and issues a Ticket; unpark() frees the spot and uses a FeeStrategy to compute the fee. Strategy pattern keeps assignment and pricing pluggable (Open/Closed)."
      }
    ],
    marginNotes: [
      "Nouns -> classes: ParkingLot, Floor, ParkingSpot, Vehicle, Ticket. Verbs -> methods: park(), unpark(), calculateFee(). This noun/verb extraction is the core LLD skill.",
      "Use the STRATEGY pattern for spot assignment (NearestFirst, Random) and fee calculation (Hourly, Flat, MinuteBased). Injecting the strategy keeps the design open for extension, closed for modification (O in SOLID).",
      "ParkingLot is a SINGLETON — there's one lot. Mention concurrency in interviews: park/unpark should lock the spot so two cars can't grab it simultaneously.",
      "Extensibility hooks interviewers love: a display board (observer pattern) showing free counts per floor, and EV charging as a new spot type or mixin."
    ],
    commonMistakes: [
      "Modeling the lot without a Spot type — a bike can't park in a truck spot. Match spot type to vehicle type.",
      "Hardcoding the fee formula instead of using a FeeStrategy — breaks extensibility.",
      "Forgetting the singleton + concurrency — two cars could take the same spot without a lock."
    ],
    relatedTopics: ["System Design Basics", "LLD: Tic-Tac-Toe", "REST APIs"],
    externalLinks: [
      { label: "Parking Lot LLD (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/design-parking-lot-using-object-oriented-principles/" }
    ],
    mcqs: [
      {
        question: "Why use a FeeStrategy in the parking lot design?",
        options: ["It's required by Java", "It keeps fee calculation pluggable (Hourly/Flat/Minute) — open for extension, closed for modification (O in SOLID)", "It's faster", "To reduce classes"],
        answer: 1,
        explanations: ["It's not required.", "Correct — the strategy pattern lets you add a new fee model (e.g. surge pricing) without touching ParkingLot, satisfying Open/Closed. Hardcoding the formula breaks extensibility.", "Speed isn't the point.", "It adds classes, doesn't reduce them."],
        difficulty: "medium"
      },
      {
        question: "What concurrency issue must park/unpark handle?",
        options: ["None — it's single-threaded", "Two vehicles could grab the same free spot simultaneously — lock the spot", "Memory leaks", "Network failure"],
        answer: 1,
        explanations: ["OAs assume concurrency.", "Correct — without a lock, two threads could read a spot as free and both park in it. Use synchronized or a per-spot lock on park/unpark.", "That's a different issue.", "Network is irrelevant here."],
        difficulty: "medium"
      },
      {
        question: "Which classes would you extract for a parking lot?",
        options: ["Just 'ParkingLot'", "ParkingLot, Floor, ParkingSpot, Vehicle, Ticket (nouns -> classes)", "Car, Bike, Truck only", "Database and UI"],
        answer: 1,
        explanations: ["Too coarse — you lose the structure.", "Correct — extract nouns as classes: ParkingLot (singleton) contains Floors, each Floor has ParkingSpots; Vehicle and Ticket are separate. Verbs become methods.", "Those are vehicle types (an enum), not the whole design.", "Those are infrastructure, not domain classes."],
        difficulty: "easy"
      }
    ]
  },
  {
    id: "lld-tic-tac-toe",
    title: "LLD: Tic-Tac-Toe",
    difficulty: "medium",
    definition: `Tic-Tac-Toe is a 3×3 grid where two players (X, O) alternate placing marks; the first to align three in a row, column, or diagonal wins. The LLD models the board, players, game flow, and a win checker — designed so the board size and player count can extend.`,
    coreUnderstanding: `The nouns: Board (the grid), Player (X or O, with a symbol), Game (orchestrates turns and state), and a WinStrategy/ResultChecker that decides win/draw. The verbs: makeMove(row, col) places a mark if the cell is empty and it's the player's turn; checkResult() returns WIN/DRAW/CONTINUE. The design decouples the win-checking from the board so you can swap in a 4×4 or N-in-a-row rule without changing the game flow. Game state is an enum (IN_PROGRESS, WIN, DRAW). The turn alternates via a current-player pointer. The board exposes cell access to the checker but owns the placement — single responsibility.`,
    howItWorks: `1. ENTITIES: Board (N×N grid of Cell), Cell (symbol or empty), Player (name, symbol), Game (state, players, current player), ResultChecker (win/draw logic).
2. ENUM: Symbol {X, O, EMPTY}; GameState {IN_PROGRESS, WIN, DRAW}.
3. makeMove(r, c): if cell empty and game IN_PROGRESS and it's the player's turn -> place symbol, switch turn, then checkResult.
4. checkResult: scan rows, cols, two diagonals for three identical non-empty symbols -> WIN; if board full and no winner -> DRAW; else IN_PROGRESS.
5. DECOUPLE: ResultChecker takes the Board and the last move (r, c) — only check the row/col/diagonal of the last move for O(1) win check instead of scanning all.
6. EXTENSIBILITY: board size N (constructor param), N-in-a-row win condition (param), more than 2 players (a players list + rotating index).
7. SINGLE RESPONSIBILITY: Board stores state; Player holds identity; Game runs flow; ResultChecker decides outcome. Don't mix win logic into Board.
8. EDGE CASES: move on an occupied cell (reject), move after game over (reject), move out of bounds (reject).`,
    codeExamples: [
      {
        lang: "java",
        code: `// Java — Tic-Tac-Toe LLD (core)
enum Symbol { X, O, EMPTY }
enum GameState { IN_PROGRESS, WIN, DRAW }

class Player { String name; Symbol symbol; Player(String n, Symbol s){name=n;symbol=s;} }

class Board {
    int n; Symbol[][] grid;
    Board(int n){ this.n=n; grid=new Symbol[n][n]; for(Symbol[] r:grid) java.util.Arrays.fill(r,Symbol.EMPTY); }
    boolean isEmpty(int r,int c){ return grid[r][c]==Symbol.EMPTY; }
    void place(int r,int c,Symbol s){ grid[r][c]=s; }
    Symbol at(int r,int c){ return grid[r][c]; }
    boolean full(){ for(Symbol[] r:grid) for(Symbol s:r) if(s==Symbol.EMPTY) return false; return true; }
}

class ResultChecker {
    // O(1) check: only the row, col, and diagonals of the last move
    boolean wins(Board b, int r, int c, Symbol s, int need) {
        int n=b.n, cnt;
        cnt=0; for(int i=0;i<n;i++){ if(b.at(r,i)==s)cnt++; else cnt=0; if(cnt>=need)return true; }
        cnt=0; for(int i=0;i<n;i++){ if(b.at(i,c)==s)cnt++; else cnt=0; if(cnt>=need)return true; }
        if(r==c){ cnt=0; for(int i=0;i<n;i++){ if(b.at(i,i)==s)cnt++; else cnt=0; if(cnt>=need)return true; } }
        if(r+c==n-1){ cnt=0; for(int i=0;i<n;i++){ if(b.at(i,n-1-i)==s)cnt++; else cnt=0; if(cnt>=need)return true; } }
        return false;
    }
}

class Game {
    Board board; Player[] players; int turn=0; GameState state=GameState.IN_PROGRESS; ResultChecker checker=new ResultChecker();
    Game(int n, Player[] ps){ board=new Board(n); players=ps; }
    GameState move(int r,int c){
        if(state!=GameState.IN_PROGRESS || !board.isEmpty(r,c)) return state; // reject
        Player p=players[turn];
        board.place(r,c,p.symbol);
        if(checker.wins(board,r,c,p.symbol,board.n)){ state=GameState.WIN; return state; }
        if(board.full()){ state=GameState.DRAW; return state; }
        turn=(turn+1)%players.length; return GameState.IN_PROGRESS;
    }
}`,
        output: `(game core)`,
        note: "Entities: Board, Cell/Symbol, Player, Game, ResultChecker. makeMove places + checks; ResultChecker is decoupled (O(1) check on the last move's row/col/diagonals). Single responsibility: Board stores, Game flows, Checker decides. Extensible to N×N and N-in-a-row."
      }
    ],
    marginNotes: [
      "Decouple the ResultChecker from the Board. The board stores state; the checker decides win/draw. This lets you swap rules (N-in-a-row, 4×4) without touching the game flow — single responsibility.",
      "O(1) win check: after a move at (r,c), only check that row, that column, and the two diagonals (if the move is on them). Don't rescan the whole board each move.",
      "Make the board size N and the win-length parameters, not hardcoded 3. Then the same code plays 4×4 or 5-in-a-row — extensibility interviewers reward.",
      "Reject invalid moves explicitly: occupied cell, move after game over, out-of-bounds. Returning the state on each move makes the flow testable."
    ],
    commonMistakes: [
      "Hardcoding size 3 — makes the design non-extensible to N×N or N-in-a-row.",
      "Mixing win-checking into the Board — violates single responsibility and makes rule changes hard.",
      "Rescanning the whole board on every move instead of checking only the last move's row/col/diagonals."
    ],
    relatedTopics: ["System Design Basics", "LLD: Parking Lot", "SOLID Principles"],
    externalLinks: [
      { label: "Tic-Tac-Toe LLD (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/design-a-tic-tac-toe-game/" }
    ],
    mcqs: [
      {
        question: "Why decouple the ResultChecker from the Board?",
        options: ["To use fewer classes", "Single responsibility — the board stores state, the checker decides outcome; swapping rules (N-in-a-row) doesn't touch the board", "It's faster", "It's required"],
        answer: 1,
        explanations: ["It adds a class, not fewer.", "Correct — single responsibility: the Board stores state, the ResultChecker decides win/draw. Decoupling lets you change the win rule (N-in-a-row, 4×4) without modifying the Board or Game.", "Speed isn't the reason.", "It's a design choice, not a requirement."],
        difficulty: "medium"
      },
      {
        question: "How can you check a win in O(1) after a move at (r,c)?",
        options: ["Rescan the whole board", "Only check the row, column, and diagonals passing through (r,c)", "Guess", "Check only the corners"],
        answer: 1,
        explanations: ["That's O(n²) — wasteful.", "Correct — a win must pass through the last-placed cell, so only that row, that column, and the two diagonals (if the cell is on them) need checking. O(n) per move, effectively O(1) for fixed n.", "No.", "Corners are irrelevant."],
        difficulty: "medium"
      },
      {
        question: "What makes the design extensible to 4×4 or 5-in-a-row?",
        options: ["Hardcoding size 3", "Parameterizing board size N and win-length, and a pluggable ResultChecker", "Adding more if-statements", "Using a bigger enum"],
        answer: 1,
        explanations: ["Hardcoding blocks extension.", "Correct — make board size N and the win-length constructor/strategy parameters, with a pluggable ResultChecker. Then 4×4 or 5-in-a-row reuse the same code.", "More ifs aren't extensible.", "Enum size is irrelevant."],
        difficulty: "medium"
      }
    ]
  },
  {
    id: "lld-bank-account",
    title: "LLD: Bank Account System",
    difficulty: "medium",
    definition: `A bank account system models accounts with balances, deposits, withdrawals, transfers between accounts, and a transaction history. The LLD exercise focuses on thread-safe balance updates, an immutable transaction log, and account types with shared behavior.`,
    coreUnderstanding: `The nouns: Account (balance, type, transaction list), Transaction (type, amount, timestamp, balance-after — immutable), Bank (manages accounts). The verbs: deposit(amount), withdraw(amount) with balance checks, transfer(toAccount, amount) as withdraw+deposit atomically. The critical concern is CONCURRENCY: two threads withdrawing at once could overdraw — so balance updates must be synchronized or use atomic operations. The transaction log is append-only and immutable (never edit a past transaction). Account types (Savings, Current) share behavior via inheritance or composition; differences (overdraft limits, interest) live in the subclass or a strategy. The transfer must be atomic — both accounts lock (in a consistent order to avoid deadlock) — so a crash mid-transfer doesn't leave one account debited and the other not credited.`,
    howItWorks: `1. ENTITIES: Account (id, balance, type, List<Transaction>), Transaction (type, amount, timestamp, balanceAfter — immutable), Bank (Map<id, Account>).
2. ENUM: AccountType {SAVINGS, CURRENT}, TransactionType {DEPOSIT, WITHDRAW, TRANSFER}.
3. deposit(amount): synchronized -> balance += amount -> log a DEPOSIT transaction.
4. withdraw(amount): synchronized -> if balance >= amount (or overdraft allows) -> balance -= amount -> log WITHDRAW; else throw InsufficientFunds.
5. transfer(to, amount): lock BOTH accounts (in a consistent order — by id — to avoid deadlock) -> withdraw from source, deposit to dest -> log TRANSFER on both. Atomic.
6. CONCURRENCY: use synchronized methods or ReentrantLock per account. For transfer, lock both accounts; always lock in the SAME order (e.g. lower id first) to prevent deadlock.
7. IMMUTABLE LOG: Transaction is immutable (final fields); the log is append-only. Never edit history — for corrections, post a new reversing transaction.
8. ACCOUNT TYPES: Savings (interest, no overdraft), Current (overdraft limit). Use inheritance (SavingsAccount extends Account) or a strategy for the overdraft/interest rule.
9. INTEREST: computed periodically (a scheduled job) — SavingsAccount.applyInterest() adds a deposit transaction.`,
    codeExamples: [
      {
        lang: "java",
        code: `// Java — Bank Account LLD (core, thread-safe)
enum AccountType { SAVINGS, CURRENT }
enum TxnType { DEPOSIT, WITHDRAW, TRANSFER_IN, TRANSFER_OUT }

class Transaction {  // immutable
    final TxnType type; final double amount; final long time; final double balanceAfter;
    Transaction(TxnType t, double a, double b){ type=t; amount=a; time=System.currentTimeMillis(); balanceAfter=b; }
}

class Account {
    String id; double balance; AccountType type; List<Transaction> log = new ArrayList<>();
    Account(String id, double b, AccountType t){ this.id=id; balance=b; type=t; }
    synchronized void deposit(double a){ balance += a; log.add(new Transaction(TxnType.DEPOSIT, a, balance)); }
    synchronized void withdraw(double a){
        if(a > balance) throw new RuntimeException("Insufficient funds");
        balance -= a; log.add(new Transaction(TxnType.WITHDRAW, a, balance));
    }
    List<Transaction> history(){ return Collections.unmodifiableList(log); }
}

class Bank {
    Map<String, Account> accounts = new ConcurrentHashMap<>();
    void transfer(String from, String to, double a){
        Account a1 = accounts.get(from), a2 = accounts.get(to);
        // lock in a consistent order to avoid deadlock
        Account first = a1.id.compareTo(a2.id) < 0 ? a1 : a2;
        Account second = first == a1 ? a2 : a1;
        synchronized(first){ synchronized(second){
            a1.withdraw(a); a2.deposit(a);
            a1.log.add(new Transaction(TxnType.TRANSFER_OUT, a, a1.balance));
            a2.log.add(new Transaction(TxnType.TRANSFER_IN, a, a2.balance));
        }}
    }
}`,
        output: `(bank core)`,
        note: "Entities: Account (balance, log), Transaction (immutable), Bank. deposit/withdraw are synchronized. transfer locks both accounts in a consistent order (by id) to avoid deadlock. The log is append-only and immutable — corrections post a reversing transaction."
      }
    ],
    marginNotes: [
      "CONCURRENCY is the core lesson: deposit/withdraw must be synchronized so two threads can't overdraw. transfer must lock BOTH accounts — and always in a consistent order (e.g. by id) to avoid deadlock.",
      "The transaction log is APPEND-ONLY and immutable. Never edit a past transaction; for corrections, post a new reversing entry. This is how real ledgers work (and it's auditable).",
      "Account types (Savings, Current) share behavior via inheritance or a strategy. Put the differences (overdraft limit, interest) in the subclass/strategy, not in scattered conditionals.",
      "transfer is atomic: withdraw from source AND deposit to dest under both locks, so a crash mid-transfer can't debit one without crediting the other."
    ],
    commonMistakes: [
      "Not synchronizing balance updates — two concurrent withdrawals can overdraw.",
      "Locking accounts in inconsistent order in transfer — classic deadlock.",
      "Editing past transactions to correct errors instead of appending a reversing entry."
    ],
    relatedTopics: ["System Design Basics", "LLD: Parking Lot", "Concurrency Basics"],
    externalLinks: [
      { label: "Bank Account LLD (GeeksforGeeks)", url: "https://www.geeksforgeeks.org/design-a-bank-account-system/" }
    ],
    mcqs: [
      {
        question: "Why lock both accounts in a consistent order during transfer?",
        options: ["It's faster", "To avoid deadlock — if two transfers lock in opposite orders, each can wait forever for the other", "To reduce memory", "It's optional"],
        answer: 1,
        explanations: ["Order doesn't affect speed.", "Correct — if transfer A->B locks A then B, and B->A locks B then A, they can deadlock (each holds one lock, waits for the other). Always lock in a consistent order (e.g. by id) to prevent this.", "Memory is unrelated.", "It's essential for deadlock prevention."],
        difficulty: "hard"
      },
      {
        question: "How should a transaction error be corrected?",
        options: ["Edit the original transaction", "Append a new reversing transaction (the log is append-only and immutable)", "Delete the transaction", "Restart the system"],
        answer: 1,
        explanations: ["Editing breaks audit history.", "Correct — the log is append-only and immutable. Post a new reversing entry to correct an error. This preserves a complete, auditable history (how real ledgers work).", "Deletion breaks the audit trail.", "Restarting doesn't fix data."],
        difficulty: "medium"
      },
      {
        question: "Why synchronize deposit and withdraw?",
        options: ["To log transactions", "So two concurrent operations can't overdraw or lose updates (race condition on balance)", "To compute interest", "It's a Java requirement"],
        answer: 1,
        explanations: ["Logging is separate.", "Correct — without synchronization, two threads could read the same balance and both withdraw, overdrawing the account, or one update could overwrite the other (lost update). synchronized makes the read-modify-write atomic.", "Interest is a separate job.", "It's a concurrency requirement, not Java-specific."],
        difficulty: "medium"
      }
    ]
  }
];