riot.tag2('navigate', '<ul> <li onclick="{home}">Home</li> <li onclick="{test}">Test Servers</li> <li onclick="{open}">Open Files</li> <li onclick="{save}">Save Open Files</li> <li onclick="{takePosession}">Take Posession</li> <li onclick="{exit}">Exit</li> </ul> <br>', 'navigate ul,[riot-tag="navigate"] ul,[data-is="navigate"] ul{ list-style-type: none; } navigate li,[riot-tag="navigate"] li,[data-is="navigate"] li{ display: inline-block; border-width: thin; border-radius: 3px; border-color: black; border-style: ridge; background-image: url(\'images/scroll.jpg\'); font-size: 14pt; padding: 5px; } navigate li:hover,[riot-tag="navigate"] li:hover,[data-is="navigate"] li:hover{ cursor: pointer; }', '', function(opts) {
    this.home = function(e){
      riot.route('/')
    }.bind(this)
    this.open = function(e){
      riot.route('/open')
    }.bind(this)
    this.save = function(e){
      riot.route('/save')
    }.bind(this)
    this.test = function(e){
      riot.route('/test')
    }.bind(this)
    this.takePosession = function(e){
      riot.route('/posess')
    }.bind(this)
    this.exit = function(e){
      riot.route('/exit')
    }.bind(this)
});
