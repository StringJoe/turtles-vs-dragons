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
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// define the width and height to be the same as the monitors width and height
canvas.width = innerWidth - 15
canvas.height = innerHeight / 1.2

// define a class for the player's character
class Player {
    constructor() {
        // define the starting position for the player
        this.position = {
            x: canvas.width / 1.1,
            y: canvas.height / 2
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
        //c.fillStyle = 'blue'
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

// define a class for the dragons character
class Dragon {
    constructor({position}) {
        // define the starting position for the player
        this.position = {
            x: position.x,
            y: position.y
        }

        // define an initial velocity for player movement
        this.velocity = {
            x: 0,
            y: 0
        }

        // create the image object for the turtle
        const image = new Image()
        image.src = './dragon-images/blue-dragons.png'
        
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
        c.drawImage(this.image, 0, 0, 150, 150, this.position.x, this.position.y, 150, 150)  
    }

    // create a method that when drawn updates the player's position
    update({velocity}) {
        this.draw()
        //this.position.x += this.velocity.x
        this.position.x += velocity.x
    }
}

// create a grid class to create multiple dragons
class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.dragons = []

        // create multiple dragon objects
        for (let i = 0; i < 4; i++) {
            this.dragons.push(new Dragon({position: {x:0, y: i*150}}))
        }
    }

    update() {
        this.position.x += this.velocity.x
    }
}

// create a projectile for the player to fight with
class Projectile {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity

        this.radius = 3
    }

    // draw the projectile as a circle
    draw() {
        c.beginPath()
        c.arc(this.position.x-75, this.position.y+25, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'red'
        c.fill()
        c.closePath()
    }

    // update the projectile path
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
    
}

// create the player object
const player = new Player()

// create the projectile object
const projectiles = []

// create an array to hold grid objects
const grids = [new Grid()]

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

// frames for dragon and player info
let frames = 0
var dragonsKilled = 0
var dragonSpeed = 0.1
var dragonsOnScreen = 1000
var playerScore = 0
var playerLives = 20
var bonusScore = 1

var score = document.getElementById("playerScore")
var lifeCount = document.getElementById("lifeCount")

// create the animation loop
function animate() {
    // clear the canvas each loop so image doesn't bleed as it moves
    c.clearRect(0, 0, canvas.width, canvas.height)
    
    // start animating the canvas
    requestAnimationFrame(animate)

    // create the background image
    c.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // call the update function for the player
    player.update()

    // create the projectiles
    projectiles.forEach((projectile, index) => {

        if (projectile.position.y + projectile.radius <= 0) {
            projectiles.splice(index, 1)
        }
        else {
            projectile.update()
        }
    })

    grids.forEach(grid => {
        //grid.update()
        grid.dragons.forEach((dragon, i) => {
            dragon.update({velocity: {x: dragonSpeed, y: 0}})

            projectiles.forEach((projectile, j) => {
                if (projectile.position.y - projectile.radius -150 <= dragon.position.y + dragon.height && 
                    projectile.position.x + projectile.radius  >= dragon.position.x &&
                    projectile.position.x - projectile.radius - 100 <= dragon.position.x) {
                    setTimeout(() => {
                        grid.dragons.splice(i, 1)
                        projectiles.splice(j, 1)
                        dragonsKilled++
                        playerScore += 100*bonusScore
                        score.innerHTML = playerScore
                    }, 0)
                }
            })
        })
    })

    lifeCount.innerHTML = playerLives
    // change the amount of dragons based on how many killed
    // and also change the players score and life count
    if(dragonsKilled > 500) {
        dragonSpeed = 0.5
        dragonsOnScreen = 50
        bonusScore = 50
    }
    else if(dragonsKilled > 250) {
        dragonSpeed = 2.5
        dragonsOnScreen = 1000
        bonusScore = 25
        playerLives = 100
    }
    else if(dragonsKilled > 150) {
        dragonSpeed = 1.0
        dragonsOnScreen = 300
        bonusScore = 10
        playerLives = 50
    }
    else if (dragonsKilled > 125) {
        dragonSpeed = 0.75
        dragonsOnScreen = 400
        bonusScore = 8
        playerLives = 35
    }
    else if (dragonsKilled > 100) {
        dragonSpeed = 0.5
        dragonsOnScreen = 500
        bonusScore = 6
        playerLives = 30
    }
    else if (dragonsKilled > 75) {
        dragonSpeed = 0.5
        dragonsOnScreen = 600
        bonusScore = 5
        playerLives = 30
    }
    else if (dragonsKilled > 50) {
        dragonSpeed = 0.5
        dragonsOnScreen = 700
        bonusScore = 4
        playerLives = 30
    }
    else if (dragonsKilled > 25) {
        dragonSpeed = 0.5
        dragonsOnScreen = 800
        bonusScore = 3
        playerLives = 25
    }
    else if (dragonsKilled > 10) {
        dragonSpeed = 0.4
        dragonsOnScreen = 900
        bonusScore = 2
        playerLives = 20
    }
    
    // check if a key has been pressed and move the player
    if(keys.a.pressed && player.position.x > canvas.width-500) {
        player.velocity.x = -5
    }
    else if (keys.d.pressed && player.position.x+player.width+10 < canvas.width) {
        player.velocity.x = +5
    }
    else if(keys.w.pressed && player.position.y > 0) {
        player.velocity.y = -5
    }
    else if(keys.s.pressed && player.position.y + player.height < canvas.height) {
        player.velocity.y = +5
    }
    else {
        player.velocity.x = 0
        player.velocity.y = 0
    }

    // if code is put in here it calls projectile too many times
    if(keys.space.pressed) {
        
    }

    if (frames % dragonsOnScreen === 0) {
        grids.push(new Grid)
    }

    frames++
}

// start the game animation
animate()

// event listener to check if movement and attack keys are pressed
addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'a':
            //console.log("left")
            //player.velocity.x = -5
            keys.a.pressed = true;
            break
        case 'd':
            //console.log("right")
            //player.velocity.x = +5
            keys.d.pressed = true;
            break
        case 'w':
            //console.log("up")
            //player.velocity.y = -5
            keys.w.pressed = true;
            break
        case 's':
            //console.log("down")
            //player.velocity.y = +5
            keys.s.pressed = true;
            break
        case ' ':
            //console.log("shoot")
            keys.space.pressed = true;

            // add a projectile to the array
            // this is where the movement of the bullet is decided
            projectiles.push(
                new Projectile({
                    position: {
                        x: player.position.x + player.width / 2,
                        y: player.position.y
                    },
                    velocity: {
                        x: -10,
                        y: 0
                    }
                })
            )
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