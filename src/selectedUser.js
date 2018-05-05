var selectedUser = {
  create: function() {
    var add;
    GJAPI.DataStoreGetKeys(GJAPI.DATA_STORE_USER, function (response) {
      var i, user;
      if (!response.keys) return;
      game.add.text(100, 125, 'All data of ' + GJAPI.sUserName, game.style);
      for (i = 0; i < response.keys.length; i += 1) {
        userData = game.add.text(
          100,
          150 + i * 25,
          response.keys[i].key + ': ', 
          game.style
        );
        GJAPI.DataStoreFetch(
          GJAPI.DATA_STORE_USER,
          response.keys[i].key,
          function (value) {
            if (value.success) {
              this.text += value.data;
            }
          }.bind(userData)
        );
      }
    });
    add = game.add.text(325, 125, '<add dummy data>', game.style);      
    add.inputEnabled = true;
    add.events.onInputUp.add(function () {
      GJAPI.DataStoreSet(
        GJAPI.DATA_STORE_USER, 
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10), 
        function (response) {
          if (response.success) {
            game.state.restart();
          }
      });
    });
    back = game.add.text(500, 125, '<back>', game.style);      
    back.inputEnabled = true;
    back.events.onInputUp.add(function () {
      game.state.start('allUsers');
    });
  }
}