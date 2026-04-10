/**
 * FINANCE TABOO V2.1 - MARKET MAYHEM (POLISHED FLOW)
 */

window.addEventListener('DOMContentLoaded', () => {

const WORDS = [
    // BANKING
    { word: "INFLATION", taboo: ["PRICE", "INCREASE", "MONEY", "COST", "ECONOMY"], difficulty: "easy", category: "banking" },
    { word: "INTEREST RATE", taboo: ["BANK", "LOAN", "PERCENT", "BORROW", "FED"], difficulty: "easy", category: "banking" },
    { word: "MORTGAGE", taboo: ["HOUSE", "LOAN", "BANK", "PROPERTY", "DEBT"], difficulty: "medium", category: "banking" },
    { word: "OVERDRAFT", taboo: ["BANK", "FEE", "NEGATIVE", "ACCOUNT", "LIMIT"], difficulty: "medium", category: "banking" },
    { word: "CENTRAL BANK", taboo: ["GOVERNMENT", "MONEY", "FED", "RESERVE", "INTEREST"], difficulty: "hard", category: "banking" },
    
    // STOCKS
    { word: "DIVIDEND", taboo: ["SHARE", "PROFIT", "STOCK", "PAYMENT", "HOLDER"], difficulty: "easy", category: "stocks" },
    { word: "BULL MARKET", taboo: ["UP", "STOCKS", "RISING", "PRICES", "BUY"], difficulty: "easy", category: "stocks" },
    { word: "PORTFOLIO", taboo: ["STOCKS", "INVEST", "COLLECTION", "ASSETS", "DIVERSE"], difficulty: "medium", category: "stocks" },
    { word: "IPO", taboo: ["STOCK", "PUBLIC", "OFFERING", "COMPANY", "INITIAL"], difficulty: "medium", category: "stocks" },
    { word: "SHORT SELLING", taboo: ["BET", "DAWN", "STOCKS", "PROFIT", "FALLING"], difficulty: "hard", category: "stocks" },
    { word: "ARBITRAGE", taboo: ["PROFIT", "MARKET", "PRICE", "BUY", "SELL"], difficulty: "hard", category: "stocks" },

    // CRYPTO
    { word: "BITCOIN", taboo: ["CRYPTO", "CURRENCY", "DIGITAL", "MINING", "SATOSHI"], difficulty: "easy", category: "crypto" },
    { word: "BLOCKCHAIN", taboo: ["LEDGER", "BITCOIN", "DIGITAL", "SECURE", "NODE"], difficulty: "medium", category: "crypto" },
    { word: "NFT", taboo: ["ART", "DIGITAL", "TOKEN", "CRYPTO", "OWNERSHIP"], difficulty: "medium", category: "crypto" },
    { word: "STABLECOIN", taboo: ["DOLLAR", "CRYPTO", "FIXED", "VALUE", "PEG"], difficulty: "hard", category: "crypto" },
    { word: "WHITELIST", taboo: ["CRYPTO", "ALLOW", "LIST", "ACCESS", "EARLY"], difficulty: "hard", category: "crypto" },

    // PERSONAL FINANCE
    { word: "BUDGET", taboo: ["PLAN", "MONEY", "SPEND", "SAVE", "LIST"], difficulty: "easy", category: "personal" },
    { word: "CREDIT SCORE", taboo: ["LOAN", "BANK", "RATING", "BORROW", "HISTORY"], difficulty: "medium", category: "personal" },
    { word: "NET WORTH", taboo: ["ASSETS", "WEALTH", "MONEY", "VALUE", "SAY"], difficulty: "medium", category: "personal" },
    { word: "EMERGENCY FUND", taboo: ["SAVE", "MONEY", "CASH", "URGENT", "SAFETY"], difficulty: "hard", category: "personal" },

    // ACCOUNTING
    { word: "LIABILITY", taboo: ["DEBT", "OWE", "ASSET", "BALANCE", "LOAN"], difficulty: "easy", category: "accounting" },
    { word: "REVENUE", taboo: ["SALES", "INCOME", "MONEY", "EARNINGS", "PROFIT"], difficulty: "medium", category: "accounting" },
    { word: "GOODWILL", taboo: ["ASSET", "VALUE", "COMPANY", "INTANGIBLE", "BRAND"], difficulty: "hard", category: "accounting" }
];

const WILD_CARDS = [
    "NO HAND GESTURES ✋",
    "ONLY ONE-WORD HINTS 🤐",
    "ACT ONLY (NO TALKING) 🎭",
    "EXPLAIN LIKE A PIRATE 🏴‍☠️",
    "CANNOT SAY 'THE' OR 'A' 🚫"
];

// Audio Engine (Procedural)
const AudioEngine = {
    ctx: null,
    init() {
        if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    },
    play(type) {
        this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        const now = this.ctx.currentTime;

        if (type === 'correct') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        } else if (type === 'skip') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(150, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            osc.start(now);
            osc.stop(now + 0.15);
        } else if (type === 'tick') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1200, now);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.05);
        } else if (type === 'buzzer') {
            // New Premium "End Round" Melodic Chime
            const tones = [330, 220]; // E4, A3
            tones.forEach((freq, i) => {
                const o = this.ctx.createOscillator();
                const g = this.ctx.createGain();
                o.type = 'triangle';
                o.frequency.setValueAtTime(freq, now + i * 0.15);
                g.gain.setValueAtTime(0.2, now + i * 0.15);
                g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.4);
                o.connect(g);
                g.connect(this.ctx.destination);
                o.start(now + i * 0.15);
                o.stop(now + i * 0.15 + 0.4);
            });
        } else if (type === 'snap') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.05);
        }
    }
};

// Game State
let gameState = {
    teams: [{ name: "BULLS", score: 0 }, { name: "BEARS", score: 0 }],
    currentTeamIndex: 0,
    currentRound: 1,
    maxRounds: 3,
    mode: 'classic',
    category: 'all',
    timer: 60,
    timerInterval: null,
    shuffledDeck: [],
    currentWord: null,
    
    // Round-specific
    roundCorrect: 0,
    roundSkips: 0,
    maxSkips: 3,
    streak: 0,
    attempted: 0,
    wildCard: null,
    
    isButtonDisabled: false,
    isPaused: false
};

// DOM Mapping
const dom = {
    // Overlays
    countdownOverlay: document.getElementById('countdown-overlay'),
    countdownNum: document.getElementById('countdown-number'),
    autoResultOverlay: document.getElementById('auto-result-overlay'),
    autoResultMsg: document.getElementById('auto-result-msg'),
    autoResultScore: document.getElementById('auto-result-score'),
    pauseOverlay: document.getElementById('pause-overlay'),
    
    // Screens
    home: document.getElementById('home-screen'),
    game: document.getElementById('game-screen'),
    result: document.getElementById('result-screen'),
    final: document.getElementById('final-screen'),
    
    // Setup
    team1Input: document.getElementById('team1-name'),
    team2Input: document.getElementById('team2-name'),
    modeSelect: document.getElementById('mode-select'),
    roundSelector: document.getElementById('round-selector'),
    categorySelect: document.getElementById('category-select'),
    
    // HUD
    currentTeam: document.getElementById('current-team-display'),
    score: document.getElementById('current-score'),
    timer: document.getElementById('timer'),
    streak: document.getElementById('streak-count'),
    accuracy: document.getElementById('accuracy-val'),
    skipsLeft: document.getElementById('skips-left'),
    role: document.getElementById('role-display'),
    wildCardLabel: document.getElementById('wildcard-label'),
    pauseBtn: document.getElementById('pause-btn'),
    resumeBtnOverlay: document.getElementById('resume-btn-overlay'),
    
    // Card
    targetWord: document.getElementById('target-word'),
    tabooList: document.getElementById('taboo-list'),
    card: document.getElementById('card'),
    
    // Results
    resCorrect: document.getElementById('round-correct'),
    resSkips: document.getElementById('round-skipped'),
    resPoints: document.getElementById('round-points'),
    resAccuracy: document.getElementById('round-accuracy'),
    
    // Final
    winner: document.getElementById('winner-name'),
    finalScores: document.getElementById('final-score-list')
};

// --- CORE UTILS ---

function showScreen(id) {
    [dom.home, dom.game, dom.result, dom.final].forEach(s => s.classList.add('hidden'));
    if (dom[id]) dom[id].classList.remove('hidden');
}

function initDeck() {
    let filtered = WORDS;
    if (gameState.category !== 'all') {
        filtered = WORDS.filter(w => w.category === gameState.category);
    }
    // Fallback if category empty (safety)
    if (filtered.length === 0) filtered = WORDS;
    
    // Shuffle
    gameState.shuffledDeck = [...filtered].sort(() => Math.random() - 0.5);
}

function nextWordFromDeck() {
    if (gameState.shuffledDeck.length === 0) {
        initDeck(); // Reshuffle if empty
    }
    const word = gameState.shuffledDeck.pop();
    // Final safety: if word is still undefined, take first word
    return word || WORDS[0];
}

function updateCard(animationClass = 'card-entry') {
    gameState.currentWord = nextWordFromDeck();
    if (!gameState.currentWord) return;

    dom.targetWord.textContent = gameState.currentWord.word;
    dom.tabooList.innerHTML = '';
    
    // Set random rotation for entry
    const rot = (Math.random() * 4 - 2).toFixed(1);
    dom.card.style.setProperty('--rot', `${rot}deg`);

    gameState.currentWord.taboo.forEach((t, i) => {
        const li = document.createElement('li');
        li.textContent = `❌ ${t}`;
        // CSS handles staggered delay via nth-child
        dom.tabooList.appendChild(li);
    });
    
    // Random Wild Card (15% chance)
    if (Math.random() < 0.15) {
        gameState.wildCard = WILD_CARDS[Math.floor(Math.random() * WILD_CARDS.length)];
        dom.wildCardLabel.textContent = `WILD CARD: ${gameState.wildCard}`;
        dom.wildCardLabel.classList.remove('hidden');
    } else {
        gameState.wildCard = null;
        dom.wildCardLabel.classList.add('hidden');
    }

    // Refresh Card UI with specific animation
    dom.card.classList.remove('card-entry', 'skip-swipe', 'pass-shake', 'correct-flash');
    void dom.card.offsetWidth; // Trigger reflow
    dom.card.classList.add(animationClass);
    
    if (animationClass === 'card-entry') AudioEngine.play('snap');
    
    updateHUD();
}

function updateHUD() {
    dom.score.textContent = gameState.teams[gameState.currentTeamIndex].score;
    dom.streak.textContent = `🔥 ${gameState.streak}`;
    dom.skipsLeft.textContent = `⏭ ${gameState.roundSkips}`; // Shows total skips used
    
    const acc = gameState.attempted === 0 ? 100 : Math.round((gameState.roundCorrect / gameState.attempted) * 100);
    dom.accuracy.textContent = `🎯 ${acc}%`;
}

// --- GAME ACTIONS ---

function startGame() {
    // Collect Config
    gameState.teams[0].name = dom.team1Input.value || "BULLS";
    gameState.teams[1].name = dom.team2Input.value || "BEARS";
    gameState.mode = dom.modeSelect.value;
    
    const selectedRoundBtn = dom.roundSelector.querySelector('.seg-btn.selected');
    gameState.maxRounds = parseInt(selectedRoundBtn ? selectedRoundBtn.dataset.value : 3);
    
    gameState.category = dom.categorySelect.value;
    
    // Reset Globals
    gameState.isPaused = false;
    gameState.teams[0].score = 0;
    gameState.teams[1].score = 0;
    gameState.currentRound = 1;
    gameState.currentTeamIndex = 0;
    initDeck();
    
    prepareRound();
}

function startRoundTimer() {
    gameState.timerInterval = setInterval(() => {
        if (gameState.isPaused) return;
        
        gameState.timer--;
        dom.timer.textContent = gameState.timer;
        
        if (gameState.timer <= 10) {
            dom.timer.classList.add('timer-urgent');
            AudioEngine.play('tick');
        }
        
        if (gameState.timer <= 0) {
            AudioEngine.play('buzzer');
            endRound();
        }
    }, 1000);
}

function pauseGame() {
    if (gameState.isPaused) return;
    gameState.isPaused = true;
    clearInterval(gameState.timerInterval);
    dom.pauseOverlay.classList.remove('hidden');
}

function resumeGame() {
    if (!gameState.isPaused) return;
    gameState.isPaused = false;
    dom.pauseOverlay.classList.add('hidden');
    startRoundTimer();
}

function returnToHome() {
    console.log("Home Button Triggered");
    if (gameState.timer > 0 && gameState.timer < 60) {
        if (!confirm("ABANDON MATCH AND RETURN TO HQ?")) return;
    }
    clearInterval(gameState.timerInterval);
    gameState.isPaused = false;
    showScreen('home');
}

function prepareRound() {
    // Skip 3-2-1 Countdown as requested
    showScreen('game');
    dom.timer.classList.remove('hidden');
    startRound();
}

function startRound() {
    gameState.roundCorrect = 0;
    gameState.roundSkips = 0;
    gameState.streak = 0;
    gameState.attempted = 0;
    
    // Mode Config
    if (gameState.mode === 'rapid') {
        gameState.timer = 30;
    } else {
        gameState.timer = 60;
    }
    gameState.maxSkips = 999; // Unlimited skips
    
    dom.currentTeam.textContent = gameState.teams[gameState.currentTeamIndex].name;
    dom.role.textContent = `SPEAKER: PLAYER A`;
    dom.timer.textContent = gameState.timer;
    dom.timer.classList.remove('timer-urgent');
    
    updateCard('card-entry');
    
    startRoundTimer();
}

function handleCorrect() {
    if (gameState.isButtonDisabled || gameState.isPaused) return;
    disableButtonsBriefly();
    AudioEngine.play('correct');
    
    // Flash Green FX
    dom.card.classList.remove('card-entry', 'skip-swipe', 'pass-shake');
    void dom.card.offsetWidth;
    dom.card.classList.add('correct-flash');
    
    let pts = 1;
    if (gameState.mode === 'risk') pts = 2;
    
    gameState.roundCorrect++;
    gameState.attempted++;
    gameState.streak++;
    
    if (gameState.streak >= 5) pts += 2;
    else if (gameState.streak >= 3) pts += 1;
    
    gameState.teams[gameState.currentTeamIndex].score += pts;
    
    updateHUD(); // Update HUD instantly
    
    // Delayed word change to show flash
    setTimeout(() => updateCard('card-entry'), 300);
}

function handleSkip() {
    if (gameState.isButtonDisabled || gameState.isPaused) return;
    
    disableButtonsBriefly();
    AudioEngine.play('skip');
    
    // Swipe Left FX
    dom.card.classList.remove('card-entry', 'correct-flash', 'pass-shake');
    void dom.card.offsetWidth;
    dom.card.classList.add('skip-swipe');
    
    gameState.roundSkips++;
    gameState.attempted++;
    gameState.streak = 0;
    
    updateHUD(); // Update HUD instantly

    if (gameState.mode === 'risk') {
        gameState.teams[gameState.currentTeamIndex].score -= 1;
    }
    
    // Delayed word change to show swipe
    setTimeout(() => updateCard('card-entry'), 400);
}

function handlePass() {
    if (gameState.isButtonDisabled || gameState.isPaused) return;
    disableButtonsBriefly();
    
    // Shake FX
    dom.card.classList.remove('card-entry', 'skip-swipe', 'correct-flash');
    void dom.card.offsetWidth;
    dom.card.classList.add('pass-shake');
    
    gameState.attempted++;
    gameState.streak = 0;
    gameState.teams[gameState.currentTeamIndex].score -= 1;
    
    updateHUD(); // Update HUD instantly
    
    setTimeout(() => updateCard('card-entry'), 300);
}

function disableButtonsBriefly() {
    gameState.isButtonDisabled = true;
    setTimeout(() => { gameState.isButtonDisabled = false; }, 400); // 400ms to match animations
}

function endRound() {
    clearInterval(gameState.timerInterval);
    
    // Show Auto-Result Overlay
    dom.autoResultMsg.textContent = `${gameState.teams[gameState.currentTeamIndex].name} ROUND OVER!`;
    dom.autoResultScore.textContent = `+${gameState.roundCorrect} POINTS`;
    dom.autoResultOverlay.classList.remove('hidden');
    
    // Sync detailed result screen in background
    dom.resCorrect.textContent = gameState.roundCorrect;
    dom.resSkips.textContent = gameState.roundSkips;
    dom.resPoints.textContent = gameState.roundCorrect;
    const acc = gameState.attempted === 0 ? 0 : Math.round((gameState.roundCorrect / gameState.attempted) * 100);
    dom.resAccuracy.textContent = `${acc}%`;
    
    // Auto Transition after 2.5 seconds
    setTimeout(() => {
        dom.autoResultOverlay.classList.add('hidden');
        nextTurn();
    }, 2500);
}

function nextTurn() {
    if (gameState.currentTeamIndex === 1) {
        gameState.currentRound++;
    }
    
    if (gameState.currentRound > gameState.maxRounds) {
        endGame();
    } else {
        gameState.currentTeamIndex = (gameState.currentTeamIndex + 1) % 2;
        prepareRound();
    }
}

function endGame() {
    const t1 = gameState.teams[0];
    const t2 = gameState.teams[1];
    
    if (t1.score > t2.score) dom.winner.textContent = t1.name;
    else if (t2.score > t1.score) dom.winner.textContent = t2.name;
    else dom.winner.textContent = "DRAW!";
    
    dom.finalScores.innerHTML = `
        <li>${t1.name}: ${t1.score} PTS</li>
        <li>${t2.name}: ${t2.score} PTS</li>
    `;
    
    showScreen('final');
    spawnConfetti();
}

function spawnConfetti() {
    const emojis = ['💸', '💰', '📈', '🚀', '💎', '🔥'];
    for (let i = 0; i < 40; i++) {
        const c = document.createElement('div');
        c.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        c.className = 'confetti';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.fontSize = (Math.random() * 20 + 20) + 'px';
        c.style.transition = `transform ${Math.random() * 2 + 2}s linear, opacity 1s`;
        document.body.appendChild(c);
        setTimeout(() => c.style.transform = `translateY(110vh) rotate(${Math.random() * 360}deg)`, 50);
        setTimeout(() => c.remove(), 4000);
    }
}

// --- EVENT LISTENERS ---

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('correct-btn').addEventListener('click', handleCorrect);
document.getElementById('skip-btn').addEventListener('click', handleSkip);
document.getElementById('pass-btn').addEventListener('click', handlePass);
document.getElementById('next-turn-btn').addEventListener('click', nextTurn);
document.getElementById('end-game-early').addEventListener('click', endGame);
document.getElementById('restart-btn').addEventListener('click', returnToHome);
document.getElementById('pause-btn').addEventListener('click', pauseGame);
document.getElementById('resume-btn-overlay').addEventListener('click', resumeGame);
document.getElementById('home-btn').addEventListener('click', returnToHome);

// Round Selection Handling
dom.roundSelector?.addEventListener('click', (e) => {
    const btn = e.target.closest('.seg-btn');
    if (btn) {
        AudioEngine.play('snap');
        dom.roundSelector.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        console.log(`Rounds selected: ${btn.dataset.value}`);
    }
});

document.getElementById('share-btn')?.addEventListener('click', () => {
    alert("Snapshot saved to clipboard! (Simulated)");
});

}); // End DOMContentLoaded
