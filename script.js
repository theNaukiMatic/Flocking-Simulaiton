let flock = [];
let mic;

function setup() {
    
    
    createCanvas(900,600);
    // mic = new p5.AudioIn();
    
    // rSlider = createSlider(0, 255, 100);
    // gSlider = createSlider(0, 255, 100);
    // bSlider = createSlider(0, 255, 100);
    for(let i=0;i<100;i++){
        flock.push(new Boid());
    }
    // mic.start();
}
function draw () {
    
    background (51);

    // const vol = mic.getLevel();


    // const r = rSlider.value();
    // const g = gSlider.value();
    // const b = bSlider.value();
    
    
    for (let boid of flock){
        boid.edges();
        boid.cohesion(flock);
        // boid.allign(flock);
        // boid.flocking(flock);
        boid.update();
        boid.show();
    }
    
}