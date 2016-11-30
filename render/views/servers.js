riot.tag2('servers', '<ul> <li each="{servers.server}" class="{failed:fail(this),success:!fail(this)}"> {(this.init==true)?\'none\':this.status} </li> </ul>', 'servers li,[riot-tag="servers"] li,[data-is="servers"] li{ display: inline-block; border-width: thin; border-radius: 3px; border-color: black; border-style: ridge; font-size: 8pt; padding: 5px; } servers .success,[riot-tag="servers"] .success,[data-is="servers"] .success{ background-color: #1fc469; } servers .failed,[riot-tag="servers"] .failed,[data-is="servers"] .failed{ background-color: #db3608 }', '', function(opts) {
    var fs=require('fs')
    self=this
    this.on('mount',()=>{
      fs.readFile('data/servers.json',(err,d) => {
        if (err) {
          console.log('upload failed');
        } else {
          this.servers=JSON.parse(d);
          this.init=true;
          watcher.trigger('start')
          this.update();
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
