;(function () {
    'use strict';

    class App {
        constructor({el}) {

            // save found html elements
            this.$menu = el.querySelector('.js-menu');
            this.$form = el.querySelector('.js-form');
            this.$picture = el.querySelector('.js-picture');

            // create objects
            this.menu = new window.Menu({
                el: this.$menu,
                data: {title: '', items: []}
            });

            this.menu.setData({
                title: 'Catalogue',
                items: [
                    {title: 'Category 1', items: []},
                    {title: 'Category 2', items: []},
                    {title: 'Category 3', items: []},
                    {title: 'Category 4', items: []},
                    {title: 'Category 5', items: []},
                ]
            });

            this.form = new window.Form({el: this.$form});
            this.form.render();

            this.picture = new window.Picture({el: this.$picture});
            this.picture.render();

            // subscribe on custom events from Menu and Form
            this.$menu.addEventListener('clickMenuItem', this._onClickMenuItem.bind(this));
            this.$form.addEventListener('clickAddButton', this._onClickAddButton.bind(this));
        }

        /**
         * Fill form input elements on menu item click
         * @param event
         * @private
         */
        _onClickMenuItem (event) {
            this.form.fillFormElements(event.detail);
            this.picture.render();
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