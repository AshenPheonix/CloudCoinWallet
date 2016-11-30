const rb = require('random-bytes');
const convert = require('convert-hex');
const dex = require('any-base');
Caller = class {
  constructor(coin){
    this.coin=coin;
    this.success=0;
    this.fails=[];
    this.errors=[];
    this.reasons=[];
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
      $.get(vals.protocol+'://'+vals.url+'/service/detect.'+vals.ext,sender,(dat) => {
        var response=JSON.parse(dat);
        if (response.sn!=self.coin.sn) {

        }else if (response.status=='pass') {
          self.success++;
        }else {
          self.fails.push(index)
          self.reasons.push(response.message);
        }
        if (self.fails.length+self.success+self.errors.length==25&&self.success>=20) {
          store.currentHeld[0].push(self.coin)
          watcher.trigger('success')
          self.fix();
        }else{
          if (store.failed.includes(self.coin)==false) {
            store.failed.push({coin:self.coin,reasons:[self.reasons]})
            watcher.trigger('CoinFail')
          }
        }
      }).fail((err) => {
      })
    });
  }

  fix(){
    console.log('fixing');
  }

  take(){
    //getting random bytes
    rb(400,(err,bytes) => {
      if (err) {
        console.error('bytes not gotten ::'+err);
      }else {
        //converting to a  useable form
        var tempArray=[];
        const con= dex(dex.DEC,dex.HEX)
        $.each(bytes, function(index, val) {
          tempArray.push(con(val.toString()))
        });
        tempArray=tempArray.toString().replace(/,/g,'');
        var PANArray=[]
        for (var i = 0; i < 25; i++) {
          PANArray.push(tempArray.substr(i*32,32))
        }
        $.each(store.server, function(index, vals) {
          var sender={
            nn:self.coin.nn,
            sn:self.coin.sn,
            denomination:self.coin.denomination,
            an:self.coin.an[index],
            pan:PANArray[index]
          }
          $.get(vals.protocol+'://'+vals.url+'/service/detect.'+vals.ext,sender,(dat) => {
            var response=JSON.parse(dat);
            if (response.sn!=self.coin.sn) {

            }else if (response.status=='pass') {
              self.success++;
            }else {
              self.fails.push(index)
            }
            if (self.success>=20 && self.fails.length+self.success+self.errors.length==25) {
              store.staging.push(self.coin);
            }else if (self.fails.length>5) {
              watcher.trigger('CoinFail')
            }else if (self.fails.length+self.success==25) {
              self.fix();
            }
          }).fail((err) => {
          })
        })
      }
    })
  }
}
