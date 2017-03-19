riot.tag2('manual', '<fieldset> <legend>Please Enter Your Information</legend><br> <label for="serial">Serial Number</label><input type="text" name="serial" placeholder="serial number" onblur="{test}"><br> <label for="Denomination">Derived Denomination :{denom}</label><br> <label for="AN">Authenticity Code</label><input type="text" name="AN" placeholder="Authenticity Code"><br> <button if="{able}" type="button" name="sub" onclick="{submit}">Submit Codes</button> <p id="error"> </p> <ul id="status"> </ul> </fieldset>', 'manuald ul,[riot-tag="manual"]d ul,[data-is="manual"]d ul{ list-style-type: none; }', '', function(opts) {
    self=this
    able=false
    denom="None Provided"
    counter=0
    good=true
    good=false
    toSend={}

    this.test = function(e){
      var toTest=this.serial.value
      self.able=true
      if (toTest>0 && toTest<=16777215) {
        self.denom=1
      }else if (toTest>16777215 && toTest<=4194304) {
        self.denom=5
      }else if (toTest>4194304 && toTest<=6291456) {
        self.denom=25
      }else if (toTest>6291456 && toTest<=14680064) {
        self.denom=100
      }else if (toTest>14680064 && toTest<=16777216) {
        self.denom=250
      }else {
        self.denom="Invalid Serial"
        self.able=false
      }
      this.update()
    }.bind(this)

    this.submit = function(e){
      var tempString=md5(self.AN.value)
      while (tempString.length<(25*16)) {
        tempString+=tempString
      }
      var temp={
        sn:self.serial.value,
        denomination:self.denom,
        nn:1,
        an:[],
        pan:[]
      }
      for (var i = 0; i < 25; i++) {
        temp.an.push(tempString.substring(i*25,(i*25)+25));
      }
      temp.pan=temp.an
      toSend=temp;
      var status=$('#status')

      status.empty()
      status.append($('<p></p>').text('testing'));
      $.each(store.server, function(index, val) {
        if (val.ext == undefined) {
          val.ext="aspx"
        }
        $.get('https://'+val.url+'/service/detect.'+val.ext,{sn:temp.sn,denomination:temp.denomination,nn:1,pan:temp.pan[index],an:temp.an[index]},(data) => {
          var returned=JSON.parse(d);
          if (returned.status=="fail") {
            status.append($('<p></p>').text('Failed ' + returned.server + ': ' + returned.message))
          }
          self.count()
        })
      })
      if (currentHeld.manual==undefined) {
        store.currentHeld.manual=[]
      }
    }.bind(this)

});
