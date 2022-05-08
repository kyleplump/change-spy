#!/usr/bin/env node
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const _mapPath = path.resolve(__dirname, '_map.json');
console.log('-- Verifying file integrity ...')

if(fs.existsSync(_mapPath)) {

    fs.readFile(_mapPath, function(err, data) {
        if(err) {
            // todo
            console.log('-- Error: ', err);
            return;
        }

        const dataMap = JSON.parse(data);
        const fileList = Object.keys(dataMap);

        for(let i = 0, len = fileList.length; i < len; i ++) {
            const fileName = fileList[i];
            const fileHash = dataMap[fileName].hex;

            const file = fs.readFileSync(fileName);  
            const hash = crypto.createHash('sha256');
            hash.update(file);
            
            const hex = hash.digest('hex')

            if(hex !== fileHash) {
                console.log('-- !! File content changed !!: ', fileName)
            }
        }
    })
}
else {
    // todo
}