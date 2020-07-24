const nodeshout = require('nodeshout')
const FileReadStream = require('nodeshout').FileReadStream
const ShoutStream = require('nodeshout').ShoutStream
const fs = require('fs')
const getMetadata = require("./functions/getMetadata")

const config = require("./config")
var songs = require("./songs")

nodeshout.init();

console.log('Libshout version: ' + nodeshout.getVersion());

var shout = nodeshout.create();
shout.setHost(config.iceCast.host);
shout.setPort(config.iceCast.port);
shout.setUser(config.iceCast.username);
shout.setPassword(config.iceCast.password);
shout.setMount(config.iceCast.mount);
shout.setFormat(config.iceCast.format); // 0=ogg, 1=mp3
shout.setAudioInfo('bitrate', '128');
shout.setAudioInfo('samplerate', '44100');
shout.setAudioInfo('channels', '2');

shout.open();

const playSong = async(song) => {
    //Start playing
    const fileStream = new FileReadStream(song, 65536)
    const shoutStream = fileStream.pipe(new ShoutStream(shout));
    console.log(`Now playing: ${songMetadata}`)

    // Get metadata of file
    const songMetadata = await getMetadata(song)

    // Set metadata on nodeShout
    const iceMeta = nodeshout.createMetadata();
    iceMeta.add('song', songMetadata);
    shout.setMetadata(iceMeta);

    shoutStream.on('finish', function() {
        songs.shift()
        if (songs[0]) {
            playSong(songs[0])
        } else {
            console.log("Done playing, now quitting...")
            process.exit()
        }
    });
}

playSong(songs[0])