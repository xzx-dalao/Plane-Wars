function Background(img,x,y,speed,game) {
    this.img=img
    this.x=x
    this.y=y
    this.width=game.width
    this.height=game.height
    this.game=game
    this.cxt=game.cxt
    this.speed=speed
    this.draw=function(){
        this.cxt.drawImage(this.img,this.x,this.y,this.width,this.height);
        this.y+=this.speed
        if(this.y>this.height){
            this.y=-this.height
        }
        
    }   
}