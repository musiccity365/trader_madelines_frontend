// NEW 

class CategoryApi {

    static baseURL = 'http://localhost:3000/categories'
        

    static getCategories(){
        fetch(this.baseURL)
        .then(r => r.json())
        .then( json => {
            json["data"].forEach(element => {
                const c = new Category({id: element.id, ...element.attributes})
                c.addToDom()
                c.addToDropDown()
            })
        })
    }
}