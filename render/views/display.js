riot.tag2('display', '<section class="container-fluid"> <div id="display-field" class="col-md-6"> <h2>Currently Open Coins </h2> <div each="{splits, iSplit in store.currentHeld}"> <ul> <li each="{coin, iCoin in splits}"> <div if="{coin.type==\'text\'}" class="text-item col-md-12"> <p class="left"> Serial :{coin.sn} <p class="right"> Denomination :{coin.denomination} </p> </div> <div if="{coin.type==\'image\'}" class="image-item col-md-12"> <img riot-src="{coin.extra[0]}" alt="coin" class="img-responsive"> <p class="right">Denomination :{coin.denomination}</p> </div> <div class="button-set right col-md-12"> <button each="{sp, i in store.currentHeld}" if="{sp.includes(coin)==false}" type="button" onclick="{moveTo}" value="{coin}">Add To Split {i}</button> <button type="button" onclick="{newSplit}">Add to New Split</button> <button type="button" onclick="{takePosession}">Take Posession</button> </div> </li> </ul> <hr> </div> </div> <div id="take-field" class="col-md-6"> <h2>Currently Desired Coins</h2> <ul> <li each="{coin, iCoin in store.currentDesired}"> <div if="{coin.type==\'text\'}" class="text-item col-md-12"> <p class="left"> Serial :{coin.sn} <p class="right"> Denomination :{coin.denomination} </p> </div> <div if="{coin.type==\'image\'}" class="image-item col-md-12"> <img riot-src="{coin.extra[0]}" alt="coin" class="img-responsive"> <p class="right">Denomination :{coin.denomination}</p> </div> <div class="button-set right col-md-12"> <button type="button" onclick="{return}">Return</button> </div> </li> </ul> </div> </section>', 'display .left,[riot-tag="display"] .left,[data-is="display"] .left{ float: left; } display .right,[riot-tag="display"] .right,[data-is="display"] .right{ float: right; } display .text-item,[riot-tag="display"] .text-item,[data-is="display"] .text-item{ } display #display-field,[riot-tag="display"] #display-field,[data-is="display"] #display-field{ display: inline-block; border-right: 1px solid black; } display #take-field,[riot-tag="display"] #take-field,[data-is="display"] #take-field{ display: inline-block; } display li,[riot-tag="display"] li,[data-is="display"] li{ display: inline-block; border-width: 1; border-color: black; border-style: solid; padding: 2px; margin: 1px; } display hr,[riot-tag="display"] hr,[data-is="display"] hr{ height:2px; border-color: black; border-style:ridge; }', '', function(opts) {
  var self=this
  this.on('update', () => {

  })

  watcher.on('success', (data) => {
    this.update();
  })

  this.moveTo = function(e){
    console.log(e);
  }.bind(this)

  this.newSplit = function(e){
    var tempCoin=e.item.coin;
    $.each(store.currentHeld, function(index, val) {
      if (val.includes(e.item.coin)) {
        val.splice(val.indexOf(e.item.coin),1)
      }
    });
    store.currentHeld.push([tempCoin])
    self.update();
  }.bind(this)

  this.takePosession = function(e){
    store.currentDesired.push(e.item.coin)
    $.each(store.currentHeld, function(index, val) {
      if (val.includes(e.item.coin)) {
        val.splice(val.indexOf(e.item.coin),1)
        self.update();
      }
    });
  }.bind(this)

  this.return = function(e){
    store.currentHeld[0].push(e.item.coin)
    store.currentDesired.splice(store.currentDesired.indexOf(e.item.coin),1)
    this.update()
  }.bind(this)

  watcher.on('updateScreen',() => {
    this.update();
  })
});
