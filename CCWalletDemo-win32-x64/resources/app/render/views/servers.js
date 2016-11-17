riot.tag2('servers', '<table> <tr> <td each="{servers.server}" class="{failed:fail(this),success:!fail(this)}"> {(this.init==true)?\'none\':this.status} </td> </tr> </table>', 'servers .success,[riot-tag="servers"] .success,[data-is="servers"] .success{ background-color: #1fc469; } servers .failed,[riot-tag="servers"] .failed,[data-is="servers"] .failed{ background-color: #db3608 } serversd table,[riot-tag="servers"]d table,[data-is="servers"]d table{ width: 100%; }', '', function(opts) {
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
      return (this.init || which.status=='unknown');
    }.bind(this)
});
