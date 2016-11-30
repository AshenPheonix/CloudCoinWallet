window.$=window.jQuery=require('jQuery');
const riot = require('riot')
require('./scripts/observer.js');
require('./scripts/Caller.js');
require('./scripts/CCoin.js');

require('./views/display.js');
require('./views/index.js')
require('./views/navigate.js')
require('./views/servers.js')
require('./views/open.js')
riot.mount('navigate')
riot.mount('display')

var tag=null;

riot.route('/',()=>{
  if (tag!=null) {
    tag.unmount(true);
  }
  tag=riot.mount('div#render-target','index')[0];
})

riot.route('/open',() => {
  if(tag!=null){
    tag.unmount(true);
  }
  tag=riot.mount('div#render-target','open')[0];
})

riot.route('/exit',()=>{
  const app=require('electron').remote;
  window.close();
})

riot.route('/test',() => {
  if (tag!=null) {
    tag.unmount(true);
  }
  tag=riot.mount('div#render-target','servers')[0]
})

riot.route('/posess',() => {

})

riot.route('/save',(arguments) => {
  const fs = require('fs');
  const electron=require('electron').remote;
  app=electron.app
  const dialog=electron.dialog;

  var kill=[];
  $.each(store.currentHeld, function(index, val) {
    $.each(val, function(indexInner, valInner) {
      if (kill.includes(valInner.loc)==false) {
        kill.push(valInner.loc)
      }
    });
  });
  if (fs.existsSync(app.getPath('appData')+'/CCWallet')==false) {
    fs.mkdir(app.getPath('appData')+'/CCWallet')
  }
  var done=0;
  var allFiles=0;
  if (kill.length==0) {
    return;
  }else {
    $.each(store.currentHeld, function(indexS, valS) {
      var sum=0;
      allFiles++;
      $.each(valS, function(indexC, valC) {
        sum+=valC.denomination;
      });
      fs.writeFile(app.getPath('appData')+'/CCWallet/backup.'+indexS+'.'+sum+'.stack',JSON.stringify({coins:valS}));
      kill.push(app.getPath('appData')+'/CCWallet/backup.'+indexS+'.'+sum+'.stack')
      dialog.showSaveDialog((filename) => {
        if (filename==undefined) {
          console.log("file not saved");
        }else {
          fs.writeFileSync(filename+'.'+sum+'.stack', JSON.stringify({coins:valS}));
          done++;
        }
      })
    });
    if (done==allFiles) {
      console.log('attempting');
      $.each(kill, function(indexK, valK) {
        fs.exists(valK,(exists) => {
          if (exists) {
            fs.unlink(valK,(err) => {
              if (err) {
                alert("Could not delete old file "+valK)
                return;
              }
            })
          }
        });
      });
    } else {
      console.log('not attempting '+done+' :: '+allFiles);
    }
    store.currentHeld.length=0;
    watcher.trigger('success');
  }

})

riot.route.start(true)
