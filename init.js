#!/usr/bin/env node
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const _mapPath = path.resolve(__dirname, '_map.json');

const args = process.argv.slice(2);
console.log('-- Spying on: ', + args[0]);
const file = fs.readFileSync(args[0]);  
const content = file.toString();

const hash = crypto.createHash('sha256');
hash.update(file);
const hex = hash.digest('hex')

if(fs.existsSync(_mapPath)) {

    fs.readFile(_mapPath, function(err, data) {
        if(err) {
            console.log('-- Error Reading src file: ', err);
            return;
        }

        const _data = JSON.parse(data);
        _data[args[0]] = {
            hex,
            content,
        };
        fs.writeFile(_mapPath, JSON.stringify(_data), function(err) {
            console.log('-- Success')
        })
    })
}
else {  

    const content = file.toString();

    const _data = {
        [args[0]]: {
            hex,
            content,
        }
    }
    fs.writeFile(_mapPath, JSON.stringify(_data), function(err) {
        console.log('-- Success')
    })
}