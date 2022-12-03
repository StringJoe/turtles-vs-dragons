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

// create array of background images
const BACKGROUND_IMAGES = ["swamp/boardwalk1.png", "swamp/Boat 1.png", "swamp/Cabin 2.png", 
                            "swamp/Castle.png", "swamp/Caves 1.png"];

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

// code for changing backgrounds belongs to Paolo Bergantino 
// and Mateen Ulhaq from stackoverflow
// https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript
var e = document.getElementById("level-select");

function onChange() {
    //var value = e.value;
    //var text = e.options[e.selectedIndex].text;
    backgroundImage.src = BACKGROUND_IMAGES[e.value-1];
    //console.log(value, text);
  }
e.onchange = onChange;
//onChange();

// end background changing code