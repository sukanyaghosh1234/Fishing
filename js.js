var myHero;
	//var fish;
	var fishes=[];
	var fishCount=9;
	var collisions=0;
	var i=60;
	
	var myGameArea={
		canvas:document.getElementById("myFishingGame"),
		//canvas:document.createElement("myFishingGame"),
		start:function(){
			this.context=this.canvas.getContext("2d");
			this.interval=setInterval(updateGameArea,20); //in ms
			window.addEventListener('keydown', function (e) {
	            myGameArea.key = e.keyCode;
	        })
	        window.addEventListener('keyup', function (e) {
	            myGameArea.key = false;
	        })
		},
		clear:function(){
			this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		}
	}
	var startGame=function()
		{
			alert("Game Is Starting");
			
			myGameArea.start();
			myHero=new component(70,70,"fish1.png",400,200,0,"image");
			for(var i=0;i<fishCount;i++){
				var myRandomNo=Math.floor(Math.random() *380+1);
				var RandomSpeed=Math.floor(Math.random()*4+1);
				fishes.push(new component(40,20,"fish2.png",0,myRandomNo,RandomSpeed,"image"));
			}
		}
	var onTimer=function()
			{
				document.getElementById("timer").innerHTML = i;
				i--;
				setTimeout(onTimer, 1000);
				if(i==-2){
					alert("Game Over");
					i=60;
					document.getElementById("timer").innerHTML = 60;
					collisions=0;
					document.getElementById("collisions").innerHTML = 0;
					myHero=new component(40,40,"fish1.png",400,200,0,"image");
					location.reload();
				}
			}
	function updateGameArea(){
		myGameArea.clear();
		myHero.speedX = 0;
	    myHero.speedY = 0;    
	    if (myGameArea.key && myGameArea.key == 37) {myHero.speedX = -3; }
	    if (myGameArea.key && myGameArea.key == 39) {myHero.speedX = 3; }
	    if (myGameArea.key && myGameArea.key == 38) {myHero.speedY = -3; }
	    if (myGameArea.key && myGameArea.key == 40) {myHero.speedY = 3; }
	    myHero.newPos(); 
	    myHero.update();   
	    for(var i=0;i<fishCount;i++){
			fishes[i].x=fishes[i].x+fishes[i].speed;
			if (fishes[i].x>=myHero.x && fishes[i].x<=myHero.x+myHero.width && fishes[i].y>=myHero.y && fishes[i].y<=myHero.y+myHero.height) 
			{
				fishes[i].x=0;
				fishes[i].y=Math.floor(Math.random()*380+1);
				collisions++;
				document.getElementById("collisions").innerHTML=collisions;
			}
			if(fishes[i].x>700){
				fishes[i].x=0;
				fishes[i].y=Math.floor(Math.random()*380+1);
			}
			fishes[i].update();
		}
	}
	function component(width,height,color,x,y,speed,type)
	{
		this.type=type;
		if(type=="image"){
			this.image=new Image();
			this.image.src=color;
		}
		this.width=width;
		this.height=height;
		this.speedX = 0;
		this.speedY = 0; 
		this.x=x;
		this.y=y;
		this.speed=speed;
		this.update=function(){
			ctx=myGameArea.context;
			ctx.fillStyle=this.color;
			if (type == "image") {
		      ctx.drawImage(this.image,this.x, this.y,this.width, this.height);
		    } 
		}
		this.newPos = function() {
	        this.x += this.speedX;
	        this.y += this.speedY; 
	        this.Bottom();
	        this.Top();
	        this.Left();
	        this.Right();       
	    }
	    this.Bottom= function(){
	    var bottom = myGameArea.canvas.height - myHero.height;
	    if (myHero.y > bottom) {
	        myHero.y = bottom;
	        }
	    }
	    this.Top= function(){
	    if (myHero.y < 0) {
	        myHero.y = 0;
	        }
	    }
	    this.Left= function(){
	    if (myHero.x < 0) {
	        myHero.x = 0;
	        }
	    }
	    this.Right= function(){
	    var right = myGameArea.canvas.width - myHero.width;
	    if (myHero.x > right) {
	        myHero.x = right;
	        }
	    }
    }
