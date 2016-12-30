const anyBase = require('any-base');
let dec2hex=anyBase(anyBase.DEC, anyBase.HEX)
let hex2dec=anyBase(anyBase.HEX, anyBase.DEC)

CCoin=class{
  constructor(sn,nn,expire,an,denomination=0,type='text',extra='',owner='',lhs=0,loc='') {
    this.sn=sn;
    this.nn=nn;
    this.an=an;
    this.ed=expire;
    this.aoid='00';
    this.lhs=lhs;
    this.loc=loc
    this.type=type
    this.extra=extra
    this.hc='00'
    this.lhs='00'
    //if (denomination==0) {
      if (this.sn>0 && this.sn<=2097152) {
        this.denomination=1
      }else if (this.sn>2097152 && this.sn<=4194304) {
        this.denomination=5
      }else if (this.sn>4194304 && this.sn<=6291456) {
        this.denomination=25
      }else if (this.sn>6291456 && this.sn<=14680064) {
        this.denomination=100
      }else if (this.sn>14680064 && this.sn<=16777216) {
        this.denomination=250
      }
    //}else {
    //  this.denomination=denomination;
    //}
  }

  stringify(){
    var senddate=new Date(this.ed);
    this.newDate=dec2hex(senddate.getMonth().toString()).toString()+dec2hex(senddate.getFullYear().toString()).toString();
    this.sendSN=dec2hex(this.sn.toString())
    while(this.sendSN.length<6)
      this.sendSN='0'+ this.sendSN
    return JSON.stringify(this,['an','aoid','hc','lhs','newDate','nn','sendSN']).replace(/("|,|{|}|:|\[|\]|aoid|sn|an|newDate|sendSN|nn|lhs|hc)/g, '');
  }
};
