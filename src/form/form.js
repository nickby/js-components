;(function () {
    'use strict';

    class Form {
        constructor ({el, menu}) {
            this.$el = el;
            this.$menu = menu;

            this.$newItemParent = '';
            this.$newItemSpan = '';
            this.$newItemName = '';
        }

        /**
         * Build form
         */
        render () {
            let frm = document.createElement('form');
            frm.classList.add('form-inline');
            this.$el.appendChild(frm);

            let inputParent = document.createElement('input');
            inputParent.setAttribute('type', 'text');
            inputParent.setAttribute('placeholder', 'Root menu');
            inputParent.setAttribute('readonly', '');
            inputParent.classList.add('form-control');
            inputParent.classList.add('js-input-parent');


            let hiddenSpan = document.createElement('input');
            hiddenSpan.setAttribute('type', 'text');
            hiddenSpan.setAttribute('hidden', '');
            hiddenSpan.classList.add('js-input-parent-span');



            let inputValue = document.createElement('input');
            inputValue.setAttribute('type', 'text');
            inputValue.setAttribute('placeholder', 'New item name');
            inputValue.classList.add('form-control');
            inputValue.classList.add('js-input-value');

            let btn = document.createElement('input');
            btn.setAttribute('type', 'button');
            btn.setAttribute('value', 'Add');
            btn.classList.add('btn');
            btn.classList.add('btn-primary');

            btn.addEventListener('click', this._onButtonClick.bind(this));

            frm.appendChild(inputParent);
            frm.appendChild(hiddenSpan);
            frm.appendChild(inputValue);
            frm.appendChild(btn);

            this.$newItemParent = inputParent;
            this.$newItemSpan = hiddenSpan;
            this.$newItemName = inputValue;
        }

        /**
         * Create and send new event to menu
         * @param event
         * @private
         */
        _onButtonClick (event) {

            if (!this.$newItemName.value) {
                alert('Please, input menu item name!');
                return;
            }

            let newEvent = new CustomEvent(
                "addMenuItem",
                {
                    detail: {
                        itemParent: this.$newItemSpan.value,
                        itemName: this.$newItemName.value,
                    },
                    bubbles: true,
                    cancelable: true
                }
            );

            this.$menu.dispatchEvent(newEvent);

            this.$newItemParent.value = '';
            this.$newItemName.value = '';
            this.$newItemSpan.value = '';
        }
    }

    // export
    window.Form = Form;
})();