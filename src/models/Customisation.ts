import {Cafe} from "./Cafe";

export abstract class CafeCustomise {
    protected cafe: Cafe;

    constructor(cafe: Cafe) {
        this.cafe = cafe;
    }

    public abstract description(): string;

    public abstract cout(): number;
}

export class AvecSucre extends CafeCustomise {
    constructor(cafe: Cafe) {
        cafe["prix"] += 1;
        super(cafe);
    }

    public description(): string {
        return this.cafe.description() + " + Sucre";
    }

    public cout(): number {
        return (this.cafe["prix"] || 0) + 1;
    }
}

export class AvecLait extends CafeCustomise {
    constructor(cafe: Cafe) {
        cafe["prix"] += 2;
        super(cafe);
    }

    public description(): string {
        return this.cafe.description() + " + Lait";
    }

    public cout(): number {
        return (this.cafe["prix"] || 0) + 2;
    }
}

export class AvecChantilly extends CafeCustomise {
    constructor(cafe: Cafe) {
        cafe["prix"] += 3;
        super(cafe);
    }

    public description(): string {
        return this.cafe.description() + " + Chantilly";
    }

    public cout(): number {
        return (this.cafe["prix"] || 0) + 3;
    }
}