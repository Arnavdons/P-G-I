background_song="";
ufo_comfermed="not";







var character = document.querySelector(".character");
var map = document.querySelector(".map");
map.style.backgroundImage = 'url("city\ background\ and\ forest.png")';
map.style.width='calc(103 * var(--grid-cell))'
map.style.height="calc(100 * var(--grid-cell))"
var map_location="city";
var says=document.getElementById("says");
var says1=document.getElementById("says1");
var says_div=document.getElementById("says_div");

var x = 1400;
var y = 370;
var held_directions = []; //State of which arrow keys we are holding down
var speed = 1; //How fast the character moves in pixels per frame

const placeCharacter = () => {
   
   var pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
   );
   
   
   //Limits (gives the illusion of walls)
   var leftLimit = -8;
   var rightLimit = (16 * 11)+1430;
   var topLimit = -8 + 32;
   var bottomLimit = (90 * 7);
   if(map_location=="forest"){
      bottomLimit = (40 * 7);
      rightLimit = (16 * 11)+490;
   
   }
   if(map_location=="forest2"){
      bottomLimit = (10 * 7)+27;
      rightLimit = (10 * 11);
      topLimit = 1;
   
   }
   if (x < leftLimit) {
       x = leftLimit;
       
      }
   if (x > rightLimit && map_location=="city") { 
      x = rightLimit; 
      map.style.backgroundImage = "url('Forest\ Background\ second.png')";
      map_location="forest";
      map.style.width = "calc(43 * var(--grid-cell))";
      map.style.height = "calc(40 * var(--grid-cell))";

      //the text code starts here
      says_div.innerHTML='<h2 style="margin-top: -220px; margin-right: -940px;" id="says1">You: I Think I am Became Bigger in size</h2>';
      setTimeout(function(){
         says_div.innerHTML='<h2 style="margin-top: -220px; margin-right: -940px;" id="says2">You: I Think I am Became Bigger in size</h2>';
         },5000
         
         );
         setTimeout(function(){
            says_div.innerHTML='<h2 style="margin-top: -220px; margin-right: -940px;" id="says"></h2>';
         },10000
            
            );
      //the text code ends here
      

      if((y > 329) && (y < 371)){
      x = 5;
      //x = 400
      y = 210;
      }
      else if((y < 329)){
      x = 5;
      y = y - 100;
      
      }
      else{
      x = 5;
      y = y + 300;
      
      }
   }
   if (y < topLimit && map_location=="forest") { 
   y = topLimit;  
   
      says_div.innerHTML="<h2 style='margin-top: -220px; margin-right: -940px;' id='says1'>You: I Can't go into deep forest</h2>";
      setTimeout(function(){
         says_div.innerHTML="<h2 style='margin-top: -220px; margin-right: -940px;' id='says2'>You: I Can't go into deep forest</h2>";
         },5000
         
         );

   }
   if (y > bottomLimit) { y = bottomLimit; }

   
   


   if ((x > rightLimit) && (map_location=="forest")) { 
      x = rightLimit;
      map.style.backgroundImage = "url('Forest\ Background.png')"; 
      map_location="forest2";
      map.style.width = "calc(13 * var(--grid-cell))";
      map.style.height = "calc(8 * var(--grid-cell))";
      
      x = 20;
      y = bottomLimit;
 


      says_div.innerHTML='<h2 style="margin-top: -220px; margin-right: -940px;" id="says1">You: What is Happening? I am Beacoming Bigger and Bigger WTF</h2>';
      setTimeout(function(){
         says_div.innerHTML='<h2 style="margin-top: -220px; margin-right: -940px;" id="says2">You: What is Happening? I am Beacome Bigger and Bigger WTF</h2>';
         },5000
         
         );
         setTimeout(function(){
            says_div.innerHTML='<h2 style="margin-top: -220px; margin-right: -940px;" id="says"></h2>';
         },10000
            
            );
   }

   if ((y < topLimit) && (map_location=="forest2")) { 
      x = leftLimit+10; 
      map.style.backgroundImage = "url('UFO\ Interior\ spawn\ room.jpg')"; 
      
      map_location="";
      map.style.width = "calc(57* var(--grid-cell))";
      map.style.height = "calc(54 * var(--grid-cell))";
   y=bottomLimit;
   }
   if((ufo_comfermed=="not") && (y==70) && (map_location=="forest2")){
   ufo_comfermed=="yes";
   says_div.innerHTML="<h2 style='margin-top: -220px; margin-right: -940px;' id='says1'>You: A UFO huh? that's why I am Becoming Bigger and bigger</h2>";
   setTimeout(function(){
      says_div.innerHTML="<h2 style='margin-top: -220px; margin-right: -940px;' id='says2'>You: A UFO huh? that's why I am Becoming bigger and bigger</h2>";
      },5000
      
      );
      setTimeout(function(){
         says_div.innerHTML="<h2 style='margin-top: -220px; margin-right: -940px;' id='says'></h2>";
      },10000
         
         );
      
      
   
   }
   


   const held_direction = held_directions[0];
   if (held_direction) {
      if (held_direction === directions.right) {x += speed;}
      if (held_direction === directions.left) {x -= speed;}
      if (held_direction === directions.down) {y += speed;}
      if (held_direction === directions.up) {y -= speed;}
      character.setAttribute("facing", held_direction);
   }
   character.setAttribute("walking", held_direction ? "true" : "false");

   
   
   
   
   
   var camera_left = pixelSize * 66;
   var camera_top = pixelSize * 42;
   
   map.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, ${-y*pixelSize+camera_top}px, 0 )`;
   character.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`;  
}


//Set up the game loop
const step = () => {
   placeCharacter();
   window.requestAnimationFrame(() => {
      step();
   })
}
step(); //kick off the first step!



/* Direction key state */
const directions = {
   up: "up",
   down: "down",
   left: "left",
   right: "right",
}
const keys = {
   38: directions.up,
   37: directions.left,
   39: directions.right,
   40: directions.down,
}
document.addEventListener("keydown", (e) => {
   var dir = keys[e.which];
   if (dir && held_directions.indexOf(dir) === -1) {
      held_directions.unshift(dir)
   }
})

document.addEventListener("keyup", (e) => {
   var dir = keys[e.which];
   var index = held_directions.indexOf(dir);
   if (index > -1) {
      held_directions.splice(index, 1)
   }
});



/* BONUS! Dpad functionality for mouse and touch */
var isPressed = false;
const removePressedAll = () => {
   document.querySelectorAll(".dpad-button").forEach(d => {
      d.classList.remove("pressed")
   })
}
document.body.addEventListener("mousedown", () => {
   console.log('mouse is down')
   isPressed = true;
})
document.body.addEventListener("mouseup", () => {
   console.log('mouse is up')
   isPressed = false;
   held_directions = [];
   removePressedAll();
})
const handleDpadPress = (direction, click) => {   
   if (click) {
      isPressed = true;
   }
   held_directions = (isPressed) ? [direction] : []
   
   if (isPressed) {
      removePressedAll();
      document.querySelector(".dpad-"+direction).classList.add("pressed");
   }
}
//Bind a ton of events for the dpad
document.querySelector(".dpad-left").addEventListener("touchstart", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("touchstart", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("touchstart", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("touchstart", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mousedown", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("mousedown", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("mousedown", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("mousedown", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mouseover", (e) => handleDpadPress(directions.left));
document.querySelector(".dpad-up").addEventListener("mouseover", (e) => handleDpadPress(directions.up));
document.querySelector(".dpad-right").addEventListener("mouseover", (e) => handleDpadPress(directions.right));
document.querySelector(".dpad-down").addEventListener("mouseover", (e) => handleDpadPress(directions.down));















/*function preload(){

}

function setup(){

}

function draw(){

}

canvas=document.getElementById("myCanvas");
ctx=canvas.getContext("2d");
player_width=17;
player_height=50;
player_x=10;
player_y=10;
player_img="charecter moving upwords.png";
background_img_city="";
function add(){
background_img_tag=new Image();
background_img_tag.onload=uploadbackground;
background_img_tag.src=background_img;

player_img_tag=new Image();
player_img_tag.onload=uploadplayer;
player_img_tag.src=player_img;
}

function uploadbackground(){
ctx.drawImage(background_img_tag,0,0,canvas.width,canvas.height);
}

function uploadplayer(){
ctx.drawImage(player_img_tag,player_x,player_y,player_width,player_height);
}

function upload_bg(){
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function up(){
if(player_y>0){
player_y=player_y-10;
upload_bg();
uploadplayer();
}
}


function down(){
if(player_y<100){
player_y=player_y+10;
upload_bg();
uploadplayer();
}
}



function left(){
if(player_x>0){
player_x=player_x-10;
upload_bg();
uploadplayer();
}
}


function right(){
if(player_x<280){
player_x=player_x+10;
upload_bg();
uploadplayer();
}
}
*/