riot.tag2('text', '', '', '', function(opts) {
    var app=require('electron').remote
    var dialog=app.dialog
    const fs = require('fs');
    const Converter=require('csvtojson').Converter;
    var conv=new Converter({});
    require('../scripts/Caller.js');
    require('../scripts/CCoin.js');

    this.on('mount', () => {
      dialog.showOpenDialog((back) => {
        if (back==undefined) {
          console.log("none found");
        }else {

          if (back[0].substring(back[0].length-3)=='csv') {
            conv.fromFile(back[0],(err,res) => {
              $.each(res, function(index, val) {
              var tester={dat:0,tests:0,success:[],fail:[]}
              var backupArray=[]
              for(let prop in val) {
                if (prop.includes('an')) {
                    backupArray.push(val[prop]);
                }
              }
              var sent=new CCoin(val.sn,val.nn||1,val.ed,backupArray);

              if (sent.ed==undefined) {
                var tempdate=new Date();
                tempdate.setFullYear(tempdate.getFullYear()+2)
                sent.ed=tempdate;
              }

              fs.open('data/coins/'+sent.sn,'w',(err,fd) => {
                if (err) {
                  console.error(err);
                }else{
                  fs.write(fd,JSON.stringify(sent),(err) => {
                    if (err) {
                      console.log(error);
                    }

                  });
                }
              });
            });

          })
          }
        }
      })
    })

    watcher.on('testRet', function() {

    })
});
