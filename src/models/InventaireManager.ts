export class InventaireManager {
    private static instance: InventaireManager;
    private stock: Map<string, number>;

    private constructor() {
        this.stock = new Map<string, number>([
            ["café", 100],
            ["lait", 50],
            ["sucre", 75],
            ["chantilly", 30],
        ]);
    }

    public static getInstance(): InventaireManager {
        if (!InventaireManager.instance) InventaireManager.instance = new InventaireManager();
        return InventaireManager.instance;
    }

    public verifierStock(ingredient: string): number {
        return this.stock.get(ingredient) || 0;
    }

    public mettreAJourStock(ingredient: string, quantite: number): void {
        this.stock.set(ingredient, this.verifierStock(ingredient) + quantite);
    }
}