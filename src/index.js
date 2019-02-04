import * as THREE from 'three';
import printMe from './print.js';
import PaperTexture from './paper.jpg';

printMe();

const canvasLabel = getCanvasLabel(
  'Label text',
  48,
  'white',
  'black',
  80
);

document.documentElement.appendChild(canvasLabel);

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// LIGHTS
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );

const material = new THREE.MeshPhongMaterial( {
  color: 0xF3FFE2,
  specular: 0xffffff,
  shininess: 30,
  map: new THREE.TextureLoader().load(PaperTexture),
  normalMap: new THREE.TextureLoader().load(PaperTexture)
} );

const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const spriteMaterial = new THREE.SpriteMaterial({
  map: new THREE.CanvasTexture( canvasLabel )
});
const sprite = new THREE.Sprite( spriteMaterial );
sprite.scale.set(1, 1, 1);

scene.add( sprite );

camera.position.z = 5;

function animate() {
  requestAnimationFrame( animate );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();


function getCanvasLabel(sText, fontSize, sColor, sBgColor, objContainingSphereRadius) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const fontStyles = `${fontSize}px sans-serif`;

  // see how wide the text will be
  ctx.font = fontStyles;
  const textWidth = ctx.measureText(sText).width;

  // compute a padding
  const textBoxPadding = fontSize * 0.2;

  // total dimensions of text box
  const textBoxWidth = textWidth + 2 * textBoxPadding;
  const textBoxHeight = fontSize + 2 * textBoxPadding;

  // canvas height will be assigned from parameter
  // canvas.height = 500;
  canvas.height = objContainingSphereRadius * 6;

  // offset is computed relative to height because of how the design looks like
  const textBoxOffset = canvas.height / 4;
  canvas.width = (textBoxWidth + textBoxOffset) * 2;
  canvas.style.backgroundColor = "salmon";


  // add the background of the label
  ctx.fillStyle = sBgColor;
  ctx.fillRect((canvas.width / 2 + textBoxOffset), 0, textBoxWidth, textBoxHeight);

  ctx.fillStyle = sColor;

  // set the font styles again, as now they have reset because of the canvas resizing
  ctx.font = fontStyles;

  ctx.fillText(sText, (canvas.width / 2 + textBoxOffset + textBoxPadding), (fontSize + textBoxPadding));


  // draw a line from the bottom-center of the text to all the way down the canvas
  ctx.fillStyle = 'gray';
  // draw the underline
  ctx.beginPath();
  ctx.moveTo((canvas.width / 2 + textBoxOffset - textBoxPadding), textBoxHeight / 2);
  ctx.lineTo(canvas.width / 2, canvas.height / 6);
  ctx.lineTo(canvas.width / 2, canvas.height / 2);
  ctx.stroke();

  return canvas;
}

function getObjectLabel( ) {

}