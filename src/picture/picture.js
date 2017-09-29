;(function () {
    'use strict';

    class Picture {
        constructor({el}) {
            this.$el = el;
        }

        /**
         * Load random image from web and build image element
         */
        render() {
            let pic = document.createElement('img');
            pic.src = 'http://lorempixel.com/600/400/technics';
            pic.classList.add('img-fluid');
            pic.classList.add('rounded');

            this.$el.innerHTML = '';
            this.$el.appendChild(pic);
        }
    }

    // export
    window.Picture = Picture;
})();