const path = require('path');
const fs = require('fs');
const {dirExists} = require("../common");
const {createUUID} = require("../common");
const {readFile} = require("../common");
let sqlPath = path.normalize(path.join(__dirname, '../../dist', 'sql', 'driver-license'))
// let fileDisplay = (subject, model, type) => {
//     let filePath = path.normalize(path.join(__dirname, '../../data', 'driver-license', model, type, subject.toString()))
//     fs.readdir(filePath, async function (err, files) {
//         if (err) {
//         } else {
//             let sqlText = '';
//             for (let i = 0; i < files.length; i++) {
//                 let filedir = path.join(filePath, files[i]);
//                 // let fileContent = await readFile(filedir);
//                 sqlText += createSqlText(fileContent);
//             }
//             // fs.writeFileSync(`./dist/${level}.sql`, sqlText, { encoding: 'utf8' });
//         }
//     });
// };

let createSqlText = (array, subject, model, type) => {

    var sql = ''
    for (let i = 0; i < array.length; i++) {
        let item = array[i]
        // let explains = item.explains.toString().replace('<br/>', '')
        //
        // explains = explains.replace('\r', '')
        let explains = item.explains
        explains = explains.replace(/<br\/>/g, "(br)");
        explains = explains.replace(/\r/g, "(r)");

        console.log(explains);
        // explains=explains.replace(/\r\n/g,"<br>")
        // explains=explains.replace(/\n/g,"<br>");
         sql += `insert into driver_license values ('${createUUID()}','${subject}','${model}','${type}','${item.question}','${item.answer}','${item.item1}','${item.item2}','${item.item3}','${item.item4}','${explains}','${item.url}');\n`
    }
    return sql;


}


let fileDisplay = (subject, model, type) => {
    let filePath = path.normalize(path.join(__dirname, '../../data', 'driver-license', model, type, subject.toString()))
    dirExists(sqlPath)

    fs.readdir(filePath, async (err, files) => {
        for (let i = 0; i < files.length; i++) {
            let fileContent = await readFile(path.normalize(filePath + "/" + files[i]))
            let sql = createSqlText(fileContent, subject, model, type)
            let fileName = path.normalize(path.join(sqlPath, model + '-' + subject + '-' + (i + 1) + '.sql'));


            fs.writeFileSync(fileName, sql, {encoding: 'utf8'});
        }

    })
}

fileDisplay('1', 'a2', 'order')


