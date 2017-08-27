const MAX_ITERATIONS = 50;
const MAGNITUDE_LIMIT = 4;

function* linspace(start, end, size){
  for(let i = 0; i < size; i++){
    yield start + (((end - start)/(size - 1)) * i);
  }
}

function mandelbrot(c, max_iterations, magnitude_limit){
  let curr_iteration = 0;
  let z = math.complex(0, 0);
  let mag = 0;
  while (curr_iteration < max_iterations){
    z = math.add(math.square(z), c);
    mag = math.abs(z);
    if(mag > magnitude_limit){
      return {iterations:curr_iteration, magnitude:mag};
    }
    curr_iteration++;
  }
  return {iterations:curr_iteration, magnitude:mag};
}

function* mandelbrot_generator(){
  const x_space = linspace(-2, 4, 1000);
  for(let x of x_space){
    let y_space = linspace(-2, 4, 1000);
    for(let y of y_space){
      yield {x, y, mandelbrot_run: mandelbrot(math.complex(x, y), MAX_ITERATIONS, MAGNITUDE_LIMIT)};
    }
  }
}

function converges(pt){
  return pt.mandelbrot_run.iterations >= (MAX_ITERATIONS - 1);
}

function draw_mandelbrot_point(pt){
  push();
  let canvas_x = map(pt.x, -2, 4, 0, width);
  let canvas_y = map(pt.y, -2, 4, 0, height);
  fill(255, 0, 0);
  rect(canvas_x, canvas_y, 1, 1);
  pop();
}

function setup(){
  //Create a canvas and center it on the screen
  const cnv = createCanvas(600, 600);
  const center_x = (windowWidth - width) / 2;
  const center_y = (windowHeight - height) / 2;
  cnv.position(center_x, center_y);
}

function draw(){
  const mandel = mandelbrot_generator();
  for(let m of mandel){
    if (converges(m)){
      draw_mandelbrot_point(m);
    }
  }
  noLoop();
}
