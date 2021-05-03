// NEW

class Category {
    static all = []

    static categoryContainer = document.getElementById('cat-container')

    constructor({ id, name }) {
        this.id = id
        this.name = name
        this.active = false

        this.element = document.createElement('button')

        Category.all.push(this)
    }

    items() {
        return Item.all.filter((item) => item.categoryId === parseInt(this.id))
    }


    render() {
        this.element.innerText = this.name
        this.element.id = `category-${this.id}`
        return this.element
    }

    addToDom() {
        Category.categoryContainer.append(this.render())
        this.addListeners()
    }

    addListeners() {
        this.element.addEventListener('click', this.setActiveCategory)
    }

    setActiveCategory = (e) => {
        let filteredCategory
        Category.all.forEach(c => {

            if (c.element === this.element && !this.active) {

                c.element.classList.add('activated')
                c.active = true
                filteredCategory = c
            } else {
                c.element.classList.remove('activated')
                c.active = false
            }

        })

        Item.filterByCategory(filteredCategory)
    }


    addToDropDown() {
        const option = document.createElement('option')
        option.value = this.id
        option.innerText = this.name
        dropdown.append(option)
    }
}