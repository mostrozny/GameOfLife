var GameOfLife = function (boardWidth, boardHeight) {
    this.width = boardWidth;
    this.height = boardHeight;
    this.board = document.getElementById('board');
    this.cells = [];
    this.createBoard = function () {
        //stworzenie tablicy o podanych rozmiarach, szer i wysokosc glownego
        //diva i wpychanie nowych divow do glownej tablicy
        this.board.style.width = this.width * 10 + 'px';
        this.board.style.height = this.height * 10 + 'px';
        var divCount = this.width * this.height;
        for (var i = 0; i < divCount; i++) {
            var createdDiv = document.createElement('div');
            document.getElementById('board').appendChild(createdDiv);
        }
        //wpychanie do nowej tablicy wszystkich nowych elementow div
        var newBoard = document.getElementById('board');
        var self = this;
        newBoard.querySelectorAll('div').forEach(function (element) {
            self.cells.push(element);
        });

        //ozywianie i usmiercanie komorek
        this.cells.forEach(function (e) {
            e.addEventListener('click', function () {
                e.classList.toggle('live');
            })
        });
    };

    //wyznaczanie pozycji dla divow
    this.position = function (x, y) {
        var index = x + y * this.width;
        return this.cells[index];
    }
    //ustawianie podanym wspolzednym klasy live;
    this.setCellState = function (x, y, state) {
        this.position(x, y).classList.toggle(state);
    };
    //utworzenie przykladowego glidera
    this.firstGlider = function () {
        this.setCellState(2, 0, 'live');
        this.setCellState(2, 1, 'live');
        this.setCellState(2, 2, 'live');
        this.setCellState(1, 2, 'live');
        this.setCellState(0, 1, 'live');
    };
    var self = this;
    this.computeCellNextState = function (x, y) {


        var liveNeighbours = 0;
        for (var i = y - 1; i < y + 2; i++) {
            for (var j = x - 1; j < x + 2; j++) {
                if (i !== y || j !== x) {
                    if (i >= 0 && i < self.height && j >= 0 && j < self.width) {
                        if (self.position(j, i).className == 'live') {
                            liveNeighbours++;
                        }
                    }
                }
            }
        }

        if (this.position(x, y).className == 'live') {
            if (liveNeighbours < 2) {
                return 0;
            } else if (liveNeighbours === 2 || liveNeighbours === 3) {
                return 1;
            } else if (liveNeighbours > 3) {
                return 0;
            }
        } else {
            if (liveNeighbours === 3) {
                return 1;
            } else {
                return 0;
            }
        }
    };
    this.computeNextGeneration = function () {
        this.stateNextGen = [];
        for (i = 0; i < this.height; i++) {
            for (j = 0; j < this.width; j++) {
                this.stateNextGen.push(this.computeCellNextState(j, i));
            }
        }
        // console.log(this.stateNextGen);
    };
    this.printNextGeneration = function () {
        var currentPopulation = 0;
        self.computeNextGeneration();
        for (i = 0; i < self.cells.length; i++) {
            self.cells[i].classList.remove('live');
            if (self.stateNextGen[i] === 1) {
                self.cells[i].classList.add('live');
                currentPopulation++;
            }
        }

        document.getElementById('population').innerText = currentPopulation;
    };
    this.startGame = function () {
        self.pauseGame();
        self.interval = setInterval(self.printNextGeneration, 300);
    };
    this.pauseGame = function () {
        clearInterval(self.interval);
    };
    this.start = function () {
        this.createBoard();
        this.firstGlider();
        this.computeNextGeneration();
    }
};


var game;
document.querySelector('#draw').addEventListener('click', function (){
    var userWidth = document.getElementById('userWidthBoard').value;
    var userHeight = document.getElementById('userHeightBoard').value;
    console.log(userWidth);
    console.log(userHeight);
    if (userWidth < 10 || userHeight < 10 ) {
        alert("Make a bigger board!");
    } else if (userWidth > 150 || userHeight > 150) {
        alert("Make a smaller board!");
    } else {
        game = new GameOfLife(userWidth, userHeight);
        game.start();
    }
});
document.querySelector('#play').addEventListener('click', function () {
    game.startGame();
});
document.querySelector('#pause').addEventListener('click', function () {
    game.pauseGame();
});
