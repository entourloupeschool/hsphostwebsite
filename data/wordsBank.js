const wordsPairs = [
    { c: 'portugal', u: 'maçon' },
    { c: 'ok', u: 'oui' },
    { c: 'cochon', u: 'jambon' },
    { c: 'Messieurs', u: 'Mesdames' },
    { c: 'espion', u: 'détective' },
    { c: 'magie', u: 'illusion' },
    { c: 'clavier', u: 'touche' },
    { c: 'papier', u: 'feuille' },
    { c: 'site internet', u: 'blog' },
    { c: 'Facebook', u: 'Instagram' },
    { c: 'bibliothèque', u: 'libraire' },
    { c: 'boulangerie', u: 'pâtisserie' },
    { c: 'lumière', u: 'vu' },
    { c: 'Québec', u: 'Montréal' },
    { c: 'danser', u: 'chalouper' },
    { c: 'mer', u: 'océan' },
    { c: 'planche a voile', u: 'surf' },
    { c: 'neige', u: 'flocon' },
    { c: 'carte postale', u: 'enveloppe' },
    { c: 'hôpital', u: 'urgences' },
    { c: 'clignotant', u: 'essuie glace' },
    { c: 'rue', u: 'boulevard' },
    { c: 'doigts', u: 'orteils' },
    { c: 'cheveux', u: 'coiffure' },
    { c: 'bague', u: 'bracelet' },
    { c: 'rideau', u: 'store' },
    { c: 'vin', u: 'bière' },
    { c: 'sac à main', u: 'sac plastique' },
    { c: 'peintre', u: 'artiste' },
    { c: 'photo', u: 'peinture' },
    { c: 'magazine', u: 'journal' },
    { c: 'coussin', u: 'couverture' },
    { c: 'volcan', u: 'montagne' },
    { c: 'pelican', u: 'mouette' },
    { c: 'robe', u: 'jupe' },
    { c: 'legging', u: 'jogging' },
    { c: 'dvd', u: 'cd rom' },
    { c: 'montagne', u: 'Everest' },
    { c: 'canne à pêche', u: 'filet de pêche' },
    { c: 'camembert', u: 'mimolette' },
    { c: 'tasse', u: 'goblet' },
    { c: 'iPad', u: 'iPod' },
    { c: 'chat', u: 'félin' },
    { c: 'tabac', u: 'cigarette' },
    { c: 'poulet', u: 'volaille' },
    { c: 'prison', u: 'cellule' },
    { c: 'mer', u: 'plage' },
    { c: 'canapé', u: 'sofa' },
    { c: 'collège', u: 'lycée' },
    { c: 'enseignant', u: 'instituteur' },
    { c: 'parc', u: 'jardin' },
    { c: 'Chêne', u: 'Marronnier' },
    { c: 'vélo', u: 'bicyclette' },
    { c: 'joie', u: 'bonheur' },
    { c: 'nostalgie', u: 'mélancolie' },
    { c: 'actrice', u: 'comédienne' },
    { c: 'lampe', u: 'lumière' },
    { c: 'escalier', u: 'échelle' },
    { c: 'mur', u: 'paroi' },
    { c: 'prêtre', u: 'curé' },
    { c: 'bateau', u: 'barque' },
    { c: 'parfum', u: 'fragrance' },
    { c: 'camembert', u: 'coulommiers' },
    { c: 'conté', u: 'emmental' },
    { c: 'spaghetti', u: 'tagliatelle' },
    { c: 'bière', u: 'panaché' },
    { c: 'souris', u: 'mulot' },
    { c: 'palmier', u: 'cocotier' },
    { c: 'plage', u: 'sable' },
    { c: 'orque', u: 'cachalot' },
    { c: 'brique', u: 'parpaing' },
    { c: 'photo', u: 'image' },
    { c: 'citron', u: 'orange' },
    { c: 'bleu', u: 'vert' },
    { c: 'pêche', u: 'peau' },
    { c: 'brugnon', u: 'nectarine' },
    { c: 'griotte', u: 'guigne' },
    { c: 'orteil', u: 'doigt' },
    { c: 'justaucorps', u: 'maillot' },
    { c: 'culotte', u: 'slip' },
    { c: 'transat', u: 'chaise longue' },
    { c: 'calendrier', u: 'éphéméride' },
    { c: 'paquebot', u: 'ferry' },
    { c: 'vaisseau', u: 'navire' },
    { c: 'littoral', u: 'côte' },
    { c: 'potage', u: 'soupe' },
    { c: 'granité', u: 'sorbet' },
    { c: 'harmonie', u: 'accord' },
    { c: 'un air', u: 'mélodie' },
    { c: 'tonalité', u: 'gamme' },
    { c: 'battement', u: 'rythme' },
    { c: 'pulsation', u: 'tempo' },
    { c: 'accomplissement', u: 'épanouissement' },
    { c: 'âne', u: 'baudet' },
    { c: 'mule', u: 'bardot' },
    { c: 'mallette', u: 'attaché-case' },
    { c: 'incendie', u: 'feu' },
    { c: 'âtre', u: 'foyer' },
    { c: 'obtempérer', u: 'obéir' },
    { c: 'travail', u: 'labeur' },
    { c: 'méridienne', u: 'divan' },
    { c: 'mas', u: 'bastide' },
    { c: 'étang', u: 'mare' },
    { c: 'artère', u: 'capillaire' },
    { c: 'épi', u: 'houppette' },
    { c: 'calligraphie', u: 'arabesque' },
    { c: 'réclame', u: 'publicité' },
    { c: 'pictogramme', u: 'logotype' },
    { c: 'verger', u: 'cerisaie' },
    { c: 'poulpe', u: 'pieuvre' },
    { c: 'seiche', u: 'calamar' },
    { c: 'soulier', u: 'bottine' },
    { c: 'savate', u: 'tong' },
    { c: 'mule', u: 'sandale' },
    { c: 'sarment', u: 'cep' },
    { c: 'clémentine', u: 'mandarine' },
    { c: 'parquet', u: 'plancher' },
    { c: 'gazon', u: 'herbe' },
    { c: 'calembour', u: 'jeu de mots' },
    { c: 'flexibilité', u: 'souplesse' },
    { c: 'conte', u: 'histoire' },
    { c: 'comte', u: 'prince' },
    { c: 'miroir', u: 'reflet' },
    { c: 'peinture', u: 'tableaux' },
    { c: 'acrobate', u: 'cirque' },
    { c: 'troll', u: 'gnome' },
    { c: 'cave', u: 'vin' },
    { c: 'Cervantes', u: 'Donquichotte' },
    { c: 'église', u: 'clocher' },
    { c: 'abeille', u: 'miel' },
    { c: 'moustique', u: 'piqûre' },
    { c: 'fontaine', u: 'arrosage' },
    { c: 'mycose', u: 'champignon' },
    { c: 'pic', u: 'col' },
    { c: 'tunnel', u: 'gallerie' },
    { c: 'couverture', u: 'toiture' },
    { c: 'maison', u: 'appartement' },
    { c: 'évier', u: 'lavabo' },
    { c: 'épée', u: 'hache' },
    { c: 'bouclier', u: 'armure' },
    { c: 'attaque', u: 'défense' },
    { c: 'manipulation', u: 'suggestion' },
    { c: 'décision', u: 'doute' },
    { c: 'sac à main', u: 'valise' },
    { c: 'voyage', u: 'aventure' },
    { c: 'incendie', u: 'inondation' },
    { c: 'souris', u: 'rat' },
    { c: 'cheval', u: 'âne' },
    { c: 'girafe', u: 'autruche' },
    { c: 'cuillère', u: 'fourchette' },
    { c: 'fourchette', u: 'couteau' },
    { c: 'assiette', u: 'écuelle' },
    { c: 'moustiques', u: 'mouches' },
    { c: 'nectarine', u: 'pêche' },
    { c: 'amour', u: 'amitié' },
    { c: 'main', u: 'index' },
    { c: 'menthe', u: 'thym' },
    { c: 'ail', u: 'oignon' },
    { c: 'laitue', u: 'batavia' },
    { c: 'catamaran', u: 'voilier' },
    { c: 'corde', u: 'ficelle' },
    { c: 'voiture', u: 'carrosse' },
    { c: 'route', u: 'autoroute' },
    { c: 'fourgon', u: 'camionnette' },
    { c: 'horloge', u: 'montre' },
    { c: 'météo', u: 'orage' },
    { c: 'pluie', u: 'vent' },
    { c: 'neige', u: 'luge' },
    { c: 'mouton', u: 'méchoui' },
    { c: 'écrivain', u: 'poète' },
    { c: 'rhin', u: 'rhône' },
    { c: 'planète', u: 'étoile' },
    { c: 'armstrong', u: 'lune' },
    { c: 'marée', u: 'lune' },
    { c: 'île', u: 'corse' },
    { c: 'fleuve', u: 'rivière' },
    { c: 'saumon', u: 'truite' },
    { c: 'montagne', u: 'sommet' },
    { c: 'alpinisme', u: 'escalade' },
    { c: 'glace', u: 'iceberg' },
    { c: 'fusée', u: 'astronaute' },
    { c: 'coupe', u: 'champagne' },
    { c: 'parapluie', u: 'cherbourg' },
    { c: 'chapeau', u: 'casquette' },
    { c: 'pétrole', u: 'forage' },
    { c: 'désert', u: 'chaleur' },
    { c: 'maternité', u: 'bébé' },
    { c: 'lunette', u: 'opticien' },
    { c: 'plongée', u: 'poisson' },
    { c: 'parapente', u: 'aile' },
    { c: 'pizza', u: 'olive' },
    { c: 'bruit', u: 'travaux' },
    { c: 'fuite', u: 'tuyau' },
    { c: 'police', u: 'gendarme' },
    { c: 'pompier', u: 'feu' },
    { c: 'hôtesse', u: 'accueil' },
    { c: 'ordinateur', u: 'calcul' },
    { c: 'savane', u: 'afrique' },
    { c: 'goulag', u: 'sibérie' },
    { c: "jeu d'échec", u: 'jeu de dame' },
    { c: 'divorce', u: 'séparation' },
    { c: 'café', u: 'chicorée' },
    { c: 'offrir', u: 'donner' },
    { c: 'climatiseur', u: 'ventilateur' },
    { c: 'virus', u: 'vaccination' },
    { c: 'poterie', u: 'argile' },
    { c: 'loterie', u: 'chance' },
    { c: 'fumée', u: 'pipe' },
    { c: 'odeur', u: 'gaz' },
    { c: 'essence', u: 'diesel' },
    { c: 'valise', u: 'mallette' },
    { c: 'plage', u: 'cocotier' },
    { c: 'ceinture', u: 'bretelle' },
    { c: 'gant', u: 'moufle' },
    { c: 'dictée', u: 'punition' },
    { c: 'maîtresse', u: 'école' },
    { c: 'pigeon voyageur', u: 'message' },
    { c: 'tortue', u: 'carapace' },
    { c: 'serpent', u: 'venin' },
    { c: 'bracelet', u: 'collier' },
    { c: 'short', u: 'pantalon' },
    { c: 'baignoire', u: 'douche' },
    { c: 'savon', u: 'shampoing' },
    { c: 'boxe', u: 'lutte' },
    { c: 'karaté', u: 'judo' },
    { c: 'triathlon', u: 'décathlon' },
    { c: 'dictionnaire', u: 'encyclopédie' },
    { c: 'clown', u: 'humouriste' },
    { c: 'photographe', u: 'peintre' },
    { c: 'architecte', u: 'designer' },
    { c: 'lave-vaisselle', u: 'plongeur' },
    { c: 'rasoir', u: 'tondeuse' },
    { c: 'brosse', u: 'peigne' },
    { c: 'cheveu', u: 'poil' },
    { c: 'perruque', u: 'coiffure' },
    { c: 'meurtrier', u: 'coupable' },
    { c: 'marathon', u: 'trail' },
    { c: 'réconfort', u: 'vin chaud' },
    { c: 'natation', u: 'longueur' },
    { c: 'bise', u: 'câlin' },
    { c: 'église', u: 'temple' },
    { c: 'indien', u: 'peau rouge' },
    { c: 'disparition', u: 'magie' },
    { c: 'secret', u: 'carnet' },
    { c: 'bbq', u: 'braise' },
    { c: 'bière', u: 'bavière' },
    { c: 'physique', u: 'math' },
    { c: 'papier', u: 'crayon' },
    { c: 'casserole', u: 'poêle' },
    { c: 'jambon', u: 'saucisse' },
    { c: 'couscous', u: 'graine' },
    { c: 'moquette', u: 'tapis' },
    { c: 'mur', u: 'brique' },
    { c: 'escalier', u: 'colimaçon' },
    { c: 'maçon', u: 'peintre' },
    { c: 'peintre', u: 'électricien' },
    { c: 'menuisier', u: 'bois' },
    { c: 'tabouret', u: 'chaise' },
    { c: 'échelle', u: 'escalier' },
    { c: 'Réverbère', u: 'lampadaire' },
    { c: 'gare', u: 'train' },
    { c: 'tirelire', u: 'cagnotte' },
    { c: 'avare', u: 'radin' },
    { c: 'contrôle', u: 'vérification' },
    { c: 'abondance', u: 'opulence' },
    { c: 'superbe', u: 'magnifique' },
    { c: 'pendu', u: 'corde' },
    { c: 'distraction', u: 'loisir' },
    { c: 'tumulte', u: 'brouhaha' },
    { c: 'désordre', u: 'pagaille' },
    { c: 'nonchalant', u: 'indolent' },
    { c: 'vision', u: 'hallucinations' },
    { c: 'guidon',u:'vélo' },
    { c: 'guider', u: 'conseiller' },
    { c: 'fripouille', u: 'vaurien' },
    { c: 'monticule',u:'tas' },
    { c: 'abreuver',u:'désaltérer' },
    { c: 'diable', u: 'démon' },
    { c: 'soutane', u: 'curé' },
    { c: 'vêtements', u:'habits' },
    { c: 'couronne', u: 'diadème' },
    { c: 'griffes', u: 'ongles' },
    { c: 'tranquille', u: 'calme' },
    { c: 'égratignure', u:'griffures' },
    { c: 'poubelle', u:'déchets' },
    { c: 'embonpoint', u:'corpulence' },
    { c: 'salade', u:'laitue' },
    { c: 'miniature', u:'minuscule' },
    { c: 'mycose', u:'champignon'},
    { c: 'Pic', u:'col' },
    { c: 'Tunnel', u:'gallerie' },
    { c: 'Couverture', u:'toiture' },
    { c: 'Maison', u: 'appartement' },
    { c: 'évier', u: 'lavabo' }
];

export default wordsPairs;