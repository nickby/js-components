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
                    {title: 'Category 3', items: []},
                    {title: 'Category 4', items: []},
                ]
            });

            this.form = new window.Form({el: el.querySelector('.js-form')});
            this.form.render();

            // Subscribe on custom events from Menu and Form
            el.querySelector('.js-menu').addEventListener('clickMenuItem', this._onClickMenuItem.bind(this));
            el.querySelector('.js-form').addEventListener('clickAddButton', this._onClickAddButton.bind(this));
        }

        /**
         * Fill form input elements on menu item click
         * @param event
         * @private
         */
        _onClickMenuItem (event) {
            this.form.fillFormElements(event.detail);
        }

        /**
         * Add new menu item on button Add click
         * @param event
         * @private
         */
        _onClickAddButton (event) {
            this.menu.addMenuItem(event.detail);
        }
    }

    // export
    window.App = App;
})();