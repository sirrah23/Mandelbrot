function setup(){
  createCanvas(640, 480);
}
function draw(){
  for(let i = 0; i < width; i++){
    for(let j = 0; j < height; j++){
      push();
      let c = color(random(255), random(255), random(255));
      fill(c);
      noStroke();
      rect(i, j, 1, 1);
      pop();
    }
  }
  noLoop();
}
