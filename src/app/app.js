;(function () {
    'use strict';

    class App {
        constructor({el}) {
            this.menu = new window.Menu({el: el.querySelector('.js-menu')});
            this.form = new window.Form({el: el.querySelector('.js-form')});
        }
    }

    // export
    window.App = App;
})();