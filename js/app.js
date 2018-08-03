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

    this.index = function (x, y) {
        return x-1 + ((y-1) * this.width);
    };
    //ustawianie podanym wspolzednym klasy live;
    this.setCellState = function (x, y, state){
        this.cells[this.index(x,y)].classList.toggle(state);
    };
    //utworzenie przykladowego glidera
    this.firstGlider = function (){
        this.setCellState(3, 1, 'live');
        this.setCellState(3, 2, 'live');
        this.setCellState(3, 3, 'live');
        this.setCellState(2, 3, 'live');
        this.setCellState(1, 2, 'live');
    };
    var self = this;
    this.computeCellNextState = function(x, y){
        //Sasiedzi
        //dla komórki o współrzędnych x, y:
        //
        // 1. sąsiad: x-1, y-1
        // 2. sąsiad: x, y-1
        // 3. sąsiad: x+1, y-1
        // 4. sąsiad: x-1, y
        // 5. sąsiad: x+1, y
        // 6. sąsiad: x-1, y+1
        // 7. sąsiad: x, y+1
        // 8. sąsiad: x+1, y+1
        var liveNeighbours = 0;
        if (this.cells[this.index(x-1,y-1)].classList == "live"){
            liveNeighbours = liveNeighbours + 1;
        }
        if (this.cells[this.index(x,y-1)].classList == "live"){
            liveNeighbours = liveNeighbours + 1;
        }
        if (this.cells[this.index(x+1,y-1)].classList == "live"){
            liveNeighbours = liveNeighbours + 1;
        }
        if (this.cells[this.index(x-1,y)].classList == "live"){
            liveNeighbours = liveNeighbours + 1;
        }
        if (this.cells[this.index(x+1,y)].classList == "live"){
            liveNeighbours = liveNeighbours + 1;
        }
        if (this.cells[this.index(x-1,y+1)].classList == "live"){
            liveNeighbours = liveNeighbours + 1;
        }
        if (this.cells[this.index(x,y+1)].classList == "live"){
            liveNeighbours = liveNeighbours + 1;
        }
        if (this.cells[this.index(x+1,y+1)].classList == "live"){
            liveNeighbours = liveNeighbours + 1;
        }
        console.log(liveNeighbours);
        var life = 0;
        if (this.cells[this.index(x, y)].classList == 'live') {
            if (liveNeighbours < 2) {
                this.cells[this.index(x,y)].classList.remove('live');
            } else if (liveNeighbours === 2 || liveNeighbours === 3) {
                life = 1;
            }  else if (liveNeighbours > 3) {
                this.cells[this.index(x,y)].classList.remove('live');
            }
        } else if (this.cells[this.index(x, y)].classList !== 'live'){
            if (liveNeighbours === 3) {
                this.cells[this.index(x,y)].classList.toggle('live');
            }
        }
        return life;
    };
    this.computeNextGeneration = function (){

    }
    this.printNextGeneration = function (){

    }
}



var game = new GameOfLife(100, 100);
game.createBoard();
game.firstGlider();
game.computeCellNextState(2, 2);
