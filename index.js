const baseURL = 'http://localhost:3000'
const itemsURL = baseURL + '/items'


const list = document.getElementById("item-list")

const form = document.getElementById('item-form')
const priceInput = document.getElementById('item-price')
const nameInput = document.getElementById('item-name')
const descriptionInput = document.getElementById('item-description')

// New
const dropdown = document.getElementById('cat-dropdown')
const catNameInput = document.getElementById("category-name")

form.addEventListener('submit', handleFormSubmit)

function handleFormSubmit(e){
    e.preventDefault()

    ItemApi.createItem()
    form.reset()
}

// Deleted old, functional edit, update, delete
// moved them to api class


ItemApi.getItems()

// NEW
CategoryApi.getCategories()