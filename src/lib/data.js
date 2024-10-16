import sql from "./db.js"
export {getItems}

async function getItems() {
    const items = await sql`
      select * from items
    `
    return items
}
