import {Katalog} from "./katalog.js"
import { Studio } from "./studio.js"

fetch("https://localhost:5001/GameShop/PreuzimanjeKataloga").then(p => {
    p.json().then(data => {
        data.forEach(katalog => {
            const kat = new Katalog(katalog.id, katalog.naziv, katalog.n, katalog.m);
            kat.crtanjeKataloga(document.body);

            katalog.videoIgre.forEach(igra => {
                fetch("https://localhost:5001/GameShop/PreuzimanjeStudia").then(p => {
                    p.json().then(data => {
                        data.forEach(studio => {
                            if (studio.id == igra.studioID)
                            {
                                const stud = new Studio(studio.id, studio.naziv, studio.sediste, studio.brojIgara, studio.godinaOsnivanja); 
                                kat.videoIgre[igra.x * kat.m + igra.y].updateVideoIgre(igra.naziv, igra.kolicinaNaStanju, igra.tip, igra.x, igra.y, igra.datumIzdavanja, igra.brojDiskova, stud);
                            }
                        });
                    }); 
                });
            });
        });
    });
});