<text>

  <script>
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
          /*fs.readFile(back[0],(err,dat) => {
            if (err) {
              console.log(err);
            } else {
              console.log(dat);
            }
          });*/
          if (back[0].substring(back[0].length-3)=='csv') {
            conv.fromFile(back[0],(err,res) => {
              var tester={dat:0,tests:0,success:[],fail:[]}
              var coin=new CCoin()
              for(let prop in res[0]) {
                if (prop.includes('an')) {

                  $.get('')
                }
              }
            })
          }
        }
      })
    })

    watcher.on('testRet', function() {

    })
  </script>

</text>
