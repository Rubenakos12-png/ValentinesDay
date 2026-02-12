const startBtn = document.getElementById('start-btn');
const startOverlay = document.getElementById('start-overlay');
const noButton = document.getElementById('no');
const yesButton = document.getElementById('yes');
const card = document.querySelector('.card');
const noSound = document.getElementById('rejectSound');
const atakes = [
        "Μη το κάνεις αυτό...",
        "Θα σου πάρω κρέπα!",
        "Ραγίζεις την καρδιά μου 💔",
        "Ζεν σες φιλάκιιιιι;;;",
        "Δεν με αγαπάς...",
        "Θα κλάψω...",
        "Είσαι κακιά!",
        "Σταμάτα να με αποφεύγεις!"
    ];
let keimeno1 = document.querySelector('header h1');
let keimeno2 = document.getElementById('question');
let scale = 1;
let randomX, randomY;

startBtn.addEventListener('click', () => {
    
    startOverlay.classList.add('hidden');

    setTimeout(() => {
        startOverlay.style.display = 'none';
    }, 800);
});

const moveButton = () => {
    // Ήχος
    noSound.currentTime = 0; // Επαναφορά ήχου στην αρχή
    noSound.play();

    // Αλλαγή κειμένων
    // Επιλογή τυχαίας ατάκας
    const tixaiaAtaka = atakes[Math.floor(Math.random() * atakes.length)];
    keimeno1.textContent = 'Ναι καλά ιχ ιχ ιχ ιχ';
    keimeno2.textContent = tixaiaAtaka;

    // Προετοιμασία
    document.body.appendChild(noButton);
    noButton.style.position = 'fixed';

    // Διαστάσεις
    const yesRect = yesButton.getBoundingClientRect();
    const btnW = noButton.offsetWidth;
    const btnH = noButton.offsetHeight;
    
    // 1. Διαλέγουμε τυχαίο X σε όλη την οθόνη
    let randomX = Math.random() * (window.innerWidth - btnW);
    let randomY;

    // 2. Ελέγχουμε αν το X πέφτει οριζόντια πάνω στο "Ναι" (με αέρα 10px)
    const buffer = 10;
    const overlapX = (randomX + btnW > yesRect.left - buffer) && 
                     (randomX < yesRect.right + buffer);

    if (overlapX) {
        // ΠΡΟΒΛΗΜΑ: Είμαστε στην ίδια στήλη με το "Ναι".
        // ΛΥΣΗ: Το Y πρέπει να είναι αυστηρά ΠΑΝΩ ή ΚΑΤΩ από το "Ναι".
        
        // Υπολογίζουμε τον διαθέσιμο χώρο πάνω και κάτω
        const spaceTop = yesRect.top - btnH - buffer;
        const spaceBottom = window.innerHeight - (yesRect.bottom + buffer + btnH);

        // Ρίχνουμε κέρμα: Πάμε πάνω ή κάτω; (Αν χωράει)
        // Αν δεν χωράει πάνω, πάμε αναγκαστικά κάτω και το αντίστροφο.
        const canGoTop = spaceTop > 0;
        const canGoBottom = spaceBottom > 0;

        if (canGoTop && (!canGoBottom || Math.random() < 0.5)) {
            // Πάμε Πάνω: τυχαία θέση από 0 έως το όριο του κουμπιού
            randomY = Math.random() * spaceTop;
        } else {
            // Πάμε Κάτω: τυχαία θέση από το τέλος του κουμπιού έως το τέλος οθόνης
            randomY = yesRect.bottom + buffer + Math.random() * spaceBottom;
        }
    } else {
        // ΚΑΝΕΝΑ ΠΡΟΒΛΗΜΑ: Το X είναι μακριά, το Y μπορεί να είναι οπουδήποτε.
        randomY = Math.random() * (window.innerHeight - btnH);
    }

    // Εφαρμογή
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;

    scale += 0.1; // Μεγαλώνει κατά 10% κάθε φορά
    yesButton.style.transform = `scale(${scale})`;
    yesButton.style.transition = 'transform 0.2s';
};

// Events
['mouseover', 'touchstart'].forEach(event => {
    noButton.addEventListener(event, moveButton);
});


yesButton.addEventListener('click', () => {
    noButton.style.display = 'none';
    card.innerHTML = `
    <h1 class="header_text">Νιεεεε θα φάμε κρέπεςςςςς ❤️</h1>
    <div class="gif_container">
        <img src="images/photo1.jpg" alt="Εμείς" style="width: 100%; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
    </div>
    <p style="font-size: 1.2rem; color: #d32f2f; margin-top: 15px;">
        Σε αγαπώωωωωω ❤️
    </p>
    `;
    confetti();

    // Photos
    const photos = 
    ['images/photo1.jpg', 
    'images/photo2.JPG', 
    'images/photo3.jpg',
    'images/photo4.JPG', 
    'images/photo5.JPG'];
    const imageContainer = document.querySelector('img');
    imageContainer.style.transition = 'opacity 0.5s ease-in-out'; // Ομαλή μετάβαση
    let currentPhoto = 0;

    // Loop για να αλλάζει η φωτογραφία κάθε 4 δευτερόλεπτα
    setInterval(() => {
        imageContainer.style.opacity = 0; // Σβήσιμο
        setTimeout(() => {
            currentPhoto++;
            if (currentPhoto >= photos.length) {
                currentPhoto = 0; // Επαναφορά στην πρώτη φωτογραφία
            }
            imageContainer.src = photos[currentPhoto]; // Αλλαγή φωτογραφίας
            imageContainer.onload = () => {
                imageContainer.style.opacity = 1; // Εμφάνιση
            };
        }, 500); // Μικρή καθυστέρηση για να ολοκληρωθεί το fade out    
    }, 4000);

    // --- Η ΛΟΓΙΚΗ ΤΟΥ ΗΧΟΥ (Crossfade) ---
    const audio1 = document.getElementById('sound1');
    const audio2 = document.getElementById('sound2');
    const audio3 = document.getElementById('sound3');

    // Ξεκινάμε το 1ο
    audio1.play();

    // Σύνδεση 1ου με 2ο (απλή αλλαγή)
    audio1.addEventListener('ended', () => {
        audio2.play();
    });

    // Σύνδεση 2ου με 3ο (Crossfade στα τελευταία 4 δευτερόλεπτα)
    audio2.addEventListener('timeupdate', () => {
        // Υπολογισμός υπολειπόμενου χρόνου
        const timeLeft = audio2.duration - audio2.currentTime;

        // Αν είμαστε στα τελευταία 1 δευτερόλεπτα
        if (timeLeft < 1) {
            // Αν το 3ο δεν παίζει ακόμα, ξεκίνα το στο mute (0 ένταση)
            if (audio3.paused) {
                audio3.volume = 0;
                audio3.play();
            }

            // ΜΑΘΗΜΑΤΙΚΑ CROSSFADE:
            // Το ratio πηγαίνει από το 1 προς το 0 καθώς περνάει η ώρα
            const ratio = timeLeft; 
            
            audio2.volume = ratio;       // Το 2 σβήνει
            audio3.volume = 1 - ratio;   // Το 3 δυναμώνει (αντίστροφα)
        }
    });
});

// Συνάρτηση που δημιουργεί μια καρδιά
const createHeart = () => {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️'; // Μπορείς να βάλεις ό,τι emoji θες
    
    // 1. Τυχαία θέση οριζόντια (left) από 0 έως 100vw
    heart.style.left = Math.random() * 100 + 'vw';
    
    // 2. Τυχαία ταχύτητα (animationDuration) μεταξύ 3s και 5s
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    
    // 3. Τυχαίο μέγεθος (font-size) για ποικιλία
    heart.style.fontSize = Math.random() * 20 + 20 + 'px';

    document.body.appendChild(heart);

    // 4. Καθαρισμός: Σβήνουμε την καρδιά μετά από 5s για να μην κολλήσει το κινητό
    setTimeout(() => {
        heart.remove();
    }, 5000);
};

// Ξεκινάει να παράγει μια καρδιά κάθε 300ms (0.3 δευτερόλεπτα)
setInterval(createHeart, 300);
