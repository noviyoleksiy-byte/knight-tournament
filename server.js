// express server for knight tournament
// we run tv board and host on port 3000
import express from 'express';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';
import {
SECRET_TITLES,
MASTER_KNIGHTS
} from './titles.js';

var __filename =
fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);

var app = express();
var PORT = process.env.PORT || 3000;

// parse incoming json payloads
// we use express built in parser
app.use(express.json());

// serve static files from public folder
// we expose tv and host web apps
app.use(
express.static(
path.join(__dirname, 'public')
)
);

var DATA_DIR =
path.join(__dirname, 'data');
var ROSTER_FILE =
path.join(DATA_DIR, 'pub_roster.json');
var STATE_FILE =
path.join(DATA_DIR, 'state.json');

// make data directory if missing
// we check existence before writing
if (!fs.existsSync(DATA_DIR)) {
try {
fs.mkdirSync(DATA_DIR);
} catch (e) {
console.log('dir err:', e);
}
}

// 10 horse coats with base joust stats
// speed is pass1 power stamina is pass3
var HORSES = [
{
id: 0,
name: 'Вороной',
speed: 88,
stamina: 92,
balance: 84
},
{
id: 1,
name: 'Белоснежный',
speed: 80,
stamina: 85,
balance: 95
},
{
id: 2,
name: 'Гнедой',
speed: 85,
stamina: 86,
balance: 86
},
{
id: 3,
name: 'Медно-рыжий',
speed: 96,
stamina: 72,
balance: 78
},
{
id: 4,
name: 'Серый в яблоках',
speed: 82,
stamina: 88,
balance: 91
},
{
id: 5,
name: 'Буланый',
speed: 84,
stamina: 84,
balance: 90
},
{
id: 6,
name: 'Чубарый',
speed: 92,
stamina: 79,
balance: 82
},
{
id: 7,
name: 'Караковый',
speed: 78,
stamina: 98,
balance: 88
},
{
id: 8,
name: 'Пегий',
speed: 86,
stamina: 83,
balance: 89
},
{
id: 9,
name: 'Голубая чалая',
speed: 81,
stamina: 87,
balance: 94
}
];

// 12 shield shapes and heraldic blazons
// some resist lances some suit melee
var SHIELDS = [
{
id: 0,
name: 'Каплевидный (Крест)',
joustDef: 92,
meleeDef: 82,
durability: 88
},
{
id: 1,
name: 'Треугольный (Шеврон)',
joustDef: 86,
meleeDef: 86,
durability: 85
},
{
id: 2,
name: 'Круглый (Умбон)',
joustDef: 76,
meleeDef: 92,
durability: 76
},
{
id: 3,
name: 'Башенный (Столбы)',
joustDef: 96,
meleeDef: 76,
durability: 96
},
{
id: 4,
name: 'Ромбовидный (Ромб)',
joustDef: 84,
meleeDef: 88,
durability: 82
},
{
id: 5,
name: 'Турнирный тарч (Выемка)',
joustDef: 94,
meleeDef: 80,
durability: 90
},
{
id: 6,
name: 'Полукруглый (Косой крест)',
joustDef: 87,
meleeDef: 87,
durability: 86
},
{
id: 7,
name: 'Крылатый (Пояс)',
joustDef: 89,
meleeDef: 85,
durability: 87
},
{
id: 8,
name: 'Каплевидный (Зубцы)',
joustDef: 93,
meleeDef: 81,
durability: 91
},
{
id: 9,
name: 'Овальный (Три кольца)',
joustDef: 81,
meleeDef: 91,
durability: 83
},
{
id: 10,
name: 'Стрельчатый (Звезда)',
joustDef: 88,
meleeDef: 86,
durability: 86
},
{
id: 11,
name: 'Шестигранный (Шахматы)',
joustDef: 91,
meleeDef: 84,
durability: 89
}
];

// 12 one-handed melee weapons for shield
// crush breaks shields speed hits fast
var WEAPONS = [
{
id: 0,
name: 'Рыцарский меч',
power: 88,
speed: 88,
crush: 80
},
{
id: 1,
name: 'Боевой топор',
power: 92,
speed: 80,
crush: 95
},
{
id: 2,
name: 'Моргенштерн',
power: 90,
speed: 81,
crush: 92
},
{
id: 3,
name: 'Кованая булава',
power: 89,
speed: 84,
crush: 91
},
{
id: 4,
name: 'Вороний клевец',
power: 91,
speed: 83,
crush: 94
},
{
id: 5,
name: 'Тяжёлый палаш',
power: 87,
speed: 89,
crush: 82
},
{
id: 6,
name: 'Кистень на цепи',
power: 94,
speed: 75,
crush: 92
},
{
id: 7,
name: 'Боевой молот',
power: 95,
speed: 77,
crush: 96
},
{
id: 8,
name: 'Шестопёр',
power: 88,
speed: 85,
crush: 90
},
{
id: 9,
name: 'Кривая сабля',
power: 86,
speed: 92,
crush: 78
},
{
id: 10,
name: 'Колющий кончар',
power: 85,
speed: 94,
crush: 76
},
{
id: 11,
name: 'Широкий фальшион',
power: 93,
speed: 82,
crush: 88
}
];

// pseudo random helper from numeric seed
// we get deterministic pub variations
function seededHash(seed, salt) {
var x =
Math.sin(seed * 997 + salt * 131) * 10000;
return x - Math.floor(x);
}

// pick 24 distinct knights from 216 pool
// different pubs get different knights
function selectPubTemplates(seed) {
var picked = [];
var usedFirst = {};
var usedTitles = {};

for (var c = 0; c < 6; c++) {
// pick 4 distinct helmets for color c
var helms = [0, 1, 2, 3, 4, 5];
for (var k = 0; k < 4; k++) {
var hPos = Math.floor(
seededHash(seed, c * 41 + k * 13 + 7) *
helms.length
);
var h = helms[hPos];
helms.splice(hPos, 1);

var baseS = Math.floor(
seededHash(seed, c * 59 + h * 19 + k * 5) * 6
);
var chosen = null;

for (var step = 0; step < 6; step++) {
var s = (baseS + step) % 6;
var cand =
MASTER_KNIGHTS[c * 36 + h * 6 + s];
if (
!usedFirst[cand.first] &&
!usedTitles[cand.secretTitle]
) {
chosen = cand;
break;
}
}
if (!chosen) {
chosen =
MASTER_KNIGHTS[c * 36 + h * 6 + baseS];
}

usedFirst[chosen.first] = true;
usedTitles[chosen.secretTitle] = true;
picked.push(chosen);
}
}
return picked;
}

// build initial 24 knight pub roster
// we mix 70 percent base and 30 pub seed
function createPubData(customSeed) {
var seed =
customSeed ||
Math.floor(100 + Math.random() * 899);
var templates = selectPubTemplates(seed);
var roster = [];

for (
var i = 0;
i < templates.length;
i++
) {
var tpl = templates[i];
var hBias =
Math.floor(
seededHash(seed, i * 7 + 1) * 24
) - 10;
var mBias =
Math.floor(
seededHash(seed, i * 11 + 2) * 24
) - 10;
var gBias =
Math.floor(
seededHash(seed, i * 17 + 3) * 24
) - 10;

var favWeapon =
Math.floor(
seededHash(seed, i * 23 + 5) * 12
) % 12;
var favHorse =
Math.floor(
seededHash(seed, i * 31 + 9) * 10
) % 10;
var shIdx = tpl.shieldIdx % SHIELDS.length;

roster.push({
id: 'K' + (i + 1),
poolIndex: tpl.poolIndex,
name: tpl.name,
secretTitle: tpl.secretTitle,
colorIdx: tpl.colorIdx,
helmIdx: tpl.helmIdx,
shieldIdx: shIdx,
shieldName: SHIELDS[shIdx].name,
favWeaponIdx: favWeapon,
favHorseIdx: favHorse,
joustSkill: 78 + hBias,
meleeSkill: 78 + mBias,
gritSkill: 78 + gBias,
isRare: i >= 18,
wins: 0,
losses: 0,
titles: 0
});
}

return {
pubSeed: seed,
tournamentNumber: 0,
lastChampionId: null,
lastFinalistId: null,
roster: roster,
tables: [
{ id: 1, name: 'Стол №1', balance: 500 },
{ id: 2, name: 'Стол №2', balance: 500 },
{ id: 3, name: 'Стол №3', balance: 500 },
{
id: 4,
name: 'Барная стойка',
balance: 500
}
],
prizes: [
{
id: 1,
title: 'Чесночные гренки',
cost: 300
},
{
id: 2,
title: 'Бокал пенного',
cost: 600
},
{
id: 3,
title: 'Сет из 4 шотов',
cost: 1200
},
{
id: 4,
title: 'Пивная башня',
cost: 2500
}
]
};
}

// load persistent pub roster from disk
// syncs 24 knights from 216 master pool
function loadPubData() {
try {
if (fs.existsSync(ROSTER_FILE)) {
var raw =
fs.readFileSync(ROSTER_FILE, 'utf8');
var parsed = JSON.parse(raw);
if (parsed && parsed.roster) {
var templates = selectPubTemplates(
parsed.pubSeed || 257
);
for (
var i = 0;
i < parsed.roster.length;
i++
) {
var tpl = templates[i];
if (tpl) {
var shIdx =
tpl.shieldIdx % SHIELDS.length;
parsed.roster[i].poolIndex =
tpl.poolIndex;
parsed.roster[i].name = tpl.name;
parsed.roster[i].secretTitle =
tpl.secretTitle;
parsed.roster[i].colorIdx =
tpl.colorIdx;
parsed.roster[i].helmIdx =
tpl.helmIdx;
parsed.roster[i].shieldIdx = shIdx;
parsed.roster[i].shieldName =
SHIELDS[shIdx].name;
}
}
savePubData(parsed);
}
return parsed;
}
} catch (e) {
console.log('read roster err:', e);
}
var fresh = createPubData();
savePubData(fresh);
return fresh;
}

// write pub roster and tables to disk
// we save after every fight and bet
function savePubData(data) {
try {
fs.writeFileSync(
ROSTER_FILE,
JSON.stringify(data, null, 2)
);
} catch (e) {
console.log('save roster err:', e);
}
}

var pubData = loadPubData();

// select 8 fighters from 24 pub roster
// champion and finalist stay to defend
function pickEightKnights() {
var chosen = [];
var usedIds = {};

// keep defending champion and finalist
var champId = pubData.lastChampionId;
var finId = pubData.lastFinalistId;
for (
var i = 0;
i < pubData.roster.length;
i++
) {
var rk = pubData.roster[i];
if (rk.id === champId || rk.id === finId) {
chosen.push(
JSON.parse(JSON.stringify(rk))
);
usedIds[rk.id] = true;
}
}

// fill remaining slots with weighted pool
while (chosen.length < 8) {
var idx = Math.floor(
Math.random() * pubData.roster.length
);
var cand = pubData.roster[idx];
if (usedIds[cand.id]) continue;
if (cand.isRare && Math.random() < 0.55) {
continue;
}
chosen.push(
JSON.parse(JSON.stringify(cand))
);
usedIds[cand.id] = true;
}

// sort by wins so veterans draft first
var draftOrder = chosen.slice().sort(
function (a, b) {
if (b.wins !== a.wins) {
return b.wins - a.wins;
}
return Math.random() - 0.5;
}
);

var availWeapons = [
0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
];
var availHorses = [
0, 1, 2, 3, 4, 5, 6, 7, 8, 9
];

for (var d = 0; d < draftOrder.length; d++) {
var fighter = draftOrder[d];

// 40 percent favorite weapon if on rack
var wPick = -1;
var favPos = availWeapons.indexOf(
fighter.favWeaponIdx
);
if (favPos !== -1 && Math.random() < 0.4) {
wPick = fighter.favWeaponIdx;
availWeapons.splice(favPos, 1);
} else {
var rPos = Math.floor(
Math.random() * availWeapons.length
);
wPick = availWeapons[rPos];
availWeapons.splice(rPos, 1);
}

fighter.weaponIdx = wPick;
fighter.weaponName = WEAPONS[wPick].name;
fighter.hasFavWeapon =
wPick === fighter.favWeaponIdx;

// draft unique horse from 10 coats
var hPos = Math.floor(
Math.random() * availHorses.length
);
var hPick = availHorses[hPos];
availHorses.splice(hPos, 1);

fighter.horseIdx = hPick;
fighter.horseName = HORSES[hPick].name;
fighter.shieldDamage = 0;
fighter.isTired = false;
fighter.stamina = 100;
}

return chosen;
}

// evaluate hidden combat rating for knight
// we combine knight horse shield weapon
function calcPowerScore(k, mode) {
if (!k) return 100;
var horse = HORSES[k.horseIdx] || HORSES[0];
var shield =
SHIELDS[k.shieldIdx] || SHIELDS[0];
var wep =
WEAPONS[k.weaponIdx] || WEAPONS[0];

var score =
k.wins * 4.5 -
k.losses * 2.0 +
k.titles * 7;

if (mode === 'MELEE') {
score +=
k.meleeSkill * 0.65 +
k.gritSkill * 0.45 +
wep.power * 0.45 +
wep.speed * 0.35 +
shield.meleeDef * 0.35;
if (k.hasFavWeapon) score += 14;
} else {
score +=
k.joustSkill * 0.6 +
horse.speed * 0.4 +
horse.stamina * 0.35 +
horse.balance * 0.4 +
shield.joustDef * 0.4 +
k.meleeSkill * 0.25;
if (k.hasFavWeapon) score += 6;
}

// apply live shield damage and fatigue
if (k.shieldDamage === 1) score -= 14;
if (k.shieldDamage >= 2) score -= 32;
if (k.isTired) score -= 18;

return Math.max(30, score);
}

// compute match and outright bookmaker odds
// we shift odds by history and money pool
function updateAllOdds(state) {
if (!state || !state.matches) return;
var curIdx = state.currentMatchIndex;
var curMode =
state.combat && state.combat.mode === 'MELEE'
? 'MELEE'
: 'JOUST';

for (var i = 0; i < state.matches.length; i++) {
var m = state.matches[i];
if (!m.k1 || !m.k2) continue;

var s1 = calcPowerScore(
m.k1,
i === curIdx ? curMode : 'JOUST'
);
var s2 = calcPowerScore(
m.k2,
i === curIdx ? curMode : 'JOUST'
);

var p1 = s1 / (s1 + s2);
p1 = Math.max(0.18, Math.min(0.82, p1));
var p2 = 1 - p1;

// apply money line shift on active match
if (i === curIdx) {
var bet1 = 0;
var bet2 = 0;
var bets = state.activeBets || [];
for (var b = 0; b < bets.length; b++) {
if (bets[b].betType === 'MATCH') {
if (bets[b].knightId === m.k1.id) {
bet1 += bets[b].amount;
} else if (bets[b].knightId === m.k2.id) {
bet2 += bets[b].amount;
}
}
}
var liq = 900;
var w1 = liq * p1 + bet1;
var w2 = liq * p2 + bet2;
p1 = w1 / (w1 + w2);
p2 = 1 - p1;
}

// add bookmaker vig and round nicely
var vig = 1.06;
m.odds1 = Math.max(
1.12,
Math.min(5.8, 1 / (p1 * vig))
).toFixed(2);
m.odds2 = Math.max(
1.12,
Math.min(5.8, 1 / (p2 * vig))
).toFixed(2);
}

// compute outright tournament odds
var alive = state.aliveKnights || [];
var totalScore = 0;
var scores = {};
for (var a = 0; a < alive.length; a++) {
var ak = alive[a];
var sc = calcPowerScore(ak, 'JOUST');
var outBets = 0;
for (
var ob = 0;
ob < state.activeBets.length;
ob++
) {
var bet = state.activeBets[ob];
if (
bet.betType === 'OUTRIGHT' &&
bet.knightId === ak.id
) {
outBets += bet.amount * 0.12;
}
}
scores[ak.id] = sc + outBets;
totalScore += scores[ak.id];
}

for (var u = 0; u < alive.length; u++) {
var uk = alive[u];
var prob =
totalScore > 0
? scores[uk.id] / totalScore
: 0.125;
var rawOdd = 1 / (prob * 1.08);
uk.outrightOdds = Math.max(
1.35,
Math.min(14.0, rawOdd)
).toFixed(2);
}

// sync outright odds into match slots
for (var x = 0; x < state.matches.length; x++) {
var mx = state.matches[x];
for (var y = 0; y < alive.length; y++) {
if (mx.k1 && mx.k1.id === alive[y].id) {
mx.k1.outrightOdds = alive[y].outrightOdds;
}
if (mx.k2 && mx.k2.id === alive[y].id) {
mx.k2.outrightOdds = alive[y].outrightOdds;
}
}
}
}

// create new 8 knight tournament state
// we set up quarterfinals semis and final
function buildNewTournament(existingMode) {
pubData.tournamentNumber += 1;
savePubData(pubData);

var eight = pickEightKnights();
var matches = [
{
id: 0,
stageName: '1/4 ФИНАЛА (МАТЧ 1)',
k1: eight[0],
k2: eight[1],
odds1: 1.9,
odds2: 1.9,
status: 'PENDING',
winnerId: null
},
{
id: 1,
stageName: '1/4 ФИНАЛА (МАТЧ 2)',
k1: eight[2],
k2: eight[3],
odds1: 1.9,
odds2: 1.9,
status: 'PENDING',
winnerId: null
},
{
id: 2,
stageName: '1/4 ФИНАЛА (МАТЧ 3)',
k1: eight[4],
k2: eight[5],
odds1: 1.9,
odds2: 1.9,
status: 'PENDING',
winnerId: null
},
{
id: 3,
stageName: '1/4 ФИНАЛА (МАТЧ 4)',
k1: eight[6],
k2: eight[7],
odds1: 1.9,
odds2: 1.9,
status: 'PENDING',
winnerId: null
},
{
id: 4,
stageName: '1/2 ФИНАЛА (ЗАПАД)',
k1: null,
k2: null,
odds1: null,
odds2: null,
status: 'PENDING',
winnerId: null
},
{
id: 5,
stageName: '1/2 ФИНАЛА (ВОСТОК)',
k1: null,
k2: null,
odds1: null,
odds2: null,
status: 'PENDING',
winnerId: null
},
{
id: 6,
stageName: 'ГРАНД-ФИНАЛ ТУРНИРА',
k1: null,
k2: null,
odds1: null,
odds2: null,
status: 'PENDING',
winnerId: null
}
];

var st = {
version: 1,
pubSeed: pubData.pubSeed,
tournamentNumber: pubData.tournamentNumber,
gameMode: existingMode || 'PUB',
allowLiveBets: true,
tvScreen: 'PARADE',
tournamentStatus: 'ACTIVE',
statusText: 'ПАРАД РЫЦАРЕЙ И ВЫБОР ОРУЖИЯ',
currentMatchIndex: 0,
matches: matches,
aliveKnights: eight,
activeBets: [],
tables: pubData.tables,
prizes: pubData.prizes,
recentPayouts: [],
prizeBannerText: null,
champion: null,
soundToPlay: 'horn',
lastParadeAt: Date.now(),
parade: {
active: true,
currentIndex: 0,
subStep: 'RIDE_TO_RACK',
finished: false,
bonusActive: true
},
combat: {
active: false,
mode: 'JOUST',
pass: 0,
meleeRound: 0,
pausedForBets: false,
finished: false,
winnerSide: null,
unseated1: false,
unseated2: false,
shatterSide: 0,
stepId: 1,
phaseTitle: 'ПОДГОТОВКА К БОЮ',
note: 'Ставки открыты',
bannerTitle: '',
bannerSub: ''
}
};

updateAllOdds(st);
return st;
}

var gameState = buildNewTournament('PUB');

// settle bets and advance winner in bracket
// we pay tables and update eternal roster
function finishCurrentMatch(winnerSide) {
var m =
gameState.matches[
gameState.currentMatchIndex
];
if (!m || m.status === 'DONE') return;

var winK = winnerSide === 1 ? m.k1 : m.k2;
var loseK = winnerSide === 1 ? m.k2 : m.k1;
m.status = 'DONE';
m.winnerId = winK.id;

// update eternal pub roster win records
for (
var r = 0;
r < pubData.roster.length;
r++
) {
var rk = pubData.roster[r];
if (rk.id === winK.id) {
rk.wins += 1;
winK.wins = rk.wins;
} else if (rk.id === loseK.id) {
rk.losses += 1;
loseK.losses = rk.losses;
}
}

// remove loser from alive knights list
var nextAlive = [];
for (
var a = 0;
a < gameState.aliveKnights.length;
a++
) {
if (
gameState.aliveKnights[a].id !== loseK.id
) {
nextAlive.push(gameState.aliveKnights[a]);
}
}
gameState.aliveKnights = nextAlive;

// pay winning match bets to tables
var remainingBets = [];
var payLogs = [];
for (
var b = 0;
b < gameState.activeBets.length;
b++
) {
var bet = gameState.activeBets[b];
if (bet.betType === 'MATCH') {
if (bet.knightId === winK.id) {
var winAmt = Math.round(
bet.amount * bet.odds
);
creditTableById(bet.tableId, winAmt);
payLogs.push(
bet.tableName + ': +' + winAmt
);
}
} else {
remainingBets.push(bet);
}
}
gameState.activeBets = remainingBets;

// advance winner into next bracket slot
var idx = gameState.currentMatchIndex;
var promoted = JSON.parse(
JSON.stringify(winK)
);
promoted.isTired = false;
promoted.stamina = 100;

if (idx === 0) {
gameState.matches[4].k1 = promoted;
} else if (idx === 1) {
gameState.matches[4].k2 = promoted;
} else if (idx === 2) {
gameState.matches[5].k1 = promoted;
} else if (idx === 3) {
gameState.matches[5].k2 = promoted;
} else if (idx === 4) {
gameState.matches[6].k1 = promoted;
} else if (idx === 5) {
gameState.matches[6].k2 = promoted;
} else if (idx === 6) {
// grand final completed reveal secret title
gameState.tournamentStatus = 'FINISHED';
gameState.champion = winK;
pubData.lastChampionId = winK.id;
pubData.lastFinalistId = loseK.id;

for (
var t = 0;
t < pubData.roster.length;
t++
) {
if (pubData.roster[t].id === winK.id) {
pubData.roster[t].titles += 1;
winK.titles = pubData.roster[t].titles;
}
}

// settle outright tournament champion bets
for (
var o = 0;
o < gameState.activeBets.length;
o++
) {
var ob = gameState.activeBets[o];
if (
ob.betType === 'OUTRIGHT' &&
ob.knightId === winK.id
) {
var outWin = Math.round(
ob.amount * ob.odds
);
creditTableById(ob.tableId, outWin);
payLogs.push(
ob.tableName + ' [ТУРНИР]: +' + outWin
);
}
}
gameState.activeBets = [];
}

if (payLogs.length > 0) {
gameState.recentPayouts = payLogs.slice(0, 4);
}
savePubData(pubData);
updateAllOdds(gameState);
}

// add balance to a table by id
// we update both gameState and pubData
function creditTableById(tableId, delta) {
for (
var i = 0;
i < pubData.tables.length;
i++
) {
if (pubData.tables[i].id === tableId) {
pubData.tables[i].balance = Math.max(
0,
pubData.tables[i].balance + delta
);
}
}
gameState.tables = pubData.tables;
}

// run one joust pass or foot melee phase
// we compute shield shatter and unseating
function runNextCombatPhase() {
var m =
gameState.matches[
gameState.currentMatchIndex
];
if (!m || !m.k1 || !m.k2) return;
var c = gameState.combat;

c.stepId += 1;
c.shatterSide = 0;
c.pausedForBets = false;

if (c.mode === 'JOUST') {
c.pass += 1;
c.phaseTitle =
'КОННАЯ СШИБКА ' + c.pass + ' ИЗ 3';

var h1 = HORSES[m.k1.horseIdx];
var h2 = HORSES[m.k2.horseIdx];
var s1 = SHIELDS[m.k1.shieldIdx];
var s2 = SHIELDS[m.k2.shieldIdx];

// compute lance impact with horse fatigue
var fat1 =
(c.pass - 1) * (105 - h1.stamina) * 0.35;
var fat2 =
(c.pass - 1) * (105 - h2.stamina) * 0.35;

if (c.pass >= 2 && h1.stamina < 83) {
m.k1.isTired = true;
}
if (c.pass >= 2 && h2.stamina < 83) {
m.k2.isTired = true;
}

var hit1 =
m.k1.joustSkill * 0.5 +
h1.speed * 0.5 -
fat1 +
Math.random() * 28;
var hit2 =
m.k2.joustSkill * 0.5 +
h2.speed * 0.5 -
fat2 +
Math.random() * 28;

var def1 =
s1.joustDef * 0.5 +
h1.balance * 0.5 -
m.k1.shieldDamage * 16;
var def2 =
s2.joustDef * 0.5 +
h2.balance * 0.5 -
m.k2.shieldDamage * 16;

// check shield crack or shatter on impact
if (
hit2 > s1.durability * 0.92 &&
m.k1.shieldDamage < 2
) {
m.k1.shieldDamage += 1;
if (m.k1.shieldDamage === 2) {
c.shatterSide = 1;
}
}
if (
hit1 > s2.durability * 0.92 &&
m.k2.shieldDamage < 2
) {
m.k2.shieldDamage += 1;
if (m.k2.shieldDamage === 2) {
c.shatterSide =
c.shatterSide === 1 ? 3 : 2;
}
}

var fall1 = hit2 - def1 > 16;
var fall2 = hit1 - def2 > 16;

if (fall1 && !fall2) {
c.unseated1 = true;
c.finished = true;
c.winnerSide = 2;
c.note = m.k1.name + ' выбит из седла!';
c.bannerTitle =
'ПОБЕДА СШИБКОЙ: ' + m.k2.name + '!';
c.bannerSub =
m.k1.name +
' повержен с коня в сшибке #' +
c.pass;
gameState.soundToPlay = 'fanfare';
finishCurrentMatch(2);
return;
}

if (fall2 && !fall1) {
c.unseated2 = true;
c.finished = true;
c.winnerSide = 1;
c.note = m.k2.name + ' выбит из седла!';
c.bannerTitle =
'ПОБЕДА СШИБКОЙ: ' + m.k1.name + '!';
c.bannerSub =
m.k2.name +
' повержен с коня в сшибке #' +
c.pass;
gameState.soundToPlay = 'fanfare';
finishCurrentMatch(1);
return;
}

if (fall1 && fall2) {
c.unseated1 = true;
c.unseated2 = true;
c.mode = 'MELEE';
m.k1.isTired = true;
m.k2.isTired = true;
c.phaseTitle = 'ОБОЮДНОЕ ПАДЕНИЕ -> ПЕШИЙ БОЙ!';
c.note =
'Оба выбиты из седла! Достают оружие!';
gameState.soundToPlay = 'shatter';
updateAllOdds(gameState);

if (gameState.allowLiveBets) {
c.pausedForBets = true;
c.bannerTitle =
'ОБОЮДНОЕ ПАДЕНИЕ! ПАУЗА СТАВОК ПЕРЕД ПЕШИМ БОЕМ';
c.bannerSub =
'В ход идёт оружие: ' +
m.k1.weaponName +
' vs ' +
m.k2.weaponName;
}
return;
}

gameState.soundToPlay =
c.shatterSide > 0 ? 'shatter' : 'clash';

if (c.pass >= 3) {
c.mode = 'MELEE';
c.phaseTitle =
'3 СШИБКИ ПОЗАДИ -> ПЕШЕЕ СРАЖЕНИЕ!';
c.note =
'Никто не уступил в седле! Бой на земле!';
updateAllOdds(gameState);

if (gameState.allowLiveBets) {
c.pausedForBets = true;
c.bannerTitle =
'3 СШИБКИ ПРОЙДЕНЫ! LIVE-СТАВКИ ПЕРЕД ПЕШИМ БОЕМ';
c.bannerSub =
'Оружие ближнего боя решает исход!';
}
return;
}

updateAllOdds(gameState);
c.note =
'Оба устояли в сшибке #' + c.pass + '!';
if (gameState.allowLiveBets) {
c.pausedForBets = true;
c.bannerTitle =
'СШИБКА #' +
c.pass +
' ЗАВЕРШЕНА — ПРИЁМ LIVE-СТАВОК!';
c.bannerSub =
'Оцените щиты и усталость коней перед следующим заходом';
}
return;
}

// foot melee combat resolution
c.meleeRound += 1;
c.phaseTitle =
'ПЕШЕЕ СРАЖЕНИЕ: ' +
m.k1.weaponName +
' VS ' +
m.k2.weaponName;

var w1 = WEAPONS[m.k1.weaponIdx];
var w2 = WEAPONS[m.k2.weaponIdx];

if (
w2.crush > 88 &&
m.k1.shieldDamage < 2 &&
Math.random() < 0.55
) {
m.k1.shieldDamage += 1;
if (m.k1.shieldDamage === 2) {
c.shatterSide = 1;
}
}
if (
w1.crush > 88 &&
m.k2.shieldDamage < 2 &&
Math.random() < 0.55
) {
m.k2.shieldDamage += 1;
if (m.k2.shieldDamage === 2) {
c.shatterSide = 2;
}
}

var score1 =
calcPowerScore(m.k1, 'MELEE') +
Math.random() * 32;
var score2 =
calcPowerScore(m.k2, 'MELEE') +
Math.random() * 32;

if (c.meleeRound === 1) {
if (score1 >= score2) {
m.k2.isTired = true;
} else {
m.k1.isTired = true;
}
gameState.soundToPlay =
c.shatterSide > 0 ? 'shatter' : 'sword';
c.note =
'Яростный размен ударами в центре арены!';
updateAllOdds(gameState);
return;
}

var winSide = score1 >= score2 ? 1 : 2;
var winK = winSide === 1 ? m.k1 : m.k2;
var loseK = winSide === 1 ? m.k2 : m.k1;
loseK.isTired = true;

c.finished = true;
c.winnerSide = winSide;
c.note =
loseK.name +
' преклоняет колено от изнеможения!';
c.bannerTitle =
'ПОБЕДА В ПЕШЕМ БОЮ: ' + winK.name + '!';
c.bannerSub =
'Решающий удар оружием: ' +
winK.weaponName;
gameState.soundToPlay = 'fanfare';
finishCurrentMatch(winSide);
}

// step parade and combat timers on server
// we advance parade riders and auto bouts
setInterval(function () {
if (
gameState.tvScreen === 'PARADE' &&
gameState.parade &&
!gameState.parade.finished
) {
var pWait =
Date.now() -
(gameState.lastParadeAt || 0);
if (pWait >= 2400) {
gameState.lastParadeAt = Date.now();
gameState.version += 1;
var pr = gameState.parade;
if (pr.subStep === 'RIDE_TO_RACK') {
pr.subStep = 'PICKED';
gameState.soundToPlay = 'sword';
} else {
if (pr.currentIndex < 7) {
pr.currentIndex += 1;
pr.subStep = 'RIDE_TO_RACK';
gameState.soundToPlay = 'hoof';
} else {
pr.finished = true;
gameState.statusText =
'ПЕРВЫЙ РАУНД СТАВОК (БОНУС +20%)';
gameState.soundToPlay = 'horn';
}
}
}
} else if (
gameState.tvScreen === 'COMBAT' &&
gameState.combat &&
gameState.combat.active &&
!gameState.combat.finished &&
!gameState.combat.pausedForBets
) {
var elapsed =
Date.now() - (gameState.lastStepAt || 0);
var stepDur =
gameState.combat.mode === 'MELEE'
? 6200
: 5600;
if (elapsed >= stepDur) {
gameState.lastStepAt = Date.now();
gameState.version += 1;
runNextCombatPhase();
}
}
}, 450);

// get local network ip for phone host
function getLocalIp() {
var nets = os.networkInterfaces();
for (var name in nets) {
var list = nets[name] || [];
for (var i = 0; i < list.length; i++) {
var net = list[i];
if (
net.family === 'IPv4' &&
!net.internal
) {
return net.address;
}
}
}
return '127.0.0.1';
}

// return current state to tv and host
app.get('/api/state', function (req, res) {
res.json(gameState);
});

// return local ip and port info
app.get('/api/ip', function (req, res) {
res.json({
ip: getLocalIp(),
port: PORT
});
});

// process presenter actions from phone
app.post('/api/action', function (req, res) {
var body = req.body || {};
var type = body.type;
gameState.version += 1;
gameState.soundToPlay = null;
gameState.prizeBannerText = null;

if (type === 'toggle_mode') {
gameState.gameMode =
gameState.gameMode === 'PUB'
? 'CASH'
: 'PUB';
} else if (type === 'toggle_live_bets') {
gameState.allowLiveBets =
!gameState.allowLiveBets;
} else if (type === 'restart_parade') {
gameState.tvScreen = 'PARADE';
gameState.statusText =
'ПАРАД РЫЦАРЕЙ И ВЫБОР ОРУЖИЯ';
gameState.lastParadeAt = Date.now();
gameState.parade = {
active: true,
currentIndex: 0,
subStep: 'RIDE_TO_RACK',
finished: false,
bonusActive: true
};
gameState.soundToPlay = 'horn';
} else if (type === 'toggle_screen') {
if (gameState.tvScreen === 'PARADE') {
gameState.tvScreen = 'BRACKET';
gameState.statusText =
'ПРИЁМ СТАВОК ОТКРЫТ';
} else if (gameState.tvScreen === 'BRACKET') {
gameState.tvScreen = 'COMBAT';
} else {
gameState.tvScreen = 'BRACKET';
}
} else if (type === 'place_bet') {
var tId = parseInt(body.tableId, 10);
var kId = body.knightId;
var amt = parseInt(body.amount, 10);
var bType = body.betType || 'MATCH';

var tableObj = null;
for (
var i = 0;
i < pubData.tables.length;
i++
) {
if (pubData.tables[i].id === tId) {
tableObj = pubData.tables[i];
}
}

if (
tableObj &&
amt > 0 &&
tableObj.balance >= amt
) {
var m =
gameState.matches[
gameState.currentMatchIndex
];
var kName = kId;
var lockedOdds = 1.9;

if (bType === 'MATCH' && m) {
if (m.k1 && m.k1.id === kId) {
kName = m.k1.name;
lockedOdds = parseFloat(m.odds1);
} else if (m.k2 && m.k2.id === kId) {
kName = m.k2.name;
lockedOdds = parseFloat(m.odds2);
}
} else {
for (
var a = 0;
a < gameState.aliveKnights.length;
a++
) {
var ak = gameState.aliveKnights[a];
if (ak.id === kId) {
kName = ak.name;
lockedOdds = parseFloat(
ak.outrightOdds
);
}
}
}

// apply +20% bonus during opening parade
if (gameState.tvScreen === 'PARADE') {
lockedOdds = parseFloat(
(lockedOdds * 1.2).toFixed(2)
);
}

tableObj.balance -= amt;
gameState.activeBets.unshift({
tableId: tableObj.id,
tableName: tableObj.name,
knightId: kId,
knightName: kName,
amount: amt,
odds: lockedOdds,
betType: bType
});
gameState.soundToPlay = 'bet';
savePubData(pubData);
updateAllOdds(gameState);
}
} else if (type === 'add_credit') {
var cTableId = parseInt(body.tableId, 10);
var delta = parseInt(body.delta, 10) || 100;
creditTableById(cTableId, delta);
gameState.soundToPlay = 'bet';
savePubData(pubData);
} else if (type === 'claim_prize') {
var pTableId = parseInt(body.tableId, 10);
var prizeId = parseInt(body.prizeId, 10);
var tTarget = null;
var pTarget = null;

for (
var ti = 0;
ti < pubData.tables.length;
ti++
) {
if (pubData.tables[ti].id === pTableId) {
tTarget = pubData.tables[ti];
}
}
for (
var pi = 0;
pi < pubData.prizes.length;
pi++
) {
if (pubData.prizes[pi].id === prizeId) {
pTarget = pubData.prizes[pi];
}
}

if (
tTarget &&
pTarget &&
tTarget.balance >= pTarget.cost
) {
tTarget.balance -= pTarget.cost;
gameState.prizeBannerText =
tTarget.name.toUpperCase() +
' ЗАБИРАЕТ ПРИЗ: ' +
pTarget.title.toUpperCase() +
'!';
gameState.soundToPlay = 'prize';
savePubData(pubData);
}
} else if (type === 'add_table') {
var newId = pubData.tables.length + 1;
pubData.tables.push({
id: newId,
name: body.name || 'Стол №' + newId,
balance: 300
});
gameState.tables = pubData.tables;
savePubData(pubData);
} else if (type === 'combat_step') {
if (gameState.tvScreen === 'PARADE') {
if (
gameState.parade &&
!gameState.parade.finished
) {
// skip parade animation to lineup & bonus bets
gameState.parade.currentIndex = 7;
gameState.parade.subStep = 'PICKED';
gameState.parade.finished = true;
gameState.statusText =
'ПЕРВЫЙ РАУНД СТАВОК (БОНУС +20%)';
gameState.soundToPlay = 'horn';
} else {
// finish bonus betting and show bracket
gameState.tvScreen = 'BRACKET';
gameState.statusText =
'ПРИЁМ СТАВОК ОТКРЫТ';
gameState.soundToPlay = 'horn';
}
res.json({ ok: true, state: gameState });
return;
}

var curM =
gameState.matches[
gameState.currentMatchIndex
];
if (
!curM ||
!curM.k1 ||
!curM.k2 ||
gameState.tournamentStatus === 'FINISHED'
) {
res.json({ ok: true, state: gameState });
return;
}

if (gameState.tvScreen !== 'COMBAT') {
gameState.tvScreen = 'COMBAT';
gameState.statusText = 'ИДЁТ ПОЕДИНОК!';
gameState.combat = {
active: true,
mode: 'JOUST',
pass: 0,
meleeRound: 0,
pausedForBets: false,
finished: false,
winnerSide: null,
unseated1: false,
unseated2: false,
shatterSide: 0,
stepId: gameState.combat.stepId + 1,
phaseTitle: 'ВЫХОД НА РИСТАЛИЩЕ',
note: 'Всадники занимают позиции',
bannerTitle: '',
bannerSub: ''
};
gameState.lastStepAt = Date.now();
gameState.soundToPlay = 'horn';
runNextCombatPhase();
} else if (gameState.combat.finished) {
gameState.tvScreen = 'BRACKET';
gameState.statusText =
gameState.tournamentStatus === 'FINISHED'
? 'ЧЕМПИОН ОПРЕДЕЛЁН!'
: 'СТАВКИ НА СЛЕДУЮЩИЙ БОЙ';
if (gameState.currentMatchIndex < 6) {
gameState.currentMatchIndex += 1;
}
updateAllOdds(gameState);
} else if (gameState.combat.pausedForBets) {
gameState.lastStepAt = Date.now();
runNextCombatPhase();
}
} else if (type === 'next_match') {
gameState.tvScreen = 'BRACKET';
if (
gameState.currentMatchIndex < 6 &&
gameState.matches[
gameState.currentMatchIndex
].status === 'DONE'
) {
gameState.currentMatchIndex += 1;
gameState.statusText =
'СТАВКИ НА СЛЕДУЮЩИЙ БОЙ';
updateAllOdds(gameState);
}
} else if (type === 'new_tournament') {
gameState = buildNewTournament(
gameState.gameMode
);
} else if (type === 'new_pub_seed') {
pubData = createPubData();
savePubData(pubData);
gameState = buildNewTournament(
gameState.gameMode
);
}

res.json({ ok: true, state: gameState });
});

// start express server on 0.0.0.0:3000
app.listen(PORT, '0.0.0.0', function () {
console.log(
'knight tournament server on ' + PORT
);
});
