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
app.loader.add('bunny', 'images/doc.png')
    .load(startup);

function startup()
{
    var bunny = new PIXI.Sprite(app.loader.resources.bunny.texture);
    
    bunny.anchor.set(0.5);
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

    app.stage.addChild(bunny);
    app.ticker.add(function(delta)
    {
        bunny.rotation += 0.1 * delta;
    });
}

//action



function log(input){ return console.log(input) }