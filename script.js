/* ═══════════════════════════════════
   EPHEC Green — Navigation entre écrans
   
   Ce fichier gère :
   1. Le changement d'écran quand on clique sur la barre du bas
   2. L'animation de slide (gauche/droite) entre les écrans
   3. La mise à jour du label sous le phone
═══════════════════════════════════ */

// ─── Liste des écrans dans l'ordre ───
// Chaque écran a un id, un nom et une description
const screens = [
  { id: 'accueil', label: '🏠 Accueil — Centralise l\'info · Notifications · Inscription rapide' },
  { id: 'agenda',  label: '📅 Agenda — Visibilité · Inscription · Tous les campus' },
  { id: 'campus',  label: '📍 Campus — Retrouve les actions près de toi' },
  { id: 'profil',  label: '👤 Profil — Gamification · Impact concret · Valorisation' }
];

// ─── L'écran actuellement affiché ───
let currentIndex = 0;


// ═══════════════════════════════════
// FONCTION PRINCIPALE : navigateTo()
// ═══════════════════════════════════
// C'est cette fonction qui est appelée par les onclick dans le HTML
// Elle prend le nom de l'écran en paramètre (ex: 'agenda')

function navigateTo(screenId) {

  // 1. Trouver l'index du nouvel écran
  const newIndex = screens.findIndex(function(s) {
    return s.id === screenId;
  });

  // Si l'écran n'existe pas ou c'est déjà le même, on ne fait rien
  if (newIndex === -1 || newIndex === currentIndex) return;

  // 2. Récupérer les éléments DOM
  const currentScreen = document.getElementById('screen-' + screens[currentIndex].id);
  const newScreen = document.getElementById('screen-' + screenId);

  // 3. Déterminer la direction du slide
  // Si on va vers la droite (index plus grand) → l'ancien part à gauche
  // Si on va vers la gauche (index plus petit) → l'ancien part à droite
  const goingRight = newIndex > currentIndex;

  // 4. Retirer la classe "active" de l'écran actuel
  //    et ajouter la direction de sortie
  currentScreen.classList.remove('active');
  currentScreen.classList.add(goingRight ? 'slide-left' : 'slide-right');

  // 5. Préparer le nouvel écran (il arrive du côté opposé)
  newScreen.classList.remove('slide-left', 'slide-right');
  newScreen.style.transform = goingRight ? 'translateX(40px)' : 'translateX(-40px)';
  newScreen.style.opacity = '0';

  // 6. Forcer le navigateur à appliquer le style ci-dessus
  //    avant de lancer l'animation (c'est un "reflow")
  newScreen.offsetHeight;

  // 7. Activer le nouvel écran avec l'animation
  newScreen.style.transform = '';
  newScreen.style.opacity = '';
  newScreen.classList.add('active');

  // 8. Remonter le scroll du nouvel écran en haut
  newScreen.scrollTop = 0;

  // 9. Nettoyer les classes de l'ancien écran après l'animation
  setTimeout(function() {
    currentScreen.classList.remove('slide-left', 'slide-right');
  }, 300);

  // 10. Mettre à jour la barre de navigation du bas
  updateNav(screenId);

  // 11. Mettre à jour le label sous le phone
  document.getElementById('screen-name').textContent = screens[newIndex].label;

  // 12. Sauvegarder l'index courant
  currentIndex = newIndex;
}


// ═══════════════════════════════════
// MISE À JOUR DE LA BARRE DE NAV
// ═══════════════════════════════════
// Parcourt tous les items de la nav et active celui qui correspond

function updateNav(activeId) {

  // Sélectionner tous les éléments de navigation
  const navItems = document.querySelectorAll('.bnav-item');

  // Pour chaque item, vérifier si c'est celui qui est actif
  navItems.forEach(function(item) {
    // data-screen est l'attribut qu'on a mis dans le HTML
    if (item.getAttribute('data-screen') === activeId) {
      item.classList.add('on');     // activer
    } else {
      item.classList.remove('on');  // désactiver
    }
  });
}