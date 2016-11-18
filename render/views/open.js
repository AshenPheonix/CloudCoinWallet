riot.tag2('open', '<p> How do you wish to enter your coins? </p> <ul> <li onclick="{manual}">Manually Entered</li> <li onclick="{qr}">Open a QR Code</li> <li onclick="{image}">Open A JPG</li> <li onclick="{text}">Open a Text File</li> </ul> <div id="update-target"> </div>', 'open li,[riot-tag="open"] li,[data-is="open"] li{ display: inline-block; font-size: 10pt; padding: 5px; } open li:hover,[riot-tag="open"] li:hover,[data-is="open"] li:hover{ cursor: pointer; }', '', function(opts) {


  require('../views/text.js')
  var app=require('electron').remote
  var dialog=app.dialog
  const fs = require('fs');

  var tag=null;

    this.manual = function(e){
      if(this.tag!=null){
        this.tag.unmount(true);
      }
      this.tag=riot.mount('div#update-target','manual',{parent:this})[0]
    }.bind(this)
    this.image = function(e){
      if(this.tag!=null){
        this.tag.unmount(true);
      }
      this.tag=riot.mount('div#update-target','image',{parent:this})[0]
    }.bind(this)
    this.text = function(e){
      if(this.tag!=null){
        this.tag.unmount(true);
      }
      this.tag=riot.mount('div#update-target','text',{parent:this})[0]
    }.bind(this)

    this.command = function(file,which){
      fs.readFile(file, 'utf-8',(err,data) => {
        if (err) {
          console.error(err);
        }else {

          var toTest=JSON.parse(data);
          if (toTest.coins!==undefined) {
            toTest=toTest.coins;
          }
          var testing=new Caller(toTest[0])
          testing.validate(which);

        }

      });
    }.bind(this)

    watcher.on('CoinFail', () => {
      dialog.showMessageBox({message:"One or more coins failed validation",buttons:['Okay']});
    })
    watcher.on('success', () => {
      dialog.showMessageBox({message:"Success",buttons:['Okay']})
    })

});
