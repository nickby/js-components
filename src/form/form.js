;(function () {
    'use strict';

    class Form {
        constructor ({el}) {
            this.$el = el;
        }

        /**
         * Build form with fields
         */
        render () {
            let frm = document.createElement('form');
            frm.classList.add('form-inline');
            this.$el.appendChild(frm);

            let inputParent = document.createElement('input');
            inputParent.setAttribute('type', 'text');
            inputParent.setAttribute('name', 'inputParent');
            inputParent.setAttribute('placeholder', 'Root menu');
            inputParent.setAttribute('readonly', '');
            inputParent.classList.add('form-control');
            inputParent.classList.add('js-input-parent');

            let hiddenSpan = document.createElement('input');
            hiddenSpan.setAttribute('type', 'text');
            hiddenSpan.setAttribute('name', 'hiddenSpan');
            hiddenSpan.setAttribute('hidden', '');
            hiddenSpan.classList.add('js-input-parent-span');

            let inputValue = document.createElement('input');
            inputValue.setAttribute('type', 'text');
            inputValue.setAttribute('name', 'inputValue');
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

            this.$form = frm;
        }

        /**
         * Fill form fields with menu data
         * @param data
         */
        fillFormElements (data) {
            this.$form.inputParent.value = data.parent;
            this.$form.hiddenSpan.value = data.span;
        }

        /**
         * Create and send new event to menu
         * @param event
         * @private
         */
        _onButtonClick (event) {

            // check item name
            if (!this.$form.inputValue.value) {
                alert('Please, input menu item name!');
                return;
            }

            // generate and send custom button click event
            let newEvent = new CustomEvent(
                "clickAddButton",
                {
                    detail: {
                        itemParent: this.$form.hiddenSpan.value.split('-')[2],
                        itemName: this.$form.inputValue.value,
                    },
                    bubbles: true,
                    cancelable: true
                }
            );
            this.$el.dispatchEvent(newEvent);

            // clear input values after event send
            this.$form.querySelectorAll('input[type=text]').forEach(item => item.value = '');
        }
    }

    // export
    window.Form = Form;
})();