var smoothness = 30;
var seed = 0;
var water_level = 10;

function TerrainGen(map, cols, rows, rect) {
    var perlinHeight;

    for(var x = 0; x < cols; x++) {
        perlinHeight = Math.round(perlin.get(x / smoothness, seed) * rows / 2);
        perlinHeight += rows / 6;
        for(var y = 0; y < perlinHeight; y++) {
            map[x][y] = new Block(x * 10, y * 10, "dirt");
        }
    }
    AddWater(map, cols);
    AddGrass(map, cols, rows);
    AddGravel(map, cols, rows);
    return map;
}

function AddWater(map, cols) {
    for(var x = 0; x < cols; x++) {
        for(var y = 0; y < water_level; y++) {
            if(map[x][y] == 0) {
                map[x][y] = new Block(x * 10, y * 10, "water");
            }
        }
    }
}

function AddGrass(map, cols, rows) {
    for(var x = 0; x < cols; x++) {
        for(var y = 0; y < rows; y++) {
            if(map[x][y] != 0 && map[x][y].getBU(map, rows) == 0 && map[x][y].bT != "water") {
                map[x][y] = new Block(x * 10, y * 10, "grass");
            }
        }
    }
}

function AddGravel(map, cols, rows) {
    for(var x = 0; x < cols; x++) {
        if(map[x][40] == 0) {
            map[x][40] = new Block(x * 10, 10 * (40), "gravel");
        }
    }
}