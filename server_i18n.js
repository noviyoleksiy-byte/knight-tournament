// server localization for en uk and ru
// translates horses shields weapons bouts
import { MASTER_KNIGHTS } from './titles.js';

var HORSE_NAMES = [
{
en: 'Black Charger',
uk: 'Вороний',
ru: 'Вороной'
},
{
en: 'Snow White',
uk: 'Білосніжний',
ru: 'Белоснежный'
},
{
en: 'Bay Courser',
uk: 'Гнідий',
ru: 'Гнедой'
},
{
en: 'Copper Chestnut',
uk: 'Мідно-рудий',
ru: 'Медно-рыжий'
},
{
en: 'Dapple Gray',
uk: 'Сірий у яблуках',
ru: 'Серый в яблоках'
},
{
en: 'Buckskin',
uk: 'Буланий',
ru: 'Буланый'
},
{
en: 'Spotted Appaloosa',
uk: 'Чубарий',
ru: 'Чубарый'
},
{
en: 'Dark Seal Brown',
uk: 'Караковий',
ru: 'Караковый'
},
{
en: 'Piebald Pinto',
uk: 'Строкатий',
ru: 'Пегий'
},
{
en: 'Blue Roan',
uk: 'Блакитно-чалий',
ru: 'Голубая чалая'
}
];

var SHIELD_NAMES = [
{
en: 'Kite Shield (Cross)',
uk: 'Краплеподібний (Хрест)',
ru: 'Каплевидный (Крест)'
},
{
en: 'Heater Shield (Chevron)',
uk: 'Трикутний (Шеврон)',
ru: 'Треугольный (Шеврон)'
},
{
en: 'Round Shield (Boss)',
uk: 'Круглий (Умбон)',
ru: 'Круглый (Умбон)'
},
{
en: 'Tower Shield (Pales)',
uk: 'Баштовий (Стовпи)',
ru: 'Башенный (Столбы)'
},
{
en: 'Lozenge Shield (Rhombus)',
uk: 'Ромбоподібний (Ромб)',
ru: 'Ромбовидный (Ромб)'
},
{
en: 'Jousting Targe (Notch)',
uk: 'Турнірний тарч (Виїмка)',
ru: 'Турнирный тарч (Выемка)'
},
{
en: 'Half-Round (Saltire)',
uk: 'Напівкруглий (Косий хрест)',
ru: 'Полукруглый (Косой крест)'
},
{
en: 'Winged Shield (Fess)',
uk: 'Крилатий (Пояс)',
ru: 'Крылатый (Пояс)'
},
{
en: 'Kite Shield (Battlements)',
uk: 'Краплеподібний (Зубці)',
ru: 'Каплевидный (Зубцы)'
},
{
en: 'Oval Shield (Three Rings)',
uk: 'Овальний (Три кільця)',
ru: 'Овальный (Три кольца)'
},
{
en: 'Lancet Shield (Star)',
uk: 'Стрілчастий (Зірка)',
ru: 'Стрельчатый (Звезда)'
},
{
en: 'Hex Shield (Checkers)',
uk: 'Шестигранний (Шахи)',
ru: 'Шестигранный (Шахматы)'
}
];

var WEAPON_NAMES = [
{
en: 'Knightly Sword',
uk: 'Лицарський меч',
ru: 'Рыцарский меч'
},
{
en: 'Battle Axe',
uk: 'Бойова сокира',
ru: 'Боевой топор'
},
{
en: 'Morningstar',
uk: 'Моргенштерн',
ru: 'Моргенштерн'
},
{
en: 'Forged Mace',
uk: 'Кована булава',
ru: 'Кованая булава'
},
{
en: 'Raven War Pick',
uk: 'Воронячий клевець',
ru: 'Вороний клевец'
},
{
en: 'Heavy Broadsword',
uk: 'Важкий палаш',
ru: 'Тяжёлый палаш'
},
{
en: 'Chain Flail',
uk: 'Кістень на ланцюгу',
ru: 'Кистень на цепи'
},
{
en: 'War Hammer',
uk: 'Бойовий молот',
ru: 'Боевой молот'
},
{
en: 'Flanged Mace',
uk: 'Шестопер',
ru: 'Шестопёр'
},
{
en: 'Curved Sabre',
uk: 'Крива шабля',
ru: 'Кривая сабля'
},
{
en: 'Piercing Estoc',
uk: 'Колючий кончар',
ru: 'Колющий кончар'
},
{
en: 'Broad Falchion',
uk: 'Широкий фальшіон',
ru: 'Широкий фальшион'
}
];

export var PRIZE_NAMES = {
1: {
en: 'Garlic Croutons',
uk: 'Часникові грінки',
ru: 'Чесночные гренки'
},
2: {
en: 'Pint of Draft Beer',
uk: 'Келих пінного',
ru: 'Бокал пенного'
},
3: {
en: 'Set of 4 Shots',
uk: 'Сет із 4 шотів',
ru: 'Сет из 4 шотов'
},
4: {
en: 'Beer Tower',
uk: 'Пивна вежа',
ru: 'Пивная башня'
}
};

var STAGE_NAMES = [
{
en: 'QUARTERFINAL (MATCH 1)',
uk: '1/4 ФІНАЛУ (МАТЧ 1)',
ru: '1/4 ФИНАЛА (МАТЧ 1)'
},
{
en: 'QUARTERFINAL (MATCH 2)',
uk: '1/4 ФІНАЛУ (МАТЧ 2)',
ru: '1/4 ФИНАЛА (МАТЧ 2)'
},
{
en: 'QUARTERFINAL (MATCH 3)',
uk: '1/4 ФІНАЛУ (МАТЧ 3)',
ru: '1/4 ФИНАЛА (МАТЧ 3)'
},
{
en: 'QUARTERFINAL (MATCH 4)',
uk: '1/4 ФІНАЛУ (МАТЧ 4)',
ru: '1/4 ФИНАЛА (МАТЧ 4)'
},
{
en: 'SEMIFINAL (WEST)',
uk: '1/2 ФІНАЛУ (ЗАХІД)',
ru: '1/2 ФИНАЛА (ЗАПАД)'
},
{
en: 'SEMIFINAL (EAST)',
uk: '1/2 ФІНАЛУ (СХІД)',
ru: '1/2 ФИНАЛА (ВОСТОК)'
},
{
en: 'TOURNAMENT GRAND FINAL',
uk: 'ГРАНД-ФІНАЛ ТУРНІРУ',
ru: 'ГРАНД-ФИНАЛ ТУРНИРА'
}
];

var STATUS_DICT = {
PARADE_START: {
en: 'KNIGHT PARADE & WEAPON DRAFT',
uk: 'ПАРАД ЛИЦАРІВ ТА ВИБІР ЗБРОЇ',
ru: 'ПАРАД РЫЦАРЕЙ И ВЫБОР ОРУЖИЯ'
},
BONUS_BETS: {
en: 'FIRST BETTING ROUND (BONUS +20%)',
uk: 'ПЕРШИЙ РАУНД СТАВОК (БОНУС +20%)',
ru: 'ПЕРВЫЙ РАУНД СТАВОК (БОНУС +20%)'
},
BETS_OPEN: {
en: 'BETTING OPEN',
uk: 'ПРИЙОМ СТАВОК ВІДКРИТО',
ru: 'ПРИЁМ СТАВОК ОТКРЫТ'
},
BOUT_ACTIVE: {
en: 'BOUT IN PROGRESS!',
uk: 'ТРИВАЄ ПОЄДИНОК!',
ru: 'ИДЁТ ПОЕДИНОК!'
},
CHAMP_DONE: {
en: 'CHAMPION CROWNED!',
uk: 'ЧЕМПІОНА ВИЗНАЧЕНО!',
ru: 'ЧЕМПИОН ОПРЕДЕЛЁН!'
},
NEXT_BETS: {
en: 'BETS ON NEXT BOUT',
uk: 'СТАВКИ НА НАСТУПНИЙ БІЙ',
ru: 'СТАВКИ НА СЛЕДУЮЩИЙ БОЙ'
}
};

// get translated status string by key
// defaults to english when lang is unset
export function getStatusStr(key, lang) {
var l = lang || 'en';
var item =
STATUS_DICT[key] ||
STATUS_DICT.PARADE_START;
return item[l] || item.en;
}

// get localized horse name by index
// defaults to english horse coat name
export function getHorseName(idx, lang) {
var h = HORSE_NAMES[idx] || HORSE_NAMES[0];
var l = lang || 'en';
return h[l] || h.en;
}

// get localized shield name by index
// defaults to english shield shape name
export function getShieldName(idx, lang) {
var s =
SHIELD_NAMES[idx] || SHIELD_NAMES[0];
var l = lang || 'en';
return s[l] || s.en;
}

// get localized weapon name by index
// defaults to english weapon name
export function getWeaponName(idx, lang) {
var w =
WEAPON_NAMES[idx] || WEAPON_NAMES[0];
var l = lang || 'en';
return w[l] || w.en;
}

// get localized stage name for match
// defaults to english stage label
export function getStageName(idx, lang) {
var st = STAGE_NAMES[idx] || STAGE_NAMES[0];
var l = lang || 'en';
return st[l] || st.en;
}

// localize a single knight object in place
// updates name secretTitle horse shield wep
export function localizeKnight(k, lang) {
if (!k) return;
var l = lang || 'en';
var tpl = MASTER_KNIGHTS[k.poolIndex];
if (tpl) {
k.name =
(tpl.names && tpl.names[l]) || tpl.name;
k.secretTitle =
(tpl.titles && tpl.titles[l]) ||
tpl.secretTitle;
}
if (k.shieldIdx !== undefined) {
k.shieldName = getShieldName(
k.shieldIdx,
l
);
}
if (k.horseIdx !== undefined) {
k.horseName = getHorseName(k.horseIdx, l);
}
if (k.weaponIdx !== undefined) {
k.weaponName = getWeaponName(
k.weaponIdx,
l
);
}
}

// localize default table name if standard
// translates Table #N and Bar Counter
export function localizeTableName(tb, lang) {
if (!tb) return;
var l = lang || 'en';
if (tb.id === 4) {
if (
tb.name === 'Барная стойка' ||
tb.name === 'Барна стійка' ||
tb.name === 'Bar Counter'
) {
tb.name =
l === 'uk'
? 'Барна стійка'
: l === 'ru'
? 'Барная стойка'
: 'Bar Counter';
}
return;
}
var m = String(tb.name || '').match(
/^(?:Стол №|Стіл №|Table #)(\d+)$/
);
if (m) {
var num = m[1];
tb.name =
l === 'uk'
? 'Стіл №' + num
: l === 'ru'
? 'Стол №' + num
: 'Table #' + num;
}
}

// rebuild localized combat banner strings
// uses stored outcomeKey when lang changes
export function localizeCombatTexts(st) {
if (!st || !st.combat) return;
var c = st.combat;
var l = st.lang || 'en';
var m =
st.matches &&
st.matches[st.currentMatchIndex];
var k1Name = m && m.k1 ? m.k1.name : '';
var k2Name = m && m.k2 ? m.k2.name : '';
var w1Name =
m && m.k1 ? m.k1.weaponName : '';
var w2Name =
m && m.k2 ? m.k2.weaponName : '';

if (c.outcomeKey === 'PREP') {
c.phaseTitle =
l === 'uk'
? 'ПІДГОТОВКА ДО БОЮ'
: l === 'ru'
? 'ПОДГОТОВКА К БОЮ'
: 'BOUT PREPARATION';
c.note =
l === 'uk'
? 'Ставки відкрито'
: l === 'ru'
? 'Ставки открыты'
: 'Betting open';
} else if (c.outcomeKey === 'ENTER') {
c.phaseTitle =
l === 'uk'
? 'ВИХІД НА РИСТАЛИЩЕ'
: l === 'ru'
? 'ВЫХОД НА РИСТАЛИЩЕ'
: 'ENTERING THE LISTS';
c.note =
l === 'uk'
? 'Вершники займають позиції'
: l === 'ru'
? 'Всадники занимают позиции'
: 'Riders take their positions';
} else if (c.outcomeKey === 'JOUST_WIN_2') {
c.phaseTitle =
(l === 'uk'
? 'КІННА ЗШИБКА '
: l === 'ru'
? 'КОННАЯ СШИБКА '
: 'JOUST PASS ') +
c.pass +
(l === 'uk'
? ' ІЗ 3'
: l === 'ru'
? ' ИЗ 3'
: ' OF 3');
c.note =
k1Name +
(l === 'uk'
? ' вибитий із сідла!'
: l === 'ru'
? ' выбит из седла!'
: ' is unseated!');
c.bannerTitle =
(l === 'uk'
? 'ПЕРЕМОГА ЗШИБКОЮ: '
: l === 'ru'
? 'ПОБЕДА СШИБКОЙ: '
: 'JOUST VICTORY: ') +
k2Name +
'!';
c.bannerSub =
k1Name +
(l === 'uk'
? ' повалений з коня у зшибці #'
: l === 'ru'
? ' повержен с коня в сшибке #'
: ' unseated in pass #') +
c.pass;
} else if (c.outcomeKey === 'JOUST_WIN_1') {
c.phaseTitle =
(l === 'uk'
? 'КІННА ЗШИБКА '
: l === 'ru'
? 'КОННАЯ СШИБКА '
: 'JOUST PASS ') +
c.pass +
(l === 'uk'
? ' ІЗ 3'
: l === 'ru'
? ' ИЗ 3'
: ' OF 3');
c.note =
k2Name +
(l === 'uk'
? ' вибитий із сідла!'
: l === 'ru'
? ' выбит из седла!'
: ' is unseated!');
c.bannerTitle =
(l === 'uk'
? 'ПЕРЕМОГА ЗШИБКОЮ: '
: l === 'ru'
? 'ПОБЕДА СШИБКОЙ: '
: 'JOUST VICTORY: ') +
k1Name +
'!';
c.bannerSub =
k2Name +
(l === 'uk'
? ' повалений з коня у зшибці #'
: l === 'ru'
? ' повержен с коня в сшибке #'
: ' unseated in pass #') +
c.pass;
} else if (c.outcomeKey === 'MUTUAL_FALL') {
c.phaseTitle =
(l === 'uk'
? 'ЗШИБКА #'
: l === 'ru'
? 'СШИБКА #'
: 'PASS #') +
c.pass +
(l === 'uk'
? ' — ОБОПІЛЬНЕ ПАДІННЯ!'
: l === 'ru'
? ' — ОБОЮДНОЕ ПАДЕНИЕ!'
: ' — DOUBLE UNSEATING!');
c.note =
l === 'uk'
? 'Обидва вибиті з сідла! Далі піший бій!'
: l === 'ru'
? 'Оба выбиты из седла! Далее пеший бой!'
: 'Both unseated! Foot melee next!';
if (c.pausedForBets) {
c.bannerTitle =
l === 'uk'
? 'ОБОПІЛЬНЕ ПАДІННЯ! ПАУЗА СТАВОК ПЕРЕД ПІШИМ БОЄМ'
: l === 'ru'
? 'ОБОЮДНОЕ ПАДЕНИЕ! ПАУЗА СТАВОК ПЕРЕД ПЕШИМ БОЕМ'
: 'DOUBLE FALL! BETTING PAUSE BEFORE MELEE';
c.bannerSub =
(l === 'uk'
? 'У хід іде зброя: '
: l === 'ru'
? 'В ход идёт оружие: '
: 'Melee weapons drawn: ') +
w1Name +
' vs ' +
w2Name;
}
} else if (c.outcomeKey === 'PASS_3_MELEE') {
c.phaseTitle =
l === 'uk'
? 'КІННА ЗШИБКА 3 ІЗ 3 -> ПІШИЙ БІЙ!'
: l === 'ru'
? 'КОННАЯ СШИБКА 3 ИЗ 3 -> ПЕШИЙ БОЙ!'
: 'JOUST PASS 3 OF 3 -> FOOT MELEE!';
c.note =
l === 'uk'
? 'Ніхто не поступився в сідлі! Далі піший бій!'
: l === 'ru'
? 'Никто не уступил в седле! Далее пеший бой!'
: 'Neither yielded in the saddle! Foot melee next!';
if (c.pausedForBets) {
c.bannerTitle =
l === 'uk'
? '3 ЗШИБКИ ПРОЙДЕНО! LIVE-СТАВКИ ПЕРЕД ПІШИМ БОЄМ'
: l === 'ru'
? '3 СШИБКИ ПРОЙДЕНЫ! LIVE-СТАВКИ ПЕРЕД ПЕШИМ БОЕМ'
: '3 PASSES DONE! LIVE BETS BEFORE FOOT MELEE';
c.bannerSub =
l === 'uk'
? 'Зброя ближнього бою вирішує результат!'
: l === 'ru'
? 'Оружие ближнего боя решает исход!'
: 'Close-quarters weapons will decide the bout!';
}
} else if (c.outcomeKey === 'PASS_HOLD') {
c.phaseTitle =
(l === 'uk'
? 'КІННА ЗШИБКА '
: l === 'ru'
? 'КОННАЯ СШИБКА '
: 'JOUST PASS ') +
c.pass +
(l === 'uk'
? ' ІЗ 3'
: l === 'ru'
? ' ИЗ 3'
: ' OF 3');
c.note =
(l === 'uk'
? 'Обидва встояли у зшибці #'
: l === 'ru'
? 'Оба устояли в сшибке #'
: 'Both held their seat in pass #') +
c.pass +
'!';
if (c.pausedForBets) {
c.bannerTitle =
(l === 'uk'
? 'ЗШИБКА #'
: l === 'ru'
? 'СШИБКА #'
: 'PASS #') +
c.pass +
(l === 'uk'
? ' ЗАВЕРШЕНА — ПРИЙОМ LIVE-СТАВОК!'
: l === 'ru'
? ' ЗАВЕРШЕНА — ПРИЁМ LIVE-СТАВОК!'
: ' COMPLETE — LIVE BETTING OPEN!');
c.bannerSub =
l === 'uk'
? 'Оцініть щити та втому коней перед наступним заходом'
: l === 'ru'
? 'Оцените щиты и усталость коней перед следующим заходом'
: 'Check shields and horse fatigue before the next pass';
}
} else if (c.outcomeKey === 'MELEE_WIN') {
var winK =
c.winnerSide === 1
? m && m.k1
: m && m.k2;
var loseK =
c.winnerSide === 1
? m && m.k2
: m && m.k1;
c.phaseTitle =
(l === 'uk'
? 'ПІША БИТВА: '
: l === 'ru'
? 'ПЕШЕЕ СРАЖЕНИЕ: '
: 'FOOT MELEE: ') +
w1Name +
' VS ' +
w2Name;
if (winK && loseK) {
c.note =
loseK.name +
(l === 'uk'
? ' схиляє коліно після удару!'
: l === 'ru'
? ' преклоняет колено после удара!'
: ' drops to a knee after the blow!');
c.bannerTitle =
(l === 'uk'
? 'ПЕРЕМОГА В ПІШОМУ БОЮ: '
: l === 'ru'
? 'ПОБЕДА В ПЕШЕМ БОЮ: '
: 'MELEE VICTORY: ') +
winK.name +
'!';
c.bannerSub =
(l === 'uk'
? 'Вирішальний удар зброєю: '
: l === 'ru'
? 'Решающий удар оружием: '
: 'Decisive weapon strike: ') +
winK.weaponName;
}
}
}

// localize all knights tables prizes in state
// called when language switches on tv or host
export function localizeAllState(
st,
pubData,
saveCb
) {
if (!st) return;
var l = st.lang || 'en';
pubData.lang = l;

for (
var r = 0;
r < pubData.roster.length;
r++
) {
localizeKnight(pubData.roster[r], l);
}

var kMap = {};
var alive = st.aliveKnights || [];
for (var a = 0; a < alive.length; a++) {
localizeKnight(alive[a], l);
kMap[alive[a].id] = alive[a];
}

var matches = st.matches || [];
for (var i = 0; i < matches.length; i++) {
var m = matches[i];
m.stageName = getStageName(m.id, l);
if (m.k1) {
localizeKnight(m.k1, l);
kMap[m.k1.id] = m.k1;
}
if (m.k2) {
localizeKnight(m.k2, l);
kMap[m.k2.id] = m.k2;
}
}

if (st.champion) {
localizeKnight(st.champion, l);
}

var tMap = {};
for (
var t = 0;
t < pubData.tables.length;
t++
) {
localizeTableName(pubData.tables[t], l);
tMap[pubData.tables[t].id] =
pubData.tables[t].name;
}
st.tables = pubData.tables;

for (
var p = 0;
p < pubData.prizes.length;
p++
) {
var pr = pubData.prizes[p];
if (PRIZE_NAMES[pr.id]) {
pr.title = PRIZE_NAMES[pr.id][l];
}
}
st.prizes = pubData.prizes;

var bets = st.activeBets || [];
for (var b = 0; b < bets.length; b++) {
var bet = bets[b];
if (tMap[bet.tableId]) {
bet.tableName = tMap[bet.tableId];
}
if (kMap[bet.knightId]) {
bet.knightName = kMap[bet.knightId].name;
}
}

if (st.statusKey) {
st.statusText = getStatusStr(
st.statusKey,
l
);
}
localizeCombatTexts(st);
if (saveCb) saveCb(pubData);
}
