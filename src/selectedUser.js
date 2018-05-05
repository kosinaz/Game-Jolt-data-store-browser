var selectedUser = {
  create: function() {
    GJAPI.DataStoreGetKeys(GJAPI.DATA_STORE_USER, function (response) {
      var i, user;
      if (!response.keys) return;
      game.add.text(100, 125, 'All data of ' + GJAPI.sUserName, {
        font: 'bold 10pt Arial',
        fill: '#fff'
      });
      for (i = 0; i < response.keys.length; i += 1) {
        user = game.add.text(
          100,
          150 + i * 25,
          (i + 1) + ': ' + response.keys[i].key, 
          {
            font: 'bold 10pt Arial',
            fill: '#fff'
          }
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
      }
    });
  }
}