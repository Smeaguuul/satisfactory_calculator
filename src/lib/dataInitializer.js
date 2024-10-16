import myJson from "./data.json" assert { type: 'json' };
import sql from "./db.js"


initializeData(myJson)

async function initializeData(data) {
    // Tager alle items
    for (const itemKey in data.items) {
        let item = data.items[itemKey]
        await sql`
        insert into items(className, slug, name, description, sinkPoints, stackSize, energyValue, liquid) 
        values (${item.className}, ${item.slug}, ${item.name}, ${item.description}, ${item.sinkPoints}, ${item.stackSize}, ${item.energyValue}, ${item.liquid})`
    }

    //Tager alle buildings og den tilhørende metadata
    for (const buildingKey in data.buildings) {
        let building = data.buildings[buildingKey]
        await sql`
        insert into buildings(className, slug, name, description) 
        values (${building.className}, ${building.slug}, ${building.name}, ${building.description})`

        let metadata = building.metadata;
        await sql`
        insert into metadata(powerconsumption, powerConsumptionExponent, manufacturingSpeed, fk_building) 
        values (${metadata.powerConsumption}, ${metadata.powerConsumptionExponent}, ${metadata.manufacturingSpeed}, ${building.className})`
    }

    //Tager alle recipes
    for (const recipeKey in data.recipes) {
        let recipe = data.recipes[recipeKey]
        if (!recipe.forBuilding) { //Ikke interesseret i building recipes
            await sql`
            insert into recipes(className, slug, name, alternate, inhand, forbuilding, inworkshop, inmachine, isvariablepower, minpower, maxpower) 
            values (${recipe.className}, ${recipe.slug}, ${recipe.name}, ${recipe.alternate}, ${recipe.inHand}, ${recipe.forBuilding}, ${recipe.inWorkshop}, ${recipe.inMachine}, ${recipe.isVariablePower}, ${recipe.minPower}, ${recipe.maxPower})`
            //Tager alle ingredienser
            for (let index = 0; index < recipe.ingredients.length; index++) {
                const ingredient = recipe.ingredients[index];
                console.log(ingredient);
                await sql`
                insert into ingredients(amount, fk_item, fk_recipe) 
                values (${ingredient.amount}, ${ingredient.item}, ${recipe.className})`
            }
            //Tager alle produkter
            for (let index = 0; index < recipe.products.length; index++) {
                const product = recipe.products[index];
                await sql`
              insert into products(amount, fk_item, fk_recipe) 
               values (${product.amount}, ${product.item}, ${recipe.className})`
            }
            //Tager aller "producedIn"
            for (let index = 0; index < recipe.producedIn.length; index++) {
                const producedIn = recipe.producedIn[index];
                await sql`
              insert into producedin(fk_recipe, fk_building) 
              values (${recipe.className}, ${producedIn})`
            }
        }
    }
}
