const getTemplate = (data = [], placeholder, selectedId) => {
    let text = placeholder ?? `Text if we don't have objec.placeholder`;

    const items = data.map(item => {

        let cls ='';

        if (item.id === selectedId) {
            text = item.value;
            cls = 'selected';
        }

        return `
        <li class="select__item " >
             <a target="_blank" href="${item.link}" class="select__link  ${cls}" data-type = "item" data-id = "${item.id}">${item.value}</a>
        </li>   
        `
    })

    return `
    <div class="select__input" data-type = "input">
        <span class="select__input-text" data-type = "value">${text}</span>
        <img class="select__input-img select__input-img-down" src="assets/libs/select-plugin/assets/img/select-arrow-up-down.svg" alt="" data-arrow = "arrow" data-type = "input">
    </div>
    <div class="select__dropdown">
         <ul class="select__list">
             ${items.join('')}    
        </ul>
    </div>
    `

};

class Select {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.options = options;
        this.selectedId = options.selectedId;

        this.#render();
        this.#setup();
    }

    #render() {
        const {placeholder} = this.options;
        const {data} = this.options;
        this.$el.classList.add('select');
        this.$el.innerHTML = getTemplate(data, placeholder,  this.selectedId);
    }

    #setup() {
        this.clickHandler = this.clickHandler.bind(this);
        this.$el.addEventListener('click', this.clickHandler);
        this.$arrow = this.$el.querySelector('[data-arrow="arrow"]');
        this.$value = this.$el.querySelector('[data-type = "value"]');
    }

    clickHandler(event) {
        const {type} = event.target.dataset;

        if (type === 'input') {
            this.toggle();
        } else if(type === "item"){
            const id = event.target.dataset.id;
            this.select(id);
        }
    }

    get isOpen() {
        return this.$el.classList.contains('open');
    }
    get current(){
        return this.options.data.find(item => item.id === this.selectedId);
    }

    select(id){
        this.selectedId = id;
        this.$value.textContent = this.current.value;

        this.$el.querySelectorAll('[data-type="item"]').forEach(el => {
            el.classList.remove('selected');
        });
       
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected');
        
        this.close();
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.$el.classList.add('open');
        this.$arrow.classList.remove('select__input-img-down');
        this.$arrow.classList.add('select__input-img-up');
    }

    close() {
        this.$el.classList.remove('open');
        this.$arrow.classList.add('select__input-img-down');
        this.$arrow.classList.remove('select__input-img-up');
    }

    destroy() {
        this.$el.removeEventListener('click', this.clickHandler);
        this.$el.innerHTML = '';
    }
}

// const select = new Select('#select', {
//     placeholder: 'PL',
    
//     // текст с item.value вместо preceholder
//     selectedId: '4',
//     data:[
//         {id: '1', value: 'item__1', link: '#'},
//         {id: '2', value: 'item__2', link: '#'},
//         {id: '3', value: 'item__3', link: '#'},
//         {id: '4', value: 'item__4', link: '#'},
//         {id: '5', value: 'item__5', link: '#'},
//         {id: '6', value: 'item__6', link: '#'},
//         {id: '7', value: 'item__7', link: '#'},
//         {id: '8', value: 'item__8', link: '#'},
//     ]

// });