<display>
  <section class="container-fluid">

    <div id="display-field" class="col-md-6" ondragover={allowDrag} ondrop={dropOpen}>
      <h2>Currently Open Coins </h2>
      <div each={splits, iSplit in store.currentHeld}>
        <ul>
          <li each={coin, iCoin in splits}>
            <div if={coin.type=='text'} class="text-item col-md-12">
              <p class="left">
                Serial :{coin.sn}
              <p class="right">
                Denomination :{coin.denomination}
              </p>
            </div>
            <div class="button-set right col-md-12">
              <button each={sp, i in store.currentHeld} if={sp.includes(coin)==false} type="button" onclick={moveTo} value={coin}>Add To Split {i}</button>
              <button type="button" onclick={newSplit}>Add to New Split</button>
              <button type="button" onclick={takePosession}>Take Posession</button>
            </div>
          </li>
        </ul>
        <hr>
      </div>
    </div>
    <div id="take-field" class="col-md-6">
      <h2>Currently Desired Coins</h2>
      <ul>
        <li each={coin, iCoin in store.currentDesired}>
          <div if={coin.type=='text'} class="text-item col-md-12">
            <p class="left">
              Serial :{coin.sn}
            <p class="right">
              Denomination :{coin.denomination}
            </p>
          </div>
          <div class="button-set right col-md-12">
            <button type="button" onclick={return}>Return</button>
          </div>
        </li>
      </ul>
    </div>
  </section>


  <style scoped>
    .left{
      float: left;
    }
    .right{
      float: right;
    }
    .text-item{

    }
    #display-field{
      display: inline-block;
      border-right: 1px solid black;
    }
    #take-field{
      display: inline-block;
    }
    :scope li{
      display: inline-block;
      border-width: 1;
      border-color: black;
      border-style: solid;
      padding: 2px;
      margin: 1px;
    }
    hr{
      height:2px;
      border-color: black;
      border-style:ridge;
    }
  </style>

  <script>
  var self=this
  this.on('update', () => {

  })

  watcher.on('success', (data) => {
    this.update();
  })

  moveTo(e){
    console.log(e);
  }

  newSplit(e){
    var tempCoin=e.item.coin;
    $.each(store.currentHeld, function(index, val) {
      if (val.includes(e.item.coin)) {
        val.splice(val.indexOf(e.item.coin),1)
      }
    });
    store.currentHeld.push([tempCoin])
    self.update();
  }

  takePosession(e){
    store.currentDesired.push(e.item.coin)
    $.each(store.currentHeld, function(index, val) {
      if (val.includes(e.item.coin)) {
        val.splice(val.indexOf(e.item.coin),1)
        self.update();
      }
    });
  }

  return(e){
    store.currentHeld[0].push(e.item.coin)
    store.currentDesired.splice(store.currentDesired.indexOf(e.item.coin),1)
    this.update()
  }
  </script>

</display>
