var GBlockSize = 8;

class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.properties = [];
    }
    addProp(property) {
        this.properties.push(property);
        return this;
    }
    draw(ctx) {
        //ctx.strokeStyle = "black";
        //ctx.strokeRect(this.x, this.y, GBlockSize, GBlockSize);
    }
}

class Dirt extends Block {
    constructor(x, y) {
        super(x, y);
    }
    draw(ctx) {
        super.draw(ctx);
        ctx.fillStyle = `hsl(29.7, 30%, ${divided(this.properties[0].value, 47, 1.005)}%)`;
        ctx.fillRect(this.x, this.y, GBlockSize, GBlockSize);
    }
}

class Grass extends Block {
    constructor(x, y) {
        super(x, y);
    }
    draw(ctx) {
        super.draw(ctx);
        ctx.fillStyle = "#7CFC00";
        ctx.fillRect(this.x, this.y, GBlockSize, GBlockSize);
    }
}

class Water extends Block {
    constructor(x, y) {
        super(x, y);
    }
    draw(ctx) {
        super.draw(ctx);
        ctx.fillStyle = `hsl(245, 92%, ${divided(this.properties[0].value, 53, 1.005)}%)`;
        ctx.fillRect(this.x, this.y, GBlockSize, GBlockSize);
    }
}

function divided(times, initval, rate) {
    var start = initval;
    for(var i = 0; i < times; i++) {
        start /= rate;
    }
    return start;
}

class Chunk {
    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.blocks = createArray(cols, rows);
    }
    draw(ctx) {
        for(var x = 0; x < this.cols; x++) {
            for(var y = 0; y < this.rows; y++) {
                if(this.blocks[x][y] != 0) {
                    this.blocks[x][y].draw(ctx);
                }
            }
        }
    }
    addToMap(x, y, item) {
        this.blocks[x][y] = item;
        //console.log(this.blocks[x], x);
    }
    getMapIndex(x, y) {
        return this.blocks[x][y];
    }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

class Property {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}