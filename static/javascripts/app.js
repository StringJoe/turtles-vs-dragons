// create a canvas for the sprites
const spriteCanvas = document.getElementById("spriteCanvas");
const spriteContext = spriteCanvas.getContext("2d");
const SPRITE_CANVAS_WIDTH = spriteCanvas.width = 800;
const SPRITE_CANVAS_HEIGHT = spriteCanvas.height = 600;

// create a canvas for the background of the game
const backgroundCanvas = document.getElementById("backgroundCanvas");
const backgroundContext = spriteCanvas.getContext("2d");
const BACKGROUND_CANVAS_WIDTH = backgroundCanvas.width = 800;
const BACKGROUND_CANVAS_HEIGHT = backgroundCanvas.height = 600;

// create the background image then draw it to the screen
const backgroundImage = new Image();
backgroundImage.src = 'swamp/boardwalk1.png';
const dragonImage = new Image();
dragonImage.src = 'dragon-images/blue-dragons.png';



/* 
code for animate function belongs to franks laboratory
https://www.youtube.com/watch?v=CY0HE277IBM&list=LL&index=6&
*/
function animate() {
    spriteContext.clearRect(0, 0, SPRITE_CANVAS_WIDTH, SPRITE_CANVAS_HEIGHT);
    backgroundContext.clearRect(0, 0, SPRITE_CANVAS_WIDTH, SPRITE_CANVAS_HEIGHT);
    backgroundContext.fillRect(50, 50, 100, 100);
    //ctx.fillRect(x, 50, 100, 100);

    // the first four values (sx etc) determine where on image we zoom in
    // the next four determined where on canvas image is displayed
    //ctx.drawImage(playerImage, sx, sy, sw, sh, x1, 0, 300, 300);
    //ctx.drawImage(dragonImage, sx, 0, 120, 120, x2, 300, 300, 300);
    backgroundContext.drawImage(backgroundImage, 0, 0, BACKGROUND_CANVAS_WIDTH, BACKGROUND_CANVAS_HEIGHT);
    spriteContext.drawImage(dragonImage, 0, 0, 150, 150, -40, -15, 150, 150);
    //x--;
    //x1++;
    //x2++;

    //if(x1 && x2 > 1200) {
    //    x1 = -45;
    //    x2 = 0;
    //}
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