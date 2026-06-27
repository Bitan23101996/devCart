const fs = require('node:fs');
const path = require('node:path');

const dbPath = path.join(__dirname, '..', 'db', 'db.json');

function readDB() {
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
}

function writeDB(insertData) {
    fs.writeFileSync(dbPath, JSON.stringify(insertData, null, 2));
}

module.exports = { readDB, writeDB };