const MAX_ITERATIONS = 200;
const MAX_HEIGHT = 800;
const MAX_WIDTH = 1200;
const ZOOM = 1 / 4096;
const RE_START = -2 * ZOOM;
const RE_END = 1 * ZOOM;
const IM_START = 1 * ZOOM;
const IM_END = -1 * ZOOM;
const OFFSET_RE = -0.743643887037151;
const OFFSET_IM = 0.13182590420533;

const colors = [
  { r: 66, g: 30, b: 15 },
  { r: 25, g: 7, b: 26 },
  { r: 9, g: 1, b: 47 },
  { r: 4, g: 4, b: 73 },
  { r: 0, g: 7, b: 100 },
  { r: 12, g: 44, b: 138 },
  { r: 24, g: 82, b: 177 },
  { r: 57, g: 125, b: 209 },
  { r: 134, g: 181, b: 229 },
  { r: 211, g: 236, b: 248 },
  { r: 241, g: 233, b: 191 },
  { r: 248, g: 201, b: 95 },
  { r: 255, g: 170, b: 0 },
  { r: 204, g: 128, b: 0 },
  { r: 153, g: 87, b: 0 },
  { r: 106, g: 52, b: 3 },
];

function mandelbrot(c) {
  let z = { re: 0, im: 0 };
  let interations = 0;
  let squared_z = {};
  let new_complex = 0;

  do {
    squared_z = {
      re: Math.pow(z.re, 2) - Math.pow(z.im, 2),
      im: 2 * z.re * z.im,
    };
    z = {
      re: squared_z.re + c.re,
      im: squared_z.im + c.im,
    };
    new_complex = Math.sqrt(Math.pow(z.re, 2) + Math.pow(z.im, 2));
    interations += 1;
  } while (new_complex <= 2 && interations < MAX_ITERATIONS);
  return [interations, new_complex <= 2];
}

function draw_mandelbrot() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = MAX_WIDTH;
  canvas.height = MAX_HEIGHT;
  for (let i = 0; i < MAX_WIDTH; i++) {
    for (let j = 0; j < MAX_HEIGHT; j++) {
      let [it, in_out] = mandelbrot(getComplexNumber(i, j));
      let color = colors[it % (colors.length - 1)];
      ctx.fillStyle = in_out
        ? "black"
        : `rgb(${color.r},${color.g},${color.b})`;
      ctx.fillRect(i, j, 1, 1);
    }
  }
}

function getComplexNumber(coord_x, coord_y) {
  return {
    re: RE_START + ((RE_END - RE_START) / MAX_WIDTH) * coord_x + OFFSET_RE,
    im: IM_START - ((IM_START - IM_END) / MAX_HEIGHT) * coord_y + OFFSET_IM,
  };
}

function main() {}

window.onload = draw_mandelbrot;
