var GameOfLife = function (boardWidth, boardHeight){
  this.width = boardWidth;
  this.height = boardHeight;
  this.board = document.getElementById('board');
  this.cells = [];
  this.createBoard = function (){
      //stworzenie tablicy o podanych rozmiarach, szer i wysokosc glownego
      //diva i wpychanie nowych divow do glownej tablicy
      this.board.style.width = this.width*10 + 'px';
      this.board.style.height = this.height*10 + 'px';
      var divCount = this.width*this.height;
      for (var i=0; i<divCount; i++){
          var createdDiv = document.createElement('div');
          document.getElementById('board').appendChild(createdDiv);
      }
      //wpychanie do nowej tablicy wszystkich nowych elementow div
      var newBoard = document.getElementById('board');
      var self = this;
      newBoard.querySelectorAll('div').forEach(function (element){
          self.cells.push(element);
      });

      //ozywianie i usmiercanie komorek
      this.cells.forEach(function (e){
         e.addEventListener('mouseover', function (){
             e.classList.toggle('live');
         })
      });
  }


};

var game = new GameOfLife(100, 100);
game.createBoard();