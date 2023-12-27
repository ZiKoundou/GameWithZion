const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = .9
class Sprite {
    constructor({position, velocity, color = 'blue'}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.attackBox = {
            position: this.position ,
            width: 100,
            height: 50,
        }
        this.color = color
        this.isAttacking
    }
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x,this.position.y,this.width,this.height)

        c.fillStyle = 'white'
        c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height)
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
    }
    attack() {
        this.switchSprite('attack1')
        this.isAttacking = true
        setTimeout(()=> {
            this.isAttacking = false
        },100)
    }
}
const player = new Sprite({
    position: {
        x: 20,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 10,
    }
}) 
const player2 = new Sprite({
    position: {
        x: 955,
        y: 200,
    },
    velocity: {
        x: 0,
        y: 10,
    },
    color: 'white'
}) 
// player.draw()
// player2.draw()
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}
let lastKey
function animation() {
    window.requestAnimationFrame(animation)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    player2.update()
    player.velocity.x = 0
    player2.velocity.x = 0
    if(keys.a.pressed == true){ //&& player.lastKey == 'a') {
        player.velocity.x = -10
    } else if(keys.d.pressed == true){ //&& player.lastKey == 'd') {
        player.velocity.x = 10
    } else {
        player.velocity.x = 0
    }

    if(keys.ArrowLeft.pressed == true){ //&& player2.lastKey == 'ArrowLeft') {
        player2.velocity.x = -10
    } else if(keys.ArrowRight.pressed == true){ //&& player2.lastKey == 'ArrowRight') {
        player2.velocity.x = 10
    } else {
        player2.velocity.x = 0
    }

    
}
animation()
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            // player.velocity.x = 1
            keys.d.pressed = true
            player.lastkey = 'd'
            break
        case 'a':
            // player.velocity.x = -1
            keys.a.pressed = true
            player.lastkey = 'a'
            break
        case 'w':
            player.velocity.y -= 20
            break
        case 'c':
            player.attack()
            break
        case 'ArrowRight':
            // player2.velocity.x = 1
            keys.ArrowRight.pressed = true
            player2.lastkey = 'ArrowRight'
            break
        case 'ArrowLeft':
            // player2.velocity.x = -1
            keys.ArrowLeft.pressed = true
            player2.lastkey = 'ArrowLeft'
            break
        case 'ArrowUp':
            player2.velocity.y -= 20
            break
        case '.':
            // player2.isAttacking = true;
            player2.attack()
            break
    }
})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            // player.velocity.x = 0
            keys.d.pressed = false
            break
        case 'a':
            // player.velocity.x = 0
            keys.a.pressed = false
            break
        ///player 2 movements
        case 'ArrowRight':
            // player2.velocity.x = 0
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            // player2.velocity.x = 0
            keys.ArrowLeft.pressed = false
            break
    }

})