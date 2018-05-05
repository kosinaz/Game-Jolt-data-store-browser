var allUsers = {
  create: function() {
    if (GJAPI.bActive) {
      GJAPI.DataStoreSet(
        GJAPI.DATA_STORE_GLOBAL, 
        GJAPI.sUserName, 
        GJAPI.sUserToken
      );
    }
    GJAPI.UserLogout()
    GJAPI.DataStoreGetKeys(GJAPI.DATA_STORE_GLOBAL, function (response) {
      var i, user;
      if (!response.keys) return;
      game.add.text(100, 125, 'All users:', game.style);
      for (i = 0; i < response.keys.length; i += 1) {
        user = game.add.text(
          100,
          150 + i * 25,
          (i + 1) + '. <' + response.keys[i].key + '>', 
          game.style
        );
        user.inputEnabled = true;
        user.data = {
          'name': response.keys[i].key
        }
        GJAPI.DataStoreFetch(
          GJAPI.DATA_STORE_GLOBAL, 
          user.data.name, 
          function (token) {
            if (token.success) {
              this.token = token.data;
            }
          }.bind(user.data)
        );
        user.events.onInputUp.add(function() {
          GJAPI.UserLoginManual(this.name, this.token, function (response) {
            if (response.success) {
              game.state.start('selectedUser');              
            }
          });
        }.bind(user.data));
      }
    }.bind(this));    
  }
}