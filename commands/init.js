#!/usr/bin/env node
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const readline = require('readline');

const _mapPath = path.resolve(__dirname, '_map.json');

const args = process.argv.slice(2);
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

        // check to see if the file is already tracked
        if(_data[args[0]]) {
            
            getReinitFile().then(function(result) {
                if(result.toLowerCase() === 'y') {

                    _data[args[0]] = {
                        hex,
                        content,
                    };
                    fs.writeFile(_mapPath, JSON.stringify(_data), function(err) {
                        console.log('-- Spying on: ', args[0]);
                    })
                }
                else if(result.toLowerCase() === 'n') {
                    console.log('-- Aborted');
                    return;
                }
                else {

                }
            })
        }
        else {
            _data[args[0]] = {
                hex,
                content,
            };
            fs.writeFile(_mapPath, JSON.stringify(_data), function(err) {
                console.log('-- Spying on: ', args[0]);
            })
        }
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
        console.log('-- Spying on: ', args[0]);
    })
}

function getReinitFile() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(resolve => rl.question('-- Already spying on file? Re-initialize? (y/n):', ans => {
        rl.close();
        resolve(ans);
    }))
}