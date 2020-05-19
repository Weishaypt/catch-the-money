const debug = true
function $ (selector, ctx = document) {
    const nodes = Array.from(document.querySelectorAll(selector))
    return {
        nodes,
        on (event, handler) {
            this.nodes.map(item => {
                item.addEventListener(event, handler)
            })
        }
    }
}
function Player () {
    this.el = $('.player')
    this.score = 0
    //direction
    this.dir = 'right'
    window.addEventListener('keydown', this.onKeyDown.bind(this))
}
Player.prototype.onKeyDown = function (e) {
    switch (e.key) {
        case "ArrowLeft" : {
            if(this.dir !== 'left')
            {
                this.dir = 'left'
                this.el.nodes[0].classList.remove('right')
                this.el.nodes[0].classList.add('left')
            }
        }
        break
        case "ArrowRight" : {
            if(this.dir !== 'right')
            {
                this.dir = 'right'
                this.el.nodes[0].classList.remove('left')
                this.el.nodes[0].classList.add('right')
            }
        }
            break
        default: {
            if(debug) console.log(e.key)
        }
    }
}
function Bank (name, offset) {
    this.name = name
    this.offset = offset
    this.coins = []
    this.y = 260
    for (let i = 0; i < 10; i++) {
        this.y -= 200 + this.offset
        this.coins.push(new Coin(this.name,  this.y))
    }

}
function Coin (bank, y) {
    this.el = document.createElement('div')
    this.el.classList.add('coin')
    this.el.classList.add(bank)
    this.el.style.top = '60px'
    this.position = {

        y: y
    }

    $('.coins').nodes[0].append(this.el)
}

function Game () {
    this.player = new Player()
    this.banks = {
        'left': new Bank('left', 225),
        'right': new Bank('right', 110)
    }

    setInterval(this.update.bind(this), 1)
}
Game.prototype.update = function () {
    $('.counter').nodes[0].innerText = this.player.score
    for (const bank in this.banks) {
        this.banks[bank].coins.forEach(coin => {
            coin.position.y += 1
            coin.el.style.top = coin.position.y + 'px'
            if(coin.position.y > 225 &&
                coin.position.y < 300 &&
                this.banks[bank].name === this.player.dir
            )
            {
                this.player.score += 1
                coin.el.remove()
                this.banks[bank].coins.shift()
            }
            if(coin.position.y > 450) {
                coin.el.remove()
                this.banks[bank].coins.shift()
            }
        })
    }
}

window.addEventListener('load', function () {
    const game = new Game()
})
