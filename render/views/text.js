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
              var CCC={coins:[]};
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
                  sent.ed=tempdate.getMonth()+'-'+tempdate.getFullYear();
                }
                CCC.coins.push(sent);

              });
              fs.writeFile('data/coins/current.ccc', JSON.stringify(CCC));
            })
          }else if (back[0].substr(back[0].length-4)=='json' || back[0].substr(back[0].length-3)=='ccc') {
            fs.readFile(back[0], 'utf-8',(err,data) => {
              if (err) {
                console.error(err);
              }else {

                var toTest=JSON.parse(data);
                if (toTest.coins!==undefined) {
                  toTest=toTest.coins;
                }
                var testing=new Caller(toTest[0])
                testing.validate();

              }

            });
          }
        }
      })
    })

    watcher.on('testRet', function() {

    })
});
