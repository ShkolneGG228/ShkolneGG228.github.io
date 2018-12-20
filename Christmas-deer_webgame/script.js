var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var deer = new Image();
var bg = new Image();
var fg = new Image();
var gift_1 = new Image();
var spruce = new Image();
var bomb = new Image();


var sound_gift = new Audio();
var boom = new Audio();

boom.volume = 0.1;
sound_gift.volume = 0.1;

sound_gift.src = "audio/gift.wav";
boom.src = "audio/boom.mp3";

bg.src = "img/bg.png";
fg.src = "img/fg.png";
deer.src = "img/deer.png";
gift_1.src="img/gift_1.png";
bomb.src = "img/bomb.png";
spruce.src = "img/spruce.png";


/*function PlayOrPause() {
	if(song1.paused) {
       song1.play();
       $("#vocie img").attr("src","img/audio/voiceon.png");
    } else {
       song1.pause();
       $("#voice img").attr("src","img/audio/voiceoff.png");
    }
  }*/
  

  function MoveUp(){
  	yPos-=50;
  }
  function MoveDown(){
  	yPos+=50;
  }
  var num=0;
  function MoveGift(){

  	for(var i = 0 ; i < gift.length;i++){
  		ctx.drawImage(gift_1,gift[i].x,gift[i].y);
  		gift[i].x-=10;

  		if(gift[i].x == 800){
  			gift.push({
  				x : 1450,
  				y : Math.random()*(bg.height - fg.height - gift_1.height -fg.height)
  			})
  		}

  		if((xPos + deer.width >= gift[i].x)
  			&& (xPos <= gift[i].x + gift_1.width)
  			&& (yPos + deer.height - 60 >= gift[i].y)
  			&& (yPos+40 <= gift[i].y + gift_1.height))
  		{
  			delete gift[i].x;sc++;delete gift[i].y ; sound_gift.play();
  		}

  		if(gift[i].x + gift_1.width == 700){delete gift[i].x ;}	
  	}
  }

  function MoveSpruce(){

  	for(var i = 0 ; i < gift.length;i++){
  		ctx.drawImage(spruce,spruce_mas[i].x,spruce_mas[i].y);

  		spruce_mas[i].x-=10;

  		if(spruce_mas[i].x == 800){
  			spruce_mas.push({
  				x:1150,
  				y:(Math.random() * 100)+300
  			})
  		}

  	}
  }

  function MoveBomb(){
  	for(var i = 0 ; i < bombs_mas.length;i++){
  		ctx.drawImage(bomb,bombs_mas[i].x,bombs_mas[i].y);
  		bombs_mas[i].x-=15;

  		if(bombs_mas[i].x == 650){
  			bombs_mas.push({
  				x : 2000,
  				y : Math.random()*(bg.height - fg.height - gift_1.height -fg.height)
  			})
  		}

  		if((xPos + deer.width >= bombs_mas[i].x)
  			&& (xPos <= bombs_mas[i].x + bomb.width)
  			&& (yPos + deer.height - 60 >= bombs_mas[i].y)
  			&& (yPos+40 <= bombs_mas[i].y + bomb.height))
  		{
  			delete bombs_mas[i].x;delete bombs_mas[i].y ; boom.play();lives--;GameOver(lives);
  		}

  		if(gift[i].x + gift_1.width == 700){delete gift[i].x ;}	
  	}
  }

  function GameOver(lives){
  	if(lives == 0 ){
  		location.reload();
  	}
  }


  var xPos = 20;
  var yPos = 100;
  var sc = 0;
  var lives = 5;

  var gift = [];
  gift[0]={
  	x:1150,
  	y:200
  }

  var spruce_mas = [];
  spruce_mas[0]={
  	x:/*(Math.random() * 1000)+500*/ 1150,
  	y:(Math.random() * 100)+300
  }

  var bombs_mas = [];
  bombs_mas[0]={
  	x:2000,
  	y : Math.random()*(bg.height - fg.height - gift_1.height -fg.height)
  }

  document.addEventListener("keydown", function(e){
  	if(e.keyCode == "38" || e.keyCode == "87")MoveUp();
  	if(e.keyCode =="40" || e.keyCode == "83")MoveDown();
  });

  function draw(){
  	ctx.drawImage(bg,0,0);
  	ctx.drawImage(fg,0,bg.height-fg.height);
  	MoveGift();
  	MoveSpruce();
  	MoveBomb();
  	ctx.drawImage(deer,xPos,yPos);
  	
  	ctx.fillStyle="#000";
  	ctx.font = "24px Comic Sans MS";
  	ctx.fillText("Счет: "+sc,10, cvs.height - 20)
  	ctx.fillStyle="red";
  	ctx.fillText("Жизни :" + lives,cvs.width - 150,cvs.height - 20)

  	requestAnimationFrame(draw);
  }

  //audio player


var mucmas = ["audio/song1.mp3","audio/song2.mp3","audio/song3.mp3","audio/song4.mp3"];

var song = new Audio();
song.volume = 0.1;
var rand=Math.round(Math.random() * 3)+1;
song.src ="audio/song"+rand +".mp3";
var current = rand;

var songvolume = song.volume;
var volgift = sound_gift.volume;


function Music(current){
song.src = mucmas[current];
}

function PlayOrPause(){
  if (song.paused){
    song.play();
    document.getElementById("pauseOrplayimg").src="img/pause.png";
  }
  else{
    song.pause();
    document.getElementById("pauseOrplayimg").src="img/play.png";}
}

function Next(){
  current++;
  document.getElementById("pauseOrplayimg").src="img/pause.png";
  if(current>3){current=0;}
  Music(current);
  song.play();
}

function Pre(){
  current--;
  document.getElementById("pauseOrplayimg").src="img/pause.png";
  if(current<0){current = 3;}
  Music(current);
  song.play();
}

function VolumeOff(){
  if(song.volume!=0){song.volume=0;boom.volume = 0;sound_gift.volume = 0;
    document.getElementById("vol").innerHTML="OFF VOLUME";}
  else{song.volume = songvolume;boom.volume = volgift;sound_gift.volume = volgift;
    document.getElementById("vol").innerHTML="ON VOLUME";setTimeout(hideText, 2500); }
}

function hideText(){
  document.getElementById("vol").innerHTML="";
}

function VolumePlus(){
  if(song.volume != 1){song.volume+=0.05;boom.volume +=0.05;sound_gift.volume+=0.05;}
  songvolume = song.volume;
  volgift = sound_gift.volume;
  document.getElementById("vol").innerHTML=Math.round(songvolume * 100)+"%";
  setTimeout(hideText, 2500);
}

function VolumeMinus(){
  if(song.volume != 0){song.volume-=0.05;boom.volume -=0.05;sound_gift.volume-=0.05;}
  songvolume = song.volume;volgift = sound_gift.volume;
  document.getElementById("vol").innerHTML=Math.round(songvolume * 100)+"%";
  setTimeout(hideText, 2500);
}

song.onended = function(){
  current++;
  if(current>3){current=0;}
  Music(current);
  song.play();
}

spruce.onload = draw;






