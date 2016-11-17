<open>
  <p>
    How do you wish to enter your coins?
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
    li :hover{
      cursor: pointer;
    }
  </style>

  <script>
  //require('../views/manual.js')
  //require('../views/image.js')
  require('../views/text.js')

  var tag=null;

    manual(e){
      if(this.tag!=null){
        this.tag.unmount(true);
      }
      this.tag=riot.mount('div#update-target','manual')[0]
    }
    image(e){
      if(this.tag!=null){
        this.tag.unmount(true);
      }
      this.tag=riot.mount('div#update-target','image')[0]
    }
    text(e){
      if(this.tag!=null){
        this.tag.unmount(true);
      }
      this.tag=riot.mount('div#update-target','text')[0]
    }


  </script>
</open>
