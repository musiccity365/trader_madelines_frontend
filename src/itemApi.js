class ItemApi {
    static baseURL = 'http://localhost:3000/items'

    static getItems() {
        fetch(this.baseURL)
            .then(resp => resp.json())
            .then(data => {

                data["data"].forEach(item => {
                    const i = new Item({ id: item.id, ...item.attributes })
                    i.attachToDom()
                })
            })
    }

    static createItem() {

        const formData = {
            name: nameInput.value,
            price: priceInput.value,
            description: descriptionInput.value,
            category_id: dropdown.value
        }

        const configObj = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(formData)
        }

        fetch(this.baseURL, configObj)
            .then(r => r.json())
            .then(data => {
                const item = data.data
                const i = new Item({ id: item.id, ...item.attributes })

                i.attachToDom()

            })
    }

    // NEW 
    // might want to make these arrow functions if going to use as a callback
    static sendPatch(item) {

        let { price, name, description } = item
        const itemInfo = {
            price,
            name,
            description
        }

        const configObj = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(itemInfo)
        }

        fetch(`${this.baseURL}/${item.id}`, configObj)
            .then(r => r.json())
            .then(json => {
                // we are optomistically rendering here since we don't use the json response
                item.renderLi()
            })
    }

    // NEW 
    static deleteItem(id) {
        const configObj = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }

        fetch(`${this.baseURL}/${id}`, configObj)
            .then(r => r.json())
            .then(json => alert(json.message))
    }
}