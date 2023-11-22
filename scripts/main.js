var sim = document.getElementById("sim");
var ctx = sim.getContext("2d");
sim.width = 1200;
sim.height = 900;

// global scope variables
let blocks;
var cols = sim.width / gBlockSize;
var rows = sim.height / gBlockSize;

// helper functions
function createArray(width, height, empty) {
    var map = Array.from(Array(width), () => new Array(height));
    for(var x = 0; x < width; x++) {
        for(var y = 0; y < height; y++) {
            map[x][y] = (empty) ? 0 : new Block(x * 10, y * 10);
        }
    }
    return map;
}

function RenderMap(map) {
    for(var x = 0; x < cols; x++) {
        for(var y = 0; y < rows; y++) {
            if(map[x][y] != 0) {
                map[x][y].draw(ctx);
            }
        }
    }
}


// simulator loops
function update() {
    for(var x = 0; x < cols; x++) {
        for(var y = 0; y < rows; y++) {
            if(blocks[x][y] != 0) {
                blocks[x][y].update(blocks, rows, cols);
            }
        }
    }
}

function render() {
    ctx.clearRect(0, 0, sim.width, sim.height);
    ctx.strokeRect(0, 0, sim.width, sim.height);
    RenderMap(blocks);
}
function tick() {
    window.requestAnimationFrame(tick);
    update();
    render();
}


function init() {
    window.requestAnimationFrame(tick);
    ctx.transform(1, 0, 0, -1, 0, sim.height);
    blocks = createArray(cols, rows, true);
    blocks = TerrainGen(blocks, cols, rows, sim.getBoundingClientRect());
}

init();