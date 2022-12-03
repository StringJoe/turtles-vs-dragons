const spriteCanvas = document.getElementById("spriteCanvas");
const spriteContext = spriteCanvas.getContext("2d");

const backgroundCanvas = document.getElementById("backgroundCanvas");
const backgroundContext = spriteCanvas.getContext("2d");


const SPRITE_CANVAS_WIDTH = spriteCanvas.width = 1200;
const SPRITE_CANVAS_HEIGHT = spriteCanvas.height = 1200;

const BACKGROUND_CANVAS_WIDTH = backgroundCanvas.width = 1200;
const BACKGROUND_CANVAS_HEIGHT = backgroundCanvas.height = 1200;


function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //ctx.fillRect(x, 50, 100, 100);

    // the first four values (sx etc) determine where on image we zoom in
    // the next four determined where on canvas image is displayed
    ctx.drawImage(playerImage, sx, sy, sw, sh, x1, 0, 300, 300);
    ctx.drawImage(dragonImage, sx, 0, 120, 120, x2, 300, 300, 300);
    
    
    //x--;
    x1++;
    x2++;

    if(x1 && x2 > 1200) {
        x1 = -45;
        x2 = 0;
    }
    requestAnimationFrame(animate);
};

animate();


/* 
Most code for this function belongs to w3schools
minor changes were made to fit the game

When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function newLevel() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.levelBtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  /* end w3schools code */