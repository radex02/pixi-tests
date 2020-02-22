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


//const texture = PIXI.Texture.from("./images/doc.png");
//const doc = new PIXI.Sprite(texture);
const doc = PIXI.Sprite.from("images/doc.png");

//action
doc.x = app.screen.width / 2;
doc.y = app.screen.height / 2;
doc.anchor.set(0.5);

app.stage.addChild(doc);
