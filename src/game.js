/**
 * Create the game with a 1024*576 screen size.
 */ 
var game = new Phaser.Game(1024, 576, Phaser.AUTO, '');

/**
 * Create the game states.
 */
game.state.add('allUsers', allUsers, true);
game.state.add('selectedUser', selectedUser);

function preload() {

}

function create() {
  var i, j, answer;
  this.users = [];
  if (GJAPI.bActive) {
    this.add.text(100, 100, GJAPI.sUserName + ' logged in');
    GJAPI.DataStoreSet(
      GJAPI.DATA_STORE_GLOBAL, 
      GJAPI.sUserName, 
      GJAPI.sUserToken
    );
    for (j = 0; j < 4; j += 1) {
      this.add.text(100 + j * 125, 125, 'Question ' + (j + 1));
      for (i = 0; i < 4; i += 1) {
        answer = this.add.text(
          100 + j * 125, 
          150 + i * 25, 
          (i + 1) + '. answer'
        ).setInteractive();
        answer.data = {
          'question': j + 1,
          'answer': i + 1
        }
        answer.on('pointerdown', function () {
          GJAPI.DataStoreSet(
            GJAPI.DATA_STORE_USER,
            this.data.question + '',
            this.data.answer + ''
          );
        });
      }
    }
  }
  GJAPI.DataStoreGetKeys(GJAPI.DATA_STORE_GLOBAL, function (response) {
    var i;
    if (!response.keys) return;
    this.add.text(100, 325, 'All users:');
    for (i = 0; i < response.keys.length; i += 1) {
      this.users[i] = this.add.text(
        100,
        350 + i * 25,
        (i + 1) + '. ' + response.keys[i].key
      ).setInteractive();
      this.users[i].data = {
        'name': response.keys[i].key
      }
      GJAPI.DataStoreFetch(
        GJAPI.DATA_STORE_GLOBAL, 
        response.keys[i].key, 
        function (token) {
          if (token.success) {
            this.token = token.data;
          }
      }.bind(this.users[i].data));
      this.users[i].on('pointerdown', function () {
        GJAPI.UserLoginManual(this.name, this.token, function (response) {
          if (response.success) {
            console.log(GJAPI.sUserName + ' logged in');
          }
        });
        /*GJAPI.DataStoreFetch(
          GJAPI.DATA_STORE_USER,
          this.data,
          function (response) {
            if (!response.keys) return;
            this.add.text(300, 325, this.data);
            for (i = 0; i < response.keys.length; i += 1) {
              user = this.add.text(
                300,
                350 + i * 25,
                (i + 1) + '. ' + response.keys[i].key
              );
            }
          }
        );*/
      }.bind(this.users[i].data));
    }
  }.bind(this));
  
}

function update() {

}