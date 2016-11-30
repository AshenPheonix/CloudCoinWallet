riot.tag2('text', '', '', '', function(opts) {
    var app=require('electron').remote
    var dialog=app.dialog
    const fs = require('fs');
    const Converter=require('csvtojson').Converter;
    var conv=new Converter({});
    require('../scripts/Caller.js');
    require('../scripts/CCoin.js');
    var self=this

    this.on('mount', () => {
      this.parent=opts.parent
      dialog.showOpenDialog((back) => {
        if (back==undefined) {
          console.log("none found");
        }else {
          $.each(back, function(indexF, valF) {
            if (valF.substring(valF.length-3)=='csv') {
              conv.fromFile(valF,(err,res) => {
                var CCC={coins:[]};
                $.each(res, function(index, val) {
                  var tester={dat:0,tests:0,success:[],fail:[]}
                  var backupArray=[]
                  for(let prop in val) {
                    if (prop.includes('an')) {
                      backupArray.push(val[prop]);
                    }
                  }
                  var sent=new CCoin(val.sn,val.nn||1,val.ed,backupArray,val.denomination||0,'text',valF);

                  if (sent.ed==undefined) {
                    var tempdate=new Date();
                    tempdate.setFullYear(tempdate.getFullYear()+2)
                    sent.ed=tempdate.getMonth()+'-'+tempdate.getFullYear();
                  }
                  CCC.coins.push(sent);
                });
                fs.writeFile(__dirname+'/data/coins/current.ccc', JSON.stringify(CCC));
              })
            }else if (valF.substr(valF.length-4)=='json' || valF.substr(valF.length-3)=='ccc' || valF.substr(valF.length-5)=='stack') {
              fs.readFile(valF, 'utf-8',(err,data) => {
                if (err) {
                  console.error(err);
                }else {

                  var toTest=JSON.parse(data);
                  if (toTest.coins!==undefined) {
                    toTest=toTest.coins
                  }
                  if (toTest.length!==undefined && toTest.length>1) {
                    var tempdate=new Date();
                    tempdate.setFullYear(tempdate.getFullYear()+2)
                    tempED=tempdate.getMonth()+'-'+tempdate.getFullYear();
                    $.each(toTest, function(indexC, valC) {
                      if (valC.sn!==undefined) {
                        store.testing.push(new Caller(new CCoin(valC.sn,valC.nn||1,valC.ed||tempED,valC.an,valC.denomination||0,'text',valF)));
                      }
                    });
                    self.parent.command();
                  }else{
                    var tempdate=new Date();
                    tempdate.setFullYear(tempdate.getFullYear()+2)
                    tempED=tempdate.getMonth()+'-'+tempdate.getFullYear();

                    store.testing.push(new Caller(new CCoin(toTest.sn,toTest.nn||1,toTest.ed||tempED,toTest.an,toTest.denomination||0,'text',valF)));
                    self.parent.command()
                  }
                }

              });
            }
          });
        }
      })
    })

    watcher.on('testRet', function() {

    })
});
