const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, "../../../../public/mp3/");
const fileNames = [];
const files = fs.readdirSync(directoryPath);


export default async function handler(req, res) {

    files.forEach(function (file) {
        fileNames.push(file.substring(0, file.indexOf(".")));
    });

    const set = new Set(fileNames)
    const uniqueFileNames = [...set]
    
    console.log("fileNames", uniqueFileNames);

    res.status(200).json({files: uniqueFileNames})
}