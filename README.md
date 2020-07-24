# node-icecast

Broadcast music from Node JS to IceCast

## Setting up
This project requires Node 11.15.0 and npm 6.7.0, because one of the dependencies is not compatible with Node 12 yet.
To easily manage youre Node JS versions, install [NVM](https://github.com/nvm-sh/nvm).

Installing dependencies:
```
npm i
```

Fill `config.example.js` with your IceCast settings and credentials and rename it to `config.js`

Setting up `songs.js` file.
The `songs.js` file is just an array of songs like this:
```js
module.exports = [
    "path/to/first/song",
    "path/to/second/song",
    "and/so/on"
]
```

## Running
To run it, you just type
```
node index.js
```