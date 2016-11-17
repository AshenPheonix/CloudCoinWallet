Caller = class {
  constructor(coin){
    this.coin=coin;
    this.success=0;
    this.fails=[];
  }

  validate(){

  }
  own(){

  }
  returned(back){
    if (back.validation==true) {
      this.success=true
    }else {
      this.fails.push(back.locale)
      this.valid=true
    }
    if (this.fails.length>5) {
      watcher.trigger('failed',this.coin);
    }else if (this.success+this.fails.length==25) {
      watcher.trigger('success',this.coin)
      $.each('this.fails', function(index, val) {
        //$.get('')
      });
    }
  }
}
