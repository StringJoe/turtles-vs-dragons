// get the canvas element from the web page and the context of the canvas
const canvas = document.querySelector('canvas')
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

// create the animation loop
function animate() {
    // clear the canvas each loop so image doesn't bleed as it moves
    c.clearRect(0, 0, canvas.width, canvas.height)
    
    // start animating the canvas
    requestAnimationFrame(animate)

    // call the update function for the player
    player.update()
}

// start the game animation
animate()

// event listener to check if movement and attack keys are pressed
addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'a':
            console.log("left")
            player.velocity.x = -5
            break
        case 'd':
            console.log("right")
            player.velocity.x = +5
            break
        case 'w':
            console.log("up")
            player.velocity.y = -5
            break
        case 's':
            console.log("down")
            player.velocity.y = +5
            break
        case ' ':
            console.log("shoot")
            break

    }
})

// event listener to check if movement and attack keys are not pressed
addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'a':
            console.log("left")
            player.velocity.x = 0
            break
        case 'd':
            console.log("right")
            player.velocity.x = 0
            break
        case 'w':
            console.log("up")
            player.velocity.y = 0
            break
        case 's':
            console.log("down")
            player.velocity.y = 0
            break
        case ' ':
            console.log("shoot")
            break

    }
})