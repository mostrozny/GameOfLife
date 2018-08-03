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
            e.addEventListener('mousedown', function () {
                e.classList.toggle('live');
            })
        });
        };


    this.position = function(x,y) {
        var index = x + y * this.width;
        return this.cells[index];
    }
    //ustawianie podanym wspolzednym klasy live;
    this.setCellState = function (x, y, state){
        this.position(x, y).classList.toggle(state);
    };
    //utworzenie przykladowego glidera
    this.firstGlider = function (){
        this.setCellState(2, 0, 'live');
        this.setCellState(2, 1, 'live');
        this.setCellState(2, 2, 'live');
        this.setCellState(1, 2, 'live');
        this.setCellState(0, 1, 'live');
    };
    var self = this;
    this.computeCellNextState = function(x, y){


        var liveNeighbours = 0;
        for (var i = y-1; i < y+2; i++) {
            for (var j = x-1; j < x+2; j++) {
                if (i!==y || j!==x) {
                    if (i >= 0 && i < self.height  && j >= 0 && j < self.width) {
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
            }  else if (liveNeighbours > 3) {
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
   this.computeNextGeneration = function (){
         this.stateNextGen = [];
        for (var i=0; i<this.height; i++){
            for (var j=0; j<this.width; j++){
                this.stateNextGen.push(this.computeCellNextState(j, i));
            }
        }
        console.log(this.stateNextGen);
    }
    this.printNextGeneration = function() {
        self.computeNextGeneration();
        for (var i = 0; i < self.cells.length; i++) {
            self.cells[i].classList.remove('live');
            if (self.stateNextGen[i] === 1) {
                self.cells[i].classList.add('live');
            }
        }
    }
}



var game = new GameOfLife(100, 100);
game.createBoard();
game.firstGlider();
game.computeNextGeneration();
document.querySelector('#play').addEventListener('click', function (){
    game.printNextGeneration();
})
