riot.tag2('open', '<p> How do you wish to enter your coins? </p> <ul> <li onclick="{text}">Open a Text File</li> </ul> <p>Note :: under development</p> <div id="update-target"> </div>', 'open li,[riot-tag="open"] li,[data-is="open"] li{ display: inline-block; font-size: 10pt; padding: 5px; } open li:hover,[riot-tag="open"] li:hover,[data-is="open"] li:hover{ cursor: pointer; }', '', function(opts) {

  require('../views/image.js')
  require('../views/text.js')
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

    this.command = function(){
      watcher.failed=false;
      watcher.trigger('validate')
    }.bind(this)

});
