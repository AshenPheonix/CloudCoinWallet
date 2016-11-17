riot.tag2('text', '', '', '', function(opts) {
    var app=require('electron').remote
    var dialog=app.dialog
    const fs = require('fs');
    const Converter=require('csvtojson').Converter;
    var conv=new Converter({});

    this.on('mount', () => {
      dialog.showOpenDialog((back) => {
        if (back==undefined) {
          console.log("none found");
        }else {

          if (back[0].substring(back[0].length-3)=='csv') {
            var tester={internal:1}
            watcher.one('testRet', function() {
              console.log(tester)
            })
            watcher.trigger('test',tester);

          }
        }
      })
    })
});
