// length of each pendulum and sliders to control.
var r1Slider;
var r1 = 200;
var r2 = 200;

// mass of each pendulum bob
var m1 = 20;
var m2 = 30;

// angle in radians of 
// measures each pendulum from vertical line through origin 
// origin is the point each pendulum is tied to.
var PI = 3.141592;
var a1 = PI/4;
var a2 = PI/9;
var a1_velocity = 0;
var a2_velocity = 0;

var a1_acceleration;
var a2_acceleration;
var g = .08;

var harmonic1x = 200;
var harmonic1y = 200;

var harmonic2x = -200;
var harmonic2y = 200;

var gain = .1;

function setup() {
  createCanvas(640, 480);
  r1Slider = createSlider(0, 100, 100);
  button = createButton('Slow down you maniac!');
  button.mousePressed(slowDown);
  button = createButton('You want to go faster?');
  button.mousePressed(speedUp);
}

function slowDown() {
  a2_velocity *= .618
  a1_velocity *= .618
}

function speedUp() {
  a2_velocity *= 1.618
  a1_velocity *= 1.618
}

function draw() {
  // get value of sliders.
  r1Scalor = (r1Slider.value() / 100) + .2;
  // velScalor = (velSlider.value()) / 1000;
  // a1_velocity = a1_velocity * velScalor;
  // n = n + 1;
  // if (mouseIsPressed) {
  //   fill(0);
  // } else {
  //   fill(255);
  // }
  // ellipse(n, n, 80, 80);
  background(255);

  var num1 = -g * (2 * m1 + m2) * sin(a1);
  var num2 = -m2 * g * sin(a1-2*a2);
  var num3 = -2 * sin(a1-a2)*m2;
  var num4 = a2_velocity * a2_velocity * r2 + a1_velocity * a1_velocity * r1 * r1Scalor * cos(a1-a2); 
  var den = r1 * r1Scalor * (2*m1+m2 - m2*cos(2*a1 - 2*a2));
  a1_acceleration = ((num1 + num2 + num3*num4) / den);

  num1 = 2 * sin(a1-a2);
  num2 = (a1_velocity * a1_velocity * r1 * r1Scalor * (m1 + m2));
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2_velocity * a2_velocity * r2 * m2 * cos(a1 - a2);
  den = r2 * (2*m1+m2 - m2*cos(2*a1 - 2*a2));
  a2_acceleration = ((num1*(num2+num3+num4)) / den);

  stroke(0);
  strokeWeight(2);
  // we want the first origin to be in the middle of x 600/2
  // and down a little bit from the top of the screen. down 50.
  translate(300,50);

  // calculate coordinates of first pendulum
  // x1 is opposite angle 1. r1 * r1Scalor is the hypotenuse. 
  // so opposite over hypotenuse is x1 / r1 * r1Scalor = sin(a1)
  // so solve for x1 by multiplying by r1 * r1Scalor:
  // y1 is adjacent. adjacent / hypotenuse = cos(a1) = y1 / r1 * r1Scalor
  // solve for y1 by multiplying by r1 * r1Scalor
  var x1 = r1 * r1Scalor * sin(a1);
  var y1 = r1 * r1Scalor * cos(a1);
  
  // calculate second coordinate, same math relative to x1 y1. 
  var x2 = x1 + r2 * sin(a2);
  var y2 = y1 + r2 * cos(a2);
  // calculate distance to first point
  // even if harmonic1x -x2 is negative, sq makes it pos. so is sqrt.
  var distance1 = sqrt(sq(harmonic1x - x2) + sq(harmonic1y - y2)) * gain;
  // draw dot size of distance
  ellipse(harmonic1x,harmonic1y,distance1,distance1);
  var distance2 = sqrt(sq(harmonic2x - x2) + sq(harmonic2y - y2)) * gain;
  ellipse(harmonic2x,harmonic2y,distance2,distance2);
  ellipse(0,50,distance1 + distance2,distance1 + distance2);

    
  // draw to coordinates and add a bob with radius relative to mass.
  // pendulum 1
  line(0,0,x1,y1);
  fill(0);
  ellipse(x1,y1,m1,m1);
  // pendulum 2
  line(x1,y1,x2,y2);
  fill(0);
  ellipse(x2,y2,m2,m2);

  a1 += a1_velocity;
  a2 += a2_velocity;
  a1_velocity += a1_acceleration;
  a2_velocity += a2_acceleration;
}