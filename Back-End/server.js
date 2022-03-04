let express = require('express');
let path = require('path');
let app = express();
let bodyParser = require('body-parser');

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
const artistDiscography = "QUEEN_discography";

app.get(prefix + "/discography", (req, res) =>{
    const discographyPath = path.join(__dirname + "/public/" + artistDiscography + "/out/discography.json");
    res.sendFile(discographyPath);
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


