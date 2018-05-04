/**
 * Create the game with a 1024*576 screen size.
 */ 
var config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 576,
  scene: {
    key: 'main',
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function preload() {

}

function create() {
  if (GJAPI.bActive) {
    this.add.text(100, 100, GJAPI.sUserName + " logged in");
  }

}

function update() {

}