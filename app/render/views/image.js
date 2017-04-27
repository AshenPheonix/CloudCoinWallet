riot.tag2('image', '', '', '', function(opts) {
    var app=require('electron').remote
    var dialog=app.dialog
    const fs = require('fs');
    var self=this
    var toString=require('buffer-to-string');
    var conv=require('number-convert');
    const exif=require('jpeg-exif');
    const jpeg=require('jpeg-marker-stream');
    require('../scripts/CCoin.js');
    const any_base = require('any-base');
    hex2dec=any_base(any_base.HEX, any_base.DEC)

    this.on('mount',() => {
      dialog.showOpenDialog((back) => {
        if (back==undefined) {
          console.log("none found");
        }else {
          process.stdin.pipe(jpeg()).on('data',console.log)
          var buffer=new Buffer.alloc(435)
          fs.open(back[0],'r',(err,fd) => {
            fs.read(fd,buffer,0,435,20,(err,bytes,buff) => {
              if (err) {
                console.log("error");
              }else{
                var serialNumber=toString(buff).replace(/ /g,'').substr()
                serialNumber=serialNumber.replace(/\r?\n|\r/g,'')
                var tempANs=[];
                for (var i = 0; i < 25; i++) {
                  tempANs.push(serialNumber.substr(i*32, 32));
                }
                var tempSN=serialNumber.substr(-6)

                tempSN=hex2dec(tempSN)

                var tempMonth=hex2dec(serialNumber.substr(902,1));
                var tempYear=hex2dec(serialNumber.substr(903,3));
                var tempED=toString(tempMonth)+'-'+toString(tempYear);

                var sample=new CCoin(tempSN,1,tempED, tempANs,null,'image','','',0,back[0])
                if (sample.sn!==undefined) {
                  var tempCaller=new Caller(sample)
                  store.testing.push(tempCaller)
                  watcher.trigger('validate')
                }
              }
            })
          })
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
