;(function () {
    'use strict';

    class Menu {
        constructor({el, data}) {
            this.$el = el;
            this.data = data;

            this.uid = 0;

            this.$el.addEventListener('click', this._onMenuClick.bind(this));
        }

        /**
         * Save new data to menu and update form
         * @param {Object} data
         */
        setData(data) {
            this.data = data;
            this.render();
        }

        /**
         * Add new item to menu data on press button Add
         * @param data
         */
        addMenuItem(data) {
            let id = data.itemParent || 0;

            let item = this._getMenuItemById(this.data, id);
            if (item) {
                item['items'].push({title: data.itemName, items: []});
                this.render();
            }
        }

        /**
         * Build menu by data
         */
        render() {
            if (!this.data || !this.data['title']) return;
            this.$el.innerHTML = '';
            this._renderItem(this.$el, this.data);
        }

        /**
         * Build new menu item
         * @param parent
         * @param item
         * @private
         */
        _renderItem(parent, item) {
            if (item['id'] === undefined) {
                item['id'] = ++this.uid;
            }

            let el = document.createElement(parent === this.$el ? 'ul' : 'li');

            let span = document.createElement('span');
            span.setAttribute('id', 'js-span-'+item['id']);
            span.textContent = item['title'];
            span.classList.add('js-menuItem');
            span.classList.add('alert');
            if (parent === this.$el){
                span.classList.add('js-mainMenu');
                span.classList.add('alert-primary');
            } else {
                span.classList.add('alert-warning');
            }
            el.appendChild(span);

            if (item['items'].length > 0) {
                span.classList.add('js-submenu');
                let newParent = el;

                if (el.tagName === 'LI') {
                    let ul = document.createElement('ul');
                    //ul.setAttribute('hidden', '');
                    el.appendChild(ul);
                    newParent = ul;
                }

                for (let i = 0; i < item['items'].length; i++) {
                    this._renderItem(newParent, item['items'][i]);
                }
            }

            parent.appendChild(el);
        }

        /**
         * Find and get menu item by id
         * @param item
         * @param id
         * @return {null|item}
         * @private
         */
        _getMenuItemById(item, id) {
            if (id === 0 || item['id'] === +id) {
                return item;
            } else {
                for (let i = 0; i < item['items'].length; i++) {
                    let result = this._getMenuItemById(item['items'][i], id);
                    if (result) {
                        return result;
                    }
                }
            }
            return null;
        }

        /**
         * Fill form fields and expand menu on click
         * @param event
         * @private
         */
        _onMenuClick(event) {
            let el = event.target.nextSibling;

            // organize drop-down menu
            if (el && el.tagName === 'UL') {
                if (el.hasAttribute('hidden')) {
                    el.removeAttribute('hidden');
                } else {
                    el.setAttribute('hidden', '');
                }
            }

            // generate and send event on menu item click
            if (event.target.tagName === 'SPAN') {
                let newEvent = new CustomEvent(
                    "clickMenuItem",
                    {
                        detail: {
                            parent: event.target.textContent,
                            span: event.target.id,
                        },
                        bubbles: true,
                        cancelable: true
                    }
                );
                this.$el.dispatchEvent(newEvent);
            }
        }

    }

    // export
    window.Menu = Menu;
})();