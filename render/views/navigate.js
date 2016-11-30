riot.tag2('navigate', '<ul> <li onclick="{home}">Home</li> <li onclick="{test}">Test Servers</li> <li onclick="{open}">Open Files</li> <li onclick="{openBackup}">Open Backup Files</li> <li onclick="{save}">Save Open Files</li> <li onclick="{takePosession}">Take Posession</li> <li onclick="{exit}">Exit</li> </ul> <br>', 'navigate ul,[riot-tag="navigate"] ul,[data-is="navigate"] ul{ list-style-type: none; } navigate li,[riot-tag="navigate"] li,[data-is="navigate"] li{ display: inline-block; border-width: thin; border-radius: 3px; border-color: black; border-style: ridge; background-image: url(\'images/scroll.jpg\'); font-size: 14pt; padding: 5px; } navigate li:hover,[riot-tag="navigate"] li:hover,[data-is="navigate"] li:hover{ cursor: pointer; }', '', function(opts) {
    this.home = function(e){
      riot.route('/')
    }.bind(this)
    this.open = function(e){
      riot.route('/open')
    }.bind(this)
    this.save = function(e){
      riot.route('/save')
    }.bind(this)
    this.test = function(e){
      riot.route('/test')
    }.bind(this)
    this.takePosession = function(e){
      watcher.trigger('take')
    }.bind(this)
    this.exit = function(e){
      riot.route('/exit')
    }.bind(this)
    this.openBackup = function(e){
      require('../scripts/Caller.js');
      require('../scripts/CCoin.js');
      const fs = require('fs');
      const electron=require('electron').remote;
      app=electron.app
      const dialog=electron.dialog;

      if (fs.existsSync(app.getPath('appData')+'/CCwallet')==false) {
        fs.mkdir(app.getPath('appData')+'/CCWallet')
      }
      dialog.showOpenDialog({
        defaultPath:app.getPath('appData')+'\\CCWallet',
        filters:[
          {name:'Stacks',extensions:['stack']}
        ]
      }, (back) => {
        $.each(back, function(index, filename) {
          fs.readFile(filename, 'utf-8',(err,data) => {
            if (err) {
              console.error(err);
            }else {

              var toTest=JSON.parse(data);
              if (toTest.coins!==undefined) {
                toTest=toTest.coins
              }
              var tempdate=new Date();
              tempdate.setFullYear(tempdate.getFullYear()+2)
              tempED=tempdate.getMonth()+'-'+tempdate.getFullYear();
              $.each(toTest, function(indexC, valC) {
                if (valC.sn!==undefined) {
                  store.testing.push(new Caller(new CCoin(valC.sn,valC.nn||1,valC.ed||tempED,valC.an,valC.denomination||0,'text',filename)));
                }
              });
              watcher.trigger('validate');
            }
          });
        })
      })
    }.bind(this)

});
