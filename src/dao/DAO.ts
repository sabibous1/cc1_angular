import {IndexedDBHelper} from "../utils/IndexedDBHelper";

export class DAO<T> {
    private storeName: string;
    private dbHelper: IndexedDBHelper;

    constructor(storeName: string) {
        this.storeName = storeName;
        this.dbHelper = new IndexedDBHelper("CafeDB", 1);
    }

    public async sauvegarder(entity: T) {
        try {
            return await this.dbHelper.sauvegarder(this.storeName, entity);
        } catch (error) {
            throw new Error(`Erreur en sauvegardant: ${error}`);
        }
    }
}