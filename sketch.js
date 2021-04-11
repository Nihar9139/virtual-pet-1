//Create variables here
var dog,happyDog,food,foodStock,database;
var dogImg;
function preload()
{
	//load images here
  dogImg=loadImage('images/dogImg.png');
  happyDog=loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(500,500);
  dog=createSprite(250,250,10,20);
  dog.addImage(dogImg);
  dog.scale=0.3;

  database= firebase.database();

  foodStock=database.ref('food');
  foodStock.on('value',readStock);
}


function draw() {  
background(46, 139, 87);
if(keyWentDown(RIGHT_ARROW)){
  writeStock(food);
  dog.addImage(happyDog);
}

  drawSprites();
  //add styles here
textSize (30);
fill('white');
stroke('black');
text('Press --> to feed the Dog',150,450);
text('Food Remaining: '+food,170,250);
}

function readStock(data){
  food=data.val();
}

function writeStock(m){
  if (m<=0){
    m=0;
  }
  else {
    m=m-1;
  }
  database.ref('/').update({
    food:m
  })
}