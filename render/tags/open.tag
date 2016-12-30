<open>
  <p>
    How do you wish to enter your coins?
  </p>
  <ul>
    <!--<li onclick={manual}>Manually Entered</li>
    <li onclick={qr}>Open a QR Code</li>
    <li onclick={image}>Open A JPG</li>-->
    <li onclick={text}>Open a Text File</li>
  </ul>
  <p>Note :: under development</p>
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
  require('../views/image.js')
  require('../views/text.js')
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

    command(){
      watcher.failed=false;
      watcher.trigger('validate')
    }

  </script>
</open>
