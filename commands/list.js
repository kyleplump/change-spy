#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const _mapPath = path.resolve(__dirname, '_map.json');

if(fs.existsSync(_mapPath)) {

    fs.readFile(_mapPath, function(err, data) {
        if(err) {
            // todo
            console.log('-- Error: ', err);
            return;
        }

        const dataMap = JSON.parse(data);
        const fileList = Object.keys(dataMap);

        if(fileList.length === 0) {
            console.log('-- Not currently spying on any files!')
        }
        else {
            console.log('-- Spied files:')
            for(let i = 0, len = fileList.length; i < len; i ++) {
                const fileName = fileList[i];
                console.log(fileName);
            }
        }
    })
}
else {
    // todo
}
