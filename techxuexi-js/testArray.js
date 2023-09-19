let array = new Array(10000000)
console.time("set value")
for (let i = 0; i < array.length; i++) {
    array[i] = 2
}
console.timeEnd("set value")


console.time("insert top")
array.splice(5, 0, 3, 3, 3, 3, 8, 9, 0)
console.timeEnd("insert top")

let test={
    img:'http://s.jpg',
    title:'detail title',
    description:'some detail description'
}

let  test={
    title:'产品详情标题',
    left:{
        img: 'http://s.jpg',
        subTitle: 'detail title',
        description: 'description'
    },
    right:{
        img: 'http://s.jpg',
        subTitle: 'detail title',
        description: 'description'
    }
}