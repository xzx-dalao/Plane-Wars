
function Game(box) {

    this.width = box.width = window.innerWidth;
    this.height = box.height = window.innerHeight;
    this.cxt = box.getContext('2d');//获取画布上下文
    // this.cxt.fillStyle = "#F00"
    this.cxt.fillRect(0, 0, this.width, this.height)
    this.bgPath = [
        "image/bg_01.jpg", "image/bg_02.jpg", "image/bg_03.jpg",
        "image/bg_04.jpg", "image/bg_05.jpg"
    ];
    this.bgArray = []//存储的是加载图片的数据
    this.loadNow = 0;
    this.loadAll = 7;
    this.myplanepath = "image/myplane1.png"//我方飞机图片资源
    this.myplaneImg = null

    this.bulletPath = "image/bullet1.png"
    this.bulletImg = null
    this.bulletTime = new Date().getTime()//创建一个子弹生成时间
    this.bulletArray = []//存储子弹的数组
    this.bulletArrayleft = []
    this.bulletArrayright = []

    this.enemyPath = ['image/dj1.png','image/dj6.png','image/dj10.png']
    this.enemyImg = []
    this.enemyArray = []
    this.enemyArray1 = []
    this.enemyArray2 = []
    this.enemyArray3 = []
    this.enemyTime = new Date().getTime()

    this.numPath=['image/0.png','image/1.png','image/2.png',
    'image/3.png','image/4.png','image/5.png','image/6.png',
    'image/7.png','image/8.png','image/9.png'
]
    this.numImg=[]
    this.audio=null
    this.audioPath='audio/zd.mp3'
    //开始游戏
    this.startGame = function () {
        var o = this;
        this.bgPath.forEach(value => {
            var img = o.loadImg(value);
            o.bgArray.push(img)
        });
        var bgimg = this.bgArray[parseInt(Math.random() * 5)];
        // var bgY = 0;
        // console.log(this)
        this.bg1 = new Background(bgimg, 0, 0, 0.8, this)//封装背景对象
        this.bg2 = new Background(bgimg, 0, -o.height, 0.8, this)
        this.myplaneImg = this.loadImg(this.myplanepath)
        // console.log(this.myplaneImg.width,this.myplaneImg.height)
        this.myplane = new MyPlane(this.myplaneImg, (this.width - this.myplaneImg.width) / 2.0, this.height - this.myplaneImg.height, this);//封装我方飞机对象
        this.myplane.move()
        this.bulletImg = this.loadImg(this.bulletPath)//加载子弹
        // this.enemyImg=this.loadImg(this.enemyPath)
        this.enemyPath.forEach(value => {
            var Img = o.loadImg(value);
            o.enemyImg.push(Img )
        });//加载敌机
        this.numPath.forEach(value => {
            var Num = o.loadImg(value);
            o.numImg.push(Num )
        });//加载数字
        // this.audio=this.loadAudio(this.audioPath)
        function animate() {
            if (o.loadNow >= o.loadAll) {
                o.runGame()
                // o.audio.play()
            }
            requestAnimationFrame(animate)//每隔16.7ms执行一次
        }
        animate()
    }


    this.runGame = function () {
        var obj = this
        this.bg1.draw()
        this.bg2.draw()
        this.myplane.draw()
        var currentTime = new Date().getTime()
        //每隔一百秒生成一个子弹
        if (currentTime - this.bulletTime) {
            var bullet = new Bullet(this.bulletImg, this.myplane.x + 25, this.myplane.y, 1, this)
            var bullet1 = new Bullet(this.bulletImg, this.myplane.x + 50, this.myplane.y, 1, this)
            var bullet2 = new Bullet(this.bulletImg, this.myplane.x + 75, this.myplane.y, 1, this)
            var bullet3 = new Bullet(this.bulletImg, this.myplane.x, this.myplane.y, 1, this)
            var bullet4 = new Bullet(this.bulletImg, this.myplane.x + 95, this.myplane.y, 1, this)
            var arr1 = [bullet, bullet1, bullet2]
            this.bulletArray.push(...arr1)
            this.bulletArrayleft.push(bullet3)
            this.bulletArrayright.push(bullet4)
            this.bulletTime = currentTime
        }
        this.bulletArray.forEach((item, index) => {
            if (!item.isLife) {
                obj.bulletArray.splice(index, 1)
            }
            item.draw()
        })
        this.bulletArrayleft.forEach((item, index) => {
            if (!item.isLife) {
                obj.bulletArrayleft.splice(index, 1)
            }
            item.drawleft()
        })
        this.bulletArrayright.forEach((item, index) => {
            if (!item.isLife) {
                obj.bulletArrayright.splice(index, 1)
            }
            item.drawright()
        })

        //生成敌机
        if(currentTime-this.enemyTime>100){ 
            var eimg=this.enemyImg[parseInt(Math.random()*3)]//生成随机的敌机
            var x1=parseInt(Math.random()*(obj.width-eimg.width))//生成敌机坐标
            var y1=-eimg.height  
            var x2=-eimg.width 
            var y2=parseInt(Math.random()*(obj.height-eimg.height))//生成敌机坐标
            var x3=obj.width+eimg.width 
            var y3=parseInt(Math.random()*(obj.height-eimg.height))//生成敌机坐标
            var speed =parseInt(Math.random()*20) 
            var enemy1=new EnemyPlane(eimg,x1,y1,speed,500,this) 
            var enemy2=new EnemyPlane(eimg,x2,y2,speed,500,this) 
            var enemy3=new EnemyPlane(eimg,x3,y3,speed,500,this) 
            this.enemyArray1.push(enemy1)
            this.enemyArray2.push(enemy2)
            this.enemyArray3.push(enemy3)
            this.enemyTime=currentTime
        }
        this.enemyArray1.forEach((item,index)=>{
            if (!item.isLife) {
                obj.enemyArray1.splice(index, 1)
            }
            item.draw()
           
        })
        this.enemyArray2.forEach((item,index)=>{
            if (!item.isLife) {
                obj.enemyArray2.splice(index, 1)
            }
            item.drawleft()
        })
        this.enemyArray3.forEach((item,index)=>{
            if (!item.isLife) {
                obj.enemyArray3.splice(index, 1)
            }
            item.drawright()
        })

    }
    //定义一个方法加载图片
    this.loadImg = function (path) {
        var o = this;
        var img = new Image()
        img.src = path
        img.onload = function () {
            o.loadNow++;//加载图片数量
        }
        img.onerror = function () {
            alert(path + '加载失败')
            location.reload()
        }
        return img
    }
    // this.loadAudio=(path)=>{
    //     var o =this
    //     var au=new Audio()
    //     au.src=pathau.onlode
    // }
}





window.onload = function () {
    var box = document.getElementById('gamebox');
    var ga = new Game(box)//创建一个对象
    ga.startGame();//开始运行游戏
} 