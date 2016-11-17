window.$=window.jQuery=require('jQuery')
const riot = require('riot')
require('./scripts/observer.js');
require('./scripts/Caller.js');

require('./views/index.js')
require('./views/navigate.js')
require('./views/servers.js')
require('./views/open.js')
riot.mount('navigate')

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
  console.log('close here');
  const app=require('electron').remote;
  window.close();
})

riot.route('/test',() => {
  if (tag!=null) {
    tag.unmount(true);
  }
  tag=riot.mount('div#render-target','servers')[0]
})

riot.route.start(true)
