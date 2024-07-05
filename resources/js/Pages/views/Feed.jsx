
import React, { useState } from 'react';
/*const internships = [
    {
        title: "Test d'Automatisation",
        description: "Nous sommes à la recherche d'un(e) stagiaire en test d'automatisation passionné(e) par l'assurance qualité des logiciels. En tant que membre de notre équipe, vous participerez à la création et à l'exécution de tests automatisés tout en acquérant une expérience pratique dans le domaine de l'automatisation des tests.",
        responsibilities: "Concevoir, développer et exécuter des scripts de tests automatisés",
        skills: "Compréhension des concepts de test logiciel et d'automatisation",
        location: "Casablanca"
    },
    {
        title: "UX & UI Design",
        description: "Créer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesNous Créer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesCréer des maquettes et prototypesrecherchons un(e) stagiaire créatif et motivé pour rejoindre notre équipe de design. Vous travaillerez sur des projets variés et collaborerez avec les développeurs pour améliorer l'expérience utilisateur de nos produits.",
        responsibilities: "Créer Créer des maquettes et prototypes des maquettes et prototypes",
        skills: "Maîtrise des outils de design (Sketch, Figma)",
        location: "Remote"
    },
    {
        title: "Data Science",
        description: "Nous recherchons un(e) stagiaire Bac+5 en Data Science avec une bonne maîtrise de Python et des bibliothèques de data science. Vous travaillerez sur des projets d'analyse de données et de machine learning.",
        responsibilities: "Analyser des jeux de données et développer des modèles de machine learning",
        skills: "Bonne maîtrise de Python, pandas, scikit-learn",
        location: "Paris"
    },
    {
        title: "Data Science",
        description: "Nous recherchons un(e) stagiaire Bac+5 en Data Science avec une bonne maîtrise de Python et des bibliothèques de data science. Vous travaillerez sur des projets d'analyse de données et de machine learning.",
        responsibilities: "Analyser des jeux de données et développer des modèles de machine learning",
        skills: "Bonne maîtrise de Python, pandas, scikit-learn",
        location: "Paris"
    },
    {
        title: "Data Science",
        description: "Nous recherchons un(e) stagiaire Bac+5 en Data Science avec une bonne maîtrise de Python et des bibliothèques de data science. Vous travaillerez sur des projets d'analyse de données et de machine learning.",
        responsibilities: "Analyser des jeux de données et développer des modèles de machine learning",
        skills: "Bonne maîtrise de Python, pandas, scikit-learn",
        location: "Paris"
    },
    {
        title: "Data Science",
        description: "Nous recherchons un(e) stagiaire Bac+5 en Data Science avec une bonne maîtrise de Python et des bibliothèques de data science. Vous travaillerez sur des projets d'analyse de données et de machine learning.",
        responsibilities: "Analyser des jeux de données et développer des modèles de machine learning",
        skills: "Bonne maîtrise de Python, pandas, scikit-learn",
        location: "Paris"
    },
    {
        title: "Data Science",
        description: "Nous recherchons un(e) stagiaire Bac+5 en Data Science avec une bonne maîtrise de Python et des bibliothèques de data science. Vous travaillerez sur des projets d'analyse de données et de machine learning.",
        responsibilities: "Analyser des jeux de données et développer des modèles de machine learning",
        skills: "Bonne maîtrise de Python, pandas, scikit-learn",
        location: "Paris"
    },
    {
        title: "Data Science",
        description: "Nous recherchons un(e) stagiaire Bac+5 en Data Science avec une bonne maîtrise de Python et des bibliothèques de data science. Vous travaillerez sur des projets d'analyse de données et de machine learning.",
        responsibilities: "Analyser des jeux de données et développer des modèles de machine learning",
        skills: "Bonne maîtrise de Python, pandas, scikit-learn",
        location: "Paris"
    },
    {
        title: "CRM",
        description: "Étudiant(e) en 5ème année en IT et développement, motivé(e) et passionné(e) par les systèmes de gestion de la relation client (CRM). Vous participerez à l'amélioration et au déploiement de solutions CRM.",
        responsibilities: "Développer et maintenir des solutions CRM",
        skills: "Connaissance des systèmes CRM, SQL",
        location: "Lyon"
    }
];*/

export default function Feed({ internships}) {
    const [selectedInternship, setSelectedInternship] = useState(null);

    const handleSelectInternship = (internships) => {
        setSelectedInternship(internships);
    };
  return (
    <div className='feed-container'>
      <div className='interMenu'>
      {internships.map((internship, index) => (
                        <div
                            key={index}
                            className={`job-item ${selectedInternship === internship ? 'selected' : ''}`}
                            onClick={() => handleSelectInternship(internship)}
                        >
                            
                            <h4>{internships.title}</h4>
                            <p>{internships.responsibilities }</p>
                            <p>{internships.location}</p>
                           
                        </div>
                    ))}
                </div>
    
      
      <div className='interDesc'>

      {selectedInternship ? (
                        <>
                            <h2>{selectedInternship.title}</h2>
                            <p><strong>Description:</strong> {selectedInternship.description}</p>
                            <p><strong>Responsibilities:</strong> {selectedInternship.responsibilities}</p>
                            <p><strong>Skills:</strong> {selectedInternship.skills}</p>
                            <p><strong>Location:</strong> {selectedInternship.location}</p>
                            
                            <div className='btns'><button>Apply</button><button>Save</button></div>
                        </>
                    ) : (
                        <p>Select an internship to see the description.</p>
                    )}
      </div>
    </div>
  )
}
