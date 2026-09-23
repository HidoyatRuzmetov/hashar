(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const STORAGE_KEY = 'hashar-progress-final';

  const stations = [
    { icon: '✦', label: 'Qadriyat', title: 'Qadriyatni his qilamiz', type: 'intro', steps: 2, speech: 'Avval qadriyatlar sandig‘ini ochamiz. Har bir odat ortida bir hikmat bor.' },
    { icon: '▤', label: 'Hikoya', title: '“Hashar” hikoyasi', type: 'story', steps: 5, speech: 'Yodgor jarchining ovozi butun qishloqni uyg‘otadi. Hikoyaga kiramiz!' },
    { icon: '↳', label: 'Sabablar', title: 'Sabab zanjiri', type: 'reveal', steps: 1, speech: 'Har bir voqeaning sababi bor. Davomini sinf aytsin, so‘ng tekshiramiz.' },
    { icon: 'Ə', label: 'Imlo', title: 'Imlo hashari', type: 'spelling', steps: 1, speech: 'To‘g‘ri yozilgan so‘zlarni bir savatga yig‘amiz. Diqqat — ayrimlari juda o‘xshash!' },
    { icon: '⚖', label: 'Dalil', title: 'Faktmi yoki fikr?', type: 'evidence', steps: 2, speech: 'Gapning tayanchi bormi? Fakt bilan taxminni ikki tomonga ajratamiz.' },
    { icon: '✎', label: 'Xulosa', title: 'Xulosa va uyga vazifa', type: 'summary', steps: 2, speech: 'Endi hikoya qoldirgan fikrni jamlaymiz va uyga vazifani belgilaymiz.' },
    { icon: '★', label: 'Tabrik', title: 'Hashar yakunlandi', type: 'finale', steps: 1, speech: 'Maydon obod, fikrlar charog‘on! Bugungi yo‘lni bir jumla bilan yakunlaymiz.' }
  ];

  const story = [
    {
      title: 'Jarchining ovozi', image: 'assets/jarchining-ovozi.png', quote: '“Ovozi uni elga tanitdi, boqdi.”',
      html: `<p>Chorbog‘da Yodgor jarchini tanimagan odam yo‘q. Kichik qishloqda uni avval ovozidan tanishadi. To‘y bormi, janozami, hasharmi, kimning moli yo‘qolgan — hammasini jarchi birinchi biladi.</p><p>Yuvoshgina kulrang eshagini minib, qishloq oralab xabar tarqatadi. Ayniqsa, bolalar uni yaxshi tanishadi: ko‘rgan-bilganlarini birinchi bo‘lib aytishadi. Yodgor bobo ham cho‘ntagini turshak, mayiz va yong‘oqqa to‘ldirib, ular bilan kattalardek qo‘l berib ko‘rishadi.</p>`
    },
    {
      title: 'Yo‘qolgan uloqchi ot', image: 'assets/yoqolgan-uloqchi-ot.png', quote: '“Ot egasining ori-da, nima bo‘lsayam topilsin.”',
      html: `<p>Fayzi chopag‘onning uloqchi oti yo‘qolib qoladi. U Yodgor jarchiga: “Ot topilsa, bir qo‘zi sizniki”, deydi. Jarchi tomog‘i og‘rib turgan bo‘lsa-da, suyunchi uchun emas, Fayzining holiga achingani uchun yo‘lga chiqadi.</p><p>Ikkinchi kuni Qorabo‘yin qishlog‘ida bir tojik yigit ot uning baytali ortidan ergashib kelganini, egasi olib ketishi mumkinligini aytadi. Yodgor bobo xushxabar bilan qaytadi. Fayzi va’da qilgan qo‘zini olib keladi; o‘sha qo‘zidan <span class="highlight">to‘ragan</span> qo‘ylar keyinchalik o‘ntaga yetadi.</p>`
    },
    {
      title: 'Oqsoqolning xabari', image: 'assets/oqsoqolning-xabari.png', quote: '“Ertaga yosh-u qari — hammani hasharga chaqirasan.”',
      html: `<p>Mahalla oqsoqoli Boboqul Yodgor boboning oldiga keladi. Kechagi seldan keyin hovuzlarni loyqa bosganini, choyxona atrofiga nihol qadash kerakligini aytadi. Kenja ham hasharchilarga choy tashib turadi.</p><p>Yodgor bobo kampiriga ketmonlarni tayyorlatadi. Ular nevarasini kichkinaligidan “Kenja” deb atayverib, asl ismi Samariddinmi, Qamariddinmi — eslaridan ham chiqarishgan.</p>`
    },
    {
      title: 'Hashar boshlandi', image: 'assets/hashar-boshlandi.png', quote: '“Mahallaga hasharga, hoooo!”',
      html: `<p>Ertasi Yodgor bobo sahar turib, eshagiga to‘qim uradi va qishloqni aylanib hasharga chorlaydi. Mahalla choyxonasiga o‘n-o‘n besh kishi yig‘iladi.</p><p>Avval hovuz tozalanadi, keyin ko‘chatlar o‘tqazilib, daraxtlar oqlanadi. Yigitlar: “Sizlar gurung berib tursangizlar bo‘ldi, ish o‘zimizdan ortmaydi”, deya hazillashishadi. Qurib qolgan tut ildizi bilan qo‘poriladi — uni sumalakka ishlatishga kelishishadi.</p>`
    },
    {
      title: 'Bir paslik hayot', image: 'assets/bir-paslik-hayot.png', quote: '“Hayot degani birpaslik mahalla hashariday gap ekan-da, asli.”',
      html: `<p>Yodgor chol yomg‘irda namiqib, hali qurimagan supa labiga o‘tiradi. Bugungi yigitlarning ham bir kun kelib keksayishini o‘ylab, beixtiyor titraydi: qurib, qariganini kesishadi, o‘rniga yangisini ekishadi.</p><p>Ko‘z o‘ngida ag‘darilgan tut turgan chol tomorqadan buzoqchani sudrab kelayotgan Kenjaga qarab o‘tirardi, ammo uni ko‘rmasdi.</p><p><b>Nasiba Abdullayeva</b> hikoyasi asosida</p>`
    }
  ];

  const quiz = [
    { q: 'Hikoyadagi voqealar qaysi faslda sodir bo‘ladi?', a: ['Kuzda', 'Yozda', 'Bahorda', 'Qishda'], correct: 2, why: 'Nihol qadash, daraxtlarni oqlash va sumalak uchun tut yig‘ish — bahor belgilaridir.' },
    { q: 'Yodgor bobo betob bo‘lsa-da, uloqchi otni nima uchun qidiradi?', a: ['Suyunchisi katta bo‘lgani uchun', 'Fayzi yaqin qarindoshi bo‘lgani uchun', 'Oqsoqol buyurgani uchun', 'Otni or-nomus masalasi deb bilgani uchun'], correct: 3, why: 'Matnda “Ot egasining ori-da” degan jumla sababni ochiq ko‘rsatadi.' },
    { q: 'Yodgor boboning jarchilikdagi eng chaqqon yordamchilari kimlar?', a: ['Yosh bolalar', 'Qishloq cho‘ponlari', 'Oqsoqol va uning do‘stlari', 'Nevaralari'], correct: 0, why: 'Bolalar ko‘rgan-bilganini tez aytadi va xabarni ota-onasiga yetkazadi.' },
    { q: 'Yodgor bobo oqsoqol kelganida qanday holatda tasvirlanadi?', a: ['G‘azablangan', 'Xursand', 'Gumon qilayotgan', 'Qo‘rqib ketgan'], correct: 2, why: 'U oqsoqolning tashrifini “moling yo‘qolganov” deb o‘zicha tusmollaydi.' },
    { q: 'Mahalladagi hasharni kim tashkil etadi?', a: ['Yodgor jarchi', 'Fayzi chopag‘on', 'Boboqul oqsoqol', 'Kenja'], correct: 2, why: 'Oqsoqol qilinadigan ishlarni rejalashtirib, Yodgor bobodan elni chaqirishni so‘raydi.' },
    { q: 'Qahramon va sifatlar qaysi qatorda to‘g‘ri moslashgan?', a: ['Yodgor — novcha; tojik yigit — tashkilotchi', 'Yodgor — chaqqon, mehribon; tojik yigit — novcha, qorachadan kelgan; oqsoqol — hazilkash, ishbilarmon', 'Fayzi — oqsoqol; Yodgor — tojik yigit', 'Oqsoqol — tortinchoq; Yodgor — xasis'], correct: 1, why: 'Matndagi bevosita va bilvosita tasvirlar shu moslikni ko‘rsatadi.' },
    { q: 'Hikoyada hashardan tashqari yana qaysi qadriyatlar bor?', a: ['Sumalak pishirish, turmush o‘rtog‘ini bosh farzand ismi bilan chaqirish, bolalarga shirinlik berish', 'Faqat kattalarga suv quyish', 'Faqat betob do‘stni yo‘qlash', 'Uloq chopish va sayil qilish'], correct: 0, why: 'Hikoyada sumalak, Tursuntosh deb chaqirish va bolalarga shirinlik ulashish aniq tilga olingan.' }
  ];

  const vocabPairs = [
    ['to‘ramoq', 'Qo‘y-echkining bolalashi, tug‘ishi'],
    ['payqamay qolmoq', 'Sezmay qolmoq, e’tibor bermaslik'],
    ['xomtama bo‘lmoq', 'Asossiz umid qilmoq, behuda ilinjda bo‘lmoq'],
    ['qadamoq', 'Yerga o‘rnatmoq, ekmoq'],
    ['oqsoqol', 'Mahalla yoki elning hurmatli, yoshi ulug‘ bosh-qosh kishisi'],
    ['timirskilanmoq', 'Mayda ishlar bilan ovora bo‘lib, u yoq-bu yoqni kovlashtirmoq'],
    ['bo‘limli', 'Kelishgan, ko‘rkam va durkun']
  ];

  const standardPairs = [
    ['ulim', 'o‘g‘lim'], ['bo‘ma', 'bo‘lma'], ['kepti', 'kelibdi'], ['opchiq', 'olib chiq'], ['govmish', 'g‘ovmish']
  ];

  const causeRows = [
    ['Bolalar Yodgor jarchini juda yaxshi tanishadi, chunki…', 'uning ovozini eshitishi bilan yugurib kelishar, xabarlarni kattalarga yetkazishar edi.'],
    ['Fayzi chopag‘on oti yo‘qolgach, Yodgor cholning oldiga keldi, chunki…', 'jarchi el oralab xabar tarqatib, otni topishga yordam bera olardi.'],
    ['Oqsoqol jarchi do‘stini yo‘qlab keldi, chunki…', 'ertangi hasharga yosh-u qarini chaqirishni so‘ramoqchi edi.'],
    ['Mahallada hashar tashkil etildi, chunki…', 'seldan keyin hovuzlar loyqaga to‘lgan, choyxona atrofiga nihol qadash kerak edi.'],
    ['Jarchi ayolini qizining ismi bilan chaqiradi, chunki…', 'bu o‘zbek oilalarida uchraydigan hurmat va andisha bilan bog‘liq qadriyat edi.'],
    ['Yodgor bobo Kenjaga qarab turib uni ko‘rmasdi, chunki…', 'u umrning o‘tkinchiligi va avlodlar almashinuvi haqidagi chuqur o‘yga botgan edi.'],
    ['Yodgor chol beixtiyor titrab ketdi, chunki…', 'qurigan tut unga qarilikni, yangi nihol esa yosh avlodni eslatdi.']
  ];

  const evidenceSentences = [
    { text: 'Yodgor bobo qishloqning jarchisi edi.', kind: 'fact' },
    { text: 'Boboqul mahalla oqsoqoli edi.', kind: 'fact' },
    { text: 'Tojik yigit otni o‘g‘irlab ketmoqchi edi.', kind: 'opinion' },
    { text: 'Mahalla ahli oqsoqolni ko‘p xushlamas edi.', kind: 'opinion' },
    { text: 'Fayzi uloqchi otini yo‘qotib qo‘ydi.', kind: 'fact' }
  ];

  const state = {
    started: false,
    current: 0,
    step: 0,
    unlocked: 0,
    completed: new Set(),
    sound: true,
    quizScore: 0,
    quizAnswered: new Set(),
    selectedMatch: null,
    selectedDrag: null,
    timerSeconds: 60,
    timerId: null,
    votes: [0, 0, 0],
    spellSolved: new Set()
  };

  const els = {
    welcome: $('#welcome'), journey: $('#journey'), stations: $('#stations'), start: $('#startButton'),
    about: $('#aboutButton'), worldBg: $('#worldBg'), robotWrap: $('#robotWrap'), speech: $('#speech'),
    shell: $('#activityShell'), panel: $('#activityPanel'), content: $('#activityContent'), title: $('#activityTitle'),
    kicker: $('#activityKicker'), next: $('#nextStep'), back: $('#backStep'), close: $('#closeActivity'),
    miniProgress: $('#miniProgress'), meterFill: $('#meterFill'), stageCount: $('#stageCount'), stageLabel: $('#stageLabel'),
    mapButton: $('#mapButton'), timerButton: $('#timerButton'), timerText: $('#timerText'), sound: $('#soundButton'),
    fullscreen: $('#fullscreenButton'), help: $('#helpButton'), reset: $('#resetButton'), infoDialog: $('#infoDialog'), helpDialog: $('#helpDialog'),
    toast: $('#toast'), canvas: $('#confettiCanvas')
  };

  function init() {
    restoreProgress();
    renderStations();
    bindGlobalEvents();
    updateMeter();
  }

  function bindGlobalEvents() {
    els.start.addEventListener('click', startJourney);
    els.about.addEventListener('click', () => els.infoDialog.showModal());
    els.help.addEventListener('click', () => els.helpDialog.showModal());
    els.reset.addEventListener('click', () => {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('hashar-progress');
      location.reload();
    });
    $$('[data-dialog-close]').forEach(btn => btn.addEventListener('click', () => btn.closest('dialog').close()));
    els.close.addEventListener('click', closeActivity);
    els.mapButton.addEventListener('click', () => state.started ? closeActivity() : null);
    els.next.addEventListener('click', nextStep);
    els.back.addEventListener('click', previousStep);
    els.timerButton.addEventListener('click', toggleTimer);
    els.sound.addEventListener('click', toggleSound);
    els.fullscreen.addEventListener('click', toggleFullscreen);
    document.addEventListener('keydown', handleKeys);
    document.addEventListener('fullscreenchange', () => els.fullscreen.textContent = document.fullscreenElement ? '⊡' : '⛶');
  }

  function startJourney() {
    state.started = true;
    els.welcome.hidden = true;
    els.journey.hidden = false;
    els.worldBg.classList.add('pan');
    els.robotWrap.classList.add('map-mode');
    renderStations();
    moveRobot();
    playTone(520, .08);
  }

  function stationLift(index) {
    return index % 2 ? -48 : 0;
  }

  function renderStations() {
    els.stations.innerHTML = stations.map((s, i) => {
      const status = state.completed.has(i) ? 'done' : i === state.unlocked ? 'current' : '';
      const disabled = i > state.unlocked ? 'disabled' : '';
      const lift = `${stationLift(i)}px`;
      return `<button class="station ${status}" style="--lift:${lift}" data-station="${i}" ${disabled} aria-label="${i + 1}-bekat: ${s.label}">
        <span class="station-orb">${state.completed.has(i) ? '✓' : s.icon}</span><small>${i + 1}</small><b>${s.label}</b>
      </button>`;
    }).join('');
    $$('.station', els.stations).forEach(btn => btn.addEventListener('click', () => openStation(Number(btn.dataset.station))));
  }

  function moveRobot() {
    const lastIndex = stations.length - 1;
    const activeIndex = Math.min(state.unlocked, lastIndex);
    const pct = 11 + (activeIndex / Math.max(1, lastIndex)) * 78;
    els.robotWrap.style.setProperty('--robot-x', `${pct}%`);
    els.robotWrap.style.setProperty('--robot-y', `${stationLift(activeIndex)}px`);
    els.robotWrap.classList.toggle('near-right', pct > 72);
    els.speech.textContent = stations[activeIndex].speech;
  }

  function openStation(index) {
    if (index > state.unlocked) return;
    state.current = index;
    state.step = 0;
    stopTimer();
    els.shell.hidden = false;
    els.worldBg.style.filter = 'blur(4px) saturate(.8)';
    renderActivity();
    playTone(440 + index * 25, .07);
  }

  function closeActivity() {
    stopTimer();
    els.shell.hidden = true;
    els.worldBg.style.filter = '';
    renderStations();
    moveRobot();
  }

  function renderActivity() {
    const station = stations[state.current];
    els.kicker.textContent = `${state.current + 1}-bekat • ${state.step + 1}/${station.steps}`;
    els.title.textContent = station.title;
    els.back.disabled = state.step === 0;
    els.back.style.opacity = state.step === 0 ? '.45' : '1';
    els.next.querySelector('span').textContent = state.step === station.steps - 1 ? (state.current === stations.length - 1 ? 'Xaritaga qaytish' : 'Bekatni yakunlash') : 'Davom etamiz';
    els.next.querySelector('i').textContent = state.step === station.steps - 1 ? '✓' : '→';
    els.miniProgress.innerHTML = Array.from({ length: station.steps }, (_, i) => `<i class="${i === state.step ? 'active' : ''}"></i>`).join('');
    resetTimerForType(station.type);
    els.content.classList.toggle('no-scroll', station.type === 'finale');
    els.content.scrollTop = 0;
    els.panel.style.animation = 'none';
    void els.panel.offsetWidth;
    els.panel.style.animation = '';
    renderByType(station.type);
  }

  function renderByType(type) {
    const renderers = { intro: renderIntro, story: renderStory, vocab: renderVocab, quiz: renderQuiz, idea: renderIdea, standard: renderStandard, reveal: renderReveal, spelling: renderSpelling, evidence: renderEvidence, summary: renderSummary, finale: renderFinale };
    renderers[type]();
  }

  function renderIntro() {
    if (state.step === 0) {
      els.content.innerHTML = `<div class="hero-task">
        <div><span class="eyebrow">Suhbat</span><h3 class="big-question">Qaysi odatni qadriyat deb atash mumkin?</h3>
          <p class="lead">Kichiklar kattalarni hurmat qiladi, kattalar kichiklarga g‘amxo‘rlik ko‘rsatadi. Bu odat hayotimizda qanday ko‘rinadi?</p>
          <div class="prompt-card"><b>Sinf bilan fikrlashing</b>Jamiyatda ko‘pchilik amal qiladigan va avloddan avlodga o‘tadigan yana qanday odatlarni bilasiz?</div>
          <div class="choice-row"><button class="choice-chip">Hurmat</button><button class="choice-chip">Hamjihatlik</button><button class="choice-chip">Mehmondo‘stlik</button><button class="choice-chip">Mehr-oqibat</button></div>
        </div><img src="assets/qadriyat-suhbati.jpeg" alt="Kattalarga joy berish haqida suhbatlashayotgan bolalar"></div>`;
    } else {
      els.content.innerHTML = `<div class="discussion-stage"><div><span class="eyebrow">Tasavvur qiling</span><h3>“Milliy qadriyatlar” nomli filmni siz suratga olyapsiz.</h3><p>Filmda qaysi qadriyat bosh mavzu bo‘lardi? Nima uchun aynan shu qadriyat?</p><div class="thinking-dots"><i></i><i></i><i></i></div><span class="talk-token">🎬 3 ta fikrni eshitamiz</span></div></div>`;
    }
    bindChoiceChips();
  }

  function renderStory() {
    const page = story[state.step];
    els.content.innerHTML = `<div class="story-layout">
      <div class="story-visual"><img src="${page.image}" alt="Hikoya sahnasiga oid rasm"><div class="story-quote">${page.quote}</div></div>
      <div class="story-copy"><span class="eyebrow">Hikoya • ${state.step + 1}-lavha</span><h3>${page.title}</h3>${page.html}</div>
    </div>`;
  }

  function renderVocab() {
    const shuffled = [...vocabPairs].sort((a,b) => a[0].localeCompare(b[0], 'uz'));
    els.content.innerHTML = `<div class="game-heading"><h3>So‘z bilan ma’noni uchrashtiring</h3><p>Avval so‘zni, so‘ng uning izohini bosing. Barcha juftlikni toping.</p></div>
      <div class="match-grid"><div class="word-list">${vocabPairs.map((p,i) => `<button class="match-item" data-match="${i}" data-side="word"><b>${p[0]}</b></button>`).join('')}</div>
      <div class="meaning-list">${shuffled.map(p => { const i = vocabPairs.findIndex(v => v[0] === p[0]); return `<button class="match-item" data-match="${i}" data-side="meaning">${p[1]}</button>`; }).join('')}</div></div>
      <p class="sort-score" id="matchScore">0 / ${vocabPairs.length} juftlik topildi</p>`;
    let matched = new Set();
    $$('.match-item', els.content).forEach(item => item.addEventListener('click', () => {
      if (item.classList.contains('matched')) return;
      const selected = $('.match-item.selected', els.content);
      if (!selected) { item.classList.add('selected'); return; }
      if (selected.dataset.side === item.dataset.side) { selected.classList.remove('selected'); item.classList.add('selected'); return; }
      if (selected.dataset.match === item.dataset.match) {
        const id = item.dataset.match; matched.add(id);
        $$(`.match-item[data-match="${id}"]`, els.content).forEach(x => { x.classList.remove('selected'); x.classList.add('matched'); });
        $('#matchScore').textContent = `${matched.size} / ${vocabPairs.length} juftlik topildi`;
        playTone(680, .08);
        if (matched.size === vocabPairs.length) celebrate('So‘z xazinasi ochildi!');
      } else { selected.classList.remove('selected'); item.classList.add('wrong-drop'); setTimeout(() => item.classList.remove('wrong-drop'), 450); playTone(190, .1); }
    }));
  }

  function renderQuiz() {
    const item = quiz[state.step];
    const answered = state.quizAnswered.has(state.step);
    els.content.innerHTML = `<div class="quiz-shell"><div class="quiz-top"><span class="eyebrow">Savol ${state.step + 1} / ${quiz.length}</span><div class="quiz-score"><span>To‘g‘ri: ${state.quizScore}</span></div></div>
      <div class="question-card"><h3>${item.q}</h3><div class="answers">${item.a.map((a,i) => `<button class="answer ${answered && i === item.correct ? 'correct' : ''}" data-answer="${i}" ${answered ? 'disabled' : ''}>${String.fromCharCode(65 + i)}. ${a}</button>`).join('')}</div>
      <div class="feedback">${answered ? item.why : 'Javobni sinf bilan kelishib tanlang.'}</div></div></div>`;
    $$('.answer', els.content).forEach(btn => btn.addEventListener('click', () => answerQuiz(btn, item)));
  }

  function answerQuiz(btn, item) {
    if (state.quizAnswered.has(state.step)) return;
    const answer = Number(btn.dataset.answer);
    if (answer === item.correct) {
      btn.classList.add('correct'); state.quizScore++; playTone(740, .1); burst(18);
      $('.feedback', els.content).textContent = `To‘g‘ri! ${item.why}`;
    } else {
      btn.classList.add('wrong'); $$(`.answer`, els.content)[item.correct].classList.add('correct'); playTone(170, .13);
      $('.feedback', els.content).textContent = `Dalilga qaytamiz: ${item.why}`;
    }
    state.quizAnswered.add(state.step);
    $$('.answer', els.content).forEach(b => b.disabled = true);
    $('.quiz-score span', els.content).textContent = `To‘g‘ri: ${state.quizScore}`;
  }

  function renderIdea() {
    if (state.step === 0) {
      els.content.innerHTML = `<div class="discussion-stage"><div><span class="eyebrow">2.3-topshiriq</span><h3>“Hashar” hikoyasi aslida nima haqida?</h3><p>Faqat hovuz tozalash haqidami? Yoki inson umri, avlodlar almashinuvi, hamjihatlik va xotira haqida hammi?</p><div class="prompt-card"><b>Bir jumlalik chaqiriq</b>“Menimcha, hikoyaning bosh g‘oyasi — …, chunki matnda …” qolipi bilan fikr bildiring.</div><span class="talk-token">⏱ 90 soniya • Juftlikda muhokama</span></div></div>`;
    } else {
      const names = ['Bir kunlik hashar', 'Avlodlar almashinuvi', 'Jarchining bir kuni'];
      els.content.innerHTML = `<div class="game-heading"><span class="eyebrow">2.4-topshiriq</span><h3>Hikoyaga yangi sarlavha tanlang</h3><p>Har bir nomni matndagi qaysi jumla himoya qila olishini ayting, keyin ovoz bering.</p></div>
        <div class="vote-grid">${names.map((n,i) => `<button class="vote-card" data-vote="${i}" style="--vote:${Math.min(100,state.votes[i]*12)}%"><b>${n}</b><span>${state.votes[i]} ovoz</span></button>`).join('')}</div>`;
      $$('.vote-card', els.content).forEach(card => card.addEventListener('click', () => { state.votes[card.dataset.vote]++; playTone(570, .06); renderIdea(); }));
    }
  }

  function renderStandard() {
    const shuffled = [...standardPairs].sort(() => .5 - Math.random());
    els.content.innerHTML = `<div class="game-heading"><span class="eyebrow">2.5-topshiriq</span><h3>So‘zlashuvdan adabiy tilga</h3><p>Chapdagi shaklni bosing, so‘ng unga mos adabiy shaklni toping.</p></div>
      <div class="match-grid"><div class="word-list">${standardPairs.map((p,i) => `<button class="match-item" data-match="${i}" data-side="word"><b>${p[0]}</b></button>`).join('')}</div>
      <div class="meaning-list">${shuffled.map(p => { const i=standardPairs.findIndex(v=>v[0]===p[0]); return `<button class="match-item" data-match="${i}" data-side="meaning"><b>${p[1]}</b></button>`; }).join('')}</div></div><p class="sort-score" id="matchScore">0 / ${standardPairs.length} so‘z sayqallandi</p>`;
    let matched = new Set();
    $$('.match-item', els.content).forEach(item => item.addEventListener('click', () => {
      const selected = $('.match-item.selected', els.content);
      if (!selected) return item.classList.add('selected');
      if (selected.dataset.side === item.dataset.side) { selected.classList.remove('selected'); return item.classList.add('selected'); }
      if (selected.dataset.match === item.dataset.match) {
        matched.add(item.dataset.match); $$(`.match-item[data-match="${item.dataset.match}"]`, els.content).forEach(x => { x.classList.remove('selected'); x.classList.add('matched'); });
        $('#matchScore').textContent = `${matched.size} / ${standardPairs.length} so‘z sayqallandi`; playTone(700, .07);
        if (matched.size === standardPairs.length) celebrate('Adabiy til sandig‘i to‘ldi!');
      } else { selected.classList.remove('selected'); item.classList.add('wrong-drop'); setTimeout(()=>item.classList.remove('wrong-drop'),400); playTone(180,.1); }
    }));
  }

  function renderReveal() {
    els.content.innerHTML = `<div class="game-heading"><span class="eyebrow">2.7-topshiriq</span><h3>Gapni sinf davom ettirsin</h3><p>Fikr aytilgach, namunaviy javobni ochib solishtiring.</p></div><div class="reveal-list">${causeRows.map((r,i) => `<div class="reveal-row"><span class="num">${i+1}</span><p>${r[0]}</p><button data-reveal="${i}">Javobni ochish</button><div class="reveal-answer" id="reveal-${i}" hidden>${r[1]}</div></div>`).join('')}</div>`;
    $$('[data-reveal]', els.content).forEach(btn => btn.addEventListener('click', () => { const answer=$(`#reveal-${btn.dataset.reveal}`); answer.hidden=!answer.hidden; btn.textContent=answer.hidden?'Javobni ochish':'Javobni yopish'; playTone(510,.05); }));
  }

  function renderSpelling() {
    const pairs = [
      { options: ['ma’raka', 'maraka'], correct: 0 },
      { options: ['oqsaqol', 'oqsoqol'], correct: 1 },
      { options: ['suyunchi', 'suyinchi'], correct: 0 },
      { options: ['kuyov', 'kiyov'], correct: 0 },
      { options: ['tanxo', 'tanho'], correct: 1 }
    ];
    els.content.innerHTML = `<div class="game-heading"><span class="eyebrow">2.8-topshiriq • O‘yin</span><h3>Imlo savatini to‘ldiring</h3><p>Har juftlikdagi to‘g‘ri yozilgan so‘zni tanlang. Xato tanlovni o‘yin o‘zi qaytaradi.</p></div>
      <div class="spell-grid">${pairs.map((p,i)=>`<div class="spell-pair" data-pair="${i}">${p.options.map((word,optionIndex)=>`<button data-good="${optionIndex === p.correct}">${word}</button>`).join('')}</div>`).join('')}</div><p class="sort-score" id="spellScore">${state.spellSolved.size} / 5 so‘z savatda</p>`;
    $$('.spell-pair button', els.content).forEach(btn => btn.addEventListener('click', () => {
      const pair = btn.closest('.spell-pair'); const id = Number(pair.dataset.pair); if(state.spellSolved.has(id)) return;
      if(btn.dataset.good==='true') { btn.classList.add('good'); state.spellSolved.add(id); pair.querySelectorAll('button').forEach(b=>b.disabled=true); $('#spellScore').textContent=`${state.spellSolved.size} / 5 so‘z savatda`; playTone(720,.08); if(state.spellSolved.size===5) celebrate('Imlo savati to‘ldi!'); }
      else { btn.classList.add('bad'); playTone(160,.1); setTimeout(()=>btn.classList.remove('bad'),500); }
    }));
    state.spellSolved.forEach(id => { const pair=$(`.spell-pair[data-pair="${id}"]`,els.content); if(pair){ pair.querySelector('[data-good="true"]').classList.add('good'); pair.querySelectorAll('button').forEach(b=>b.disabled=true); }});
  }

  function renderEvidence() {
    if(state.step===0) {
      const lines = [
        '“…tusi qora, peshonasida oqi bor govmishni ko‘rgan bormi, hooo, aytganga suyunchisi bor.”',
        '“Ha, Yodgor, eshagingga qarab, uloqqa chiqqan deb o‘ylayapsanmi?”',
        '“Tursuntosh, bu yoqqa qara.”',
        '“Sumalakka ishlatamiz.”',
        '“…tomorqadan bebosh buzoqchani sudrab chiqib kelayotgan Kenjaga boqib o‘tirardi, ammo uni ko‘rmasdi.”'
      ];
      els.content.innerHTML=`<div class="game-heading"><span class="eyebrow">2.9-topshiriq</span><h3>Jumla nima uchun ishlatilgan?</h3><p>Har bir jumla voqeani xabarlayaptimi, hazil qilyaptimi, qadriyatni ko‘rsatyaptimi yoki yashirin ma’no beryaptimi?</p></div><div class="reveal-list">${lines.map((x,i)=>`<div class="reveal-row"><span class="num">${i+1}</span><p>${x}</p><button class="purpose" data-purpose="${i}">Muhokama qilindi ✓</button></div>`).join('')}</div>`;
      $$('.purpose',els.content).forEach(b=>b.addEventListener('click',()=>{b.textContent='Belgilandi ✓';b.style.background='#e4faed';playTone(550,.05);}));
    } else {
      renderDragSort();
    }
  }

  function renderDragSort() {
    els.content.innerHTML = `<div class="game-heading"><span class="eyebrow">2.10-topshiriq • O‘yin</span><h3>Fakt va fikr tarozisi</h3><p>Jumlalarni mos tomonga sudrang. Sichqoncha bo‘lmasa: kartani, keyin savatni bosing.</p></div>
      <div class="drag-bank" id="dragBank">${evidenceSentences.map((x,i)=>`<div class="drag-card" draggable="true" tabindex="0" data-id="${i}" data-kind="${x.kind}">${x.text}</div>`).join('')}</div>
      <div class="drop-grid"><div class="drop-zone" data-zone="fact"><h4>FAKT • Matnda tasdiqlangan</h4></div><div class="drop-zone" data-zone="opinion"><h4>FIKR • Taxmin yoki baho</h4></div></div><p class="sort-score" id="sortScore">0 / ${evidenceSentences.length} jumla joylandi</p>`;
    bindDragSort();
  }

  function bindDragSort() {
    let placed = 0;
    const cards = $$('.drag-card', els.content); const zones = $$('.drop-zone', els.content);
    cards.forEach(card => {
      card.addEventListener('dragstart', e => { state.selectedDrag=card; card.classList.add('dragging'); e.dataTransfer.setData('text/plain', card.dataset.id); });
      card.addEventListener('dragend', () => card.classList.remove('dragging'));
      card.addEventListener('click', () => { cards.forEach(c=>c.classList.remove('selected')); state.selectedDrag=card; card.classList.add('selected'); showToast('Endi mos savatni bosing'); });
      card.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){e.preventDefault();card.click();} });
    });
    zones.forEach(zone => {
      zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('over'); });
      zone.addEventListener('dragleave', () => zone.classList.remove('over'));
      zone.addEventListener('drop', e => { e.preventDefault(); zone.classList.remove('over'); const card=$(`.drag-card[data-id="${e.dataTransfer.getData('text/plain')}"]`,els.content); tryPlace(card,zone); });
      zone.addEventListener('click', () => { if(state.selectedDrag) tryPlace(state.selectedDrag,zone); });
    });
    function tryPlace(card, zone) {
      if(!card || card.parentElement.classList.contains('drop-zone')) return;
      if(card.dataset.kind===zone.dataset.zone) { zone.appendChild(card); card.draggable=false; card.classList.remove('selected'); state.selectedDrag=null; placed++; $('#sortScore').textContent=`${placed} / ${evidenceSentences.length} jumla joylandi`; playTone(700,.07); if(placed===evidenceSentences.length) celebrate('Tarozida hammasi o‘z joyini topdi!'); }
      else { zone.classList.add('wrong-drop'); setTimeout(()=>zone.classList.remove('wrong-drop'),450); playTone(160,.1); }
    }
  }

  function renderSummary() {
    if (state.step === 0) {
      els.content.innerHTML = `<div class="discussion-stage"><div><span class="eyebrow">2.11-topshiriq</span><h3>“Hashar” hikoyasidan qanday xulosa chiqardingiz?</h3><p>Xulosangizni bir xat-boshida yozing va o‘qib bering.</p><div class="prompt-card"><b>Fikrni jamlang</b>Xulosangizda hikoyadagi bir voqea bilan o‘z hayotingizdagi bir qadriyatni bog‘lang.</div><span class="talk-token">✎ Avval o‘ylang, so‘ng yozing</span></div></div>`;
    } else {
      els.content.innerHTML = `<div class="discussion-stage homework-stage"><div><span class="eyebrow">2.12-topshiriq • Uyga vazifa</span><h3>Sinonimlar orasidagi ma’no nozikligini toping</h3><div class="homework"><h4>Uyga vazifa</h4><p>Bir-biriga ma’nodosh bo‘lgan 5 ta sinonimik qatorni daftaringizga yozib, ma’nosidagi farqlarni izohlang.</p><div class="synonym-sample"><b>Namuna</b><span>aldamoq</span><span>laqillatmoq</span><span>avramoq</span></div><p class="small-note">Har bir qator uchun izoh, misol va so‘zlar o‘rtasidagi farqni ko‘rsating.</p></div></div></div>`;
    }
  }

  function renderFinale() {
    els.worldBg.className='world-bg evening';
    els.content.innerHTML = `<div class="finale"><div><span class="eyebrow">Bugungi yo‘l yakuni</span><h3>Birgalikda qilingan ish — obodlik. Birgalikda topilgan fikr — bilim.</h3><p class="lead">Sinf nomidan bir jumlalik xulosa ayting: “Hashar hikoyasi menga … ni anglatdi”.</p></div>
      <div class="badge-stack"><div class="achievement-badge"><div><span>★</span><b>Hashar<br>yakunlandi!</b><small>Hamjihat sinf</small></div></div></div></div>`;
    burst(120);
  }

  function nextStep() {
    const station = stations[state.current];
    if (state.step < station.steps - 1) { state.step++; stopTimer(); renderActivity(); playTone(510,.05); return; }
    completeStation();
  }

  function previousStep() {
    if(state.step>0){state.step--;stopTimer();renderActivity();playTone(390,.05);}
  }

  function completeStation() {
    state.completed.add(state.current);
    if(state.current < stations.length - 1) {
      state.unlocked = Math.max(state.unlocked, state.current + 1);
      state.current = state.unlocked;
      saveProgress(); burst(45); closeActivity(); renderStations(); moveRobot(); updateMeter(); showToast('Bekat bajarildi — yo‘l davom etadi!');
    } else {
      saveProgress(); closeActivity(); updateMeter(); showToast('Bugungi hashar va dars yakunlandi!');
    }
  }

  function updateMeter() {
    const done = state.completed.size;
    els.meterFill.style.width = `${done / stations.length * 100}%`;
    els.stageCount.textContent = `${done} / ${stations.length}`;
    els.stageLabel.textContent = done === stations.length ? 'Dars yakunlandi' : stations[state.unlocked].label;
  }

  function bindChoiceChips() {
    $$('.choice-chip', els.content).forEach(chip=>chip.addEventListener('click',()=>{chip.classList.toggle('selected');playTone(520,.04);}));
  }

  function resetTimerForType(type) {
    stopTimer();
    state.timerSeconds = ['intro','idea','reveal','evidence','summary','finale'].includes(type) ? 90 : 60;
    updateTimerText();
  }

  function toggleTimer() {
    if(state.timerId) return stopTimer();
    els.timerButton.classList.add('running');
    state.timerId = setInterval(()=>{
      state.timerSeconds--; updateTimerText();
      if(state.timerSeconds<=10) els.timerButton.classList.add('danger');
      if(state.timerSeconds<=0){stopTimer(false);playTone(880,.35);showToast('Vaqt tugadi — fikrlarni jamlaymiz!');}
    },1000);
  }

  function stopTimer(resetStyle=true) {
    clearInterval(state.timerId); state.timerId=null;
    if(resetStyle) els.timerButton.classList.remove('running','danger');
    else els.timerButton.classList.remove('running');
  }

  function updateTimerText() {
    const m=Math.floor(state.timerSeconds/60); const s=state.timerSeconds%60;
    els.timerText.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  function toggleSound(){state.sound=!state.sound;els.sound.textContent=state.sound?'♫':'♪̸';els.sound.setAttribute('aria-label',state.sound?'Ovozni o‘chirish':'Ovozni yoqish');if(state.sound)playTone(600,.08);}
  async function toggleFullscreen(){try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen();else await document.exitFullscreen();}catch{showToast('Brauzer to‘liq ekran rejimini chekladi');}}
  function handleKeys(e){if($('dialog[open]')||/INPUT|TEXTAREA/.test(e.target.tagName))return;if(e.key==='f'||e.key==='F')toggleFullscreen();if(e.key==='m'||e.key==='M')toggleSound();if(els.shell.hidden)return;if((e.key==='ArrowRight'||e.key===' ')&&!e.target.matches('button')){e.preventDefault();nextStep();}if(e.key==='ArrowLeft'&&!e.target.matches('button'))previousStep();if(e.key==='Escape')closeActivity();}

  let audioContext;
  function playTone(freq,duration){if(!state.sound)return;try{audioContext ||= new (window.AudioContext||window.webkitAudioContext)();const o=audioContext.createOscillator();const g=audioContext.createGain();o.type='sine';o.frequency.value=freq;g.gain.setValueAtTime(.05,audioContext.currentTime);g.gain.exponentialRampToValueAtTime(.001,audioContext.currentTime+duration);o.connect(g).connect(audioContext.destination);o.start();o.stop(audioContext.currentTime+duration);}catch{}}
  function showToast(message){els.toast.textContent=message;els.toast.classList.add('show');clearTimeout(showToast.id);showToast.id=setTimeout(()=>els.toast.classList.remove('show'),2600);}
  function celebrate(message){showToast(message);burst(65);}

  function burst(count=50){
    const ctx=els.canvas.getContext('2d');const dpr=Math.min(devicePixelRatio||1,2);els.canvas.width=innerWidth*dpr;els.canvas.height=innerHeight*dpr;ctx.scale(dpr,dpr);
    const colors=['#0ba49e','#ffbd45','#ef8247','#2b82c9','#72c979','#ffffff'];
    const bits=Array.from({length:count},()=>({x:innerWidth/2+(Math.random()-.5)*180,y:innerHeight*.32,vx:(Math.random()-.5)*12,vy:-Math.random()*10-3,g:.22+Math.random()*.12,r:3+Math.random()*5,c:colors[Math.floor(Math.random()*colors.length)],a:1,rot:Math.random()*6}));
    let frame=0;function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);bits.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.rot+=.15;p.a-=.009;ctx.save();ctx.globalAlpha=Math.max(0,p.a);ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.fillStyle=p.c;ctx.fillRect(-p.r,-p.r/2,p.r*2,p.r);ctx.restore();});if(++frame<120)requestAnimationFrame(draw);else ctx.clearRect(0,0,innerWidth,innerHeight);}draw();
  }

  function saveProgress(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify({unlocked:state.unlocked,completed:[...state.completed]}));}catch{}}
  function restoreProgress(){try{const saved=JSON.parse(localStorage.getItem(STORAGE_KEY));if(saved){const lastIndex=stations.length-1;state.unlocked=Math.min(Number(saved.unlocked)||0,lastIndex);state.current=state.unlocked;state.completed=new Set((saved.completed||[]).filter(x=>x>=0&&x<stations.length));}}catch{}}

  init();
})();
