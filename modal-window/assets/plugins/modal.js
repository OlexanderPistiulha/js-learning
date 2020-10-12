function createModal(options) {
    const DEFAULT_WIDTH = '600px';
    const modal = document.createElement('div');

    modal.classList.add('modal');
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal__overlay">
            <div class="modal__window" style="width: ${options.width || DEFAULT_WIDTH}">
                <div class="modal__header">
                    <span class="modal__title">${options.title || ''}</span>
                    ${options.closable ? ` <span class="modal__close">+</span>` : ''}                   
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
    //let closing = false;

    return {
        open() {
            $modal.classList.add('open');
        },
        close() {
           // closing = true;
            $modal.classList.remove('open');         
        },
        destroy() {}
    }
}