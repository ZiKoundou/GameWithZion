const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = .9
class Sprite {
    constructor({position, velocity, color = 'blue', offset, offsetL}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            offsetL,
            width: 100,
            height: 50,
        }
        this.color = color
        this.isAttacking
        // this.isAttackingLeft
    }
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x,this.position.y,this.width,this.height)

        if(this.isAttacking == true) {
            c.fillStyle = 'white'
            c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height)
        } //else if(this.isAttackingleft == true) {
        //     c.fillStyle = 'white'
        //     c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height)
        // }
        
    }
    update() {
        this.draw()
        // if(this.isAttackingLeft) {
        //     this.attackBox.position.x = this.position.x + this.attackBox.offsetL.x
        //     this.attackBox.position.y = this.position.y + this.attackBox.offsetL.y
        //} else 
        // if (this.isAttacking) {
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x
        this.attackBox.position.y = this.position.y - this.attackBox.offset.y
        // }
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
    }
    attack() {
        // this.switchSprite('attack1')
        this.isAttacking = true
        setTimeout(()=> {
            this.isAttacking = false
        },100)
    }
    // attackLeft() {
    //     // this.switchSprite('attack1')
    //     this.isAttackingLeft = true
    //     setTimeout(()=> {
    //         this.isAttackingLeft = false
    //     },100)
    // }
}
const player = new Sprite({
    position: {
        x: 20,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 10,
    },
    offset: {
        x: 0,
        y: 0
    },
    // offsetL: {
    //     x: -50,
    //     y: 0
    // },
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
    offset: {
        x: 50,
        y: 0
    },
    // offsetL: {
    //     x: -50,
    //     y: 0
    // },
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
function collision({
    rectangle1,
    rectangle2
}) {
    if(rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width 
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && rectangle1.attackBox.position.y < rectangle2.position.y + rectangle2.height) {
            return true;
    }
    return false;
}
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
    //attack
    if(collision({
        rectangle1: player,
        rectangle2: player2
    }) && player.isAttacking) {
        player.isAttacking = false
    } 
    //attack for player2
    if(collision({
        rectangle1: player2,
        rectangle2: player
    }) && player2.isAttacking) {
        player2.isAttacking = false
    }

    // if(collision({
    //     rectangle1: player,
    //     rectangle2: player2
    // }) && player.isAttackingL) {
    //     player.isAttackingL = false
    // } 
    // //attack for player2
    // if(collision({
    //     rectangle1: player2,
    //     rectangle2: player
    // }) && player2.isAttackingL) {
    //     player2.isAttackingL = false
    // }

    
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
        // case 'x':
        //     player.attackLeft()
        //     break
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
        // case '/':
        //     // player2.isAttacking = true;
        //     player2.attackLeft()
        //     break
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