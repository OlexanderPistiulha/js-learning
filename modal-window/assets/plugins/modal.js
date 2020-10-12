function createModal(options) {
    const DEFAULT_WIDTH = '600px';
    const modal = document.createElement('div');

    modal.classList.add('modal');
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal__overlay" data-close>
            <div class="modal__window" style="width: ${options.width || DEFAULT_WIDTH}">
                <div class="modal__header">
                    <span class="modal__title">${options.title || ''}</span>
                    ${options.closable ? ` <span class="modal__close" data-close >+</span>` : ''}                   
                </div>
                <div class="modal__body">
                   ${options.content || ''}
                </div>
                <div class="modal__footer">
                    <button> OK</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    `);

    document.body.appendChild(modal);

    return modal;
}


$.modal = function (options) {
    const $modal = createModal(options);
    const modal = {
        open() {
            $modal.classList.add('open');
        },
        close() {
            $modal.classList.remove('open');
        },
    }


    $modal.addEventListener('click', event => {
        console.log(event.target.dataset.close);
        if (event.target.dataset.close) {
            modal.close();
        }
    })

    return modal;
}