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
if (s.combat.finished) {
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
var curTable = selectTable.value;
var tOpts = '';
var tables = s.tables || [];
for (var i = 0; i < tables.length; i++) {
var tb = tables[i];
tOpts +=
'<option value="' +
tb.id +
'">' +
tb.name +
' (' +
fmtMoney(tb.balance, s.gameMode) +
')</option>';
}
selectTable.innerHTML = tOpts;
if (curTable) {
selectTable.value = curTable;
}

// populate knights dropdown by bet mode
var curKnight = selectKnight.value;
var kOpts = '';
var bonusMult =
s.tvScreen === 'PARADE' ? 1.2 : 1.0;
var bonusLabel =
s.tvScreen === 'PARADE' ? ' [БОНУС +20%]' : '';

if (betMode === 'MATCH' && m && m.k1 && m.k2) {
kOpts +=
'<option value="' +
m.k1.id +
'">' +
m.k1.name +
' — Бой (x' +
(Number(m.odds1) * bonusMult).toFixed(2) +
')' +
bonusLabel +
'</option>';
kOpts +=
'<option value="' +
m.k2.id +
'">' +
m.k2.name +
' — Бой (x' +
(Number(m.odds2) * bonusMult).toFixed(2) +
')' +
bonusLabel +
'</option>';
} else {
var alive = s.aliveKnights || [];
for (var j = 0; j < alive.length; j++) {
var ak = alive[j];
kOpts +=
'<option value="' +
ak.id +
'">' +
ak.name +
' — Турнир (x' +
(
Number(ak.outrightOdds) * bonusMult
).toFixed(2) +
')' +
bonusLabel +
'</option>';
}
}
selectKnight.innerHTML = kOpts;
if (curKnight) {
selectKnight.value = curKnight;
}

// populate pub prizes dropdown
var curPrize = selectPrize.value;
var pOpts = '';
var prizes = s.prizes || [];
for (var p = 0; p < prizes.length; p++) {
var pr = prizes[p];
pOpts +=
'<option value="' +
pr.id +
'">' +
pr.title +
' (' +
pr.cost +
' КР)</option>';
}
selectPrize.innerHTML = pOpts;
if (curPrize) {
selectPrize.value = curPrize;
}
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
