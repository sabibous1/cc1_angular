import {Cafe} from "./Cafe";
import {CafeCustomise} from "./Customisation";

export class Commande {
    private id: number;
    private cafe: Cafe | CafeCustomise;
    private dateCommande: Date;

    constructor(id: number, cafe: Cafe | CafeCustomise) {
        this.id = id;
        this.cafe = cafe;
        this.dateCommande = new Date();
    }

    public afficherCommande(): string {
        return `Commande #${this.id} | ${this.cafe.description()} | ${this.dateCommande.toDateString()}`;
    }
}