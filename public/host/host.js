// mobile presenter host controller
// we send actions and sync state via xhr
(function () {
'use strict';

var betMode = 'MATCH';
var lastState = null;
var lastLangSeen = '';

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
var btnHostLang =
document.getElementById('btnHostLang');
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

// get dictionary for active state language
// defaults to english when lang is unset
function getDict() {
var lang =
(lastState && lastState.lang) || 'en';
if (window.GameI18n) {
return window.GameI18n.getDict(lang);
}
return {};
}

// format language button label by code
// shows active code in upper case
function getLangBtnLabel(lang) {
if (lang === 'uk') return 'МОВА: УКР';
if (lang === 'ru') return 'ЯЗЫК: РУС';
return 'LANG: EN';
}

// apply static host labels when lang changes
// updates section headers and buttons
function applyHostTranslations(lang) {
var d = getDict();
document.documentElement.lang = lang;
document.title = d.hostTitle || '';

var setTxt = function (id, val) {
var el = document.getElementById(id);
if (el && val) el.innerHTML = val;
};

setTxt('hostHeaderTitle', d.hostHeader);
setTxt('hostTvScreenLbl', d.tvScreenLbl);
setTxt('hostModeLbl', d.modeLbl);
setTxt('secCtrlTitle', d.ctrlSection);
setTxt('btnNextMatch', d.btnNextMatch);
setTxt('btnReplayParade', d.btnReplayParade);
setTxt('btnSwitchScreen', d.btnSwitchScreen);
setTxt('secBetTitle', d.betSection);
setTxt('tabBetMatch', d.tabMatch);
setTxt('tabBetOutright', d.tabOutright);
setTxt('lblWhoBets', d.whoBetsLbl);
setTxt('lblWhichKnight', d.whichKnightLbl);
setTxt('lblBetAmt', d.betAmtLbl);
setTxt('btnPlaceBet', d.btnPlaceBet);
setTxt('lblRedeemPrize', d.redeemLbl);
setTxt('btnClaimPrize', d.btnClaimPrize);
setTxt('lblAddTable', d.addTableLbl);
setTxt('btnAddTable', d.btnAddTable);
setTxt('secSettingsTitle', d.settingsSection);
setTxt('btnToggleMode', d.btnToggleMode);
setTxt('btnNewTour', d.btnNewTour);
setTxt('btnNewSeed', d.btnNewSeed);
setTxt('btnOpenTv', d.btnOpenTv);

if (betAmountInput && d.betAmtPlaceholder) {
betAmountInput.placeholder =
d.betAmtPlaceholder;
}
if (newTableName && d.newTablePlaceholder) {
newTableName.placeholder =
d.newTablePlaceholder;
}
if (btnHostLang) {
btnHostLang.innerHTML =
getLangBtnLabel(lang);
}
}

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
labelSpan.textContent = 'Select...';
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
// next poll will sync
}
}
};
xhr.send(JSON.stringify(payload));
}

// format balance label for host selects
// we show caps or cash currency
function fmtMoney(val, mode) {
var d = getDict();
var v = Math.round(val || 0);
return mode === 'CASH'
? v + (d.curCash || ' $')
: v + (d.curCaps || ' CAPS');
}

// update host controller dom from state
// we keep dropdown selections stable
function renderHost(s) {
if (!s) return;
lastState = s;

var lang = s.lang || 'en';
if (lang !== lastLangSeen) {
lastLangSeen = lang;
applyHostTranslations(lang);
}

var d = getDict();

tourBadge.innerHTML =
d.tourNo +
s.tournamentNumber +
' (' +
d.pubBadge +
s.pubSeed +
')';
screenText.innerHTML =
s.tvScreen === 'PARADE'
? d.scrParade
: s.tvScreen === 'COMBAT'
? d.scrCombat
: d.scrBracket;
modeText.innerHTML =
s.gameMode === 'CASH'
? d.modeCashShort
: d.modePubShort;

btnLiveToggle.innerHTML = s.allowLiveBets
? d.liveBtnOn
: d.liveBtnOff;

var m =
s.matches &&
s.matches[s.currentMatchIndex];
if (s.tvScreen === 'PARADE' && s.parade) {
if (s.parade.finished) {
boutTitle.innerHTML = d.paradeDoneHostTitle;
boutSub.innerHTML = d.paradeDoneHostSub;
} else {
var pk =
s.aliveKnights &&
s.aliveKnights[s.parade.currentIndex];
boutTitle.innerHTML =
d.paradeHostTitle +
(s.parade.currentIndex + 1) +
'/8): ' +
(pk ? pk.name : '');
boutSub.innerHTML = d.paradeHostSub;
}
} else if (m && m.k1 && m.k2) {
boutTitle.innerHTML =
m.stageName +
': ' +
m.k1.name +
' vs ' +
m.k2.name;
var cWait0 =
s.combat &&
s.combat.stepElapsedMs !== undefined
? s.combat.stepElapsedMs / 1000
: 99;
var cRev0 =
s.combat && s.combat.mode === 'JOUST'
? 3.25
: 4.75;
if (
s.tvScreen === 'COMBAT' &&
s.combat &&
s.combat.finished &&
cWait0 >= cRev0
) {
var winK =
s.combat.winnerSide === 1
? m.k1
: m.k2;
boutSub.innerHTML =
d.winnerHost +
winK.name +
d.finishToBracket;
} else {
boutSub.innerHTML =
(s.statusText || '') +
' · ' +
d.k1Short +
Number(m.odds1).toFixed(2) +
' | ' +
d.k2Short +
Number(m.odds2).toFixed(2);
}
} else if (s.champion) {
boutTitle.innerHTML =
d.champHost +
s.champion.secretTitle +
' (' +
s.champion.name +
')';
boutSub.innerHTML = d.tourDoneHost;
}

// update primary start or step button text
// uses server stepElapsedMs so tab wake works
var cWait =
s.combat &&
s.combat.stepElapsedMs !== undefined
? s.combat.stepElapsedMs / 1000
: 99;
var cReveal =
s.combat && s.combat.mode === 'JOUST'
? 3.25
: 4.75;

if (s.tvScreen === 'PARADE') {
if (s.parade && s.parade.finished) {
btnStartStep.innerHTML = d.btnCloseBonus;
} else {
btnStartStep.innerHTML = d.btnSkipParade;
}
} else if (
s.tvScreen === 'COMBAT' &&
s.combat
) {
if (cWait < cReveal) {
btnStartStep.innerHTML =
d.btnPhaseRunning;
} else if (s.combat.finished) {
btnStartStep.innerHTML = d.btnToBracket;
} else if (s.combat.pausedForBets) {
btnStartStep.innerHTML = d.btnNextPhase;
} else {
btnStartStep.innerHTML =
d.btnPhaseRunning;
}
} else {
btnStartStep.innerHTML = d.btnStartBout;
}

// update economy labels by mode
// switches between pub caps and cash bank
var isCash = s.gameMode === 'CASH';
var curSym = d.curCash || ' $';
document.getElementById(
'economySectionTitle'
).innerHTML = isCash
? d.econCashTitle
: d.econPubTitle;
document.getElementById(
'creditLabel'
).innerHTML = isCash
? d.creditCashLbl
: d.creditPubLbl;
document.getElementById(
'btnAddDrink'
).innerHTML = isCash
? '+100' + curSym
: d.addDrinkPub;
document.getElementById(
'btnAddFood'
).innerHTML = isCash
? '+200' + curSym
: d.addFoodPub;
document.getElementById(
'btnAddSet'
).innerHTML = isCash
? '+500' + curSym
: d.addSetPub;
document.getElementById(
'prizeRedeemBlock'
).style.display = isCash
? 'none'
: 'block';

// populate tables dropdown preserving value
// formats each table with current balance
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
// adds +20% bonus tag during parade
var kItems = [];
var bonusMult =
s.tvScreen === 'PARADE' ? 1.2 : 1.0;
var bonusLabel =
s.tvScreen === 'PARADE'
? d.bonusTag20
: '';

if (betMode === 'MATCH' && m && m.k1 && m.k2) {
kItems.push({
value: m.k1.id,
text:
m.k1.name +
d.boutOpt +
(Number(m.odds1) * bonusMult).toFixed(2) +
')' +
bonusLabel
});
kItems.push({
value: m.k2.id,
text:
m.k2.name +
d.boutOpt +
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
d.tourOpt +
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
// lists localized prizes and caps cost
var pItems = [];
var prizes = s.prizes || [];
for (var p = 0; p < prizes.length; p++) {
var pr = prizes[p];
pItems.push({
value: pr.id,
text:
pr.title +
' (' +
pr.cost +
d.curCaps +
')'
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
// next poll will retry
}
}
};
xhr.send();
}

// bind button click listeners on phone
// sends presenter commands to server
btnStartStep.onclick = function () {
sendAction({ type: 'combat_step' });
};

if (btnHostLang) {
btnHostLang.onclick = function () {
sendAction({ type: 'cycle_lang' });
};
}

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
// fills amount input with chip value
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
// awards 100 200 or 500 to selected table
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
