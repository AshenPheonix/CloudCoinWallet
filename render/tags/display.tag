<display>

  <div id="display-field">
    <div each={store.currentHeld.text}>
      <p class="left">
        Serial :{this.sn}
      </p>
      <p class="right">
        Denomination :{this.denomination}
    </div>
  </div>

  <style scoped>
    .left{
      float: left;
    }
    .right{
      float: right;
    }
  </style>

  <script>
    //watcher.on('success', (data) => {
    //  this.update();
    //})
  </script>

</display>
