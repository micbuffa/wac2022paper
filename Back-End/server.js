let express = require('express');
let path = require('path');
let app = express();
let bodyParser = require('body-parser');
let fs = require('fs');
const { receiveMessageOnPort } = require('worker_threads');

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/public"));

/*
app.get("/*", function (req, res) {
 res.sendFile(path.join(__dirname + "/public/index.html"));
});
*/
let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.get(prefix + "/:artist/discography/", (req, res) =>{
  const artistDiscography = req.params.artist.toUpperCase() + "_discography";

    const discographyPath = path.join(__dirname + "/public/" + artistDiscography + "/out/discography.json");
    res.sendFile(discographyPath);
})

app.get(prefix + "/:artist/album/:albumName", (req, res) =>{

  const artistDiscography = req.params.artist.toUpperCase() + "_discography";
  const discographyPath = path.join(__dirname + "/public/" + artistDiscography + "/out/discography.json");

  // let's read the whole discography json file
  const discoData = JSON.parse(fs.readFileSync(discographyPath));

  const albumFolder = discoData.albums.find(a => a.nom.substring(3).toUpperCase() === req.params.albumName.toUpperCase()).folder;
  const albumPath = path.join(__dirname + "/public/" + artistDiscography + "/" + albumFolder + "/album.json");
  res.sendFile(albumPath);
})

app.get(prefix + '/:artist/:album/song/:songName', (req, res) => {
  const artistDiscography = req.params.artist.toUpperCase() + "_discography";
  const discographyPath = path.join(__dirname + "/public/" + artistDiscography + "/out/discography.json");

  // let's read the whole discography json file
  const discoData = JSON.parse(fs.readFileSync(discographyPath));

  const albumFolder = discoData.albums.find(a => a.nom.substring(3).toUpperCase() === req.params.album.toUpperCase()).folder;
  const albumPath = path.join(__dirname + "/public/" + artistDiscography + "/" + albumFolder + "/album.json");

  const albumData = JSON.parse(fs.readFileSync(albumPath))

  const songData = albumData.songs.find(song => song.name.substring(3).replace('.mp3', '').replace(/_/g, ' ') === req.params.songName);
  if (songData)
    songData.albumFolder = albumFolder

  res.send(JSON.stringify(songData))

})


app.get(prefix + "/play", (req, res) =>{
    // play a given mp3
    const artistDiscographyFolder = req.query.artist || artistDiscography;
    const albumFolder = req.query.album;
    const songName = req.query.song;

    //console.log("album = " + albumFolder);
    //console.log("song = " + songName);

    const songPath = path.join(__dirname + "/public/"+ artistDiscographyFolder + "/" + albumFolder + "/" + songName);
    //console.log("SONG " + songPath + " REQUESTED")
    res.sendFile(songPath);
})


/*
app.route(prefix + '/assignments')
  .get(assignment.getAssignments)
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);
*/

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);
console.log("Server WAC Queen lancé...");

module.exports = app;


