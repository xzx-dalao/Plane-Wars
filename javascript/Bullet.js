function Bullet (img,x,y,speed,game){
    this.img = img
    this.x = x
    this.y = y
    this.speed=speed
    this.game = game
    this.cxt=game.cxt
    this.isLife=true
    this.draw=function(){
        this.cxt.drawImage(this.img,this.x,this.y,this.img.width,this.img.height)
        this.y-=this.speed
        if(this.y<0){
            this.isLife=false
        }
    }
    this.drawleft=function(){
        this.cxt.drawImage(this.img,this.x,this.y,this.img.width,this.img.height)
        this.y-=2
        this.x-=this.speed
        if(this.y<0||this.x<0){
            this.isLife=false
        }
    }
    this.drawright=function(){
        this.cxt.drawImage(this.img,this.x,this.y,this.img.width,this.img.height)
        this.y-=2
        this.x+=this.speed
        if(this.y<0||this.x>this.game.width){
            this.isLife=false
        }
    }
}