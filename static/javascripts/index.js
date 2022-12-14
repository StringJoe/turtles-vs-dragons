// create a canvas for the background of the game
const backgroundCanvas = document.getElementById("backgroundCanvas");
const backgroundContext = spriteCanvas.getContext("2d");
const BACKGROUND_CANVAS_WIDTH = backgroundCanvas.width = innerWidth;
const BACKGROUND_CANVAS_HEIGHT = backgroundCanvas.height = innerHeight;

// create array of background images
const BACKGROUND_IMAGES = ["swamp/boardwalk1.png", "swamp/Boat 1.png", "swamp/Cabin 2.png", 
                            "swamp/Castle.png", "swamp/Caves 1.png"];

// create the background image then draw it to the screen
const backgroundImage = new Image();
backgroundImage.src = 'swamp/boardwalk1.png';

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

// get the canvas element from the web page and the context of the canvas
const canvas = document.getElementById('spriteCanvas')
const c = canvas.getContext('2d')

// define the width and height to be the same as the monitors width and height
canvas.width = innerWidth
canvas.height = innerHeight

// define a class for the player's character
class Player {
    constructor() {
        // define the starting position for the player
        this.position = {
            x: canvas.width / 2.2,
            y: canvas.height / 1.2
        }

        // define an initial velocity for player movement
        this.velocity = {
            x: 0,
            y: 0
        }

        // create the image object for the turtle
        const image = new Image()
        image.src = './turtle-images/tiny-turtles.png'
        
        // must make constructor variable equal to the const variable other wise it will be null
        this.image = image
        this.width = 100
        this.height = 100
    }

    // create a method to draw the character to the screen
    draw() {
        c.fillStyle = 'red'
        //c.fillRect(this.position.x, this.position.y, this.width,
        //    this.height)

        //console.log(this.image)
        c.drawImage(this.image, 0, 0, 90, 80, this.position.x, this.position.y, 80, 80)  
    }

    // create a method that when drawn updates the player's position
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

// create the player object
const player = new Player()

// create dictionary to determine if key has been pressed
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

// create the animation loop
function animate() {
    // clear the canvas each loop so image doesn't bleed as it moves
    c.clearRect(0, 0, canvas.width, canvas.height)
    
    // start animating the canvas
    requestAnimationFrame(animate)

    // create the background image
    backgroundContext.drawImage(backgroundImage, 0, 0, BACKGROUND_CANVAS_WIDTH, BACKGROUND_CANVAS_HEIGHT);

    // call the update function for the player
    player.update()

    // check if a key has been pressed and move the player
    if(keys.a.pressed && player.position.x > 0) {
        player.velocity.x = -5
    }
    else if (keys.d.pressed && player.position.x+player.width+10 < canvas.width) {
        player.velocity.x = +5
    }
    else if(keys.w.pressed && player.position.y > canvas.height / 2) {
        player.velocity.y = -5
    }
    else if(keys.s.pressed && player.position.y < canvas.height / 1.2) {
        player.velocity.y = +5
    }
    else {
        player.velocity.x = 0
        player.velocity.y = 0
    }
}

// start the game animation
animate()

// event listener to check if movement and attack keys are pressed
addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'a':
            console.log("left")
            //player.velocity.x = -5
            keys.a.pressed = true;
            break
        case 'd':
            console.log("right")
            //player.velocity.x = +5
            keys.d.pressed = true;
            break
        case 'w':
            console.log("up")
            //player.velocity.y = -5
            keys.w.pressed = true;
            break
        case 's':
            console.log("down")
            //player.velocity.y = +5
            keys.s.pressed = true;
            break
        case ' ':
            console.log("shoot")
            keys.space.pressed = true;
            break

    }
})

// event listener to check if movement and attack keys are not pressed
addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'a':
            console.log("left")
            //player.velocity.x = 0
            keys.a.pressed = false;
            break
        case 'd':
            console.log("right")
            //player.velocity.x = 0
            keys.d.pressed = false;
            break
        case 'w':
            console.log("up")
            //player.velocity.y = 0
            keys.w.pressed = false;
            break
        case 's':
            console.log("down")
            //player.velocity.y = 0
            keys.s.pressed = false;
            break
        case ' ':
            console.log("shoot")
            keys.space.pressed = false;
            break

    }
})