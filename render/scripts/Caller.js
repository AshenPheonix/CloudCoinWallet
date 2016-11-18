const rb = require('random-bytes');
const convert = require('convert-hex');
const dex = require('any-base');
Caller = class {
  constructor(coin){
    this.coin=coin;
    this.success=0;
    this.fails=[];
  }

  validate(type){
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
          switch (type) {
            case 'text':
              store.currentHeld.text.push(self.coin)

              break;
            default:

          }
          watcher.trigger('success')
        }else if (self.fails.length>5) {
          watcher.trigger('CoinFail')
        }else if (self.fails.length+self.success==25) {
          self.fix();
        }
      }).fail((err) => {
        self.fails.push(self.coin)
        watcher.trigger('success')
        console.log('error ::'+err);
      })
    });
  }

  fix(){
    console.log('fixing');
  }

  take(type){
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
            denomination:denom,
            an:self.coin.an[index],
            pan:PANArray[index]
          }
          $.get('https://'+vals.url+'/service/detect.'+vals.ext,sender,(dat) => {
            var response=JSON.parse(dat);
            if (response.status=='pass') {
              self.success++;
            }else {
              self.fails.push(index)
            }
            if (self.success==20) {
              switch (type) {
                case 'text':
                  store.currentHeld.text.push(self.coin)
                  break;
                default:

              }

              //save coin immediately to prevent loss

              watcher.trigger('success')
            }else if (self.fails.length>5) {
              watcher.trigger('CoinFail')
            }else if (self.fails.length+self.success==25) {
              self.fix();
            }
          }).fail((err) => {
            self.fails.push(self.coin)
            watcher.trigger('success')
            console.log('error ::'+err);
          })
        })
      }
    })
  }
}
