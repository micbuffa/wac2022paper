window.onload = init;

// let apiURL = "https://wasabi.i3s.unice.fr/api/v1/artist_all/name/David%20Bowie";
let apiURL = encodeURI("https://wasabi.i3s.unice.fr/api/v1/artist_all/name/Queen + Paul Rodgers");
function init() {
    btninfo = document.querySelector("#btninfos");
    btninfo.onclick = getInfos;
}

async function getInfos() {

    let response = await fetch(apiURL);
    let discography = await response.json();

    console.log(discography);
    let table = document.createElement("table");
    let row = table.insertRow();
    row.innerHTML='<td>Type</td><td>Album or song name</td><td>wasabi mongo id</td><td>Date of publication</td>'

    discography.albums.forEach(a => {
        let row = table.insertRow();
        row.innerHTML += `<td>Album</td><td>${a.title}</td><td>${a._id}</td><td>${a.publicationDate}</td>`;
        
        a.songs.forEach((s, index) => {
            let row = table.insertRow();
            row.innerHTML += `<td>Song</td><td>${s.title}</td><td>${s._id}</td><td>Same as album</td>`;
        });
    });

    document.body.append(table);
}