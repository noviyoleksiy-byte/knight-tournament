// mobile presenter host controller
// we send actions and sync state via xhr
(function () {
'use strict';

var betMode = 'MATCH';
var lastState = null;

var tourBadge =
document.getElementById('hostTourBadge');
var screenText =
document.getElementById('hostScreenText');
var modeText =
document.getElementById('hostModeText');
var boutTitle =
document.getElementById('hostBoutTitle');
var boutSub =
document.getElementById('hostBoutSub');

var btnStartStep =
document.getElementById('btnStartStep');
var btnLiveToggle =
document.getElementById('btnLiveToggle');
var tabBetMatch =
document.getElementById('tabBetMatch');
var tabBetOutright =
document.getElementById('tabBetOutright');

var selectTable =
document.getElementById('selectTable');
var selectKnight =
document.getElementById('selectKnight');
var selectPrize =
document.getElementById('selectPrize');
var betAmountInput =
document.getElementById('betAmountInput');
var newTableName =
document.getElementById('newTableName');

// build custom touch selector around select
// avoids native mobile picker blinking on poll
function initCustomSelect(selectEl) {
if (!selectEl || selectEl._custom) return;
selectEl.style.display = 'none';

var wrap = document.createElement('div');
wrap.className = 'customSelectWrap';

var btn = document.createElement('button');
btn.type = 'button';
btn.className = 'customSelectBtn';

var labelSpan =
document.createElement('span');
labelSpan.textContent = 'Выбор...';
var arrowSpan =
document.createElement('span');
arrowSpan.className = 'customSelectArrow';
arrowSpan.textContent = '▾';

btn.appendChild(labelSpan);
btn.appendChild(arrowSpan);

var menu = document.createElement('div');
menu.className = 'customSelectMenu';

wrap.appendChild(btn);
wrap.appendChild(menu);
selectEl.parentNode.insertBefore(
wrap,
selectEl.nextSibling
);

selectEl._custom = {
wrap: wrap,
btn: btn,
label: labelSpan,
arrow: arrowSpan,
menu: menu,
isOpen: false,
rows: []
};

btn.onclick = function (ev) {
ev.stopPropagation();
var c = selectEl._custom;
var nextOpen = !c.isOpen;
closeAllCustomSelects();
c.isOpen = nextOpen;
c.btn.className = nextOpen
? 'customSelectBtn open'
: 'customSelectBtn';
c.menu.className = nextOpen
? 'customSelectMenu open'
: 'customSelectMenu';
c.arrow.textContent = nextOpen ? '▴' : '▾';
};
}

// close any open custom dropdown menus
// called on outside tap or option pick
function closeAllCustomSelects() {
var list = [
selectTable,
selectKnight,
selectPrize
];
for (var i = 0; i < list.length; i++) {
var el = list[i];
if (el && el._custom && el._custom.isOpen) {
el._custom.isOpen = false;
el._custom.btn.className =
'customSelectBtn';
el._custom.menu.className =
'customSelectMenu';
el._custom.arrow.textContent = '▾';
}
}
}

document.addEventListener(
'click',
function () {
closeAllCustomSelects();
}
);

initCustomSelect(selectTable);
initCustomSelect(selectKnight);
initCustomSelect(selectPrize);

// update select options without dom rebuild
// keeps custom mobile menu stable during poll
function syncSelect(selectEl, items) {
if (!selectEl) return;
initCustomSelect(selectEl);

var curVal = selectEl.value;
var opts = selectEl.options;
var sameValues =
opts.length === items.length;

if (sameValues) {
for (var k = 0; k < items.length; k++) {
if (
String(opts[k].value) !==
String(items[k].value)
) {
sameValues = false;
break;
}
}
}

if (!sameValues) {
while (selectEl.options.length > 0) {
selectEl.remove(0);
}
for (var n = 0; n < items.length; n++) {
var opt = document.createElement('option');
opt.value = String(items[n].value);
opt.text = items[n].text;
selectEl.add(opt);
}
if (curVal) {
for (var q = 0; q < items.length; q++) {
if (
String(items[q].value) === String(curVal)
) {
selectEl.value = String(curVal);
break;
}
}
}
} else {
for (var m = 0; m < items.length; m++) {
if (opts[m].text !== items[m].text) {
opts[m].text = items[m].text;
}
}
}

var c = selectEl._custom;
var activeVal = String(selectEl.value || '');
var activeText = '';

if (c.rows.length !== items.length) {
c.menu.innerHTML = '';
c.rows = [];
for (var r = 0; r < items.length; r++) {
(function (idx) {
var row = document.createElement('div');
row.className = 'customSelectOpt';
row.onclick = function (ev) {
ev.stopPropagation();
var chosen =
String(row.getAttribute('data-val'));
selectEl.value = chosen;
for (
var u = 0;
u < c.rows.length;
u++
) {
var uVal =
c.rows[u].getAttribute('data-val');
c.rows[u].className =
uVal === chosen
? 'customSelectOpt activeOpt'
: 'customSelectOpt';
}
c.label.textContent = row.textContent;
closeAllCustomSelects();
};
c.menu.appendChild(row);
c.rows.push(row);
})(r);
}
}

for (var x = 0; x < items.length; x++) {
var it = items[x];
var vStr = String(it.value);
var rowEl = c.rows[x];
if (rowEl.getAttribute('data-val') !== vStr) {
rowEl.setAttribute('data-val', vStr);
}
if (rowEl.textContent !== it.text) {
rowEl.textContent = it.text;
}
var isSel = vStr === activeVal;
var wantCls = isSel
? 'customSelectOpt activeOpt'
: 'customSelectOpt';
if (rowEl.className !== wantCls) {
rowEl.className = wantCls;
}
if (isSel) {
activeText = it.text;
}
}

if (!activeText && items.length > 0) {
activeText = items[0].text;
}
if (c.label.textContent !== activeText) {
c.label.textContent = activeText;
}
}

// send action payload to server api
// we post json and refresh ui from reply
function sendAction(payload) {
var xhr = new XMLHttpRequest();
xhr.open('POST', '/api/action', true);
xhr.setRequestHeader(
'Content-Type',
'application/json;charset=UTF-8'
);
xhr.onreadystatechange = function () {
if (
xhr.readyState === 4 &&
xhr.status === 200
) {
try {
var resp =
JSON.parse(xhr.responseText);
if (resp.state) {
renderHost(resp.state);
}
} catch (e) {
// skip json error
}
}
};
xhr.send(JSON.stringify(payload));
}

// format balance label for host selects
// we show caps or cash currency
function fmtMoney(val, mode) {
var v = Math.round(val || 0);
return mode === 'CASH'
? v + ' ₽'
: v + ' КР';
}

// update host controller dom from state
// we keep dropdown selections stable
function renderHost(s) {
if (!s) return;
lastState = s;

tourBadge.innerHTML =
'ТУРНИР №' +
s.tournamentNumber +
' (ПАБ #' +
s.pubSeed +
')';
screenText.innerHTML =
s.tvScreen === 'PARADE'
? 'ПАРАД РЫЦАРЕЙ'
: s.tvScreen === 'COMBAT'
? 'АРЕНА БОЯ'
: 'СЕТКА ТУРНИРА';
modeText.innerHTML =
s.gameMode === 'CASH'
? 'НА ДЕНЬГИ'
: 'ПАБ (КРЫШКИ)';

btnLiveToggle.innerHTML = s.allowLiveBets
? 'LIVE В БОЮ: ВКЛ'
: 'LIVE В БОЮ: ВЫКЛ';

var m =
s.matches &&
s.matches[s.currentMatchIndex];
if (s.tvScreen === 'PARADE' && s.parade) {
if (s.parade.finished) {
boutTitle.innerHTML =
'ПАРАД ЗАВЕРШЁН: РАУНД БОНУС-СТАВОК (+20% К КОЭФАМ!)';
boutSub.innerHTML =
'Примите первые ставки с бонусом и откройте Турнирную Сетку';
} else {
var pk =
s.aliveKnights &&
s.aliveKnights[s.parade.currentIndex];
boutTitle.innerHTML =
'ПАРАД (' +
(s.parade.currentIndex + 1) +
'/8): ' +
(pk ? pk.name : '');
boutSub.innerHTML =
'Рыцари по очереди выбирают оружие со стойки...';
}
} else if (m && m.k1 && m.k2) {
boutTitle.innerHTML =
m.stageName +
': ' +
m.k1.name +
' vs ' +
m.k2.name;
boutSub.innerHTML =
(s.statusText || '') +
' · К1: x' +
Number(m.odds1).toFixed(2) +
' | К2: x' +
Number(m.odds2).toFixed(2);
} else if (s.champion) {
boutTitle.innerHTML =
'ЧЕМПИОН: ' +
s.champion.secretTitle +
' (' +
s.champion.name +
')';
boutSub.innerHTML =
'Турнир завершён! Начните новый.';
}

// update primary start or step button text
// wait for hit animation before end label
if (
s.combat &&
s.combat.stepId !== renderHost._stepId
) {
renderHost._stepId = s.combat.stepId;
renderHost._stepAt = Date.now();
}
var cWait =
(Date.now() - (renderHost._stepAt || 0)) /
1000;
var cReveal =
s.combat && s.combat.mode === 'JOUST'
? 4.05
: 4.75;

if (s.tvScreen === 'PARADE') {
if (s.parade && s.parade.finished) {
btnStartStep.innerHTML =
'ЗАКРЫТЬ БОНУС-СТАВКИ -> К СЕТКЕ';
} else {
btnStartStep.innerHTML =
'УСКОРИТЬ ПАРАД -> БОНУС-СТАВКИ';
}
} else if (
s.tvScreen === 'COMBAT' &&
s.combat
) {
if (cWait < cReveal) {
btnStartStep.innerHTML =
'ИДЁТ ФАЗА БОЯ...';
} else if (s.combat.finished) {
btnStartStep.innerHTML =
'К СЕТКЕ (ЗАВЕРШИТЬ БОЙ)';
} else if (s.combat.pausedForBets) {
btnStartStep.innerHTML =
'ПРОДОЛЖИТЬ БОЙ (СЛЕД. ФАЗА)';
} else {
btnStartStep.innerHTML =
'ИДЁТ ФАЗА БОЯ...';
}
} else {
btnStartStep.innerHTML =
'ЗАКРЫТЬ СТАВКИ И НАЧАТЬ БОЙ';
}

// update economy labels by mode
var isCash = s.gameMode === 'CASH';
document.getElementById(
'economySectionTitle'
).innerHTML = isCash
? 'КАССА ТОТАЛИЗАТОРА: ДЕПОЗИТЫ'
: 'КАССА ПАБА: ЗАКАЗЫ И ПРИЗЫ';
document.getElementById(
'creditLabel'
).innerHTML = isCash
? 'ПОПОЛНИТЬ БАНК ИГРОКА / СТОЛА:'
: 'НАЧИСЛИТЬ КРЫШКИ ЗА ЗАКАЗ НА БАРЕ:';
document.getElementById(
'btnAddDrink'
).innerHTML = isCash
? '+100 ₽'
: '+БОКАЛ (+100)';
document.getElementById(
'btnAddFood'
).innerHTML = isCash
? '+200 ₽'
: '+ЕДА (+200)';
document.getElementById(
'btnAddSet'
).innerHTML = isCash
? '+500 ₽'
: '+СЕТ (+500)';
document.getElementById(
'prizeRedeemBlock'
).style.display = isCash
? 'none'
: 'block';

// populate tables dropdown preserving value
var tItems = [];
var tables = s.tables || [];
for (var i = 0; i < tables.length; i++) {
var tb = tables[i];
tItems.push({
value: tb.id,
text:
tb.name +
' (' +
fmtMoney(tb.balance, s.gameMode) +
')'
});
}
syncSelect(selectTable, tItems);

// populate knights dropdown by bet mode
var kItems = [];
var bonusMult =
s.tvScreen === 'PARADE' ? 1.2 : 1.0;
var bonusLabel =
s.tvScreen === 'PARADE' ? ' [БОНУС +20%]' : '';

if (betMode === 'MATCH' && m && m.k1 && m.k2) {
kItems.push({
value: m.k1.id,
text:
m.k1.name +
' — Бой (x' +
(Number(m.odds1) * bonusMult).toFixed(2) +
')' +
bonusLabel
});
kItems.push({
value: m.k2.id,
text:
m.k2.name +
' — Бой (x' +
(Number(m.odds2) * bonusMult).toFixed(2) +
')' +
bonusLabel
});
} else {
var alive = s.aliveKnights || [];
for (var j = 0; j < alive.length; j++) {
var ak = alive[j];
kItems.push({
value: ak.id,
text:
ak.name +
' — Турнир (x' +
(
Number(ak.outrightOdds) * bonusMult
).toFixed(2) +
')' +
bonusLabel
});
}
}
syncSelect(selectKnight, kItems);

// populate pub prizes dropdown
var pItems = [];
var prizes = s.prizes || [];
for (var p = 0; p < prizes.length; p++) {
var pr = prizes[p];
pItems.push({
value: pr.id,
text: pr.title + ' (' + pr.cost + ' КР)'
});
}
syncSelect(selectPrize, pItems);
}

// poll server state periodically
// we sync presenter phone every 700ms
function pollHost() {
var xhr = new XMLHttpRequest();
xhr.open('GET', '/api/state', true);
xhr.onreadystatechange = function () {
if (
xhr.readyState === 4 &&
xhr.status === 200
) {
try {
var s = JSON.parse(xhr.responseText);
renderHost(s);
} catch (e) {
// skip json error
}
}
};
xhr.send();
}

// bind button click listeners on phone
btnStartStep.onclick = function () {
sendAction({ type: 'combat_step' });
};

document.getElementById(
'btnNextMatch'
).onclick = function () {
sendAction({ type: 'next_match' });
};

document.getElementById(
'btnSwitchScreen'
).onclick = function () {
sendAction({ type: 'toggle_screen' });
};

var btnReplayParade =
document.getElementById('btnReplayParade');
if (btnReplayParade) {
btnReplayParade.onclick = function () {
sendAction({ type: 'restart_parade' });
};
}

btnLiveToggle.onclick = function () {
sendAction({ type: 'toggle_live_bets' });
};

tabBetMatch.onclick = function () {
betMode = 'MATCH';
tabBetMatch.className =
'btn btnSmallTab activeTab';
tabBetOutright.className =
'btn btnSmallTab';
renderHost(lastState);
};

tabBetOutright.onclick = function () {
betMode = 'OUTRIGHT';
tabBetOutright.className =
'btn btnSmallTab activeTab';
tabBetMatch.className = 'btn btnSmallTab';
renderHost(lastState);
};

// bind quick bet amount buttons
var chips =
document.querySelectorAll('.btnChip');
for (var c = 0; c < chips.length; c++) {
chips[c].onclick = function () {
betAmountInput.value =
this.getAttribute('data-amt');
};
}

document.getElementById(
'btnPlaceBet'
).onclick = function () {
var tId = parseInt(selectTable.value, 10);
var kId = selectKnight.value;
var amt = parseInt(
betAmountInput.value,
10
);
if (!tId || !kId || !amt || amt <= 0) {
return;
}
sendAction({
type: 'place_bet',
tableId: tId,
knightId: kId,
amount: amt,
betType: betMode
});
};

// bind drink and deposit credit buttons
document.getElementById(
'btnAddDrink'
).onclick = function () {
sendAction({
type: 'add_credit',
tableId: parseInt(selectTable.value, 10),
delta: 100
});
};

document.getElementById(
'btnAddFood'
).onclick = function () {
sendAction({
type: 'add_credit',
tableId: parseInt(selectTable.value, 10),
delta: 200
});
};

document.getElementById(
'btnAddSet'
).onclick = function () {
sendAction({
type: 'add_credit',
tableId: parseInt(selectTable.value, 10),
delta: 500
});
};

document.getElementById(
'btnClaimPrize'
).onclick = function () {
sendAction({
type: 'claim_prize',
tableId: parseInt(selectTable.value, 10),
prizeId: parseInt(selectPrize.value, 10)
});
};

document.getElementById(
'btnAddTable'
).onclick = function () {
var name = newTableName.value.trim();
if (!name) return;
sendAction({
type: 'add_table',
name: name
});
newTableName.value = '';
};

document.getElementById(
'btnToggleMode'
).onclick = function () {
sendAction({ type: 'toggle_mode' });
};

document.getElementById(
'btnNewTour'
).onclick = function () {
sendAction({ type: 'new_tournament' });
};

document.getElementById(
'btnNewSeed'
).onclick = function () {
sendAction({ type: 'new_pub_seed' });
};

pollHost();
setInterval(pollHost, 700);
})();
