var fs=require('fs')
store={
  server:{},
  currentHeld:{manual:[],text:[],image:[]}
}

function spy(){
  riot.observable(this);
  var self=this

  this.on('start', () => {
    $.get('http://www.cloudcoin.global/servers.html',(d)=>{
      var temp=d.slice(d.indexOf('{'))
      fs.writeFile('data/servers.json', JSON.stringify(JSON.parse(temp)),(err) => {
        if (err) {
        }else {
          store.server=JSON.parse(temp).server;
          this.trigger('serverUpdate')
          $.each(JSON.parse(temp).server, function(index, val) {
            try {
              $.get('https://'+val.url+'/service/echo.'+val.ext,(data) => {
                try {
                  store.server[index].status=JSON.parse(data).status
                } catch (e) {
                  console.log("error Indicated ::");
                  console.log(val.url);
                }
                self.trigger('serverUpdate')
              })
            } catch (e) {
              console.log(e);
            }
          })
        }
      })
    })
  })

  this.on('serverUpdate',()=>{})
  this.on('updateScreen', () => {})
}

watcher=new spy(store);
watcher.trigger('start')
