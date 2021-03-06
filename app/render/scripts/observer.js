var fs=require('fs')
var app=require('electron').remote.app
store={
  server:{},
  testing:[],
  currentHeld:[[]],
  currentDesired:[],
  failed:[],
  stored:[[]],
  staging:[],
  saveLocation:'',
  disconnect:0,
  toFix:[]
}

function spy(){
  riot.observable(this);
  var self=this
  this.failed=false;
  const fs = require('fs');

  this.on('start', () => {
    if (fs.existsSync(app.getPath('appData')+'/CCwallet')==false) {
      fs.mkdir(app.getPath('appData')+'/CCWallet')
    }
    if (fs.existsSync(app.getPath('appData')+'/CCwallet/data')==false) {
      fs.mkdir(app.getPath('appData')+'/CCWallet/data')

    }
    $.get('http://www.cloudcoin.co/servers.html',(d)=>{
      var temp=d.slice(d.indexOf('{'))
      fs.writeFile(app.getPath('appData')+'/CCWallet/data/servers.json', JSON.stringify(JSON.parse(temp)),(err) => {
        if (err) {
          console.error('file not found');
          console.error(err);
        }else {
          store.disconnect=0;
          store.server=JSON.parse(temp).server;
          this.trigger('serverUpdate')
          $.each(JSON.parse(temp).server, function(index, val) {
              $.get(val.protocol+'://'+val.url+'/service/echo',(data,attempt) => {
                  store.server[index].status=JSON.parse(data).status
                  self.trigger('serverUpdate')
              }).fail((err) => {
                 if (err.status==522||err.status==524) {
                   store.server[index].status='TimeOut'
                   self.trigger('serverUpdate')
                }else {
                  store.server[index].status='Error'
                }
                store.disconnect++;
              })
          })
        }
      })
    })
  })

  this.on('returns', (d) => {

  })

  this.on('test', (d) => {
    this.failed=false
    d.internal++;
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
      self.failed=true;
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
    if (fs.existsSync(app.getPath('appData')+'/CCWallet')==false) {
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
      fs.writeFile(app.getPath('appData')+'/CCWallet/'+sum+'.OverflowSplit_'+indexS+'.stack',JSON.stringify({cloudcoin:tempCoins}));
    });
    dialog.showMessageBox({message:'Done',buttons:['Okay']});
    store.testing.length=0;
  })

  this.on('send', () => {
    if (store.currentDesired.length==0 || store.saveLocation=='' || store.saveLocation==undefined) {
      this.trigger('take');
    }else {
      temp=new Caller(store.currentDesired[0]);
      temp.take();
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
        if (b!==undefined) {
          store.saveLocation=b;
          this.trigger('take')
        }
      })
    }else if (store.currentDesired.length>0) {
      this.trigger('send');
    }else if (store.staging.length>0) {
      this.trigger('sendFinished');
    }
  })

  this.on('sendFinished', () => {

    let templocs=[];
    let tempSave=[[]]
    $.each(store.currentHeld, function(sectIndex, sect) {
      $.each(store.currentHeld, function(itemIndex, val) {
        if (templocs.contains(val.loc)==false) {
          templocs.push(val.loc);
          tempSave.push([val])
        }
        tempSave[templocs.indexOf(val.loc)].push(val);
      });
    });
    $.each(store.staging, function (Index, Coin) { 
       if(Coin.type=='image'){
         fs.readFile(coin.loc,(err,back) => {
           let temp=back
           let tempAN=Coin.AN.toString()
           tempAN.replace(',','');
           let aoid=Buffer.from([0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x03,0x13,0x0,0x0])
           let HC=Buffer.from([0x0,0x0])
           let date=new Date();
           let d=(date.getMonth()+1).toString();
           if(d.length==1)
             d='0'+d
           let y=Buffer.from(d + date.getFullYear().toString.sub(1));
           let AN=Buffer.from(tempAN,'hex')
           let finalEdit=Buffer.from([AN,aoid,HC,y])

           fs.writeFile(store.saveLocation+'.jpg',Coin,(err) => {
             if(err){
               alert("Error generated during save")
               return
             }else{
               fs.open(store.saveLocation+'.jpg','r+',(err,fd) => {
                 if(err){
                   alert('error trying to save coin in image');
                   return;
                 }else{
                   fs.write(fd,finalEdit,(err,bytes) => {
                     if(err){
                       alert("Error writing bytes")
                       return;
                     }else{
                       fs.close(fd)
                     }
                   })
                 }
               })
             }
           })
         })
       }else if(Coin.type=='text'){
         delete Coin.type
         fs.writeFile(`${Coin.denomination}.${store.saveLocation}.${Index}.stack`,JSON.stringify({cloudcoin:Coin}),(err) => {
           if(err){
             alert("Error writing file")
           }
         });
       }
    });
    $.each(templocs, function(index, val) {
      fs.writeFile(templocs,JSON.stringify({cloudcoin:tempSave[index]}))
    });
    var tempArray=[];
    $.each(store.staging,(index,item) => {
      tempArray.push(item);
    })

    store.currentHeld.push(tempArray);
    store.currentDesired.length=0;
    store.saveLocation='';
    this.trigger('updateScreen')
  })
}

watcher=new spy(store);
watcher.trigger('start')
