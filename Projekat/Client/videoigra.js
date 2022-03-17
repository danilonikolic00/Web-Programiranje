export class VideoIgra {
    constructor(naziv, datumIzdavanja, brojDiskova, tip, studio, i, j) {
        this.naziv = naziv;
        this.datumIzdavanja = datumIzdavanja;
        this.brojDiskova = brojDiskova;
        this.tip = tip;
        this.kolicinaNaStanju = 0;
        this.studio = studio;
        this.x = i;
        this.y = j;
        this.miniKontejner = null;
    }

    bojaPolja() {
        if (!this.tip)
            return "#4848a8";
 
        else
            return this.tip;
    }

    crtanjeVideoIgre(host) {
        this.miniKontejner = document.createElement("div");
        this.miniKontejner.className = "videoIgra";
        this.miniKontejner.innerHTML = "";
        this.miniKontejner.style.backgroundColor = this.bojaPolja();
        host.appendChild(this.miniKontejner);
    }

    updatePolja() {
        this.miniKontejner.innerHTML = this.naziv + "<br />" + this.studio.ime
        + "<br /> Kolicina: " + this.kolicinaNaStanju 
    }

    updateVideoIgre(naziv, kolicina, tip, x, y, datum, brojDiskova, stud) {
        this.naziv = naziv;
        this.tip = tip;
        this.kolicinaNaStanju = kolicina;
        this.x = x;
        this.y = y;
        this.datumIzdavanja = datum;
        this.brojDiskova = brojDiskova;
        this.studio = stud;

        if (naziv == "")
        {
            this.miniKontejner.innerHTML ="";
        }
        else
        {
            this.updatePolja();
        }

        this.miniKontejner.style.backgroundColor = this.bojaPolja();
    }

    updateKolicine(novaKolicina) {
        this.kolicinaNaStanju = novaKolicina;

        this.updatePolja();
    }
}