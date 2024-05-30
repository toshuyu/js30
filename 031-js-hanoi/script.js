class TowersOfHanoi {
    constructor(numDisks) {
        this.numDisks = numDisks;
        this.towers = [[], [], []];
        this.moves = 0;

        // Initialize first tower with disks
        for (let i = numDisks; i >= 1; i--) {
            this.towers[0].push(i);
        }
    }

    moveDisk(source, destination) {
        const disk = this.towers[source].pop();
        this.towers[destination].push(disk);
        this.moves++;
        console.log(`Move disk ${disk} from tower ${source + 1} to tower ${destination + 1}`);
    }

    solve() {
        this.solveRecursive(this.numDisks, 0, 2, 1);
        console.log(`Solved in ${this.moves} moves.`);
    }

    solveRecursive(numDisks, source, destination, auxiliary) {
        if (numDisks === 1) {
            this.moveDisk(source, destination);
            return;
        }

        this.solveRecursive(numDisks - 1, source, auxiliary, destination);
        this.moveDisk(source, destination);
        this.solveRecursive(numDisks - 1, auxiliary, destination, source);
    }

    printState() {
        console.log("Current state of towers:");
        for (let i = 0; i < this.towers.length; i++) {
            console.log(`Tower ${i + 1}: ${this.towers[i].join(', ')}`);
        }
    }
}

// Example usage:
const numDisks = 3;
const hanoi = new TowersOfHanoi(numDisks);
hanoi.printState();
hanoi.solve();
hanoi.printState();