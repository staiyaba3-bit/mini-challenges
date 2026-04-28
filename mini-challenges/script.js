// ===== STATE =====
// ===== CHALLENGE POOLS =====
const logicPool = [
    {
        id: 'logic_1',
        title: 'Logic Challenge',
        icon: '🧠',
        difficulty: 'Easy',
        diffClass: 'easy',
        question: 'What comes next in the sequence?',
        sequence: '3, 6, 12, 24, 48, ?',
        correctAnswer: '96',
        points: 20,
        explanation: 'The pattern is ×2 — each number doubles: 3×2=6, 6×2=12 … 48×2=96.'
    },
    {
        id: 'logic_2',
        title: 'Logic Challenge',
        icon: '🧠',
        difficulty: 'Medium',
        diffClass: 'medium',
        question: 'Solve for X:',
        sequence: '5, 11, 17, 23, 29, X',
        correctAnswer: '35',
        points: 20,
        explanation: 'The pattern is +6 — each number increases by 6: 29+6=35.'
    },
    {
        id: 'logic_3',
        title: 'Logic Challenge',
        icon: '🧠',
        difficulty: 'Medium',
        diffClass: 'medium',
        question: 'Find the next number:',
        sequence: '1, 4, 9, 16, 25, ?',
        correctAnswer: '36',
        points: 20,
        explanation: 'These are squares of integers: 1², 2², 3², 4², 5², so the next is 6² = 36.'
    },
    {
        id: 'logic_4',
        title: 'Logic Challenge',
        icon: '🧠',
        difficulty: 'Easy',
        diffClass: 'easy',
        question: 'What is the missing value?',
        sequence: '100, 90, 80, 70, 60, ?',
        correctAnswer: '50',
        points: 20,
        explanation: 'The pattern is -10 — each number decreases by 10: 60-10=50.'
    },
    {
        id: 'logic_5',
        title: 'Logic Challenge',
        icon: '🧠',
        difficulty: 'Hard',
        diffClass: 'hard',
        question: 'Find the next number:',
        sequence: '2, 3, 5, 8, 12, 17, ?',
        correctAnswer: '23',
        points: 20,
        explanation: 'The difference increases by 1: +1, +2, +3, +4, +5, so the next is +6: 17+6=23.'
    }
];

const successMessages = ["Nice work! 🔥", "You’re getting better!", "Great job! 🎯", "Impressive! ✨", "Keep it up! 🚀"];
const failMessages = ["Almost there 💪", "Try again tomorrow!", "So close! 🤏", "Don't give up! ⚡"];
const memoryEmojiPool = ['🚗','🎸','🎒','🌳','☕','⚽','📗','📷','🍎','🚀','🎮','🎨','🦄','🌈','🍕','🍔'];
const focusDurations = [10, 15, 20];

let appState = {
    streak: 0,
    bestStreak: 0,
    totalPoints: 0,
    lastCompletedDate: null,
    completedToday: false,
    totalCompleted: 0,
    lastSelectedDate: null,
    todayChallenges: null,
    unlockedMilestones: [],
    earnedBadges: []
};

let currentScreen   = 'home';
let timerInterval   = null;   
let memPhaseTimer   = null;   
let memAnswerTimer  = null;   
let focusTimer      = null;   
let isChallengeComplete = false;
let isChallengeLost     = false;
let currentChallengeType = 'logic'; // 'logic', 'memory', 'focus'

const STORAGE_KEY = 'dmc_user_data';
const FOCUS_CIRC = 515.2; // 2 * PI * 82 (ring radius)

function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            appState = JSON.parse(saved);
        } catch (e) {
            console.error('Failed to parse saved state:', e);
        }
    }
    checkDailyReset();
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function checkDailyReset() {
    const today = new Date().toISOString().split('T')[0];
    if (appState.lastCompletedDate !== today) {
        appState.completedToday = false;
    }
    if (appState.lastSelectedDate !== today) {
        generateDailyChallenges();
    }
    saveState();
}

// ===== CHALLENGE POOLS =====
const logicPool = [
    {
        id: 'logic_1',
        title: 'Logic Challenge',
        icon: '🧠',
        difficulty: 'Easy',
        diffClass: 'easy',
        question: 'What comes next in the sequence?',
        sequence: '3, 6, 12, 24, 48, ?',
        correctAnswer: '96',
        points: 20,
        explanation: 'The pattern is ×2 — each number doubles: 3×2=6, 6×2=12 … 48×2=96.'
    },
    {
        id: 'logic_2',
        title: 'Logic Challenge',
        icon: '🧠',
        difficulty: 'Medium',
        diffClass: 'medium',
        question: 'Solve for X:',
        sequence: '5, 11, 17, 23, 29, X',
        correctAnswer: '35',
        points: 20,
        explanation: 'The pattern is +6 — each number increases by 6: 29+6=35.'
    },
    {
        id: 'logic_3',
        title: 'Logic Challenge',
        icon: '🧠',
        difficulty: 'Medium',
        diffClass: 'medium',
        question: 'Find the next number:',
        sequence: '1, 4, 9, 16, 25, ?',
        correctAnswer: '36',
        points: 20,
        explanation: 'These are squares of integers: 1², 2², 3², 4², 5², so the next is 6² = 36.'
    },
    {
        id: 'logic_4',
        title: 'Logic Challenge',
        icon: '🧠',
        difficulty: 'Easy',
        diffClass: 'easy',
        question: 'What is the missing value?',
        sequence: '100, 90, 80, 70, 60, ?',
        correctAnswer: '50',
        points: 20,
        explanation: 'The pattern is -10 — each number decreases by 10: 60-10=50.'
    },
    {
        id: 'logic_5',
        title: 'Logic Challenge',
        icon: '🧠',
        difficulty: 'Hard',
        diffClass: 'hard',
        question: 'Find the next number:',
        sequence: '2, 3, 5, 8, 12, 17, ?',
        correctAnswer: '23',
        points: 20,
        explanation: 'The difference increases by 1: +1, +2, +3, +4, +5, so the next is +6: 17+6=23.'
    }
];

const successMessages = ["Nice work! 🔥", "You’re getting better!", "Great job! 🎯", "Impressive! ✨", "Keep it up! 🚀"];
const failMessages = ["Almost there 💪", "Try again tomorrow!", "So close! 🤏", "Don't give up! ⚡"];

const memoryEmojiPool = ['🚗','🎸','🎒','🌳','☕','⚽','📗','📷','🍎','🚀','🎮','🎨','🦄','🌈','🍕','🍔'];
const focusDurations = [5, 10, 15];

function generateDailyChallenges() {
    const today = new Date().toISOString().split('T')[0];
    
    // 1. Pick Random Logic
    const randomLogic = logicPool[Math.floor(Math.random() * logicPool.length)];
    
    // 2. Generate Random Memory
    const shuffledEmojis = [...memoryEmojiPool].sort(() => 0.5 - Math.random()).slice(0, 8);
    const randomPos = Math.floor(Math.random() * 8) + 1; // 1-8
    const targetEmoji = shuffledEmojis[randomPos - 1];
    
    // 3. Pick Random Focus Duration
    const randomDuration = focusDurations[Math.floor(Math.random() * focusDurations.length)];
    
    appState.todayChallenges = {
        logic: randomLogic,
        memory: {
            items: shuffledEmojis,
            questionPos: randomPos,
            correctAnswer: targetEmoji,
            points: 40,
            explanation: `Position ${randomPos} was the item ${targetEmoji}.`
        },
        focus: {
            duration: randomDuration,
            points: 20
        }
    };
    
    appState.lastSelectedDate = today;
    saveState();
}

function updateAllUI() {
    // Streak
    setEl('streakNumberHome', String(appState.streak));
    setEl('profStreak',       appState.streak + ' Days');
    setEl('compStreak',       appState.streak + ' Days');
    setEl('homeBestStreak',   appState.bestStreak + ' Days');
    setEl('profBestStreak',   String(appState.bestStreak));

    // Points (with animation)
    const pointsEl = document.getElementById('homeTotalPoints');
    const oldPoints = pointsEl ? parseInt(pointsEl.textContent || "0") : 0;
    
    if (oldPoints !== appState.totalPoints) {
        animatePoints(appState.totalPoints);
    } else {
        setEl('homeTotalPoints', String(appState.totalPoints));
        setEl('profTotalPoints', String(appState.totalPoints));
        setEl('compPoints',      '+' + appState.totalPoints + ' Points');
    }

    // Completed
    setEl('homeCompleted',   String(appState.totalCompleted));
    setEl('profCompleted',   String(appState.totalCompleted));

    // Update Badges in Profile
    if (appState.earnedBadges) {
        appState.earnedBadges.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.classList.remove('prof-badge-locked');
                el.classList.add('prof-badge-gold'); // or specific color
            }
        });
    }

    // Disable start button if already completed today
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        if (appState.completedToday) {
            startBtn.disabled = true;
            startBtn.textContent = 'Completed for Today! 🎉';
            startBtn.style.background = 'linear-gradient(135, #22c55e, #16a34a)';
            startBtn.style.opacity = '0.8';
        } else {
            startBtn.disabled = false;
            startBtn.textContent = "Start Today's Challenges";
            startBtn.style.background = '';
            startBtn.style.opacity = '';
        }
    }
}

function animatePoints(target) {
    const homeEl = document.getElementById('homeTotalPoints');
    const profEl = document.getElementById('profTotalPoints');
    const compEl = document.getElementById('compPoints');
    
    if (!homeEl) return;
    
    const startValue = parseInt(homeEl.textContent) || 0;
    const duration = 800;
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (target - startValue) + startValue);
        
        if (homeEl) homeEl.textContent = String(current);
        if (profEl) profEl.textContent = String(current);
        if (compEl) compEl.textContent = '+' + current + ' Points';
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            if (homeEl) homeEl.textContent = String(target);
            if (profEl) profEl.textContent = String(target);
            if (compEl) compEl.textContent = '+' + target + ' Points';
            
            // Add a temporary glow
            homeEl.classList.add('highlight');
            setTimeout(() => homeEl.classList.remove('highlight'), 500);
        }
    };
    window.requestAnimationFrame(step);
}

// Focus ring circumference (r=82 → 2π×82)
const FOCUS_CIRC = 515.2;
const FOCUS_TOTAL = 10; // seconds





// ===== SCREEN SWITCHING =====
function showScreen(name) {
    console.log('Switching to screen:', name);
    currentScreen = name;
    
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => s.classList.remove('active'));

    const map = {
        home:       'homeScreen',
        journey:    'journeyScreen',
        challenge:  'logicScreen',
        memory:     'memoryScreen',
        focus:      'focusScreen',
        completion: 'completionScreen',
        profile:    'profileScreen'
    };
    
    const id = map[name];
    if (!id) return;
    
    const el = document.getElementById(id);
    if (el) {
        el.classList.add('active');
        el.scrollTop = 0;
    } else {
        console.error('Element not found for screen:', name, 'with ID:', id);
    }

    // Always keep nav visible
    const nav = document.getElementById('bottomNav');
    if (nav) nav.style.display = '';

    // Sync active tab
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        const page = item.getAttribute('data-page');
        if ((name === 'home'      && page === 'home')        ||
            (name === 'challenge' && page === 'challenges')  ||
            (name === 'memory'    && page === 'challenges')  ||
            (name === 'focus'     && page === 'challenges')  ||
            (name === 'journey'   && page === 'progress')    ||
            (name === 'profile'   && page === 'profile')) {
            item.classList.add('active');
        }
    });
}

// ============================================================
//  CHALLENGE 1 — LOGIC
// ============================================================
function loadLogicChallenge() {
    clearAllTimers();
    isChallengeComplete = false;
    isChallengeLost     = false;
    currentChallengeType = 'logic';

    const data = appState.todayChallenges.logic;

    setEl('logicHeaderTitle', 'Challenge 1 of 3');
    setStyle('logicProgressFill', 'width', '33%');
    setHTML('logicTitle', `<span class="brain-icon">${data.icon}</span> ${data.title}`);
    const diffBadge = document.getElementById('logicDifficulty');
    if (diffBadge) { diffBadge.className = `difficulty-badge ${data.diffClass}`; diffBadge.textContent = data.difficulty; }
    setEl('logicQuestion', data.question);
    setEl('logicSequence', data.sequence);

    const input = document.getElementById('challengeInput');
    if (input) { input.value = ''; input.style.borderColor = 'rgba(255,255,255,0.1)'; input.disabled = false; }

    const btn = document.getElementById('logicSubmitBtn');
    if (btn) { btn.textContent = 'Submit Answer'; btn.style.background = ''; btn.disabled = false; }

    const result = document.getElementById('inlineResult');
    if (result) result.style.display = 'none';

    startLogicTimer(25);
}

function startLogicTimer(seconds) {
    clearInterval(timerInterval);
    let t = seconds;
    const el = document.getElementById('logicTimer');
    if (!el) return;
    el.textContent = fmt(t);
    timerInterval = setInterval(() => {
        t--;
        if (t < 0) t = 0;
        el.textContent = fmt(t);
        if (t <= 0) {
            clearInterval(timerInterval);
            if (!isChallengeComplete) { isChallengeLost = true; showLogicResult(false, true); }
        }
    }, 1000);
}

function showLogicResult(correct, timeout) {
    clearAllTimers();
    const data = appState.todayChallenges.logic;
    const input = document.getElementById('challengeInput');
    const btn   = document.getElementById('logicSubmitBtn');
    const box   = document.getElementById('inlineResult');

    if (correct) {
        const msg = successMessages[Math.floor(Math.random() * successMessages.length)];
        appState.totalPoints += data.points; 
        appState.totalCompleted++;
        saveState();
        updateAllUI();
        if (input) { input.style.borderColor = '#4ade80'; input.disabled = true; }
        if (btn)   { btn.textContent = `✅ ${msg} +${data.points} Pts`; btn.style.background = '#22c55e'; btn.disabled = true; }
        if (box) {
            box.style.display = 'block';
            box.className = 'inline-result correct';
            box.innerHTML = `
                <div class="ir-title">🎉 ${msg}</div>
                <div class="ir-answer"><strong>${data.correctAnswer}</strong> is the right answer.</div>
                <div class="ir-points">⭐ +${data.points} points earned</div>
            `;
            
            // Show the official Result Screen after a small delay
            setTimeout(() => {
                showResultScreen(true, data, 'memory');
            }, 1000);
        }
    }
    } else {
        const msgPool = timeout ? ["⏰ Time's Up!"] : failMessages;
        const msg = msgPool[Math.floor(Math.random() * msgPool.length)];
        if (input) input.style.borderColor = '#ef4444';
        if (btn) {
            btn.textContent = msg;
            btn.style.background = '#ef4444';
            btn.disabled = false;
        }
        if (box && timeout) {
            box.style.display = 'block';
            box.className = 'inline-result wrong';
            box.innerHTML = `
                <div class="ir-title">${msg}</div>
                <div class="ir-answer">The correct answer was <strong>${data.correctAnswer}</strong></div>
                <div class="ir-explain">${data.explanation}</div>
            `;
        }
    }
}

function setupLogicInteractions() {
    const btn   = document.getElementById('logicSubmitBtn');
    const input = document.getElementById('challengeInput');
    if (!btn || !input) return;

    btn.addEventListener('click', () => {
        if (isChallengeLost) { loadLogicChallenge(); return; }
        if (isChallengeComplete) return;

        const answer = input.value.trim();
        if (!answer) return;

        if (answer === appState.todayChallenges.logic.correctAnswer) {
            isChallengeComplete = true;
            showLogicResult(true, false);
        } else {
            showLogicResult(false, false);
            setTimeout(() => {
                if (!isChallengeComplete && !isChallengeLost) {
                    btn.textContent = 'Submit Answer';
                    btn.style.background = '';
                    input.style.borderColor = 'rgba(255,255,255,0.1)';
                    const box = document.getElementById('inlineResult');
                    if (box) box.style.display = 'none';
                }
            }, 1500);
        }
    });

    input.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click(); });
}

// ============================================================
//  CHALLENGE 2 — MEMORY
// ============================================================
let memoryPhaseActive = false;

function loadMemoryChallenge() {
    clearAllTimers();
    isChallengeComplete = false;
    isChallengeLost     = false;
    memoryPhaseActive   = true;

    toggleMemPhases(true);

    const data = appState.todayChallenges.memory;
    const grid = document.getElementById('memoryGrid');
    if (grid) {
        grid.innerHTML = '';
        data.items.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'mem-card';
            div.dataset.pos = idx + 1;
            div.textContent = item;
            grid.appendChild(div);
        });
    }

    // Update Question Phase UI
    setEl('memoryCountdown', '8');
    setEl('memoryTimerNum', '8');
    setStyle('memoryTimerBar', 'width', '100%');
    
    // Update the question and highlighted card in question phase
    const qText = document.querySelector('.mem-q-text');
    if (qText) qText.textContent = `Which item was in position ${data.questionPos}?`;
    
    const hiddenGrid = document.getElementById('memHiddenGrid');
    if (hiddenGrid) {
        hiddenGrid.innerHTML = '';
        for (let i = 1; i <= 8; i++) {
            const div = document.createElement('div');
            div.className = i === data.questionPos ? 'mem-hidden-card mem-hidden-highlight' : 'mem-hidden-card';
            div.textContent = i === data.questionPos ? String(i) : '❓';
            hiddenGrid.appendChild(div);
        }
    }

    const inp = document.getElementById('memoryInput');
    if (inp) { inp.value = ''; inp.style.borderColor = 'rgba(255,255,255,0.1)'; inp.disabled = false; }
    const btn = document.getElementById('memorySubmitBtn');
    if (btn) { btn.textContent = 'Submit Answer'; btn.style.background = ''; btn.disabled = false; }
    const res = document.getElementById('memoryInlineResult');
    if (res) res.style.display = 'none';

    startMemorizeCountdown(8);
}

function startMemorizeCountdown(total) {
    clearInterval(memPhaseTimer);
    let t = total;

    memPhaseTimer = setInterval(() => {
        t--;
        if (t < 0) t = 0;
        setEl('memoryCountdown', String(t));
        setEl('memoryTimerNum', t < 10 ? '0' + t : String(t));
        setStyle('memoryTimerBar', 'width', (t / total) * 100 + '%');
        if (t <= 0) { clearInterval(memPhaseTimer); enterMemoryQuestionPhase(); }
    }, 1000);
}

function enterMemoryQuestionPhase() {
    document.querySelectorAll('#memoryGrid .mem-card').forEach(c => c.classList.add('hidden'));
    setTimeout(() => {
        memoryPhaseActive = false;
        toggleMemPhases(false);
        startMemoryAnswerTimer(20);
    }, 500);
}

function toggleMemPhases(showMemorize) {
    const ph1 = document.getElementById('memoryPhase');
    const ph2 = document.getElementById('memoryQuestion');
    if (ph1) ph1.style.display = showMemorize ? 'block' : 'none';
    if (ph2) ph2.style.display = showMemorize ? 'none'  : 'block';
}

function startMemoryAnswerTimer(seconds) {
    clearInterval(memAnswerTimer);
    let t = seconds;
    const el = document.getElementById('memoryAnswerTimer');
    if (!el) return;
    el.textContent = fmt(t);

    memAnswerTimer = setInterval(() => {
        t--;
        if (t < 0) t = 0;
        el.textContent = fmt(t);
        if (t <= 0) {
            clearInterval(memAnswerTimer);
            if (!isChallengeComplete) { isChallengeLost = true; showMemoryResult(false, true); }
        }
    }, 1000);
}

function showMemoryResult(correct, timeout) {
    clearAllTimers();
    const data = appState.todayChallenges.memory;
    const inp = document.getElementById('memoryInput');
    const btn = document.getElementById('memorySubmitBtn');
    const box = document.getElementById('memoryInlineResult');

    if (correct) {
        const msg = successMessages[Math.floor(Math.random() * successMessages.length)];
        appState.totalPoints += data.points; 
        appState.totalCompleted++;
        saveState();
        updateAllUI();
        if (inp) { inp.style.borderColor = '#4ade80'; inp.disabled = true; }
        if (btn) { btn.textContent = `✅ ${msg} +${data.points} Pts`; btn.style.background = '#22c55e'; btn.disabled = true; }
        if (box) {
            box.style.display = 'block';
            box.className = 'inline-result correct';
            box.innerHTML = `
                <div class="ir-title">🎉 ${msg}</div>
                <div class="ir-answer"><strong>${data.correctAnswer}</strong> was correct!</div>
                <div class="ir-points">⭐ +${data.points} points earned</div>
            `;
            
            // Show the official Result Screen
            setTimeout(() => {
                showResultScreen(true, data, 'focus');
            }, 1000);
        }
    }
    } else {
        const msgPool = timeout ? ["⏰ Time's Up!"] : failMessages;
        const msg = msgPool[Math.floor(Math.random() * msgPool.length)];
        if (inp) inp.style.borderColor = '#ef4444';
        if (btn) {
            btn.textContent = msg;
            btn.style.background = '#ef4444';
            btn.disabled = false;
        }
        if (box) {
            box.style.display = 'block';
            box.className = 'inline-result wrong';
            box.innerHTML = `
                <div class="ir-title">${msg}</div>
                <div class="ir-answer">The correct answer was <strong>${data.correctAnswer}</strong> (Backpack)</div>
                <div class="ir-explain">${data.explanation}</div>
            `;
        }
    }
}

function setupMemoryInteractions() {
    const btn = document.getElementById('memorySubmitBtn');
    const inp = document.getElementById('memoryInput');
    if (!btn || !inp) return;

    btn.addEventListener('click', () => {
        if (isChallengeLost) { loadMemoryChallenge(); return; }
        if (isChallengeComplete) return;

        const answer = inp.value.trim().toLowerCase();
        if (!answer) return;

        const data = appState.todayChallenges.memory;
        const correct = answer === data.correctAnswer.toLowerCase() || 
                        (data.altAnswers && data.altAnswers.some(a => answer.includes(a)));

        if (correct) {
            isChallengeComplete = true;
            showMemoryResult(true, false);
        } else {
            showMemoryResult(false, false);
            setTimeout(() => {
                if (!isChallengeComplete && !isChallengeLost) {
                    btn.textContent = 'Submit Answer';
                    btn.style.background = '';
                    inp.style.borderColor = 'rgba(255,255,255,0.1)';
                    const box = document.getElementById('memoryInlineResult');
                    if (box) box.style.display = 'none';
                }
            }, 1500);
        }
    });

    inp.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click(); });

    const backBtn = document.getElementById('memoryBackBtn');
    if (backBtn) backBtn.addEventListener('click', () => { clearAllTimers(); showScreen('home'); });
}

// ============================================================
//  CHALLENGE 3 — FOCUS
// ============================================================
let focusFailed = false;

function loadFocusChallenge() {
    clearAllTimers();
    isChallengeComplete = false;
    isChallengeLost     = false;
    focusFailed         = false;

    // Show active phase, hide done/fail
    showFocusPhase('active');

    // Reset ring to full
    const total = appState.todayChallenges.focus.duration;
    setFocusRing(total, total);
    setEl('focusTimerNum', String(total));
    setEl('focusSubtext', 'Keep going…');

    // Start countdown
    startFocusTimer(total);
}

function startFocusTimer(total) {
    clearInterval(focusTimer);
    let t = total;

    focusTimer = setInterval(() => {
        t--;
        if (t < 0) t = 0;

        setEl('focusTimerNum', String(t));
        setFocusRing(t, total);

        // Update subtext
        if (t > 6)      setEl('focusSubtext', 'Keep going…');
        else if (t > 3) setEl('focusSubtext', 'Stay still…');
        else if (t > 0) setEl('focusSubtext', 'Almost there! 🔥');

        if (t <= 0) {
            clearInterval(focusTimer);
            focusSuccess();
        }
    }, 1000);
}

function setFocusRing(remaining, total) {
    const ring = document.getElementById('focusRingFill');
    if (!ring) return;
    // offset = 0 → full ring. offset = CIRC → empty ring
    const offset = FOCUS_CIRC * (1 - remaining / total);
    ring.style.strokeDashoffset = String(offset);
}

function focusSuccess() {
    clearInterval(focusTimer);
    isChallengeComplete = true;
    const data = appState.todayChallenges.focus;
    
    // Update streak logic
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let streakIncreased = false;
    if (appState.lastCompletedDate === yesterdayStr) {
        appState.streak++;
        streakIncreased = true;
    } else if (appState.lastCompletedDate !== today) {
        appState.streak = 1;
        streakIncreased = true;
    }

    if (appState.streak > appState.bestStreak) {
        appState.bestStreak = appState.streak;
    }

    // Points calculation
    let earnedToday = data.points; // 20
    let bonusMessage = "";
    let milestoneBadge = "";

    // Perfect Run Bonus (+10)
    earnedToday += 10;
    bonusMessage = "Perfect run! 🏆 +10 Bonus";

    // Streak Milestones
    const milestones = [
        { days: 3, bonus: 10, badge: "Consistency Starter", id: "badgeStreak3" },
        { days: 5, bonus: 20, badge: "Focused Mind", id: "badgeStreak5" },
        { days: 7, bonus: 30, badge: "Streak Master", id: "badgeStreak7" },
        { days: 10, bonus: 50, badge: "Unstoppable", id: "badgeStreak10" }
    ];

    if (streakIncreased) {
        const m = milestones.find(m => m.days === appState.streak);
        if (m && !appState.unlockedMilestones.includes(m.days)) {
            earnedToday += m.bonus;
            appState.unlockedMilestones.push(m.days);
            appState.earnedBadges.push(m.id);
            bonusMessage = `🔥 ${m.days} Day Streak! Bonus +${m.bonus}`;
            milestoneBadge = m.badge;
        }
    }

    appState.totalPoints += earnedToday; 
    appState.totalCompleted++;
    appState.lastCompletedDate = today;
    appState.completedToday = true;

    saveState();
    updateAllUI();

    // Update Completion Screen messages
    if (bonusMessage) setEl('compBadgeText', bonusMessage);
    if (milestoneBadge) setEl('compMotivationText', `You unlocked the "${milestoneBadge}" badge! 🎉`);

    showFocusPhase('done');
    // Show official Result Screen for Focus
    setTimeout(() => {
        showResultScreen(true, data, 'finish');
    }, 1200);
}

function focusFail() {
    if (isChallengeComplete || focusFailed) return;
    focusFailed = true;
    clearInterval(focusTimer);
    isChallengeLost = true;
    showFocusPhase('fail');
}

function showFocusPhase(phase) {
    const active = document.getElementById('focusActivePhase');
    const done   = document.getElementById('focusDonePhase');
    const fail   = document.getElementById('focusFailPhase');
    if (active) active.style.display = phase === 'active' ? 'block' : 'none';
    if (done)   done.style.display   = phase === 'done'   ? 'block' : 'none';
    if (fail)   fail.style.display   = phase === 'fail'   ? 'block' : 'none';
}

function setupFocusInteractions() {
    // Tap-to-fail zone
    const tapZone = document.getElementById('focusTapZone');
    if (tapZone) {
        tapZone.addEventListener('click',      () => focusFail());
        tapZone.addEventListener('touchstart', () => focusFail(), { passive: true });
    }

    // Retry button
    const retryBtn = document.getElementById('focusRetryBtn');
    if (retryBtn) retryBtn.addEventListener('click', () => loadFocusChallenge());

    // Back button → home
    const backBtn = document.getElementById('focusBackBtn');
    if (backBtn) backBtn.addEventListener('click', () => { clearAllTimers(); showScreen('home'); });
}

function showResultScreen(correct, data, nextType) {
    clearAllTimers();
    currentChallengeType = nextType;
    showScreen('result');

    const statusEl = document.querySelector('.result-status');
    const answerEl = document.getElementById('resultCorrectAnswer');
    const explainEl = document.getElementById('resultExplanation');
    const pointsEl = document.getElementById('resultPoints');
    const nextBtnText = document.querySelector('#nextChallengeBtn span');

    if (statusEl) statusEl.textContent = correct ? 'Correct Answer!' : 'Time\'s Up!';
    if (answerEl) answerEl.textContent = data.correctAnswer || 'Focus';
    if (explainEl) explainEl.textContent = data.explanation || 'Great job staying focused!';
    if (pointsEl) pointsEl.textContent = data.points;

    if (nextBtnText) {
        if (nextType === 'memory') nextBtnText.textContent = 'Next Challenge (Memory)';
        else if (nextType === 'focus') nextBtnText.textContent = 'Next Challenge (Focus)';
        else nextBtnText.textContent = 'Finish Challenges';
    }

    // Confetti
    spawnConfetti();
}

function spawnConfetti() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 40; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.backgroundColor = ['#f59e0b','#ec4899','#34d399','#6366f1'][Math.floor(Math.random()*4)];
        piece.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(piece);
    }
}

function setupResultInteractions() {
    const nextBtn = document.getElementById('nextChallengeBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentChallengeType === 'memory') {
                showScreen('memory');
                loadMemoryChallenge();
            } else if (currentChallengeType === 'focus') {
                showScreen('focus');
                loadFocusChallenge();
            } else {
                showCompletionScreen();
            }
        });
    }
}

// ============================================================
//  COMPLETION SCREEN
// ============================================================
function showCompletionScreen() {
    clearAllTimers();
    showScreen('completion');

    // Inject live points into the stat card
    const pointsEl = document.getElementById('compPoints');
    if (pointsEl) pointsEl.textContent = '+' + appState.totalPoints + ' Points';

    // Spawn confetti
    spawnCompConfetti();
}

function spawnCompConfetti() {
    const container = document.getElementById('compConfetti');
    if (!container) return;
    container.innerHTML = ''; // clear previous

    const colors = ['#f59e0b','#ec4899','#34d399','#6366f1','#f97316','#a855f7','#3b82f6','#fbbf24'];
    const shapes = ['4px','6px','8px'];
    const count  = 60;

    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.classList.add('comp-confetti-piece');
        const size  = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dur   = (Math.random() * 2.5 + 2).toFixed(2) + 's';
        const delay = (Math.random() * 3).toFixed(2) + 's';
        const left  = (Math.random() * 100).toFixed(1) + '%';
        const aspect = Math.random() > 0.5 ? '1/2' : '1';
        piece.style.cssText = `
            left: ${left};
            width: ${size};
            height: calc(${size} * ${aspect === '1/2' ? 2 : 1});
            background: ${color};
            animation-duration: ${dur};
            animation-delay: -${delay};
            border-radius: ${aspect === '1' ? '50%' : '2px'};
        `;
        container.appendChild(piece);
    }
}

function setupCompletionInteractions() {
    const continueBtn = document.getElementById('continueTomorrowBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            clearAllTimers();
            // Clear confetti
            const c = document.getElementById('compConfetti');
            if (c) c.innerHTML = '';
            showScreen('home');
        });
    }

    const progressBtn = document.getElementById('viewProgressBtn');
    if (progressBtn) {
        progressBtn.addEventListener('click', () => {
            clearAllTimers();
            showScreen('journey');
        });
    }
}

// ============================================================
//  NAVIGATION
// ============================================================
function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            if (page === 'home') {
                clearAllTimers();
                showScreen('home');
            } else if (page === 'challenges') {
                showScreen('challenge');
                loadLogicChallenge();
            } else if (page === 'progress') {
                clearAllTimers();
                showScreen('journey');
            } else if (page === 'profile') {
                clearAllTimers();
                showScreen('profile');
            }
        });
    });

    // "Start Today's Challenges" → logic (challenge 1)
    const startBtn = document.getElementById('startBtn');
    if (startBtn) startBtn.addEventListener('click', () => { showScreen('challenge'); loadLogicChallenge(); });

    // Home challenge cards → correct challenge
    const homeCardRoutes = {
        logicCard:  () => { showScreen('challenge'); loadLogicChallenge(); },
        memoryCard: () => { showScreen('memory');   loadMemoryChallenge(); },
        focusCard:  () => { showScreen('focus');    loadFocusChallenge(); }
    };
    Object.entries(homeCardRoutes).forEach(([id, handler]) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', handler);
    });

    // Back buttons
    const logicBack = document.getElementById('logicBackBtn');
    if (logicBack) logicBack.addEventListener('click', () => { clearAllTimers(); showScreen('home'); });

    const journeyBack = document.getElementById('journeyBackBtn');
    if (journeyBack) journeyBack.addEventListener('click', () => showScreen('home'));
}

// ============================================================
//  HELPERS
// ============================================================
function fmt(t) { return `00:${t < 10 ? '0' : ''}${t}`; }

function clearAllTimers() {
    clearInterval(timerInterval);
    clearInterval(memPhaseTimer);
    clearInterval(memAnswerTimer);
    clearInterval(focusTimer);
}

function setEl(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function setHTML(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
}

function setStyle(id, prop, val) {
    const el = document.getElementById(id);
    if (el) el.style[prop] = val;
}

function updateHomeStats() {
    updateAllUI();
}

function createStars() {
    const container = document.getElementById('starsContainer');
    if (!container) return;
    container.innerHTML = '';
    const count = 40;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        star.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(star);
    }
}

function injectFocusGradient() {
    const svg = document.querySelector('.foc-ring-svg');
    if (!svg || svg.querySelector('defs')) return;
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
        <linearGradient id="focusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#fbbf24;stop-opacity:1" />
        </linearGradient>
    `;
    svg.insertBefore(defs, svg.firstChild);
}

// ===== TOUCH EFFECTS =====
function setupTouchEffects() {
    const card = document.getElementById('streakCard');
    if (card) {
        card.addEventListener('touchstart', () => card.style.transform = 'scale(0.98)', {passive: true});
        card.addEventListener('touchend',   () => card.style.transform = 'scale(1)', {passive: true});
    }
}

// ===== INIT =====
window.onerror = function(msg, url, line, col, error) {
    console.error("Global error:", msg, "at", url, ":", line);
    // Only alert in development or if critical
    // alert("App Error: " + msg + "\nLine: " + line);
    return false;
};

document.addEventListener('DOMContentLoaded', () => {
    try {
        loadState();
        createStars();
        injectFocusGradient();
        setupNavigation();
        setupLogicInteractions();
        setupMemoryInteractions();
        setupFocusInteractions();
        setupResultInteractions();
        setupCompletionInteractions();
        setupTouchEffects();
        updateAllUI();
        showScreen('home');
        console.log("Mini Challenges initialized successfully.");
    } catch (err) {
        console.error("Initialization failed:", err);
        alert("App failed to start. Please try refreshing.");
    }
});
