class Boid{
    constructor (){
        this.position = createVector(random(width),random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,6));
        this.acceleration = createVector();
        this.vision = 50;
        this.maxForce = 50;
        this.maxSpeed = 10;
    }
    
    edges(){
        if(this.position.x>width){
            this.position.x = 0;
        }
        else if(this.position.x<0){
            this.position.x=width;
        }
        if(this.position.y>height){
            this.position.y=0;
        }
        else if(this.position.y<0){
            this.position.y=height;
        }
    }
    update (){
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        // this.vision = r*10;
        // this.velocity.limit(this.maxSpeed);
    }
    show (){
        strokeWeight(16);
        stroke(255);
        point(this.position.x,this.position.y);
    }
    allign(boids){
        let avg = createVector();
        let total = 0;
        for  (let boid of boids){
            if(dist(this.position.x,this.position.y,boid.position.x,boid.position.y)<this.vision &&boid!=this){
                avg.add(boid.velocity);
                total++ ;
            }
        }
        if(total>0){
            avg.div(total);
            avg.setMag(this.maxSpeed);
            avg.sub(this.velocity);
            
            avg.limit(this.maxForce);
            
        }
        return avg;
    }
    cohesion(boids){
        let avg = createVector();
        let total = 0;
        for  (let boid of boids){
            if(dist(this.position.x,this.position.y,boid.position.x,boid.position.y)<this.vision &&boid!=this){
                avg.add(boid.position);
                total++ ;
            }
        }
        if(total>0){
            avg.div(total);
            avg.sub(this.position);
            avg.sub(this.velocity);
            // avg.setMag(this.maxSpeed);
            
        }
        avg.limit(this.maxForce)
        return avg;
    }
    sepration(boids){
        let total = 0;
        let desire = createVector();
        for  (let boid of boids){
            let d = dist(this.position.x,this.position.y,boid.position.x,boid.position.y);
            if(d<this.vision &&boid!=this){
               let diff = p5.Vector.sub(this.position,boid.position);
               diff.div(d);
               desire.add(diff);
               total ++;
            }
        }
        if(total!=0){
            desire.div(total);
            desire.setMag(this.maxSpeed);
            desire.sub(this.velocity);
            desire.limit(this.maxForce);
        }
        return desire;
    }
    flocking(boids){
        let a1 = this.allign(boids);
        let a2 = this.cohesion(boids);
        let a3 = this.sepration(boids);
        this.acceleration.mult(0) ; 
        this.acceleration.add(a1);
        this.acceleration.add(a2);
        this.acceleration.add(a3);
    }
    
    
};