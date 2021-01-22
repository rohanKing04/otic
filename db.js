const fs = require('fs');

var routesPath = {};

const genres = JSON.parse(fs.readFileSync('./genres.json'));

genres.genres.map((genre) => {
    var routeName = genre.name;
    var fileName = genre.name;
    if (routeName.indexOf(' ') >= 0) {
        var name = routeName.split(' ');
        routeName = name[0] + name[1];
    }
    routesPath[`/${routeName.toLowerCase()}`] = `./genres/${fileName}.json`;


})


let data = {}

for (var key in routesPath) {
    const api = require(routesPath[key]);
    var variable = key.split("/");

    let [, url] = variable;
    data[url] = api;

}

module.exports =  function () {

       this.genres = genres;
       this.shows = data;
}