

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

const fruitArray=new Array();
for(let i=0;i<50;i++){
    const fruit=new Fruit();
    fruitArray.push(fruit);
}

class Enviroment{
    constructor({position,}){  
        this.position=position;
        this.width=50;
        this.height=150;
    }
    draw(){

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
        if(this.height+this.position.y+this.velocity.y>=canvas.height){
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

export{Fruit,Shaolin,Enviroment}