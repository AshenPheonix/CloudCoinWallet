<servers>

  <table>
    <tr>
      <td each={servers.server} class={failed:fail(this),success:!fail(this)}>
        {(this.init==true)?'none':this.status}
      </td>
    </tr>
  </table>

  <style media="screen" scoped>
    .success{
      background-color: #1fc469;
    }
    .failed{
      background-color: #db3608
    }
    :scoped table{
      width: 100%;
    }
  </style>

  <script>
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

    fail(which){
      return (this.init || which.status=='unknown');
    }
  </script>

</servers>
