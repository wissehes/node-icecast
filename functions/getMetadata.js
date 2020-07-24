const mm = require('music-metadata');

module.exports = (filePath) => {
    return new Promise((resolve, reject) => {
        mm.parseFile(filePath)
            .then(metadata => {
                resolve(`${metadata.common.artist} - ${metadata.common.title}`)
            })
            .catch(err => {
                console.error("Error while reading metadata: ", err)
                resolve(`Unknown - Unknown`)
            });
    })
}