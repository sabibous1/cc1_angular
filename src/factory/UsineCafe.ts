import {Cafe, Espresso, Cappuccino, Latte} from "../models/Cafe";

export class UsineCafe {
    public static creerCafe(type: string): Cafe {
        switch (type.toLowerCase()) {
            case "espresso":
                return new Espresso();
            case "latte":
                return new Latte();
            case "cappuccino":
                return new Cappuccino();
            default:
                throw new Error(`Type cafe inconnu: ${type}`);
        }
    }
}