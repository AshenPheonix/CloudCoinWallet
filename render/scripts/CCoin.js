CCoin=class{
  constructor(sn,nn,expire,an,denomination=0,type='text',owner='',lhs=0,loc='') {
    this.sn=sn;
    this.nn=nn;
    this.an=an;
    this.ed=expire;
    this.aoid=owner;
    this.lhs=lhs;
    this.loc=loc
    this.type=type
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
    JSON.stringify(this,['sn','nn','an','ed','aoid','lhs','denomination']);
  }
};
