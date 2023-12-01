var sim = document.getElementById("sim");
var ctx = sim.getContext("2d");
sim.width = 1200;
sim.height = 900;

// global scope variables
let chunks = [];
var cols = Math.floor(sim.width / GBlockSize);
var rows = Math.floor(sim.height / GBlockSize);

function RenderMap(map) {
    var Chunks = Math.ceil(cols / 8);
    for(var c = 0; c < Chunks; c++) {
        map[c].draw(ctx);
    }
}

// simulator loops
function update() {
   
}

function render() {
    ctx.clearRect(0, 0, sim.width, sim.height);
    ctx.strokeRect(0, 0, sim.width, sim.height);
    RenderMap(chunks);
}
function tick() {
    window.requestAnimationFrame(tick);
    update();
    render();
}


function init() {
    window.requestAnimationFrame(tick);
    ctx.transform(1, 0, 0, -1, 0, sim.height);
    TerrainGen(chunks, cols, rows, sim.getBoundingClientRect());
}

init();