function MyPlane(img, x, y, game) {
    this.img = img
    this.x = x
    this.y = y
    this.game = game
    this.cxt = game.cxt
    this.draw = function () {
        this.cxt.drawImage(this.img, this.x, this.y, this.img.width, this.img.height)

    }
    this.move = function () {
        var obj = this;
        document.addEventListener("mousemove", e => {
            var x = e.pageX - this.img.width / 2
            var y = e.pageY - this.img.height / 2
            if (x < 0) x = 0
            if (y < 0) y = 0
            if (x > game.width - this.img.width) x = game.width - this.img.width
            if (y > game.height - this.img.height) y = game.height - this.img.height
            obj.x = x
            obj.y = y
        })
    }

}



