// the answers
// Ellen Nickles
// ellen.town

// References:
// Jeremey Douglass: https://forum.processing.org/two/discussion/18924/image-sequence-mousex
// Daniel Shiffman: https://www.youtube.com/watch?v=UWgDKtvnjIU
// xna: https://forum.processing.org/two/discussion/24149/scale-an-image-according-to-the-adaptive-canvas-size


let totalImages = 152;
let images = [];
let imageIndex = 0
let indexValue = 0;
let loading = true;
let counter = 0;

let fullResolutionWidth = 1280;
let imageWidth;
let imageHeight;
let imageStartWidth;
let imageEndWidth;
let imageStartHeight;
let imageEndHeight;
let imageRatio;
let centerX;
let centerY;
let sound;


function myImages(index, filename) {
  loadImage(filename, imageLoaded, error);

  function imageLoaded(img) {
    // console.log(index + ' ' + filename);
    images[index] = img;

    counter++;
    if (counter == totalImages) {
      loading = false;
      // console.log(floor(millis()) + ' milliseconds');
    }
  }

  function error(err) {
    console.log(err);
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  soundFormats('mp3', 'ogg');
  sound = loadSound("assets/pageFlip.mp3");

  for (var i = 0; i < totalImages; i++) {
    images[i] = myImages(i, "assets/" + i + ".webp");
  }
}


function draw() {
  background(255);

  if (loading) {
    background(255);

    stroke(102, 204, 204);
    noFill();
    rect(width / 4, height / 2, width / 2, 40);

    noStroke();
    fill(102, 204, 204, 100);
    let w = (width / 2) * counter / totalImages;
    rect(width / 4, height / 2, w, 40);

  } else {
    displayImages();
  }
}


function displayImages() {

  centerX = windowWidth / 2;
  centerY = windowHeight / 2;

  imageWidth = images[imageIndex].width;
  imageHeight = images[imageIndex].height;
  imageRatio = imageWidth / imageHeight;
  updateImageStartEndWidth();
  updateImageStartEndHeight()

  if (windowWidth < fullResolutionWidth) {
    imageWidth = windowWidth;
    imageHeight = imageWidth / imageRatio;
    updateImageStartEndWidth();
    updateImageStartEndHeight();
  }

  imageMode(CENTER);
  if (mouseX > imageStartWidth && mouseX < imageEndWidth && mouseY > imageStartHeight && mouseY < imageEndHeight) {
    imageIndex = floor(map(mouseX, imageStartWidth, imageEndWidth, 0, images.length));

  }
  image(images[imageIndex], centerX, centerY, imageWidth, imageHeight);

  if (indexValue != imageIndex) {
    sound.playMode('restart');
    sound.play();
    indexValue = imageIndex;
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateImageStartEndWidth();
}


function updateImageStartEndWidth() {
  imageStartWidth = (windowWidth - imageWidth) / 2;
  imageEndWidth = imageStartWidth + imageWidth;
}


function updateImageStartEndHeight() {
  imageStartHeight = (windowHeight - imageHeight) / 2;
  imageEndHeight = imageStartHeight + imageHeight;
}
