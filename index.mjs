
import { Shaolin,Enivorment,Fruit } from "./js/classes.mjs";
const canvas=document.querySelector("canvas");
const context=canvas.getContext("2d")
const gravity=0.7;
canvas.width=1024
canvas.height=576


const fruitArray=new Array();
for(let i=0;i<50;i++){
    const fruit=new Fruit();
    fruitArray.push(fruit);
}

player=new Shaolin({
    position:{
        x:100,
        y:200
    }
    ,velocity:{
        x:0,
        y:0
    }
    });



const keys={
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    w:{
        pressed:false
    }
}


window.addEventListener("keydown",(event)=>{
    switch(event.key){
        case "d":
            keys.d.pressed=true;
            player.lastKey="d"
            break
        case "a":
            keys.a.pressed=true;
            player.lastKey="a"
            break
        case "w":
            player.velocity.y=-10;
            break
        case " ":
            player.strike();
            break
    }
})

window.addEventListener("keyup",(event)=>{
    switch(event.key){
        case "d":
            keys.d.pressed=false;
            break
        case "a":
            keys.a.pressed=false;
            break
    }
})

animate=function(){
    window.requestAnimationFrame(animate);
    context.fillStyle="black";
    context.fillRect(0,0,canvas.width,canvas.height)
    for(let fruit of fruitArray){
        fruit.update();
        if(fruit.isInside()){
            if(player.attack.position.x+player.attack.width>=fruit.position.x
                &&player.attack.position.x<=fruit.position.x+fruit.width
                &&player.attack.position.y+player.attack.height>=fruit.position.y
                &&player.attack.position.y<=fruit.position.y+fruit.height
                &&player.isAttacking){
                    player.isAttacking=false;
                    const index=fruitArray.indexOf(fruit)
                    fruitArray.splice(index,1);
                    player.score++;
                    console.log(player.score);

            }
        }
    }
    player.update()
    player.velocity.x=0;
    if(keys.a.pressed&&player.lastKey=="a"){
        player.velocity.x=-5;
    }else if(keys.d.pressed&&player.lastKey=="d"){
        player.velocity.x=5;
    }

}



animate();

