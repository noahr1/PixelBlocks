var smoothness = 30;
var seed = 0;
var water_level = 10;

const randomInt = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));
const clamp = (min, max, num) => Math.min(Math.max(min, num), max);

function TerrainGen(map, cols, rows, rect) {
    var perlinHeight;

    for(var x = 0; x < cols; x++) {
        perlinHeight = Math.round(perlin.get(x / smoothness, seed) * rows / 2);
        perlinHeight += rows / 6;
        for(var y = 0; y < perlinHeight; y++) {
            map[x][y] = new Dirt(x * GBlockSize, y * GBlockSize)
                .addProp(new Property("moisture", randomInt(1, 64)));
        }
    }
    AddTerrainFeatures(map);
}

function AddTerrainFeatures(map) {
    //Add water
    for(var x = 0; x < cols; x++) {
        for(var y = 0; y < water_level; y++) {
            if(map[x][y] == 0) {
                map[x][y] = new Water(x * GBlockSize, y * GBlockSize)
                    .addProp(new Property("volume", randomInt(1, 64)));
            }
        }
    }
}

