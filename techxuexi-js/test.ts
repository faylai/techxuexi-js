export default class Test<T> {
    flag: boolean = true
    category: string
    name: T
    init: boolean = false
    hello() {
        console.log("the category is:", this.category)
    }

    constructor(category: string, name: T) {
        this.category = category
        this.name = name
        this.init = true
    }
}
