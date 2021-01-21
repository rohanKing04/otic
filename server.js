const fs = require('fs');
const express = require("express");
const app = express();
const fetch = require("node-fetch");
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));

const API_KEY = "APIKEY";
const genres = fs.readFileSync('genres.json');

async function fetchData(url) {
    let response = await fetch(url);
    let jsonResponse = await response.json();
    return jsonResponse;
}

function mapData() {
    const genres_list = JSON.parse(genres);
    console.log(genres_list);
    genres_list.genres.map(async (genre) => {
        
        try{
        const genreId = await genre.id;
        const BASE_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${genreId}`;

        const showResponse = await fetchData(BASE_URL);

        var obj = {
            shows: []
        };
  
            showResponse.results.slice(0,10).map( (show) => {
                 obj.shows.push({
                    id : show.id,
                    name : show.name,
                    overview: show.overview,
                    air_date: show.first_air_date
                    }
                );
            })


        fs.writeFile(`./genres/${genre.name}.json`,JSON.stringify(obj),finished);
        function finished(){
            console.log(`Wrote ${genre.name}.json \n`);
        }
    }
    catch(err){
        console.log(err);
    }
    
    })

}
app.get("/genre/:key", async (req, res) => {

    const genre_id = req.params.key;
    const BASE_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${genre_id}`;

    let data = await fetchData(BASE_URL);



    res.send(data);
});
app.get("/map", (req, res) => {
    mapData();
    res.send("data mapped")
});
app.get("/genres", async (req, res) => {

    const BASE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

    let data = await fetchData(BASE_URL);

    fs.writeFile('genres.json', JSON.stringify(data), finished);

    function finished() {
        console.log('all set');
    }

    res.send(data);
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})