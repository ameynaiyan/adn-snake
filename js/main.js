			var gameState=0;
			var step = 64;
			var col=10;
			var row=col*3/5;
			var FPS=2.0;
			var CANVAS_WIDTH = step*col;
			var CANVAS_HEIGHT = step*row;
			var canvasElement = $('<canvas width="' + CANVAS_WIDTH + '" height="' + CANVAS_HEIGHT + '" ></canvas>');
			var canvas = canvasElement.get(0).getContext("2d");
			var timer;
			var snake=[];
			var direction=2;
			var difficulty=1;
			var directionChangeFlag=0;
			var food;
			var bonus;
			var score =0;
			var hsName="";
			var newHS;
			var leaderboard=[];
			var newboard=[];
			var tmp_pos;
			var bonusbar=100;
			var bt=0;
			var bblink = 0;
			function Body(xpos,ypos){
 	 			this.color= "#000";
  				this.x= xpos;
  				this.y= ypos;
 	 			this.width= step;
  				this.height= step;
			}
			Body.prototype.draw=function(){
				//var grd=canvas.createRadialGradient(75,50,5,90,60,100);
				//grd.addColorStop(0,"#ffd79b");
				//grd.addColorStop(1,"#FF7F04");
				canvas.fillStyle = this.color;
    				canvas.fillRect(this.x, this.y, this.width, this.height);
				canvas.lineWidth = step/16;
      				canvas.strokeStyle = 'white';
     				canvas.strokeRect(this.x, this.y, this.width, this.height);
			};
	
			$(document).ready(function(){
				hideAll();
				$(".menuView").show();
				$(".resume").hide();
				$(".bbDiv").hide();
				if(localStorage.getItem("snake_scores")===null){
					var emptyField;
					for(var i=0;i<5;i++){
						emptyField = new Highscore("-",0);
						newboard.push(emptyField);
					}
					localStorage.setItem("snake_scores",JSON.stringify(newboard));
				}
				canvasElement.appendTo('.canvasDiv');
				var myElement = document.getElementById('canvasDiv');
				var mc = new Hammer(myElement);
				mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
				mc.on("panleft", function(ev) {
					if(direction!=2&&directionChangeFlag==0){
    						direction=4;
						directionChangeFlag=1;
					}
				});
				mc.on("panright", function(ev) {
					if(direction!=4&&directionChangeFlag==0){
    						direction=2;
						directionChangeFlag=1;
					}
				});
				mc.on("panup", function(ev) {
    					if(direction!=3&&directionChangeFlag==0){
						direction=1;
						directionChangeFlag=1;
					}
				});

				mc.on("pandown", function(ev) {
					if(direction!=1&&directionChangeFlag==0){
    						direction=3;
						directionChangeFlag=1;
					}
				});
				$(".namePrompt").hide();
				$(".newHSDisplay").hide();
				$(document).bind('keydown', function(e) {
					if(directionChangeFlag==0)
					{
						if(e.keyCode==37&&direction!=2){
							direction=4;
							console.log("<");
						}
						if(e.keyCode==38&&direction!=3){
							direction=1;
							console.log("^");
						}
						if(e.keyCode==39&&direction!=4){
							direction=2;
							console.log(">");
						}
						if(e.keyCode==40&&direction!=1){
							direction=3;
							console.log("v");
						}
						directionChangeFlag=1;
					}
				});
				$(".pause").click(function(event){
					event.preventDefault();
					console.log("pause");
					clearInterval(timer);
					$(".resume").show();
					$(this).hide();
					
				});
				$(".resume").click(function(event){
					event.preventDefault();
					console.log("resume");
					timer = setInterval(function() {
 	 					update();
  						draw();
					}, 1000/FPS);
					$(".pause").show();
					$(this).hide();
				});

				
				$(".size64").click(function(event){
					event.preventDefault();
					$(".size16").removeClass("btn-active");
					$(".size32").removeClass("btn-active");
					$(".size64").addClass("btn-active");
					step=64;
					col=10;
					row=6;
				});
				$(".size32").click(function(event){
					event.preventDefault();
					$(".size16").removeClass("btn-active");
					$(".size64").removeClass("btn-active");
					$(".size32").addClass("btn-active");
					step=32;
					col=20;
					row=12;
				});
				$(".size16").click(function(event){
					event.preventDefault();
					$(".size64").removeClass("btn-active");
					$(".size32").removeClass("btn-active");
					$(".size16").addClass("btn-active");
					step=16;
					col=40;
					row=24;
				});

				
				$(".easy").click(function(event){
					event.preventDefault();
					$(".medium").removeClass("btn-active");
					$(".hard").removeClass("btn-active");
					$(".easy").addClass("btn-active");
					difficulty=1;
				});
				$(".medium").click(function(event){
					event.preventDefault();
					$(".easy").removeClass("btn-active");
					$(".hard").removeClass("btn-active");
					$(".medium").addClass("btn-active");
					difficulty=2;
				});
				$(".hard").click(function(event){
					event.preventDefault();
					$(".easy").removeClass("btn-active");
					$(".medium").removeClass("btn-active");
					$(".hard").addClass("btn-active");
					difficulty=3;
				});
				$(".play").click(function(event){
					event.preventDefault();					
					hideAll();
					$(".gameView").show();
					clearInterval(timer);
					snake=[];
					direction=2;
					if(difficulty==1){
						FPS=2.0;
					}
					if(difficulty==2){
						FPS=4.0;
					}
					if(difficulty==3){
						FPS=6.0;
					}
					var b1 = new Body(step*4,step);
					snake.push(b1);
					var b2 = new Body(step*3,step);
					snake.push(b2);
					var b3 = new Body(step*2,step);
					snake.push(b3);
					score =0;
					food = new Body(step*5,step*5);
					food.color = "teal";
					bonus = new Body(-step,-step);
					bonus.color="teal";
					console.log("play");
					timer = setInterval(function() {
 	 					update();
  						draw();
					}, 1000/FPS);
					$(".resume").hide();
					$(".pause").show();
					$(".pts").html(score);
				});
				$(".back").click(function(event){
					if(gameState==1){
						gameState=0;
						hideAll();
						$(".menuView").show();
					}else if(gameState==2){
						gameState=0;
						hideAll();
						$(".menuView").show();
					}else if(gameState==3){
						gameState=0;
						hideAll();
						clearInterval(timer);
						snake=[];
						$(".menuView").show();
					}else if(gameState==4){
						gameState=0;
						hideAll();
						clearInterval(timer);
						snake=[];
						$(".menuView").show();
					}
					leaderboard.splice(0,leaderboard.length);
					$(".newHSDisplay").hide();
				});
				$(".replay").click(function(event){
					event.preventDefault();
					hideAll();
					clearInterval(timer);
					gameState=3;
					direction=2;
					if(difficulty==1){
						FPS=2.0;
					}
					if(difficulty==2){
						FPS=4.0;
					}
					if(difficulty==3){
						FPS=6.0;
					}
					$(".gameView").show();
					snake=[];
					var b1 = new Body(step*4,step);
					snake.push(b1);
					var b2 = new Body(step*3,step);
					snake.push(b2);
					var b3 = new Body(step*2,step);
					snake.push(b3);
					score =0;
					food = new Body(step*5,step*5);
					food.color = "teal";
					bonus = new Body(-step,-step);
					bonus.color="teal";
					console.log("replay");
					timer = setInterval(function() {
 	 					update();
  						draw();
					}, 1000/FPS);
					$(".resume").hide();
					$(".pause").show();
					$(".pts").html(score);
					
					$(".newHSDisplay").hide();
				});
				$(".newGame").click(function(event){
					gameState=1;
					hideAll();
					$(".ngView").show();
				});
				$(".highScores").click(function(event){
					gameState=2;
					hideAll();
					$(".hsView").show();
				});
				$(".exit").click(function(event){
					hideAll();
				});
				$(".nameSubmit").click(function(event){
					hsName = $(".inputBox").val();
					newHS = new Highscore(hsName,score);
					$(".namePrompt").hide();	
					for(var i=0;i<5;i++){
						if(i<tmp_pos)
							newboard[i]=leaderboard[i];
						newboard[tmp_pos]=newHS;
						if(i>tmp_pos){
							newboard[i]=leaderboard[i-1];
						}
					}
					localStorage.setItem("snake_scores",JSON.stringify(newboard));
					genList();
					$(".newHSDisplay").show();
				});
				$(".highScores").click(function(event){
					genList();
				});

			});

			function genList(){
				leaderboard = JSON.parse(localStorage.getItem("snake_scores"));
				$(".sc-list").empty();
				for(var i=0;i<5;i++){
					if(gameState==4&&i==tmp_pos){
						$(".sc-list").append('<div class="clrb menu-item menu-item-anim"><div class="sc-base sc-hs sc-pos">'+parseInt(i+1)+'</div><div class="sc-base sc-hs sc-name">'+leaderboard[i].name+'</div><div class="sc-base sc-hs sc-score">'+leaderboard[i].score+'</div></div>');
					}else{
						$(".sc-list").append('<div class="clrb menu-item menu-item-anim"><div class="sc-base sc-pos">'+parseInt(i+1)+'</div><div class="sc-base sc-name">'+leaderboard[i].name+'</div><div class="sc-base sc-score">'+leaderboard[i].score+'</div></div>');
					}
				}
			}
			
			function hideAll(){
				$(".menuView").hide();
				$(".gameView").hide();
				$(".ngView").hide();
				$(".hsView").hide();
				$(".resultView").hide();
			}
			function draw() {
  				canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
				food.draw();
				if(bt==1){
					bonus.draw();
				}
				canvas.lineWidth = step/16;
      				canvas.strokeStyle = 'black';
     				canvas.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
				for(var i=0;i<snake.length;i++)
				{
					
 		 			snake[i].draw();
				}
				directionChangeFlag=0;
			}
			function update() {
				
				for(var i=snake.length-1;i>0;i--)
				{
					
 		 			snake[i].x=snake[i-1].x;
					snake[i].y=snake[i-1].y;
				}
				if (direction==1) {
    					snake[0].y -= step;
					console.log(snake[0].x+","+snake[0].y);
  				}
  				if (direction==2) {
    					snake[0].x += step;
					console.log(snake[0].x+","+snake[0].y);
  				}
				if (direction==3) {
					snake[0].y += step;
					console.log(snake[0].x+","+snake[0].y);
  				}
				if (direction==4) {
					snake[0].x -= step;
					console.log(snake[0].x+","+snake[0].y);
  				}
				for(var i=snake.length-1;i>0;i--)
				{
					if(snake[0].x==snake[i].x&&snake[0].y==snake[i].y)
					{
						hitFlicker();
					}
				}
				if(snake[0].x<0){
					snake[0].x=CANVAS_WIDTH-snake[0].width;
				}
				if(snake[0].x>CANVAS_WIDTH-snake[0].width){
					snake[0].x=0;
				}
				if(snake[0].y<0){
					snake[0].y=CANVAS_HEIGHT-snake[0].height;
				}
				if(snake[0].y>CANVAS_HEIGHT-snake[0].height){
					snake[0].y=0;
				}
				//if(snake[0].x<0||snake[0].x>CANVAS_WIDTH-snake[0].width||snake[0].y<0||snake[0].y>CANVAS_HEIGHT-snake[0].height){
				//	hitFlicker();
				//}
				if(snake[0].x==food.x&&snake[0].y==food.y){
					score+=10;
					$(".pts").html(score);
					if(score%100==0&&score!=0&&bt==0){
						
						var c;
						bt=1;
						$(".bbDiv").show();
						do{
							c=1;
							bonus.x = Math.floor(Math.random() * col)*step;
							bonus.y = Math.floor(Math.random() * row)*step;
							for(var i=0;i<snake.length;i++)
							{
								if(bonus.x==snake[i].x&&bonus.y==snake[i].y){
									c=0;
								}
							}
						}while(c==0);
						var btimer = setInterval(function() {
							bonusbar-=1;
 	 						$(".bonusbar").css( "width", bonusbar+"%" );
							if(bonusbar%3==0){
								if(bblink==0){
									bblink=1;
									$(".bonusbar").css( "background-color", "black" );
									bonus.color="black";								
								}
								else{
									bblink=0;
									$(".bonusbar").css( "background-color", "teal" );
									bonus.color="teal";
								}
							}
						}, 100);
						setTimeout(function(){
							clearInterval(btimer);
							bonus.x =-step;
							bonus.y =-step;
							bt=0;
							bonusbar = 100;
							$(".bonusbar").css( "width", "100%" );
							$(".bbDiv").hide();
						}, 10000);

					}
					var bNew = new Body(food.x,food.y);
					snake.push(bNew);
					var c;
					do{
						c=1;
						food.x = Math.floor(Math.random() * col)*step;
						food.y = Math.floor(Math.random() * row)*step;
						for(var i=0;i<snake.length;i++)
						{
							if(food.x==snake[i].x&&food.y==snake[i].y){
								c=0;
							}
						}
					}
					while(c==0);
					FPS+=0.25;
					clearInterval(timer);
					timer = setInterval(function() {
 	 						update();
  							draw();
						}, 1000/FPS);
				}
				if(snake[0].x==bonus.x&&snake[0].y==bonus.y){
					clearInterval(btimer);
					bonus.x =-step;
					bonus.y =-step;
					bt=0;
					bonusbar = 100;
					$(".bonusbar").css( "width", "100%" );
					$(".bbDiv").hide();
					score+=50;
					$(".pts").html(score);
				}
			}
			function Highscore(name,score){
				this.name=name;
				this.score=score;
			}
				
			function hitFlicker(){
				clearInterval(timer);	
				var clear=0;	
				var cCount=0;	
				var ftimer = setInterval(function() {
					if(clear==0){
						canvas.clearRect(step/16, step/16, CANVAS_WIDTH-step/8, CANVAS_HEIGHT-step/8);
						clear=1;
					}
					else if(clear==1)
					{
  						draw();
						clear=0;
						cCount++;
					}
					if(cCount==3){
						gameState=4;
						canvas.clearRect(step/16, step/16, CANVAS_WIDTH-step/8, CANVAS_HEIGHT-step/8);
						hideAll();
						clearInterval(timer);
						clearInterval(ftimer);
						snake=[];
						$(".resultView").show();
						leaderboard = JSON.parse(localStorage.getItem("snake_scores"));
						newboard.splice(0,newboard.length);
						var found=0;
						for(var i=0;i<leaderboard.length;i++){
							if(leaderboard[i].score<=score){
								tmp_pos = i;
								found=1;
								break;
							}
							else{
								found=0;
							}
						}
						if(found==1){
							$(".namePrompt").show();
						}else{
							$(".namePrompt").hide();
						}
						$(".finalscore").html(score);		
							
					}
				}, 100);
			}