import { generationProjets } from "./projets.js";
import { gestionCategories } from "./categories.js";
import { modale } from "./modale.js";

// Récupération des projets depuis l'API

const reponseProjets = await fetch('http://localhost:5678/api/works/');
const projets = await reponseProjets.json();

 // Récupération des Catégories

 const reponseCategories = await fetch('http://localhost:5678/api/categories/');
 const categories = await reponseCategories.json();

// mettre en local storage le projet ???

//
//


// 1ere génération des projets ----------------------------------------------------------------------------------

generationProjets(projets);

// gestion des categories

gestionCategories(projets, categories);


// gestion administrateur -------------------------- creer module js ---------------------------------------------------

function logout(){
    sessionStorage.removeItem('token');
    
    const adminElements = document.querySelectorAll('.admin');
    for(const adminElement of adminElements){
        adminElement.style.display="none";
        document.getElementById('header').style.marginTop="50px"
    }
    document.querySelector('.edition-mode').style.display='none'
    document.querySelectorAll('.non-admin').forEach(a => {
        a.style.display=null;
    })
}

// vérification de la présence d'un token admin

const adminToken = sessionStorage.getItem('token');
if (!adminToken){
    logout();
}
else {

    document.querySelectorAll('.admin').forEach(a => {
        a.style.display=null;
    })
    document.querySelector('.edition-mode').style.display=null

    document.querySelectorAll('.non-admin').forEach(a => {
        a.style.display='none';
    document.getElementById('header').style.marginTop="100px"
    })
    document.querySelector('.logout').addEventListener("click", function(){  
    logout();
    });
    
    // gestion de la fenetre modale
    modale(projets, categories);
}




