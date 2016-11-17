<navigate>
  <ul>
    <li onclick={home}>Home</li>
    <li onclick={test}>Test Servers</li>
    <li onclick={open}>Open Files</li>
    <li onclick={save}>Save Open Files</li>
    <li onclick={takePosession}>Take Posession</li>
    <li onclick={exit}>Exit</li>
  </ul>
  <br>

  <style scoped>
    ul{
      list-style-type: none;
    }
    :scope li{
      display: inline-block;
      border-width: thin;
      border-radius: 3px;
      border-color: black;
      border-style: ridge;
      background-image: url('images/scroll.jpg');
      font-size: 14pt;
      padding: 5px;
    }
    li:hover{
      cursor: pointer;
    }
  </style>

  <script>
    home(e){
      riot.route('/')
    }
    open(e){
      riot.route('/open')
    }
    save(e){
      riot.route('/save')
    }
    test(e){
      riot.route('/test')
    }
    takePosession(e){
      riot.route('/posess')
    }
    exit(e){
      riot.route('/exit')
    }
  </script>
</navigate>
