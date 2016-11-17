<image>


  <script>
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
          //var buffer=new Buffer.alloc(400)
          /*fs.open(back[0],'r',(err,fd) => {
            fs.read(fd,buffer,0,400,20,(err,bytes,buff) => {
              if (err) {
                console.log("error");
              }else{
                //var serialNumber=toString(buff).replace(/ /g,'').substr()
                //console.log(toString(buff).replace(/ /g,'').substr(0,16*8));
                //$.get('https://'+store.server[0].url+'/service/detect.'+store.server[0].ext,{nn:1,sn:,})
              }
            })
          })*/
        }
      })
    })

    read(fp){
      fs.readFile(fp,(err,dat) => {
        if (err) {
          console.log("error");
        } else {
          //console.log("found ::" + hex(dat));
        }
      });
    }

  </script>

</image>
