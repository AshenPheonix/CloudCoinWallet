riot.tag2('display', '<div id="display-field"> <div each="{store.currentHeld.text}"> <p class="left"> Serial :{this.sn} </p> <p class="right"> Denomination :{this.denomination} </div> </div>', 'display .left,[riot-tag="display"] .left,[data-is="display"] .left{ float: left; } display .right,[riot-tag="display"] .right,[data-is="display"] .right{ float: right; }', '', function(opts) {
});
