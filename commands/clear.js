#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const _mapPath = path.resolve(__dirname, '_map.json');

fs.writeFile(_mapPath, JSON.stringify({}), function(err) {
    console.log('-- No longer spying');
})
