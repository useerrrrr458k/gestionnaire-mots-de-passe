const champSite = document.getElementById("site");
const champIdentifiant = document.getElementById("identifiant");
const champMotDePasse = document.getElementById("motDePasse");
const btnAjouter = document.getElementById("btnAjouter");
const inputRecherche = document.getElementById("recherche");
const compteurSpan = document.getElementById("compteurComptes");
const btnModeSombre = document.getElementById("btnModeSombre");

// Générateur configurable éléments
const btnGenerer = document.getElementById("btnGenerer");
const rangeLongueur = document.getElementById("longueurMdp");
const spanLongueur = document.getElementById("valLongueur");
const chkMaj = document.getElementById("chkMaj");
const chkMin = document.getElementById("chkMin");
const chkChiffres = document.getElementById("chkChiffres");
const chkSpeciaux = document.getElementById("chkSpeciaux");

rangeLongueur.addEventListener("input", () => {
    spanLongueur.textContent = rangeLongueur.value;
});

let comptes = JSON.parse(localStorage.getItem("comptes")) || [];

// Affichage et recherche
function afficherComptes(filtre = "") {
    const listeDiv = document.getElementById("listeComptes");
    listeDiv.innerHTML = "";
    
    // Défi : Filtrer selon la recherche par site
    const comptesFiltres = comptes.filter(c => c.site.toLowerCase().includes(filtre.toLowerCase()));
    
    // Défi : Compteur
    compteurSpan.textContent = comptesFiltres.length;

    comptesFiltres.forEach((c, index) => {
        const index Reel = comptes.indexOf(c); // pour garder le bon index lors de la suppression
        const div = document.createElement("div");
        div.style.borderBottom = "1px solid #ccc";
        div.style.marginBottom = "10px";
        div.style.paddingBottom = "5px";
        div.innerHTML = `
            <p><strong>Site :</strong> ${c.site} | <strong>Identifiant :</strong> ${c.identifiant} | <strong>MDP :</strong> <span class="mdp" style="display:none;">${c.motDePasse}</span></p>
            <button onclick="toggleMdp(this)">Afficher / Masquer</button>
            <button onclick="supprimerCompte(${indexReel})" style="background-color: #d9534f; color:white;">Supprimer</button>
        `;
        listeDiv.appendChild(div);
    });
}

// Recherche en direct
inputRecherche.addEventListener("input", (e) => {
    afficherComptes(e.target.value);
});

// Défi : Générateur configurable
btnGenerer.addEventListener("click", () => {
    let chars = "";
    if (chkMaj.checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (chkMin.checked) chars += "abcdefghijklmnopqrstuvwxyz";
    if (chkChiffres.checked) chars += "0123456789";
    if (chkSpeciaux.checked) chars += "!@#$%^&*";

    if (chars === "") {
        alert("Veuillez sélectionner au moins un type de caractère !");
        return;
    }

    let mdp = "";
    const longueur = parseInt(rangeLongueur.value);
    for (let i = 0; i < longueur; i++) {
        const rand = Math.floor(Math.random() * chars.length);
        mdp += chars[rand];
    }
    champMotDePasse.value = mdp;
});

// Défi : Validation plus complète & Ajout
btnAjouter.addEventListener("click", () => {
    const site = champSite.value.trim();
    const identifiant = champIdentifiant.value.trim();
    const motDePasse = champMotDePasse.value;

    if (!site || !identifiant || !motDePasse) {
        alert("Tous les champs sont obligatoires !");
        return;
    }

    // Validation robuste du mot de passe (Majuscule, minuscule, chiffre, caractère spécial, longueur >= 8)
    const regexMdp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!regexMdp.test(motDePasse)) {
        alert("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
        return;
    }

    comptes.push({ site, identifiant, motDePasse });
    localStorage.setItem("comptes", JSON.stringify(comptes));
    
    afficherComptes();
    champSite.value = "";
    champIdentifiant.value = "";
    champMotDePasse.value = "";
});

function supprimerCompte(index) {
    comptes.splice(index, 1);
    localStorage.setItem("comptes", JSON.stringify(comptes));
    afficherComptes(inputRecherche.value);
}

function toggleMdp(btn) {
    const span = btn.previousElementSibling.querySelector(".mdp");
    if (span.style.display === "none") {
        span.style.display = "inline";
        btn.textContent = "Masquer";
    } else {
        span.style.display = "none";
        btn.textContent = "Afficher / Masquer";
    }
}

// Défi : Mode sombre
btnModeSombre.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Initialisation
afficherComptes();