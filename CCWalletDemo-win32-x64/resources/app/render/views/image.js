riot.tag2('image', '', '', '', function(opts) {
    var app=require('electron').remote
    var dialog=app.dialog
    const fs = require('fs');
    var self=this
    var toString=require('buffer-to-string');
    var conv=require('number-convert');
    const exif=require('jpeg-exif');
    const jpeg=require('jpeg-marker-stream');

    this.on('mount',() => {
      dialog.showOpenDialog((back) => {
        if (back==undefined) {
          console.log("none found");
        }else {
          process.stdin.pipe(jpeg()).on('data',console.log)

        }
      })
    })

    this.read = function(fp){
      fs.readFile(fp,(err,dat) => {
        if (err) {
          console.log("error");
        } else {

        }
      });
    }.bind(this)

});
