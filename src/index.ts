import {UsineCafe} from "./factory/UsineCafe";
import {AvecLait, AvecSucre} from "./models/Customisation";
import {Commande} from "./models/Commande";
import {DAO} from "./dao/DAO";
import {InventaireManager} from "./models/InventaireManager";

async function main() {
    try {
        console.log("--- monCafe ---");
        const monCafe = UsineCafe.creerCafe("latte");
        console.log(monCafe.description());

        console.log("--- monCafeCustomise ---");
        const monCafeCustomise = new AvecLait(monCafe);
        console.log(monCafeCustomise.description());

        console.log("--- maCommande ---");
        const maCommande = new Commande(1, monCafeCustomise);
        console.log(maCommande.afficherCommande());

        console.log("--- daoCommande ---");
        const daoCommande = new DAO<Commande>("Tendys");

        console.log("### IndexedDB ###");

        const idCommande = await daoCommande.sauvegarder(maCommande);
        console.log(`Commande sauvegardée avec l'id: ${idCommande}`);

        const inventaire = InventaireManager.getInstance();
        console.log(`Stock initial de lait: ${inventaire.verifierStock("lait")}`);

        inventaire.mettreAJourStock("lait", -2);
        console.log(`Stock de lait après 2 commandes: ${inventaire.verifierStock("lait")}`);
    } catch (error) {
        console.error("Erreur rencontrée:", error);
    }
}

main();