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

type anyFn = (...args: any[]) => any;

function printPerformance<T extends anyFn = anyFn>(fn: T): T {
    return function (...args) {
        let startTimeSeconds = new Date().getMilliseconds();
        fn.apply(null, args)
        console.log("function:", fn.name, ",exe time is:", new Date().getMilliseconds() - startTimeSeconds)
    } as T
}

let wrapper = printPerformance(function sum(...args) {
    let sum = (args || []).reduce(function (num, mem) {
        return mem + num
    }, 0)
    let arr = new Array(1000000).join(',')
    console.log('sum is:', sum)
    return sum;
});

wrapper(1, 3, 4, 5)

type RecordType = {
    name: string,
    id: string,
}
type Args<T>= {
    tagsData?: T[]
    labelKey?: keyof T
    valueKey?: keyof T
    label?: string,
    value?: string|number[],
    onChange?: (setSelectedTags: (string|number)[]) => void,
}

new Promise(function (resolve, reject){
    setTimeout(function (){
        reject('err')
    },1000)
}).then(function (data){
    console.log(data)
},function (data){
    console.log(data)
})