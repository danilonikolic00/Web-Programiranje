export class Studio {
    constructor (id, ime, sediste, brojIgara, godinaOsnivanja) {
        this.id = id;
        this.ime = ime;
        this.sediste = sediste;
        this.brojIgara = brojIgara;
        this.godinaOsnivanja = godinaOsnivanja; 
        this.brojIgaraNaStanju = 0;
    }

    updateStudio(plusminus)
    {
        if(plusminus == 1)
            this.brojIgaraNaStanju++;
        else
            this.brojIgaraNaStanju--;
    }
}