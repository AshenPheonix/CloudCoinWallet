<posess>

  <p>
    How do you wish to take control of your coins?
  </p>
  <ul>
    <li onclick={manual}>Manually Entered</li>
    <li onclick={qr}>Open a QR Code</li>
    <li onclick={image}>Open A JPG</li>
    <li onclick={text}>Open a Text File</li>
  </ul>
  <div id="update-target">

  </div>

  <style scoped>
    :scope li{
      display: inline-block;
      font-size: 10pt;
      padding: 5px;
    }
    li:hover{
      cursor: pointer;
    }
  </style>

  <script>
  //require('../views/manual.js')
  //require('../views/image.js')
  require('../views/text.js')
  var app=require('electron').remote
  var dialog=app.dialog
  const fs = require('fs');

  var tag=null;

    manual(e){
      if(this.tag!=null){
        this.tag.unmount(true);
      }
      this.tag=riot.mount('div#update-target','manual',{parent:this})[0]
    }
    image(e){
      if(this.tag!=null){
        this.tag.unmount(true);
      }
      this.tag=riot.mount('div#update-target','image',{parent:this})[0]
    }
    text(e){
      if(this.tag!=null){
        this.tag.unmount(true);
      }
      this.tag=riot.mount('div#update-target','text',{parent:this})[0]
    }

    command(file,which){
      fs.readFile(file, 'utf-8',(err,data) => {
        if (err) {
          console.error(err);
        }else {
          //parsing
          var toTest=JSON.parse(data);
          if (toTest.coins!==undefined) {
            toTest=toTest.coins;
          }
          var testing=new Caller(toTest[0])
          testing.take(which);
          //$.each(toTest, function(index, val) {
          //  var testing= new Caller(val)
          //  testing.validate()
          //});
        }
        //test
      });
    }

    watcher.on('CoinFail', () => {
      dialog.showMessageBox({message:"One or more coins failed validation",buttons:['Okay']});
    })
    watcher.on('success', () => {
      dialog.showMessageBox({message:"Success",buttons:['Okay']})
    })

  </script>

</posess>
