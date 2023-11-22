var gBlockSize = 10;

const clamp = (min, max, num) => Math.min(Math.max(min, num), max);

class Block {
    constructor(x, y, bT) {
        this.x = x;
        this.y = y;
        this.size = gBlockSize;
        this.bT = bT;
    }
    draw(ctx) {
        if(this.bT == "dirt") {
            ctx.fillStyle = "#92745B";
        }else if(this.bT == "water") {
            ctx.fillStyle = "blue";
        }else if(this.bT == "grass") {
            ctx.fillStyle = "green";
        }else if(this.bT == "gravel") {
            ctx.fillStyle = "gray";
        }
        ctx.strokeRect(this.x, this.y, this.size, this.size);
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    getSize(){
        return this.size;
    }
    getPos() {
        return {x: this.x, y: this.y};
    }
    getBB(map) {
        if((this.y / 10) - 1 > 0) {
            return map[this.x / 10][(this.y / 10) - 1];
        }
    }
    getBU(map, rows) {
        if((this.y / 10) + 1 < rows * 10) {
            return map[this.x / 10][(this.y / 10) + 1];
        }
    }
    getSurrounding(map) {
        var results = {
            ba: null,
            bb: null,
            bl: null,
            br: null,
            bal: null,
            bar: null,
            bbl: null,
            bbr: null
        };

        //get the block above
        results.ba = map[this.x / 10][(this.y / 10) + 1];
        //get the block below
        results.bb = map[this.x / 10][(this.y / 10) - 1];
        //get the block to the left
        results.bl = map[(this.x / 10) - 1][this.y / 10];
        //get the block to the right
        results.br = map[this.x / 10][(this.y / 10) - 1];
        //get the block top left
        results.bal = map[this.x / 10][(this.y / 10) - 1];
        //get the block top right
        results.bar = map[this.x / 10][(this.y / 10) - 1];
        //get the block bottom left
        results.bbl = map[this.x / 10][(this.y / 10) - 1];
        //get the block bottom right
        results.bbr = map[this.x / 10][(this.y / 10) - 1];

        return results;
    }
    update(map, rows, cols) {
        if(this.getBB(map) == 0) {
            this.y = clamp(0, rows * 10, this.y - 10);
        }
    }
}