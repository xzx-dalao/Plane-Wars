function EnemyPlane(img,x,y,speed,hp,game){
    this.img = img
    this.x = x
    this.y = y
    this.speed=speed
    this.game = game
    this.cxt=game.cxt
    this.hp=hp
    this.isLife=true
    this.draw=function(){
        this.cxt.drawImage(this.img,this.x,this.y,this.img.width,this.img.height)
        this.y+=this.speed
        if(this.y>this.game.height){
            this.isLife=false
        }
    }
    this.drawleft=function(){
        this.cxt.drawImage(this.img,this.x,this.y,this.img.width,this.img.height)
        this.x+=this.speed
        if(this.x>this.game.width){
            this.isLife=false
        }
    }
    this.drawright=function(){
        this.cxt.drawImage(this.img,this.x,this.y,this.img.width,this.img.height)
        this.x-=this.speed
        if(this.x<0){
            this.isLife=false
        }
    }
    
}