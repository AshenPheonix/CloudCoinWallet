/*
Example{
  nn=1,
  sn=1,
  expiration=new Date(Date.UTC(Date.getFullYear()+2),Date.getMonth(),Date.getDay()),//none currently implemented
  an=[
    ""
  ]
}

*/
class CCoin {
  constructor(sn,nn,expire,an) {
    this.sn=sn
    this.nn=nn
    this.an=an
    this.expiration=expire
  }
}
