const fs = require('fs')
const {v4: uuidv4} = require('uuid');
const path = require('path')

function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, function (eror, data) {
            if (!eror) {
                resolve(JSON.parse(data));
            } else {
                console.log('error');
                reject(JSON.stringify({reason: 'error', result: '参数错误', error_code: 400}));
            }
        });
    });
}

let createUUID = () => uuidv4()

let getStat = (path) => {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                resolve(false);
            } else {
                resolve(stats);
            }
        })
    })
}

let mkdir = (dir) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(dir, err => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        })
    })
}
let dirExists = async (dir) => {
    let isExists = await getStat(dir);
    if (isExists && isExists.isDirectory()) {
        return true;
    } else if (isExists) {
        return false;
    }
    let tempDir = path.parse(dir).dir;
    let status = await dirExists(tempDir);
    let mkdirStatus;
    if (status) {
        mkdirStatus = await mkdir(dir);
    }
    return mkdirStatus;
}

let getFileName = (fileName) => {

    return fileName.substr(0, fileName.lastIndexOf('.') )


}

// let readFile = (filePath) => {
//
//     return new Promise((resolve, reject) => {
//         fs.readFile(filePath, (err, data) => {
//             if (!err) resolve(data)
//             else
//                 resolve(null)
//         });
//     })

// }
module.exports = {
    readFile,
    createUUID,
    dirExists,
    getFileName
    // readFile
}
