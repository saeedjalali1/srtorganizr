// ------------------------------------------------------------------
// use helper functions to hook up the main object so "this"
// works in the explorer object
// ------------------------------------------------------------------

function main_startup() {
  main.startup();
}

function main_shutdown() {
  main.shutdown();
}


// ------------------------------------------------------------------
// attach to window events so main object can startup / shutdown
// ------------------------------------------------------------------

window.addEventListener("load", main_startup, false);
window.addEventListener("unload", main_shutdown, false);


// ------------------------------------------------------------------
// main object
// ------------------------------------------------------------------

var main = {
  initialized : false,

  _handleWindowClose : function(event) {
    // handler for clicking on the 'x' to close the window
    return this.shutdownQuery();
  },


  startup : function() {
    if (this.initialized)
      return;
    this.initialized = true;

    var self = this;

    window.addEventListener("close", function(event) { self._handleWindowClose(event); }, false);


    FileController.init(this);
    window.controllers.appendController(FileController);

    ToolsController.init(this);
    window.controllers.appendController(ToolsController);
    HelpController.init(this);
    window.controllers.appendController(HelpController);

  },

  shutdownQuery : function() {
    // do any shutdown checks
    // return false to stop the shutdown
    return true;
  },

  shutdown : function() {
  }
};
