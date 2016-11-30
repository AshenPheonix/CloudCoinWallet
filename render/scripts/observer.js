var fs=require('fs')
store={
  server:{},
  testing:[],
  currentHeld:[[]],
  currentDesired:[],
  failed:[],
  stored:[[]],
  staging:[],
  saveLocation:''
}

function spy(){
  riot.observable(this);
  var self=this
  var failed=false;
  const fs = require('fs');

  this.on('start', () => {
    $.get('http://www.cloudcoin.co/servers.html',(d)=>{
      var temp=d.slice(d.indexOf('{'))
      fs.writeFile(__dirname+'/../../data/servers.json', JSON.stringify(JSON.parse(temp)),(err) => {
        if (err) {
          console.error('file not found');
          console.error(err);
        }else {
          store.server=JSON.parse(temp).server;
          this.trigger('serverUpdate')
          $.each(JSON.parse(temp).server, function(index, val) {
              $.get(val.protocol+'://'+val.url+'/service/echo.'+val.ext,(data,attempt) => {
                  store.server[index].status=JSON.parse(data).status
                  self.trigger('serverUpdate')
              }).fail((err) => {
                 if (err.status==522||err.status==524) {
                   store.server[index].status='TimeOut'
                   self.trigger('serverUpdate')
                }else {
                  store.server[index].status='Error'
                }
              })
          })
        }
      })
    })
  })

  this.on('returns', (d) => {

  })

  this.on('test', (d) => {
    d.internal++;
    console.log('done');
    this.trigger('testRet')
  })

  this.on('serverUpdate',()=>{})
  this.on('updateScreen', () => {})
  this.on('success', () => {
    store.testing.shift();
    this.trigger('validate')
  })
  this.on('CoinFail', () => {
    store.testing.shift();
    this.trigger('validate')
    if (self.failed==false) {
      failed=true;
      var remote=require('electron').remote;
      var dialog=remote.dialog
      dialog.showMessageBox({message:'One or more coins failed to get permission',buttons:['Okay']})
    }
  })

  this.on('validate', () => {
    if (store.testing.length>100) {
      this.trigger('split')
    }
    else if (store.testing.length>0) {
      store.testing[0].validate()
    }
  })

  this.on('split', () => {
    var remote=require('electron').remote;
    var dialog=remote.dialog
    var app=remote.app
    if (fs.existsSync(app.getPath('appData')+'/CCwallet')==false) {
      fs.mkdir(app.getPath('appData')+'/CCWallet')
    }

    dialog.showMessageBox({message:'Too many coins to handle at once, splitting into 25 coin stacks in '+app.getPath('appData')+'\\CCWallet with the total in .stack format',buttons:['Okay']})
    $.each(store.testing, function(index, val) {
      store.stored[store.stored.length-1].push(val);
      if (index%15==0&&index!==0) {
        store.stored.push([]);
      }
    });
    $.each(store.stored, function(indexS, valS) {
      var tempCoins=[];
      $.each(valS, function(index, valCall) {
        tempCoins.push(valCall.coin)
      });
      var sum=0;
      $.each(tempCoins, function(indexC, valC) {
        sum+=valC.denomination;
      });
      fs.writeFile(app.getPath('appData')+'/CCWallet/OverflowSplit_'+indexS+'.'+sum+'.stack',JSON.stringify({coins:tempCoins}));
    });
    dialog.showMessageBox({message:'Done',buttons:['Okay']});
    store.testing.length=0;
  })

  this.on('send', () => {
    if (store.currentDesired.length==0 || store.saveLocation=='' || store.saveLocation==undefined) {
      this.trigger('take');
    }else {
      var temp=new Caller(store.currentDesired[0]);
      temp.take();
      store.currentDesired.shift();
    }
  })

  this.on('take', () => {
    const dialog = require('electron').remote.dialog;
    if (store.saveLocation=='' || store.saveLocation==undefined && store.currentDesired.length>0) {
      var sum=0
      $.each(store.currentDesired, function(index, val) {
        sum+=val.denomination;
      });
      dialog.showSaveDialog({defaultPath:require('electron').remote.app.getPath('documents')},(b) => {
        store.saveLocation=b+'.'+sum+'.stack';
        this.trigger('take')
      })
    }else if (store.currentDesired.length>0) {
      this.trigger('send');
    }else if (store.staging>0) {
      this.trigger('sendFinished');
    }
  })

  this.on('sendFinished', () => {
    fs.writeFile(store.saveLocation, JSON.stringify({coins:store.staging}));
    store.currentHeld.push(store.staging);
    store.staging.length=0;
  })
}

watcher=new spy(store);
watcher.trigger('start')
