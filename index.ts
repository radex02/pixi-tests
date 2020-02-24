import './style.css';
import * as PIXI from 'pixi.js';

//init
const app = new PIXI.Application({
  backgroundColor: 0x70fdff,
  resolution: 1
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
const environment = {
  sprites: [],
  animations: []
};

/*
function initSprite(name:string, source:string) {
  app.loader.add(name, source)
    .load(function(){
      environment.sprites[name] = new PIXI.Sprite(app.loader.resources[name].texture);
      app.stage.addChild(environment.sprites[name]);
    });
}
initSprite("doc", "https://raw.githubusercontent.com/radex02/pixi-tests/master/images/doc.png");
*/

  app.loader.add("doc", "https://raw.githubusercontent.com/radex02/pixi-tests/master/images/doc.png")
    .load(function(){
      environment.sprites["doc"] = new PIXI.Sprite(app.loader.resources["doc"].texture);
      environment.sprites["doc"].x = 300;
      environment.sprites["doc"].y = 450;
      environment.sprites["doc"].anchor.set(0.5);
      app.stage.addChild(environment.sprites["doc"]);
      console.log(environment.sprites)
      startup()
    });

//action
function startup() {
  app.ticker.add(function(delta) {
      //environment specifics
      environment.animations.forEach(function(act){
        act(delta)
      })
      //generic
       //environment.sprites["doc"].rotation += 0.1 * delta;

  })
}
