Caller = class {
  constructor(coin){
    this.coin=coin;
    this.success=0;
    this.fails=[];
  }

  validate(){
    self=this
    var denom=0;
    if (this.coin.sn>0&&this.coin.sn<2097153) {
      denom=1
    }else if (this.coin.sn<4194305) {
      denom=5
    }else if (this.coin.sn<6291457) {
      denom=25
    }else if (this.coin.sn<14680065) {
      denom=100
    }else if (this.coin.sn<16777217) {
      denom=250
    }
    $.each(store.server, function(index, vals) {
      var sender={
        nn:self.coin.nn,
        sn:self.coin.sn,
        denomination:denom,
        an:self.coin.an[index],
        pan:self.coin.an[index]
      }
      $.get('https://'+vals.url+'/service/detect.'+vals.ext,sender,(dat) => {
        var response=JSON.parse(dat);
        if (response.status=='pass') {
          self.success++;
        }else {
          self.fails.push(index)
        }
        if (self.success==20) {
          store.currentHeld.push(self.coin)
          watcher.trigger('success')
        }else if (self.fails.length>5) {
          watcher.trigger('CoinFail')
        }else if (self.fails.length+self.success==25) {
          self.fix();
        }
      }).fail((err) => {
        console.log('error ::'+err);
      })
    });
  }
  fix(){
    console.log('fixing');
  }


}
