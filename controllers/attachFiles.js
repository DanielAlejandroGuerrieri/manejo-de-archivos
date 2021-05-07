const fsp = require('fs').promises;
const fs = require('fs');
const path = require('path');
const FOLDER_TO_READ = path.join(__dirname, '../public/uploads');


const attachments = async() => {
    let array = [];

    await fsp.readdir(FOLDER_TO_READ)
        .then(files => {

            const unlinkPromises = files.map(file => {
                /* let obj = {
                    filename: file,
                    path: path.join(FOLDER_TO_READ, file)
                } */
                let obj = {
                    filename: file,
                    content: fs.createReadStream(path.join(FOLDER_TO_READ, file))
                }

                return array.push(obj);
            })

            return Promise.all(unlinkPromises)
        }).catch(err => {
            console.log(err)
            console.error(`Something wrong happened removing files of ${FOLDER_TO_READ}`)
        })
    return array;

}

module.exports = attachments;