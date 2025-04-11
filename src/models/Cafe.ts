export abstract class Cafe {
    protected nom: string;
    protected prix: number;

    constructor(nom: string, prix: number) {
        this.nom = nom;
        this.prix = prix;
    }

    public description() {
        return `Café: ${this.nom} - Prix: ${this.prix}€`;
    }

    public abstract getType(): string;
}

export class Espresso extends Cafe {
    constructor() {
        super("Espresso", 2.0);
    }

    public getType(): string {
        return "Espresso";
    }
}

export class Cappuccino extends Cafe {
    constructor() {
        super("Cappuccino", 3.0);
    }

    public getType(): string {
        return "Cappuccino";
    }
}

export class Latte extends Cafe {
    constructor() {
        super("Latte", 4.0);
    }

    public getType(): string {
        return "Latte";
    }
}