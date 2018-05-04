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
    GJAPI.DataStoreSet(GJAPI.DATA_STORE_GLOBAL, GJAPI.sUserName + "", "1");
    GJAPI.DataStoreGetKeys(GJAPI.DATA_STORE_GLOBAL, function (pResponse) {
      if (!pResponse.keys) return;
      this.add.text(100, 125, "All users:");
      for (var i = 0; i < pResponse.keys.length; ++i)
        this.add.text(100, 150 + i * 25, (i + 1) + ". " + pResponse.keys[i].key);
    }.bind(this));
  }

}

function update() {

}