// based on matthew epler's generative series on youtube
// https://www.youtube.com/playlist?list=PLyRZnpOSgMj3K8AV2I6UldnvTj6d_Zrf0
// github.com/matthewepler


const crystalSize = 100;
let crystalSides = 3;
let palette = [];

function setup() {
    createCanvas(550, 550, SVG);
    noLoop();
    angleMode(DEGREES);
    rectMode(CENTER);
    palette = [color(100, 200, 150), color(50, 150, 255), color(150, 100, 200)];
}

function draw() {
    // background("teal");
    for(var i = 0; i < (height-50)/crystalSize; i++) {
        translate(0, 5);
        console.log(i);
        push();
        translate(5, 0);
        for(var j = 0; j < (width-50)/crystalSize; j++) {
            crystalSides = rollDie(6) + 2;
            basicLines();
            outlineShape();
            translate(crystalSize+5, 0);
        }
        pop();
        translate(0, crystalSize+5);
    }
}

function outlineShape() {
    let strokeColor = palette[rollDie(palette.length)-1];
    push();
    translate(crystalSize/2, crystalSize/2);
    if(rollDie(2) == 1) {
        rotate(180);
    }
    strokeWeight(rollDie(2)*2);
    stroke(strokeColor);
    if(rollDie(3) == 1) {
        ellipse(0, 0, crystalSize, crystalSize);
        if(rollDie(2) == 1) {
            if(rollDie(2) == 1) {
                rotate(180/crystalSides);
            }
            ellipse(0, 0, crystalSize*0.66, crystalSize*0.66);
        }
        if(rollDie(2) == 1) {
            if(rollDie(2) == 1) {
                rotate(180/crystalSides);
            }
            ellipse(0, 0, crystalSize*0.33, crystalSize*0.33);
        }
    } else {
        createPolygon(0, 0, crystalSize/2, crystalSides);
        if(rollDie(2) == 1) {
            if(rollDie(2) == 1) {
                rotate(180/crystalSides);
            }
            createPolygon(0, 0, crystalSize/3, crystalSides);
        }
        if(rollDie(2) == 1) {
            if(rollDie(2) == 1) {
                rotate(180/crystalSides);
            }
            createPolygon(0, 0, crystalSize/6, crystalSides);
        }
    }
    pop();
}

function pointOnCircle(posX, posY, radius, angle) {
    const x = posX + radius * cos(angle);
    const y = posY + radius * sin(angle);
    return createVector(x, y);
}

function createPolygon(posX, posY, radius, sides) {
    const rotAngle = 360 / sides;
    beginShape();
    for(let i = 0; i < sides; i++) {
        const thisVertex = pointOnCircle(posX, posY, radius, i*rotAngle);
        vertex(thisVertex.x, thisVertex.y);
    }
    endShape(CLOSE);
}

function basicLines() {
    let strokeColor = palette[rollDie(palette.length)-1];
    noFill();
    push();
    translate(crystalSize/2, crystalSize/2);
    if(rollDie(2) == 1) {
        rotate(180);
    }
    strokeWeight(rollDie(2)*2);
    for(let i = 0; i < crystalSides; i++) {
        stroke(strokeColor);
        line(0, 0, crystalSize/2, 0);
        rotate(360/crystalSides);
    }
    pop();
}

function rollDie(dieSides) {
    const rand = floor(random(0, dieSides)) + 1;
    return rand;
}