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
const texture = log(PIXI.Texture.from("images/doc.png"));
const doc = log(new PIXI.Sprite(texture));



//action
app.stage.addChild(doc);

function log(input){
  console.log(input);
  return input
}