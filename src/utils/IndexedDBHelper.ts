export class IndexedDBHelper {
    private dbName: string;
    private version: number;
    private db: IDBDatabase | null = null;

    constructor(dbName: string, version: number = 1) {
        this.dbName = dbName;
        this.version = version;
    }

    public async ouvrirDB(objectStores: string[]): Promise<IDBDatabase> {
        if (this.db) return Promise.resolve(this.db);

        return new Promise((resolve, reject) => {
            if (typeof window === "undefined" || !("indexedDB" in window)) {
                reject("indexedDB n'est pas disponible dans cet environnement.");
                return;
            }

            const demandeOuverture = window.indexedDB.open(this.dbName, this.version);

            demandeOuverture.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const db = demandeOuverture.result;
                objectStores.forEach((store) => {
                    if (!db.objectStoreNames.contains(store)) db.createObjectStore(store, {
                        keyPath: "id",
                        autoIncrement: true
                    });
                });
            };

            demandeOuverture.onsuccess = () => {
                this.db = demandeOuverture.result;
                this.db.onerror = (event: Event) => console.error("Erreur interne de la DB :", event);
                resolve(this.db);
            };

            demandeOuverture.onerror = () => reject(`Erreur lors de l'ouverture de la DB: ${demandeOuverture.error}`);
            demandeOuverture.onblocked = () => reject("L'ouverture de la DB est bloquée par une autre connexion.");
        });
    }

    public async sauvegarder(storeName: string, data: any): Promise<number> {
        const db = await this.ouvrirDB([storeName]);

        return new Promise((resolve, reject) => {
            const transaction = db.transaction([storeName], "readwrite");

            transaction.onerror = (event: Event) => {
                console.error("Erreur lors de la transaction :", event);
                reject("Erreur transactionnelle lors de la sauvegarde.");
            };

            const store = transaction.objectStore(storeName);
            const demandeSauvegarde = store.put(data);

            demandeSauvegarde.onsuccess = (event: Event) => {
                const request = event.target as IDBRequest<number>;
                resolve(request.result);
            };

            demandeSauvegarde.onerror = (event: Event) => {
                const request = event.target as IDBRequest;
                console.error("Erreur lors de la sauvegarde :", event);
                reject(request.error);
            };
        });
    }
}