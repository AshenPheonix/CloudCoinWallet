var fs=require('fs')
store={
  server:{},
  currentHeld:{manual:[],text:[],image:[]},
  currentTests:[]
}

function spy(){
  riot.observable(this);
  var self=this

  this.on('start', () => {
    $.get('http://www.cloudcoin.co/servers.html',(d)=>{
      var temp=d.slice(d.indexOf('{'))
      fs.writeFile('data/servers.json', JSON.stringify(JSON.parse(temp)),(err) => {
        if (err) {
        }else {
          store.server=JSON.parse(temp).server;
          this.trigger('serverUpdate')
          $.each(JSON.parse(temp).server, function(index, val) {
              $.get('https://'+val.url+'/service/echo.'+val.ext,(data,status) => {
                console.log(status);
                try {
                  store.server[index].status=JSON.parse(data).status
                } catch (e) {
                  console.log("error Indicated ::");
                  console.log(val.url);
                }
                self.trigger('serverUpdate')
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
  this.on('testRet', () => {})
}

watcher=new spy(store);
watcher.trigger('start')
