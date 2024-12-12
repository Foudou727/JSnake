const snakeScreen = document.getElementById("snakeScreen") ;
snakeScreen.classList.toggle("hidden") ;

const startButton = document.querySelector("#startButton") ;
startButton.addEventListener("click", function(evt) {
    document.querySelector("#homeScreen").classList.toggle("hidden") ;
    snakeScreen.classList.toggle("hidden") ;
    document.body.classList.toggle("start") ;
    gameStarted(5) ;
}) ;

function gameStarted(gridSize) {
    const grid = generateGrid(gridSize) ;

    const queue = new Queue() ;
    queue.push([1,0]) ;
    queue.push([5,2]) ;
    console.log(queue.toString()) ;
}

function generateGrid(gridSize) {
    const grid = Array.from({length: gridSize}, (_, i) => 
            Array.from({length: gridSize}, (_, j) => 0)) ;

    grid[Math.floor(gridSize/2)][Math.floor(gridSize/2)] = 1 ;

    return grid ;
}

class Queue {

    constructor() {
        this.head = null ;
        this.tail = null ;
        this.size = 0 ;
    }

    peek() {
        if (this.head === null)
            return null ;
        else
            return this.head.value ;
    }

    push(value) {
        if (this.head === null) {
            this.head = new QueueNode(value) ;
            this.tail = new QueueNode(value) ;
        }

        else if (this.head.equals(this.tail)) {
            const node = new QueueNode(value, null, this.head) ;
            this.head.next = node ;
            this.tail = node ;
        }

        else {
            const node = new QueueNode(value, null, this.tail) ;
            this.tail.next = node ;
            this.tail = node ;
        }

        this.size++ ;
    }

    pop() {
        if (this.head === null) {
            return null ;
        }
        
        const value = this.head.value ;

        if (this.head.equals(this.tail)) {
            this.head = null ;
            this.tail = null ;
        }

        else if (this.size === 2) {
            this.tail.prev = null ;
            this.head = this.tail ;
        }

        else {
            this.head.next.prev = null ;
            this.head = this.head.next ;
        }

        this.size-- ;
        return value ;
    }

    toString() {
        const other = new Queue() ;
        let ret = "[" ;
        let curr ;
        while (this.size > 0) {
            curr = this.pop() ;
            ret = ret + "<" + curr + ">" ;
            if (this.size > 0)
                ret = ret + ", " ;
            
            other.push(curr) ;
        }

        return ret+"]" ;
    }
}

class QueueNode {
    constructor(value, prev = null, next = null) {
        this.value = value ;
        this.prev = prev ;
        this.next = next ;
    }

    equals(other) {
        return other.value === self.value && other.prev === self.prev && other.next === self.next ;
    }

    toString() {
        return String(self.value) ;
    }
}

