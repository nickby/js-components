;(function () {
    'use strict';

    class App {
        constructor({el}) {
            this.menu = new window.Menu({
                el: el.querySelector('.js-menu'),
                data: {title: '', items: []}
            });

            this.menu.setData({
                title: 'Catalogue',
                items: [
                    {title: 'Category 1', items: []},
                    {title: 'Category 2', items: []},
                    {title: 'Category 3', items: [
                        {title: 'Category 3-1', items: []},
                        {title: 'Category 3-2', items: []},
                        {title: 'Category 3-3', items: []},
                    ]},
                    {title: 'Category 4', items: [
                        {title: 'Category 4-1', items: []},
                        {title: 'Category 4-2', items: []}
                    ]},
                ]
            });

            this.form = new window.Form({el: el.querySelector('.js-form'), menu: el.querySelector('.js-menu')});
            this.form.render();
        }
    }

    // export
    window.App = App;
})();