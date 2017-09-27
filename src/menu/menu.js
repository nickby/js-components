;(function () {
    'use strict';

    class Menu {
        constructor({el, data}) {
            this.$el = el;
            this.data = data;

            this.$el.addEventListener('click', this._onMenuClick);
        }

        setData(data) {
            this.data = data;
            this.render();
        }

        render() {
            if (!this.data || !this.data['title']) return;
            this._renderItem(this.$el, this.data);


        }

        _onMenuClick(event) {
            let el = event.target.nextSibling;

            if (el && el.tagName === 'UL') {
                if (el.hasAttribute('hidden')) {
                    el.removeAttribute('hidden');
                } else {
                    el.setAttribute('hidden', '');
                }
            }
        }

        _renderItem(parent, item) {
            let el = document.createElement(parent === this.$el ? 'ul' : 'li');

            let span = document.createElement('span');
            span.textContent = item['title'];
            span.classList.add('js-menuItem');
            if (parent === this.$el){
                span.classList.add('js-mainMenu');
            }
            el.appendChild(span);

            if (item['items'].length > 0) {
                span.classList.add('js-submenu');
                let newParent = el;

                if (el.tagName === 'LI') {
                    let ul = document.createElement('ul');
                    ul.setAttribute('hidden', '');
                    el.appendChild(ul);
                    newParent = ul;
                }

                for (let i = 0; i < item['items'].length; i++) {
                    this._renderItem(newParent, item['items'][i]);
                }
            }

            parent.appendChild(el);
        }
    }

    // export
    window.Menu = Menu;
})();