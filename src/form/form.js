;(function () {
    'use strict';

    class Form {
        constructor ({el, menu}) {
            this.$el = el;
            this.$menu = menu;

            this.$newItemParent = '';
            this.$newItemName = '';
        }

        render () {
            let frm = document.createElement('form');
            this.$el.appendChild(frm);

            let labelParent = document.createElement('label');
            labelParent.textContent = 'Parent:';

            let inputParent = document.createElement('input');
            inputParent.setAttribute('type', 'text');
            inputParent.classList.add('js-input-parent');

            let hiddenSpan = document.createElement('input');
            hiddenSpan.setAttribute('type', 'text');
            hiddenSpan.setAttribute('hidden', '');
            hiddenSpan.classList.add('js-input-parent-span');



            let labelValue = document.createElement('label');
            labelValue.textContent = 'Item name:';

            let inputValue = document.createElement('input');
            inputValue.setAttribute('type', 'text');
            inputValue.classList.add('js-input-value');

            // let btn = document.createElement('button');
            let btn = document.createElement('input');
            btn.setAttribute('type', 'button');
            btn.setAttribute('value', 'Add');

            btn.addEventListener('click', this._onButtonClick.bind(this));

            frm.appendChild(labelParent);
            frm.appendChild(inputParent);

            frm.appendChild(hiddenSpan);

            frm.appendChild(labelValue);
            frm.appendChild(inputValue);

            frm.appendChild(btn);

            this.$newItemParent = hiddenSpan;
            this.$newItemValue = inputValue;
        }

        _onButtonClick (event) {
            let newEvent = new CustomEvent(
                "addMenuItem",
                {
                    detail: {
                        itemParent: this.$newItemParent.value,
                        itemName: this.$newItemValue.value,
                        time: new Date(),
                    },
                    bubbles: true,
                    cancelable: true
                }
            );

            this.$menu.dispatchEvent(newEvent);
        }
    }

    // export
    window.Form = Form;
})();