class Item {

    static all = []

    // NEW
    static container = document.getElementById('item-list')

    constructor({id, name, description, price, category_id}){
        this.id = id
        this.name = name 
        this.price = price 
        this.description = description
        this.categoryId = category_id

        this.element = document.createElement('li')
        this.element.id = `item-${id}`
        this.element.dataset.id = id 

        this.element.addEventListener('click', this.handleItemClick)

        Item.all.push(this)
    }

    // New Changes here:
    handleItemClick = (e) => {
        if (e.target.innerText === "Edit"){
            // OLD 
            // renderEditForm(e.target)

            // NEW OO
            this.createEditFields(e.target)

            e.target.innerText = "Save"
        }else if(e.target.innerText === "Delete"){
            // OLD
            // deleteItem(e) 

            // NEW OO
            this.deleteItem(e)
        } else if(e.target.innerText === "Save"){ 
           // OLD
            // patchElement(e.target.parentElement)
            
            // NEW OO
            this.saveUpdatedItem()

            e.target.innerText = "Edit"
        }
    }

    renderLi(){
        this.element.innerHTML = `
        <div data-id="${this.id}">
            $<span class="price">${this.price}</span>
            <strong class="name">${this.name}</strong>:
            <span class="description">${this.description}</span> 
        </div>
        <button class="edit" data-id="${this.id}">Edit</button>
        <button class="delete" data-id="${this.id}">Delete</button>
    `

        return this.element
    }

    attachToDom(){
        
        list.appendChild(this.renderLi())
    }

    // NEW 
    createEditFields = (editBtn) =>{
        // now using this to access the element
        const li = this.element
        const div = this.element.querySelector('div')

        // Grab the current values to pre-populate our input fields
        const name = li.querySelector('.name').innerText
        const description = li.querySelector('.description').innerText
        const price = li.querySelector('.price').innerText
        
        // update the html and interpolate values:
        div.innerHTML = `
        <input type="text" name="name" class="edit-name" value="${name}">
        <input type="text" name="description" class="edit-description" value="${description}">
        <input type="number" name="price" class="edit-price" min="0" step=".01" value="${price}">
        `
    }

    // NEW 
    deleteItem = (e) => {
        this.element.remove() // remove it before the fetch request 
        ItemApi.deleteItem(this.id) // moved fetch to itemApi for separation of concerns
    }

    // NEW 
    saveUpdatedItem = () => {
        this.price = this.element.querySelector(".edit-price").value
        this.name = this.element.querySelector(".edit-name").value
        this.description = this.element.querySelector(".edit-description").value
    
        ItemApi.sendPatch(this) // moved fetch to itemApi for separation of concerns
    }

    static filterByCategory(filteredCategory ){
        
        if (filteredCategory){
            for (const item of Item.all){
                if(item.categoryId === parseInt(filteredCategory.id)){
                    item.element.style.display = ""
                } else {
                    item.element.style.display = "none"
                }
            }
        } else {
   
            
            for (const item of Item.all){
                item.element.style.display = ""
            }
        }
       
    }

    // static filterByCategory(filteredCategory ){
        
    //     if (filteredCategory){
    //         const filteredItems = Item.all.filter((item) => {
    //             return item.categoryId === parseInt(filteredCategory.id)
    //         })

    //         Item.container.innerHTML = ''

    //         for (const item of filteredItems){
    //             item.attachToDom()
    //         }
    //     } else {
    //         Item.container.innerHTML = ''

    //         for (const item of Item.all){
    //             item.attachToDom()
    //         }
    //     }
       
    // }

}


