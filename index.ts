import './style.css';
import * as PIXI from 'pixi.js';

//init
const appDiv = document.getElementById('appDiv');
const app = new PIXI.Application({
  width: 500,
  height: 300,
});
appDiv.appendChild(app.view);

//style
app.renderer.backgroundColor = 0x70fdff;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.resize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", function(){
  app.renderer.resize(window.innerWidth, window.innerHeight);
});

//caching
const loader = new PIXI.Loader();
const sprites = [];

function loadSprite(name, source) {
  let texture = PIXI.Texture.from(source);
  return new PIXI.Sprite(texture);
}

const texture = PIXI.Texture.from("images/doc.png");
const doc = new PIXI.Sprite(texture);

//action
const stage = new PIXI.Container();

doc.x = app.renderer.width / 2;
doc.y = app.renderer.height / 2;
app.stage.addChild(doc);
