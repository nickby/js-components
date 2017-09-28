;(function () {
    'use strict';

    class Menu {
        constructor({el, data, form}) {
            this.$el = el;
            this.data = data;
            this.$form = form;

            this.uid = 0;

            this.$el.addEventListener('click', this._onMenuClick.bind(this));
            this.$el.addEventListener('addMenuItem', this._onAddMenuItem.bind(this));
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
            item['id'] = ++this.uid;

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
         * Add new item to menu data on press button Add
         * @param event
         * @private
         */
        _onAddMenuItem (event) {
            //console.log(event);
            if (event.detail) {
                let id = event.detail.itemParent.split('-')[2] || 0;

                let item = this._getMenuItemById(this.data, id);
                if (item) {
                    item['items'].push({title: event.detail.itemName, items: []});
                    this.render();
                }
            }
        }

        /**
         * Fill form fields and expand menu on click
         * @param event
         * @private
         */
        _onMenuClick(event) {
            let el = event.target.nextSibling;

            if (el && el.tagName === 'UL') {
                if (el.hasAttribute('hidden')) {
                    el.removeAttribute('hidden');
                } else {
                    el.setAttribute('hidden', '');
                }
            }

            if (event.target.tagName === 'SPAN') {
                let inputParent = this.$form.querySelector('.js-input-parent');
                inputParent.value = event.target.textContent;

                let inputSpan = this.$form.querySelector('.js-input-parent-span');
                inputSpan.value = event.target.id;
            }
        }

    }

    // export
    window.Menu = Menu;
})();