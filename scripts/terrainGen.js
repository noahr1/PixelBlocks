var smoothness = 30;
var seed = 0;
var water_level = 10;

function createArray(width, height) {
    var map = Array.from(Array(width), () => new Array(height));
    for(var x = 0; x < width; x++) {
        for(var y = 0; y < height; y++) {
            map[x][y] = 0;
        }
    }
    return map;
}

const randomInt = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));
const clamp = (min, max, num) => Math.min(Math.max(min, num), max);

function TerrainGen(chunks, cols, rows, rect) {
    var numberOfChunks = Math.ceil(cols / 8);
    var chunk;
    
    for(var c = 0; c < numberOfChunks; c++) {
        chunk = new Chunk(8, rows);
        var perlinHeight;
        for(var x = c * 8; x < (c * 8) + 8; x++) { 
            perlinHeight = Math.round(perlin.get(x / smoothness, seed) * rows / 2);
            perlinHeight += rows / 6;
            for(var y = 0; y < perlinHeight; y++) {
                chunk.addToMap(x - (c * 8), y, new Dirt(x * GBlockSize, y * GBlockSize)
                    .addProp(new Property("moisture", randomInt(1, 64))));
            }
        }
        AddTerrainFeatures(c, chunk);
        chunks.push(chunk);
    }
}

function AddTerrainFeatures(c, map) {
    //Add water
    for(var x = c * 8; x < (c * 8) + 8; x++) {
        for(var y = 0; y < water_level; y++) {
            if(map.getMapIndex(x - (c * 8), y) == 0) {
                map.addToMap(x - (c * 8), y, new Water(x * GBlockSize, y * GBlockSize)
                    .addProp(new Property("volume", randomInt(1, 64))));
            }
        }
    }
}

