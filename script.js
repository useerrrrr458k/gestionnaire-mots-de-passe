// Récupération des éléments du HTML
const champSite = document.getElementById("site");
const champIdentifiant = document.getElementById("identifiant");
const champMotDePasse = document.getElementById("motDePasse");
const btnAjouter = document.getElementById("btnAjouter");

// Tableau pour stocker les comptes (chargé depuis le localStorage s'il y en a)
let comptes = JSON.parse(localStorage.getItem("comptes")) || [];

// Fonction pour afficher les comptes à l'écran
function afficherComptes() {
    // Si vous avez ajouté <div id="listeComptes"></div> dans votre HTML
    const listeDiv = document.getElementById("listeComptes");
    if (!listeDiv) return;
    
    listeDiv.innerHTML = "";
    
    for (let i = 0; i < comptes.length; i++) {
        const c = comptes[i];
        const div = document.createElement("div");
        div.innerHTML = `
            <p><strong>Site :</strong> ${c.site} | <strong>Identifiant :</strong> ${c.identifiant} | <strong>Mot de passe :</strong> <span class="mdp" style="display:none;">${c.motDePasse}</span></p>
            <button onclick="supprimerCompte(${i})">Supprimer</button>
            <hr>
        `;
        listeDiv.appendChild(div);
    }
}

// Événement au clic sur le bouton "Ajouter"
btnAjouter.addEventListener("click", function() {
    const site = champSite.value;
    const identifiant = champIdentifiant.value;
    const motDePasse = champMotDePasse.value;

    // 9. Conditions : Vérification que les champs ne sont pas vides
    if (site === "" || identifiant === "" || motDePasse === "") {
        alert("Tous les champs sont obligatoires !");
        return;
    }

    // 10. Robustesse : Vérification de la longueur du mot de passe
    if (motDePasse.length < 8) {
        alert("Le mot de passe doit contenir au moins 8 caractères.");
        return;
    }

    // 12. Création de l'objet compte et ajout au tableau
    const nouveauCompte = {
        site: site,
        identifiant: identifiant,
        motDePasse: motDePasse
    };

    comptes.push(nouveauCompte);

    // 15. Sauvegarde dans le localStorage
    localStorage.setItem("comptes", JSON.stringify(comptes));

    // Actualisation de l'affichage
    afficherComptes();

    // Réinitialisation des champs
    champSite.value = "";
    champIdentifiant.value = "";
    champMotDePasse.value = "";
});

// Fonction pour supprimer un compte du tableau
function supprimerCompte(index) {
    comptes.splice(index, 1);
    localStorage.setItem("comptes", JSON.stringify(comptes));
    afficherComptes();
}

// Affichage des comptes au chargement de la page
afficherComptes();