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
    this.fixers=[];
    var self=this;
  }

  validate(){
    console.log(this.coin);
    if(this.coin.loc.includes('test.jpg')){
      const fs=require('fs')
      fs.readFile(this.coin.loc,(err,data) => {
        console.log(data);
        console.log('Attempt')
        rb(400,(err,bytes) => {
          if(err){
            console.error('Error getting Bytes')
          }else{
            let temp=Buffer.from(bytes)
            console.log(temp)
          }
        })
      })
      console.log('test found');
      return;
    }
    var self=this
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
      $.get(vals.protocol+'://'+vals.url+'/service/detect',sender,(dat) => {
        var response=JSON.parse(dat);
        if (response.sn!=self.coin.sn) {

        }else if (response.status=='pass' && response.sn==self.coin.sn) {
          self.success++;
        }else{
          self.fails.push(response.server.replace(/raida/gi,''))
          self.reasons.push(response.message);
        }
        if (self.success==20) {
          store.currentHeld[0].push(self.coin)
          watcher.trigger('success')
          store.toFix.push(this);
          self.fix();
        } else if (self.fails.length==6) {
          watcher.trigger('CoinFail');
          store.failed.push({coin:self.coin,reasons:self.reasons})
        }
      }).fail((err) => {
      })
    });
  }

  fix(){
    let self=this;
    $.each(this.fails, function(indexFS, valFS) {
      var accepted=[Number(valFS)-6,Number(valFS)-5,Number(valFS)-1,Number(valFS)+1,Number(valFS)+4,Number(valFS)+5,Number(valFS)+6];
      $.each(accepted, function(index, val) {
        if (val<0) {
          val=val+25
        }else if (val>24) {
          val=val-25
        }
      });
      $.each(accepted, function(indexGiven, valFixers) {
        $.get('https://'+store.server[valFixers].url+'/service/get_ticket',{nn:self.coin.nn,sn:self.coin.sn,toserver:valFS,an:self.coin.an[valFixers],pan:self.coin.an[valFixers],denomination:self.coin.denomination},(ticket) => {
          ticket=JSON.parse(ticket);
          if(ticket.sn==self.coin.sn){
            self.fixers.push({server:ticket.server.replace(/RAIDA/gi,''),message:ticket.message})
          } else {

          }
          if (self.fixers.length==3) {
            var tosend={
              fromserver1:self.fixers[0].server,
              message1:self.fixers[0].message,
              fromserver2:self.fixers[1].server,
              message2:self.fixers[1].message,
              fromserver3:self.fixers[2].server,
              message3:self.fixers[2].server,
              pan:self.coin.an[valFS]
            }
            $.get('https://'+store.server[valFS].url+'/service/fix',tosend,(back) => {
              var response=JSON.parse(back);
              if (response.status=='success') {
              }else {
              }
            })
          }
        })
      });
    });
  }

  take(){
    //getting random bytes
    rb(400,(err,bytes) => {
      var self=this;
      if (err) {
        alert('An error occured trying to get the bytes, file not written')
        return;
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
          console.log(self.coin);
          var listen=true;
          var sender={
            nn:self.coin.nn,
            sn:self.coin.sn,
            denomination:self.coin.denomination,
            an:self.coin.an[index],
            pan:PANArray[index]
          }
          $.get(vals.protocol+'://'+vals.url+'/service/detect',sender,(dat) => {
            var response=JSON.parse(dat);
            if (response.sn!=self.coin.sn) {

            }else if (response.status=='pass') {
              self.success++;
            }else {
              self.fails.push(index)
            }
            if (self.success==20) {
              store.staging.push(sender);
              listen=false;
              store.currentDesired.shift();
              watcher.trigger('take');
            }else if (self.fails.length>5 && listen==true) {
              listen=false;
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
