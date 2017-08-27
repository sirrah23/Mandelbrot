//Fixed parameters for mandlebrot algorithm
const MAX_ITERATIONS = 50;
const MAGNITUDE_LIMIT = 4;

// Corners of the graph
const LEFT = -2;
const RIGHT = 4;
const BOTTOM = -2;
const TOP = 4;

function* linspace(start, end, size){
  for(let i = 0; i < size; i++){
    yield start + (((end - start)/(size - 1)) * i);
  }
}

function mandelbrot(c, max_iterations, magnitude_limit){
  // Iteratative function that keeps plugging the result
  // back into z^2+c starting with z=(0,0). If the magnitude
  // of the complex number z exceeds the limit we quit otherwise
  // we keep going until the max iteration has been reached.
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
  // A generator that will return the mandelbrot
  // computation of each point on the graph.
  const x_space = linspace(LEFT, RIGHT, 1000);
  for(let x of x_space){
    let y_space = linspace(BOTTOM, TOP, 1000);
    for(let y of y_space){
      yield Object.assign({}, {x, y}, mandelbrot(math.complex(x, y), MAX_ITERATIONS, MAGNITUDE_LIMIT));
    }
  }
}

function converges(pt){
  // Does the complex number converge?
  return pt.iterations >= (MAX_ITERATIONS - 1);
}

function draw_mandelbrot_point(pt){
  // If the complex number converges then we will draw it.
  push();
  let canvas_x = map(pt.x, LEFT, RIGHT, 0, width);
  let canvas_y = map(pt.y, BOTTOM, TOP, 0, height);
  noStroke();
  fill(0);
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
  // Iterate on each point in the graph and if it is
  // a convergent point it belongs to the mandelbrot
  // set in which case we will draw it.
  const mandel = mandelbrot_generator();
  for(let m of mandel){
    if (converges(m)){
      draw_mandelbrot_point(m);
    }
  }
  noLoop();
}
