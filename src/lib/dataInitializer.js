import myJson from "./data.json" assert { type: 'json' };

// fetch('./data.json').then((response) => response.json()).then((json) => initializeData(json));

initializeData(myJson)

function initializeData(data) {
    // Tager alle items
    console.log(data.items)
    for (const key in data.items) {
        let item = data.items[key]
        let sql = `
        insert into items(className, slug, name, description, sinkPoints, stackSize, energyValue, liquid) 
        values (${ item.className }, ${ item.slug }, ${ item.name }, ${ item.description }, ${ item.sinkPoints }, ${ item.stackSize }, ${ item.energyValue }, ${ item.liquid })`
        console.log(sql)
    }
}