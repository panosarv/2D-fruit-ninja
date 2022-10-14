
const canvas=document.querySelector("canvas");
const context=canvas.getContext("2d")
const gravity=0.7;
canvas.width=1024
canvas.height=576

class Fruit{
    constructor(){
        this.position={
            x:0,
            y:0
        }
        this.velocity=0;
        this.width=20;
        this.height=20;
        this.position.y=-1*Math.floor(Math.random()*5000)+100;
        this.position.x=Math.floor(Math.random()*canvas.width-this.width)
        
        
    }
    draw(){
        context.fillStyle="yellow"
        context.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
    update(){
        this.draw()
        if(this.position.y+this.height<0){
            this.position.y+=1;
        }
        else{
            this.velocity+=0.01;
            this.position.y+=this.velocity;
        }
        
    }
    isInside(){
        if(this.position.y+this.height>0){
            return true;
        }
    }
}



class Enviroment{
    constructor({position,imgSrc}){  
        this.position=position;
        this.width=50;
        this.height=150;
        this.image=new Image();
        this.image.src=imgSrc;
    }
    draw(){
        context.drawImage(this.image,this.position.x,this.position.y)
    }
    update(){
        this.draw()
    }
}


class Shaolin{
    constructor({position,velocity}){
        this.position=position;
        this.velocity=velocity;
        this.height=150;
        this.width=50;
        this.lastKey;
        this.isAttacking;
        this.score=0;
        this.attack={
            position:{
                x:this.position.x,
                y:this.position.y
            },
            width:100,
            height:50
        }
    }

    draw(){
        context.fillStyle="red";
        context.fillRect(this.position.x,this.position.y,this.width,this.height);
        if(this.isAttacking){
            context.fillStyle="green";

            if(this.lastKey=="d"){
                this.attack.position.x=this.position.x
                this.attack.position.y=this.position.y
                context.fillRect(
                this.attack.position.x,
                this.attack.position.y,
                this.attack.width,
                this.attack.height)
            }
            else if(this.lastKey=="a"){
                this.attack.position.x=this.position.x+50-this.attack.width
                this.attack.position.y=this.position.y;
                context.fillRect(
                    this.attack.position.x,
                    this.attack.position.y,
                    this.attack.width,
                    this.attack.height)
            }
            else{
                this.attack.position.x=this.position.x;
                context.fillRect(
                this.attack.position.x,
                this.attack.position.y,
                this.attack.width,
                this.attack.height)
            }
        }
    }
    update(){
        this.draw()
        
        this.position.x+=this.velocity.x;
        this.position.y+=this.velocity.y;
        if(this.height+this.position.y+this.velocity.y>=canvas.height-97){
            this.velocity.y=0;
        }
        else{
            this.velocity.y+=gravity;
        }
    }
    strike(){
        this.isAttacking=true;
        setTimeout(()=>{
            this.isAttacking=false;
        },100)
    }

}

const fruitArray=new Array();
for(let i=0;i<50;i++){
    const fruit=new Fruit();
    fruitArray.push(fruit);
}

const player=new Shaolin({
    position:{
        x:100,
        y:200
    }
    ,velocity:{
        x:0,
        y:0
    }
    });

const bg=new Enviroment({
    position:{
        x:0,
        y:0
    },
    imgSrc:'./assets/background.png'
})

const shops=new Enviroment({
    position:{
        x:0,
        y:0
    },
    imgSrc:'./assets/shop.png'
})

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
    bg.update();
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

