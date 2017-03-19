riot.tag2('servers', '<ul> <li each="{servers.server}" class="{failed:fail(this),success:!fail(this)}"> {(this.init==true)?\'none\':this.status} </li> </ul>', 'servers li,[riot-tag="servers"] li,[data-is="servers"] li{ display: inline-block; border-width: thin; border-radius: 3px; border-color: black; border-style: ridge; font-size: 8pt; padding: 5px; } servers .success,[riot-tag="servers"] .success,[data-is="servers"] .success{ background-color: #1fc469; } servers .failed,[riot-tag="servers"] .failed,[data-is="servers"] .failed{ background-color: #db3608 }', '', function(opts) {
    var fs=require('fs')
    self=this
    var app=require('electron').remote.app
    this.on('mount',()=>{
      fs.readFile(app.getPath('appData')+'/CCWallet/data/servers.json',(err,d) => {
        if (err) {
          console.log('upload failed');
        } else {
          self.servers=JSON.parse(d);
          self.init=true;
          watcher.trigger('start')
          self.update();
        }
      })
    })

    watcher.on('serverUpdate', () => {
      this.init=false;
      this.servers=store;
      this.update();
    })

    this.fail = function(which){
      return (this.init || which.status!=='ready');
    }.bind(this)
});
