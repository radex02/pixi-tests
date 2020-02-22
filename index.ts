import './style.css';
import * as PIXI from 'pixi.js';

//init
const app = new PIXI.Application({
  backgroundColor: 0x70fdff
});
document.body.appendChild(app.view);

//style
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.resize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", function(){
  app.renderer.resize(window.innerWidth, window.innerHeight);
});

//caching
const texture = PIXI.Texture.from("images/pixelguy.png");
const doc = new PIXI.Sprite(texture);

//save

//action
doc.width = 300;
doc.height = 300;
doc.x = 50;
doc.y = 50;
app.stage.addChild(doc);

function log(input){
  console.log(input);
  return input
}