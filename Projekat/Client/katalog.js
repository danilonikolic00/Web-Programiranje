import { VideoIgra } from "./videoigra.js"
import { Studio } from "./studio.js"

export class Katalog {
    constructor (id, nazivProd, n, m) {
        this.id = id;
        this.gameShop = nazivProd;
        this.n = n;
        this.m = m;
        this.kontejner = null;
        this.videoIgre = [];
        this.studios = [];
    }

    dodavanjeVideoIgre(igra) {
        this.videoIgre.push(igra);
    }

    dodavanjeStudia(studio) {
        this.studios.push(studio);
    }

    crtanjeKataloga(host) {
        if (!host)
            throw new Error ("Ne postoji roditeljski element");
    
        const naslov = document.createElement("h2");
        naslov.innerHTML = this.gameShop;
        host.appendChild(naslov);

        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("kontejner");
        host.appendChild(this.kontejner);      

        this.crtanjeForme(this.kontejner);
        this.crtanjeVideoIgre(this.kontejner);
    }

    crtanjeForme(host) {
        
        const forma = document.createElement("div");
        forma.className = "forma";
        host.appendChild(forma);

        var labela = document.createElement("h4");
        labela.innerHTML = "Dodavanje video igre"; 
        forma.appendChild(labela);

        labela = document.createElement("label");
        labela.innerHTML = "Video igra: ";
        forma.appendChild(labela);

        let element = document.createElement("input");
        element.className = "naziv";
        forma.appendChild(element);

        labela = document.createElement("label");
        labela.innerHTML = "Broj diskova: ";
        forma.appendChild(labela);

        element = document.createElement("input");
        element.className = "brojDiskova";
        element.type = "number";
        forma.appendChild(element);

        labela = document.createElement("label");
        labela.innerHTML = "Kolicina: ";
        forma.appendChild(labela);

        element = document.createElement("input");
        element.className = "kolicina";
        element.type = "number";
        forma.appendChild(element);

        let tipoviIgre = ["Akcija", "Avantura", "Sport", "Simulacija", "RPG"];
        let bojeTipova = ["#96bb7c", "#9de5ff", "#f4ebc1", "#e27802", "#f05454"];

        let radioButton = null;
        let opcija = null;
        let rbDiv = null;

        tipoviIgre.forEach((tip, index) => {
            rbDiv = document.createElement("div");
            rbDiv.className = "radioButtons";
            radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.name = this.gameShop;
            radioButton.value = bojeTipova[index];

            opcija = document.createElement("label");
            opcija.innerHTML = tip;

            rbDiv.appendChild(radioButton);
            rbDiv.appendChild(opcija);
            forma.appendChild(rbDiv);
        })

        let studioDiv = document.createElement("div");
        let studioSelect = document.createElement("select");
        labela = document.createElement("label");
        labela.innerHTML = "Studio:";
        studioDiv.appendChild(labela);
        studioDiv.appendChild(studioSelect);

        let s = null;

        s = document.createElement("option");
        s.innerHTML = ""
        s.value = null;
        studioSelect.appendChild(s);

        fetch("https://localhost:5001/GameShop/PreuzimanjeStudia").then(p => {
                p.json().then(data => {
                    data.forEach(studio => {
                        const stud = new Studio(studio.id, studio.naziv, studio.sediste, studio.brojIgara, studio.godinaOsnivanja); 
                        this.dodavanjeStudia(stud);
                        s = document.createElement("option");
                        s.innerHTML = stud.ime;
                        s.value = stud.ime; 
                        studioSelect.appendChild(s);
                    });
                }); 
            });

        forma.appendChild(studioDiv);

        const buttonStudio = document.createElement("button");
        buttonStudio.className = "button";
        buttonStudio.innerHTML = "Informacije o studiju";
        forma.appendChild(buttonStudio);

        //R(ead) za studio
        buttonStudio.onclick = (ev) => {
            fetch("https://localhost:5001/GameShop/PreuzimanjeStudia").then(p => {
                p.json().then(data => {
                    data.forEach(studio => {
                        if (studio.naziv == studioSelect.value)
                        {
                            let temp = "Studio: " + `${studio.naziv}` + "\nSediste: " + `${studio.sediste}`
                                      + "\nBroj izdatih igara: "+ `${studio.brojIgara}` 
                                     + "\nTrenutni broj igara u katalogu: " + `${studio.brojIgaraNaStanju}`;
                
                            alert(temp);
                        }
                    });
                }); 
            });

        }

        labela = document.createElement("label");
        labela.innerHTML = "Datum izdavanja: ";
        labela.className = "labele";
        forma.appendChild(labela);

        element = document.createElement("input");
        element.className = "datum";
        element.type = "date";
        forma.appendChild(element);

        labela = document.createElement("label");
        labela.innerHTML = "Izaberite igricu:";
        labela.className = "labele";
        forma.appendChild(labela);

        let pozicijaDiv = document.createElement("div");
        let vrsta = document.createElement("select");
        labela = document.createElement("label");
        labela.innerHTML = "Vrsta:";
        labela.className = "labele";
        pozicijaDiv.appendChild(labela);
        pozicijaDiv.appendChild(vrsta);

        let x = null;

        for (let i = 0; i < this.n; i++) {
            x = document.createElement("option");
            x.innerHTML = i+1;
            x.value = i;
            vrsta.appendChild(x);
        }

        forma.appendChild(pozicijaDiv);

        pozicijaDiv = document.createElement("div");
        let kolona = document.createElement("select");
        labela = document.createElement("label");
        labela.innerHTML = "Kolona: ";
        labela.className = "labele";
        pozicijaDiv.appendChild(labela);
        pozicijaDiv.appendChild(kolona);

        let y = null;

        for (let j = 0; j < this.m; j++) {
            y = document.createElement("option");
            y.innerHTML = j+1;
            y.value = j;
            kolona.appendChild(y);
        }

        forma.appendChild(pozicijaDiv);

        const button = document.createElement("button");
        button.className = "button";
        button.innerHTML = "Dodajte igricu";
        forma.appendChild(button);

        //C(reate) za video igru
        button.onclick = (ev) => {
            const naziv = this.kontejner.querySelector(".naziv").value;
            const brDiskova = parseInt(this.kontejner.querySelector(".brojDiskova").value);
            const kolicina = parseInt(this.kontejner.querySelector(".kolicina").value);
            const datum = this.kontejner.querySelector(".datum").value;
            const tip = this.kontejner.querySelector(`input[name='${this.gameShop}']:checked`);
            const studioSelected = studioSelect.value;
            let studio = this.studios.find(st => st.ime == studioSelected);

            //validacija
            if (naziv == "")
            {
                alert("Nije unet naziv!");
            }
            else if (isNaN(brDiskova) || brDiskova<1)
            {
                alert("Nije unet validan broj diskova!");
            }
            else if (isNaN(kolicina) || kolicina<1)
            {
                alert("Nije uneta validna kolicina!");
            }
            else if (tip == null)
            {
                alert("Nije izabran tip!");
            }
            else if (studio == null)
            {
                alert("Nije izabran studio!");
            }
            else if (datum == "")
            {
                alert("Nije izabran datum!");
            }
            else 
            {
                let i = parseInt(vrsta.value);
                let j = parseInt(kolona.value);

                fetch("https://localhost:5001/GameShop/DodavanjeVideoIgre/" + this.id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "naziv": naziv,
                        "datumIzdavanja": datum,
                        "brojDiskova": brDiskova,
                        "tip": tip.value,
                        "kolicinaNaStanju": kolicina,
                        "x": i,
                        "y": j,
                        "studioID": studio.id
                    })
                }).then(p => {
                    if (p.ok) {
                        this.videoIgre[i * this.m + j].updateVideoIgre(naziv, kolicina, tip.value, i, j, datum, brDiskova, studio);
                        studio.updateStudio(1);
                    }
                    else if (p.status == 400) {
                        const postojiVec = {x: 0, y: 0 };
                        p.json().then(q => {
                            postojiVec.x == q.x;
                            postojiVec.y = q.y;
                            alert("Igra je vec u katalogu na poziciji (" + (postojiVec.x + 1) + ", " + (postojiVec.y + 1) + ")");
                        });
                    }
                    else if (p.status == 409) {
                        alert("Ukoliko zelite da izmenite kolicinu na stanju, kliknite na \"Azuriraj kolicinu\" dugme!\nZa ostale izmene izbrisite igru iz kataloga i dodajte ispocetka.");
                    }
                    else {
                        alert("Greska prilikom dodavanja igre");
                    }
                });
            }
        }

        const button1 = document.createElement("button");
        button1.className = "button";
        button1.innerHTML = "Azurirajte kolicinu";
        forma.appendChild(button1);

        //U(pdate) za video igru
        button1.onclick = (ev) => {
            const kolicina = parseInt(this.kontejner.querySelector(".kolicina").value);

            let i = parseInt(vrsta.value);
            let j = parseInt(kolona.value);

            fetch("https://localhost:5001/GameShop/UpdateKolicine", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify ({
                    "kolicinaNaStanju": kolicina,
                    "x": i,
                    "y": j
                })
            }).then(p => {
                if (p.ok && kolicina>0)
                {
                    this.videoIgre[i * this.m + j].updateKolicine(kolicina);
                }
                else
                {
                    alert("Doslo je do greske prilikom azuriranja kolicine");
                }
            });
        }

        const button2 = document.createElement("button");
        button2.className = "button";
        button2.innerHTML = "Izbrisite igricu";
        forma.appendChild(button2);

        //D(elete) za video igru
        button2.onclick = (ev) => {
            let i = parseInt(vrsta.value);
            let j = parseInt(kolona.value);

            let temp = this.videoIgre.find(igra => igra.x == i && igra.y == j);

            fetch("https://localhost:5001/GameShop/BrisanjeVideoIgre", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify ({
                    "x": i,
                    "y": j,
                    "studioID": temp.studio.id
                })
            }).then(p => {
                if (p.ok)
                {
                    this.videoIgre[i * this.m + j].studio.updateStudio(0);
                    this.videoIgre[i * this.m + j].updateVideoIgre("", 0, "", i, j, "", "", null);  
                }
                else if (p.status == 406)
                {
                    alert("Neispravna pozicija igre!")
                }
                else
                {
                    alert("Doslo je do greske prilikom brisanja");
                }
            });   
        }

    }

    crtanjeVideoIgre(host) {
        const kontejnerIgre = document.createElement("div");
        kontejnerIgre.className = "kontejnerIgre";
        host.appendChild(kontejnerIgre);

        let vrsta;
        let igra;

        for (let i = 0; i < this.n; i++) {
            vrsta = document.createElement("div");
            vrsta.className = "vrsta";
            kontejnerIgre.appendChild(vrsta);

            for (let j = 0; j< this.m; j++) {
                igra = new VideoIgra("", "", null, "", "", "", i, j);
                this.dodavanjeVideoIgre(igra);
                igra.crtanjeVideoIgre(vrsta);
            }
        }
    }
}
