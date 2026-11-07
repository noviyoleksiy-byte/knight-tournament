// applique paper cutout artist for knights
// we draw stout beer knights and ponies
(function (global) {
'use strict';

// preload brand icon and full logo svgs
// used on parade banners wall and flags
var rowanIconImg = null;
var rowanFullLogoImg = null;
if (typeof Image !== 'undefined') {
rowanIconImg = new Image();
rowanIconImg.src =
'assets/aistudio/rowan-icon.svg';
rowanFullLogoImg = new Image();
rowanFullLogoImg.src =
'assets/aistudio/rowan-events-option-1_004e6aed.svg';
}

// 6 armor color themes without any yellow
// we define main dark light and trim hex
var ARMOR_COLORS = [
{
main: '#BE123C',
dark: '#881337',
light: '#F43F5E',
trim: '#E2E8F0'
},
{
main: '#1D4ED8',
dark: '#1E3A8A',
light: '#38BDF8',
trim: '#E2E8F0'
},
{
main: '#047857',
dark: '#064E3B',
light: '#34D399',
trim: '#E2E8F0'
},
{
main: '#6D28D9',
dark: '#4C1D95',
light: '#A855F7',
trim: '#22D3EE'
},
{
main: '#334155',
dark: '#0F172A',
light: '#94A3B8',
trim: '#38BDF8'
},
{
main: '#C2410C',
dark: '#7C2D12',
light: '#FB923C',
trim: '#E2E8F0'
}
];

// 10 chubby pony coat palettes
// we set body leg belly mane and spots
var HORSE_COATS = [
{
body: '#1E293B',
leg: '#0F172A',
belly: '#475569',
mane: '#090D16',
sock: '#CBD5E1',
spot: null
},
{
body: '#E2E8F0',
leg: '#CBD5E1',
belly: '#F8FAFC',
mane: '#94A3B8',
sock: '#F8FAFC',
spot: null
},
{
body: '#6B341E',
leg: '#3B1B0E',
belly: '#9A5233',
mane: '#1C1917',
sock: '#1C1917',
spot: null
},
{
body: '#9A3412',
leg: '#7C2D12',
belly: '#C2410C',
mane: '#431407',
sock: '#F1F5F9',
spot: null
},
{
body: '#64748B',
leg: '#475569',
belly: '#CBD5E1',
mane: '#1E293B',
sock: '#E2E8F0',
spot: '#94A3B8'
},
{
body: '#785A46',
leg: '#4A3528',
belly: '#A3836C',
mane: '#1E1B18',
sock: '#1E1B18',
spot: null
},
{
body: '#CBD5E1',
leg: '#94A3B8',
belly: '#F1F5F9',
mane: '#334155',
sock: '#334155',
spot: '#1E293B'
},
{
body: '#291814',
leg: '#140B09',
belly: '#573226',
mane: '#090D16',
sock: '#9A3412',
spot: '#7C2D12'
},
{
body: '#334155',
leg: '#1E293B',
belly: '#F1F5F9',
mane: '#E2E8F0',
sock: '#F8FAFC',
spot: '#F1F5F9'
},
{
body: '#475569',
leg: '#334155',
belly: '#94A3B8',
mane: '#0F172A',
sock: '#CBD5E1',
spot: '#CBD5E1'
}
];

// get knight armor palette safely
// we wrap index into six color slots
function getArmor(idx) {
var i = Math.abs(idx || 0) % 6;
return ARMOR_COLORS[i];
}

// get chubby pony coat palette safely
// we wrap index into ten horse slots
function getHorse(idx) {
var i = Math.abs(idx || 0) % 10;
return HORSE_COATS[i];
}

// draw rounded rectangle applique piece
// we support old android canvas safely
function fillRoundBox(
ctx,
x,
y,
w,
h,
r,
fillHex,
strokeHex,
lineW
) {
var rad = Math.min(r, w / 2, h / 2);
ctx.beginPath();
ctx.moveTo(x + rad, y);
ctx.lineTo(x + w - rad, y);
ctx.quadraticCurveTo(
x + w,
y,
x + w,
y + rad
);
ctx.lineTo(x + w, y + h - rad);
ctx.quadraticCurveTo(
x + w,
y + h,
x + w - rad,
y + h
);
ctx.lineTo(x + rad, y + h);
ctx.quadraticCurveTo(
x,
y + h,
x,
y + h - rad
);
ctx.lineTo(x, y + rad);
ctx.quadraticCurveTo(
x,
y,
x + rad,
y
);
ctx.closePath();
if (fillHex) {
ctx.fillStyle = fillHex;
ctx.fill();
}
if (strokeHex) {
ctx.strokeStyle = strokeHex;
ctx.lineWidth = lineW || 2;
ctx.stroke();
}
}

// draw cute pony leg with sock and hoof
// we pivot from top hip like purple-fox
function drawPonyLeg(
ctx,
x,
y,
angleDeg,
coatColor,
sockColor
) {
ctx.save();
ctx.translate(x + 7, y);
ctx.rotate((angleDeg * Math.PI) / 180);
ctx.translate(-7, 0);

fillRoundBox(
ctx,
0,
0,
15,
30,
7,
coatColor,
'#0F172A',
1.5
);

fillRoundBox(
ctx,
2,
21,
11,
18,
5,
sockColor,
null,
0
);

ctx.fillStyle = '#090D16';
ctx.beginPath();
ctx.ellipse(
7.5,
40,
6.8,
4.0,
0,
0,
Math.PI * 2
);
ctx.fill();

ctx.restore();
}

// draw real flowing horse tail with hairs
// docked at rump and hanging down in strands
function drawHorseTail(
ctx,
x,
y,
waveDeg,
maneHex
) {
ctx.save();
ctx.translate(x, y);
ctx.rotate((waveDeg * Math.PI) / 180);

ctx.fillStyle = maneHex;
ctx.strokeStyle = '#090D16';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.bezierCurveTo(-18, -8, -36, 6, -38, 28);
ctx.bezierCurveTo(-40, 46, -32, 62, -24, 68);
ctx.lineTo(-18, 54);
ctx.lineTo(-12, 66);
ctx.lineTo(-6, 50);
ctx.bezierCurveTo(-4, 32, -6, 14, 0, 6);
ctx.closePath();
ctx.fill();
ctx.stroke();

ctx.strokeStyle = 'rgba(241,245,249,0.24)';
ctx.lineWidth = 1.5;
ctx.beginPath();
ctx.moveTo(-6, 4);
ctx.quadraticCurveTo(-24, 20, -26, 52);
ctx.moveTo(-10, 8);
ctx.quadraticCurveTo(-30, 26, -32, 56);
ctx.stroke();

ctx.restore();
}

// trace 12 distinct shield silhouettes
// we reuse exact path for clip and rim
function traceShieldPath(ctx, r, sType) {
ctx.beginPath();
if (sType === 0 || sType === 8) {
// kite shield (каплевидный)
ctx.moveTo(-r, -r * 0.85);
ctx.lineTo(r, -r * 0.85);
ctx.lineTo(r, r * 0.15);
ctx.quadraticCurveTo(
r,
r * 0.85,
0,
r * 1.25
);
ctx.quadraticCurveTo(
-r,
r * 0.85,
-r,
r * 0.15
);
} else if (sType === 1 || sType === 10) {
// classic heater shield (треугольный)
ctx.moveTo(-r, -r * 0.82);
ctx.lineTo(r, -r * 0.82);
ctx.lineTo(r * 0.9, r * 0.25);
ctx.lineTo(0, r * 1.18);
ctx.lineTo(-r * 0.9, r * 0.25);
} else if (sType === 2) {
// round targe shield (круглый)
ctx.arc(0, 0, r * 0.98, 0, Math.PI * 2);
} else if (sType === 3) {
// tall tower pavise (башенный)
ctx.moveTo(-r * 0.88, -r * 1.02);
ctx.lineTo(r * 0.88, -r * 1.02);
ctx.lineTo(r * 0.88, r * 1.02);
ctx.lineTo(-r * 0.88, r * 1.02);
} else if (sType === 4) {
// heraldic lozenge (ромбовидный)
ctx.moveTo(0, -r * 1.18);
ctx.lineTo(r * 0.98, 0);
ctx.lineTo(0, r * 1.18);
ctx.lineTo(-r * 0.98, 0);
} else if (sType === 5) {
// bouched jousting targe with lance notch
ctx.moveTo(-r * 0.92, -r * 0.88);
ctx.lineTo(r * 0.35, -r * 0.88);
ctx.quadraticCurveTo(
r * 0.35,
-r * 0.35,
r * 0.92,
-r * 0.35
);
ctx.lineTo(r * 0.95, r * 0.55);
ctx.lineTo(0, r * 1.12);
ctx.lineTo(-r * 0.95, r * 0.55);
} else if (sType === 6) {
// round-bottomed half-circle shield
ctx.moveTo(-r * 0.92, -r * 0.85);
ctx.lineTo(r * 0.92, -r * 0.85);
ctx.lineTo(r * 0.92, r * 0.15);
ctx.arc(0, r * 0.15, r * 0.92, 0, Math.PI);
} else if (sType === 7) {
// winged flared knight shield
ctx.moveTo(-r * 1.06, -r * 0.88);
ctx.lineTo(r * 1.06, -r * 0.88);
ctx.lineTo(r * 0.82, r * 0.35);
ctx.lineTo(0, r * 1.16);
ctx.lineTo(-r * 0.82, r * 0.35);
} else if (sType === 9) {
// oval cavalry shield
ctx.ellipse(
0,
0,
r * 0.86,
r * 1.12,
0,
0,
Math.PI * 2
);
} else {
// hexagonal coffin shield (sType 11)
ctx.moveTo(-r * 0.58, -r * 1.06);
ctx.lineTo(r * 0.58, -r * 1.06);
ctx.lineTo(r * 0.96, 0);
ctx.lineTo(r * 0.58, r * 1.06);
ctx.lineTo(-r * 0.58, r * 1.06);
ctx.lineTo(-r * 0.96, 0);
}
ctx.closePath();
}

// draw applique shield with 12 blazons
// we add dark outer and silver inner outline
function drawShield(
ctx,
x,
y,
r,
colorIdx,
shieldIdx,
damageState
) {
if (damageState >= 2) {
return;
}
var col = getArmor(colorIdx);
var sType = Math.abs(shieldIdx || 0) % 12;

ctx.save();
ctx.translate(x, y);

traceShieldPath(ctx, r, sType);
ctx.fillStyle = col.main;
ctx.fill();

ctx.save();
ctx.clip();

ctx.fillStyle = '#F8FAFC';
ctx.strokeStyle = '#F8FAFC';
if (sType === 0) {
// 1. straight heraldic cross
ctx.fillRect(
-r * 0.22,
-r * 1.2,
r * 0.44,
r * 2.5
);
ctx.fillRect(
-r * 1.1,
-r * 0.28,
r * 2.2,
r * 0.42
);
} else if (sType === 1) {
// 2. bold upward chevron
ctx.lineWidth = r * 0.36;
ctx.beginPath();
ctx.moveTo(-r * 0.95, r * 0.35);
ctx.lineTo(0, -r * 0.45);
ctx.lineTo(r * 0.95, r * 0.35);
ctx.stroke();
} else if (sType === 2) {
// 3. steel boss umbo and rivets
ctx.beginPath();
ctx.arc(0, 0, r * 0.52, 0, Math.PI * 2);
ctx.fill();
ctx.fillStyle = col.dark;
ctx.beginPath();
ctx.arc(0, 0, r * 0.24, 0, Math.PI * 2);
ctx.fill();
} else if (sType === 3) {
// 4. twin vertical pales (столбы)
ctx.fillRect(
-r * 0.52,
-r * 1.2,
r * 0.28,
2.4 * r
);
ctx.fillRect(
r * 0.24,
-r * 1.2,
r * 0.28,
2.4 * r
);
} else if (sType === 4) {
// 5. central heraldic lozenge
ctx.beginPath();
ctx.moveTo(0, -r * 0.62);
ctx.lineTo(r * 0.54, 0);
ctx.lineTo(0, r * 0.62);
ctx.lineTo(-r * 0.54, 0);
ctx.closePath();
ctx.fill();
} else if (sType === 5) {
// 6. split field with boss on bouched targe
ctx.fillStyle = col.dark;
ctx.fillRect(0, -r * 1.2, r * 1.2, r * 2.4);
ctx.fillStyle = '#F8FAFC';
ctx.beginPath();
ctx.arc(0, r * 0.05, r * 0.36, 0, Math.PI * 2);
ctx.fill();
} else if (sType === 6) {
// 7. diagonal saltire cross (косой крест)
ctx.lineWidth = r * 0.32;
ctx.beginPath();
ctx.moveTo(-r, -r);
ctx.lineTo(r, r);
ctx.moveTo(r, -r);
ctx.lineTo(-r, r);
ctx.stroke();
} else if (sType === 7) {
// 8. horizontal fess band (пояс)
ctx.fillRect(
-r * 1.2,
-r * 0.26,
r * 2.4,
r * 0.52
);
ctx.fillStyle = col.dark;
ctx.fillRect(
-r * 1.2,
-r * 0.08,
r * 2.4,
r * 0.16
);
} else if (sType === 8) {
// 9. crenellated castle chief (зубцы)
ctx.fillRect(
-r * 1.1,
-r * 1.0,
r * 2.2,
r * 0.55
);
ctx.fillRect(
-r * 0.85,
-r * 0.46,
r * 0.36,
r * 0.28
);
ctx.fillRect(
-r * 0.18,
-r * 0.46,
r * 0.36,
r * 0.28
);
ctx.fillRect(
r * 0.49,
-r * 0.46,
r * 0.36,
r * 0.28
);
} else if (sType === 9) {
// 10. three silver heraldic rings
ctx.lineWidth = Math.max(2, r * 0.16);
ctx.beginPath();
ctx.arc(
-r * 0.32,
-r * 0.28,
r * 0.24,
0,
Math.PI * 2
);
ctx.stroke();
ctx.beginPath();
ctx.arc(
r * 0.32,
-r * 0.28,
r * 0.24,
0,
Math.PI * 2
);
ctx.stroke();
ctx.beginPath();
ctx.arc(
0,
r * 0.34,
r * 0.24,
0,
Math.PI * 2
);
ctx.stroke();
} else if (sType === 10) {
// 11. eight-pointed heraldic star
ctx.beginPath();
for (var st = 0; st < 16; st++) {
var sa = (st * Math.PI) / 8;
var sr = st % 2 === 0 ? r * 0.68 : r * 0.26;
var sx = Math.cos(sa) * sr;
var sy = Math.sin(sa) * sr;
if (st === 0) ctx.moveTo(sx, sy);
else ctx.lineTo(sx, sy);
}
ctx.closePath();
ctx.fill();
} else {
// 12. checkered quarters (шахматное поле)
ctx.fillRect(-r * 1.1, -r * 1.2, r * 1.1, r * 1.2);
ctx.fillRect(0, 0, r * 1.1, r * 1.2);
}

if (damageState === 1) {
ctx.strokeStyle = '#090D16';
ctx.lineWidth = Math.max(3, r * 0.22);
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.beginPath();
ctx.moveTo(-r * 0.55, -r * 0.85);
ctx.lineTo(-r * 0.05, -r * 0.2);
ctx.lineTo(r * 0.3, -r * 0.05);
ctx.lineTo(-r * 0.15, r * 0.45);
ctx.lineTo(r * 0.4, r * 0.95);
ctx.stroke();
}

ctx.restore();

traceShieldPath(ctx, r, sType);
ctx.strokeStyle = '#090D16';
ctx.lineWidth = Math.max(4.5, r * 0.26);
ctx.lineJoin = 'round';
ctx.stroke();

ctx.strokeStyle = '#F8FAFC';
ctx.lineWidth = Math.max(2.2, r * 0.13);
ctx.stroke();

ctx.restore();
}

// draw applique helmet in fox style
// we use clean rounded domes and plumes
function drawHelm(
ctx,
x,
y,
r,
colorIdx,
helmIdx,
isTired
) {
var col = getArmor(colorIdx);
var hType = Math.abs(helmIdx || 0) % 6;

ctx.save();
ctx.translate(x, y);

if (!isTired) {
ctx.fillStyle = col.light;
ctx.strokeStyle = '#090D16';
ctx.lineWidth = 1.8;
ctx.beginPath();
ctx.moveTo(-r * 0.1, -r * 0.72);
ctx.bezierCurveTo(
-r * 0.9,
-r * 1.48,
-r * 1.5,
-r * 0.98,
-r * 1.2,
-r * 0.32
);
ctx.quadraticCurveTo(
-r * 0.72,
-r * 0.42,
-r * 0.1,
-r * 0.52
);
ctx.closePath();
ctx.fill();
ctx.stroke();
}

if (hType === 0) {
fillRoundBox(
ctx,
-r * 0.82,
-r * 0.76,
r * 1.64,
r * 1.5,
r * 0.42,
'#CBD5E1',
'#090D16',
2.5
);
ctx.fillStyle = '#F1F5F9';
ctx.strokeStyle = '#090D16';
ctx.lineWidth = 2.2;
ctx.beginPath();
ctx.moveTo(-r * 0.55, -r * 0.52);
ctx.quadraticCurveTo(
-r * 1.4,
-r * 0.9,
-r * 1.1,
-r * 1.45
);
ctx.quadraticCurveTo(
-r * 0.65,
-r * 1.0,
-r * 0.25,
-r * 0.65
);
ctx.closePath();
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.moveTo(r * 0.55, -r * 0.52);
ctx.quadraticCurveTo(
r * 1.3,
-r * 0.9,
r * 1.0,
-r * 1.45
);
ctx.quadraticCurveTo(
r * 0.6,
-r * 1.0,
r * 0.25,
-r * 0.65
);
ctx.closePath();
ctx.fill();
ctx.stroke();
} else if (hType === 1) {
ctx.fillStyle = '#CBD5E1';
ctx.strokeStyle = '#090D16';
ctx.lineWidth = 2.5;
ctx.beginPath();
ctx.moveTo(-r * 0.78, -r * 0.7);
ctx.lineTo(r * 0.45, -r * 0.7);
ctx.lineTo(r * 1.28, r * 0.05);
ctx.lineTo(r * 0.45, r * 0.72);
ctx.lineTo(-r * 0.78, r * 0.72);
ctx.closePath();
ctx.fill();
ctx.stroke();
} else if (hType === 2) {
fillRoundBox(
ctx,
-r * 0.84,
-r * 0.8,
r * 1.68,
r * 1.56,
r * 0.26,
'#94A3B8',
'#090D16',
2.5
);
ctx.fillStyle = col.main;
ctx.fillRect(
-r * 0.13,
-r * 0.74,
r * 0.26,
r * 1.44
);
} else if (hType === 3) {
fillRoundBox(
ctx,
-r * 0.82,
-r * 0.74,
r * 1.64,
r * 1.48,
r * 0.4,
'#CBD5E1',
'#090D16',
2.5
);
ctx.fillStyle = '#D97736';
ctx.strokeStyle = '#090D16';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(-r * 0.72, -r * 0.65);
ctx.lineTo(-r * 0.52, -r * 1.26);
ctx.lineTo(-r * 0.18, -r * 0.78);
ctx.lineTo(0, -r * 1.36);
ctx.lineTo(r * 0.18, -r * 0.78);
ctx.lineTo(r * 0.52, -r * 1.26);
ctx.lineTo(r * 0.72, -r * 0.65);
ctx.closePath();
ctx.fill();
ctx.stroke();
} else if (hType === 4) {
ctx.fillStyle = col.main;
ctx.strokeStyle = '#090D16';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.arc(
0,
-r * 0.35,
r * 0.94,
Math.PI * 1.05,
Math.PI * 1.95
);
ctx.closePath();
ctx.fill();
ctx.stroke();
fillRoundBox(
ctx,
-r * 0.8,
-r * 0.72,
r * 1.6,
r * 1.46,
r * 0.44,
'#E2E8F0',
'#090D16',
2.5
);
} else {
fillRoundBox(
ctx,
-r * 0.86,
-r * 0.72,
r * 1.72,
r * 1.44,
r * 0.36,
'#64748B',
'#090D16',
2.5
);
ctx.fillStyle = col.light;
ctx.fillRect(
-r * 0.8,
-r * 0.46,
r * 1.6,
r * 0.18
);
}

fillRoundBox(
ctx,
-r * 0.14,
-r * 0.16,
r * 0.88,
r * 0.24,
r * 0.08,
'#090D16',
null,
0
);
ctx.fillStyle = isTired ? '#94A3B8' : col.light;
ctx.beginPath();
ctx.arc(
r * 0.38,
-r * 0.04,
r * 0.09,
0,
Math.PI * 2
);
ctx.fill();

ctx.restore();
}

// draw stout beer belly knight body
// we use fox style rounded bean and belly
function drawBeerKnightBody(
ctx,
col,
tired
) {
ctx.fillStyle = '#94A3B8';
ctx.strokeStyle = '#090D16';
ctx.lineWidth = 2.4;
ctx.beginPath();
ctx.moveTo(-20, -34);
ctx.bezierCurveTo(-22, -42, 16, -42, 20, -32);
ctx.bezierCurveTo(32, -16, 34, 6, 18, 12);
ctx.lineTo(-18, 12);
ctx.bezierCurveTo(-26, 6, -24, -18, -20, -34);
ctx.closePath();
ctx.fill();
ctx.stroke();

ctx.fillStyle = col.main;
ctx.beginPath();
ctx.moveTo(-14, -32);
ctx.lineTo(15, -30);
ctx.bezierCurveTo(26, -14, 28, 4, 14, 10);
ctx.lineTo(-14, 10);
ctx.closePath();
ctx.fill();

ctx.fillStyle = col.light;
ctx.globalAlpha = 0.28;
ctx.beginPath();
ctx.ellipse(9, -6, 14, 13, 0, 0, Math.PI * 2);
ctx.fill();
ctx.globalAlpha = 1.0;

fillRoundBox(
ctx,
-22,
-4,
49,
8,
3,
'#1E293B',
'#090D16',
1.5
);
fillRoundBox(
ctx,
16,
-6,
10,
12,
2,
'#D97736',
'#090D16',
1.5
);

if (tired) {
ctx.strokeStyle = '#090D16';
ctx.lineWidth = 2.2;
ctx.beginPath();
ctx.moveTo(-8, -24);
ctx.lineTo(10, -12);
ctx.stroke();
}
}

// draw simple 3-color one-handed weapon
// iron #475569 steel #94A3B8 silver #F8FAFC
function drawWeapon(
ctx,
x,
y,
scale,
weaponIdx,
angleRad
) {
var wType = Math.abs(weaponIdx || 0) % 12;
var IRON = '#475569';
var STEEL = '#94A3B8';
var SILVER = '#F8FAFC';
var INK = '#090D16';

ctx.save();
ctx.translate(x, y);
ctx.rotate(angleRad || 0);
ctx.scale(scale * 1.28, scale * 1.28);

if (wType === 0) {
// 1. one-handed knight arming sword
fillRoundBox(
ctx,
-4.5,
0,
9,
16,
3,
IRON,
INK,
2.4
);
ctx.fillStyle = STEEL;
ctx.strokeStyle = INK;
ctx.lineWidth = 2.4;
ctx.beginPath();
ctx.arc(0, 19, 6.5, 0, Math.PI * 2);
ctx.fill();
ctx.stroke();
fillRoundBox(
ctx,
-18,
-7,
36,
8,
3,
STEEL,
INK,
2.4
);
ctx.fillStyle = SILVER;
ctx.beginPath();
ctx.moveTo(-9, -7);
ctx.lineTo(9, -7);
ctx.lineTo(7, -64);
ctx.lineTo(0, -82);
ctx.lineTo(-7, -64);
ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.fillStyle = STEEL;
ctx.fillRect(-2, -60, 4, 50);
} else if (wType === 1) {
// 2. one-handed bearded battle axe
fillRoundBox(
ctx,
-5,
-68,
10,
86,
4,
IRON,
INK,
2.4
);
fillRoundBox(
ctx,
-7,
-64,
14,
28,
3,
STEEL,
INK,
2.2
);
ctx.fillStyle = SILVER;
ctx.strokeStyle = INK;
ctx.lineWidth = 2.5;
ctx.beginPath();
ctx.moveTo(6, -64);
ctx.quadraticCurveTo(44, -76, 44, -42);
ctx.quadraticCurveTo(44, -10, 6, -24);
ctx.closePath();
ctx.fill();
ctx.stroke();
} else if (wType === 2) {
// 3. one-handed spiked morningstar
fillRoundBox(
ctx,
-5,
-56,
10,
74,
4,
IRON,
INK,
2.4
);
ctx.fillStyle = STEEL;
ctx.strokeStyle = INK;
ctx.lineWidth = 2.5;
ctx.beginPath();
ctx.arc(0, -64, 18, 0, Math.PI * 2);
ctx.fill();
ctx.stroke();
ctx.fillStyle = SILVER;
for (var i = 0; i < 8; i++) {
var a = (i * Math.PI) / 4;
ctx.beginPath();
ctx.moveTo(
Math.cos(a - 0.24) * 16,
-64 + Math.sin(a - 0.24) * 16
);
ctx.lineTo(
Math.cos(a) * 30,
-64 + Math.sin(a) * 30
);
ctx.lineTo(
Math.cos(a + 0.24) * 16,
-64 + Math.sin(a + 0.24) * 16
);
ctx.closePath();
ctx.fill();
ctx.stroke();
}
} else if (wType === 3) {
// 4. one-handed forged spherical mace
fillRoundBox(
ctx,
-5,
-54,
10,
72,
4,
IRON,
INK,
2.4
);
fillRoundBox(
ctx,
-8,
-50,
16,
10,
3,
STEEL,
INK,
2.2
);
ctx.fillStyle = SILVER;
ctx.strokeStyle = INK;
ctx.lineWidth = 2.5;
ctx.beginPath();
ctx.arc(0, -66, 18, 0, Math.PI * 2);
ctx.fill();
ctx.stroke();
fillRoundBox(
ctx,
-21,
-70,
42,
8,
3,
STEEL,
INK,
2.2
);
fillRoundBox(
ctx,
-4,
-87,
8,
38,
3,
STEEL,
INK,
2.2
);
} else if (wType === 4) {
// 5. one-handed crow-beak war pick
fillRoundBox(
ctx,
-5,
-66,
10,
84,
4,
IRON,
INK,
2.4
);
fillRoundBox(
ctx,
-14,
-64,
22,
18,
4,
STEEL,
INK,
2.4
);
ctx.fillStyle = SILVER;
ctx.strokeStyle = INK;
ctx.lineWidth = 2.5;
ctx.beginPath();
ctx.moveTo(6, -64);
ctx.quadraticCurveTo(30, -64, 42, -46);
ctx.quadraticCurveTo(24, -52, 6, -48);
ctx.closePath();
ctx.fill();
ctx.stroke();
} else if (wType === 5) {
// 6. one-handed broad palash with D-guard
fillRoundBox(
ctx,
-4.5,
0,
9,
16,
3,
IRON,
INK,
2.4
);
ctx.strokeStyle = STEEL;
ctx.lineWidth = 4.5;
ctx.beginPath();
ctx.moveTo(-14, -4);
ctx.lineTo(14, -4);
ctx.bezierCurveTo(22, 2, 20, 16, 4, 16);
ctx.stroke();
ctx.strokeStyle = INK;
ctx.lineWidth = 1.8;
ctx.stroke();
ctx.fillStyle = SILVER;
ctx.strokeStyle = INK;
ctx.lineWidth = 2.5;
ctx.beginPath();
ctx.moveTo(-8, -6);
ctx.lineTo(8, -6);
ctx.lineTo(8, -68);
ctx.lineTo(-2, -82);
ctx.lineTo(-8, -68);
ctx.closePath();
ctx.fill();
ctx.stroke();
ctx.fillStyle = STEEL;
ctx.fillRect(-6, -68, 4, 60);
} else if (wType === 6) {
// 7. one-handed chain flail (кистень)
fillRoundBox(
ctx,
-5,
-48,
10,
66,
4,
IRON,
INK,
2.4
);
ctx.strokeStyle = STEEL;
ctx.lineWidth = 5;
ctx.beginPath();
ctx.moveTo(0, -48);
ctx.lineTo(22, -70);
ctx.stroke();
ctx.fillStyle = IRON;
ctx.strokeStyle = INK;
ctx.lineWidth = 2.5;
ctx.beginPath();
ctx.arc(24, -74, 15, 0, Math.PI * 2);
ctx.fill();
ctx.stroke();
ctx.fillStyle = SILVER;
for (var f = 0; f < 6; f++) {
var fa = (f * Math.PI) / 3;
ctx.beginPath();
ctx.arc(
24 + Math.cos(fa) * 15,
-74 + Math.sin(fa) * 15,
4.2,
0,
Math.PI * 2
);
ctx.fill();
ctx.stroke();
}
} else if (wType === 7) {
// 8. one-handed knight warhammer
fillRoundBox(
ctx,
-5,
-64,
10,
82,
4,
IRON,
INK,
2.4
);
fillRoundBox(
ctx,
-24,
-76,
48,
24,
5,
SILVER,
INK,
2.5
);
fillRoundBox(
ctx,
-9,
-76,
18,
24,
2,
STEEL,
INK,
2.2
);
} else if (wType === 8) {
// 9. one-handed six-flanged mace
fillRoundBox(
ctx,
-5,
-56,
10,
74,
4,
IRON,
INK,
2.4
);
ctx.fillStyle = SILVER;
ctx.strokeStyle = INK;
ctx.lineWidth = 2.5;
ctx.beginPath();
ctx.moveTo(-20, -56);
ctx.lineTo(0, -84);
ctx.lineTo(20, -56);
ctx.lineTo(13, -36);
ctx.lineTo(-13, -36);
ctx.closePath();
ctx.fill();
ctx.stroke();
fillRoundBox(
ctx,
-4.5,
-78,
9,
40,
3,
STEEL,
INK,
2
);
} else if (wType === 9) {
// 10. one-handed curved cavalry sabre
fillRoundBox(
ctx,
-4.5,
0,
9,
16,
3,
IRON,
INK,
2.4
);
fillRoundBox(
ctx,
-16,
-6,
32,
7,
3,
STEEL,
INK,
2.2
);
ctx.fillStyle = SILVER;
ctx.strokeStyle = INK;
ctx.lineWidth = 2.5;
ctx.beginPath();
ctx.moveTo(-6, -6);
ctx.quadraticCurveTo(-8, -48, 18, -82);
ctx.quadraticCurveTo(28, -68, 12, -38);
ctx.quadraticCurveTo(4, -20, 6, -6);
ctx.closePath();
ctx.fill();
ctx.stroke();
} else if (wType === 10) {
// 11. one-handed cup-hilt konchar sword
fillRoundBox(
ctx,
-4.5,
0,
9,
16,
3,
IRON,
INK,
2.4
);
ctx.fillStyle = STEEL;
ctx.strokeStyle = INK;
ctx.lineWidth = 2.4;
ctx.beginPath();
ctx.arc(0, -4, 12, Math.PI, 0);
ctx.closePath();
ctx.fill();
ctx.stroke();
fillRoundBox(
ctx,
-18,
-6,
36,
5,
2,
STEEL,
INK,
2
);
ctx.fillStyle = SILVER;
ctx.beginPath();
ctx.moveTo(-6, -10);
ctx.lineTo(6, -10);
ctx.lineTo(0, -86);
ctx.closePath();
ctx.fill();
ctx.stroke();
} else {
// 12. one-handed heavy broad falchion
fillRoundBox(
ctx,
-4.5,
0,
9,
16,
3,
IRON,
INK,
2.4
);
fillRoundBox(
ctx,
-15,
-6,
30,
7,
3,
STEEL,
INK,
2.2
);
ctx.fillStyle = SILVER;
ctx.strokeStyle = INK;
ctx.lineWidth = 2.5;
ctx.beginPath();
ctx.moveTo(-5, -6);
ctx.lineTo(-5, -78);
ctx.lineTo(26, -60);
ctx.lineTo(14, -6);
ctx.closePath();
ctx.fill();
ctx.stroke();
}

ctx.restore();
}

// draw sleek thin tournament lance
// we keep shaft slender with small vamplate
function drawLance(ctx, colorIdx) {
var col = getArmor(colorIdx);
ctx.save();

fillRoundBox(
ctx,
-32,
-2.5,
34,
5,
2,
'#475569',
'#090D16',
1.2
);

ctx.fillStyle = '#94A3B8';
ctx.strokeStyle = '#090D16';
ctx.lineWidth = 1.8;
ctx.beginPath();
ctx.moveTo(-2, -9.5);
ctx.lineTo(10, -4.5);
ctx.lineTo(10, 4.5);
ctx.lineTo(-2, 9.5);
ctx.closePath();
ctx.fill();
ctx.stroke();

ctx.fillStyle = '#F8FAFC';
ctx.beginPath();
ctx.moveTo(10, -4.0);
ctx.lineTo(156, -1.1);
ctx.lineTo(156, 1.1);
ctx.lineTo(10, 4.0);
ctx.closePath();
ctx.fill();
ctx.stroke();

ctx.fillStyle = col.main;
ctx.fillRect(26, -3.4, 16, 6.8);
ctx.fillRect(62, -2.7, 16, 5.4);
ctx.fillRect(98, -2.0, 14, 4.0);

fillRoundBox(
ctx,
154,
-2.6,
7,
5.2,
1.5,
'#94A3B8',
'#090D16',
1.2
);

ctx.restore();
}

// draw heraldic banner with knight shield
// adds silver border for reigning champion
function drawFighterBanner(
ctx,
bx,
by,
bw,
bh,
knight,
isChamp
) {
var cIdx = knight ? knight.colorIdx : 0;
var sIdx = knight ? knight.shieldIdx : 0;
var col = getArmor(cIdx);

// dark stone backing behind banner cloth
ctx.fillStyle = '#1E293B';
ctx.fillRect(bx, by, bw, bh);

var pad = 6;
var cx = bx + pad;
var cy = by + pad;
var cw = bw - pad * 2;
var ch = bh - pad * 2;

// solid single-color cloth background
// avoids diagonal triangle sheen
ctx.fillStyle = col.main;
ctx.fillRect(cx, cy, cw, ch);

// border in gleaming silver for prev champ
if (isChamp) {
ctx.strokeStyle = '#090D16';
ctx.lineWidth = 6;
ctx.strokeRect(cx, cy, cw, ch);

ctx.strokeStyle = '#F8FAFC';
ctx.lineWidth = 4.5;
ctx.strokeRect(cx, cy, cw, ch);

ctx.strokeStyle = '#CBD5E1';
ctx.lineWidth = 2;
ctx.strokeRect(
cx + 5,
cy + 5,
cw - 10,
ch - 10
);
} else {
ctx.strokeStyle = '#090D16';
ctx.lineWidth = 3;
ctx.strokeRect(cx, cy, cw, ch);

ctx.strokeStyle = '#475569';
ctx.lineWidth = 1.5;
ctx.strokeRect(
cx + 3,
cy + 3,
cw - 6,
ch - 6
);
}

// draw knight shield emblem in center
var shR = Math.max(
14,
Math.min(cw, ch) * 0.34
);
drawShield(
ctx,
bx + bw * 0.5,
by + bh * 0.5,
shR,
cIdx,
sIdx,
0
);
}

// draw brand icon on parade side banners
// uses solid dark green logo background
function drawPubLogoBanner(
ctx,
bx,
by,
bw,
bh
) {
ctx.fillStyle = '#1E293B';
ctx.fillRect(bx, by, bw, bh);

var pad = 5;
var cx = bx + pad;
var cy = by + pad;
var cw = bw - pad * 2;
var ch = bh - pad * 2;

// fill solid dark green like logo bg
// avoids white backing around icon
ctx.fillStyle = '#072E1B';
ctx.fillRect(cx, cy, cw, ch);

ctx.strokeStyle = '#090D16';
ctx.lineWidth = 3;
ctx.strokeRect(cx, cy, cw, ch);

// draw rowan icon centered in banner
// blends into solid green cloth
var iconSz = Math.max(
24,
Math.min(cw, ch) - 8
);
var ix = bx + (bw - iconSz) * 0.5;
var iy = by + (bh - iconSz) * 0.5;
if (
rowanIconImg &&
rowanIconImg.complete &&
rowanIconImg.naturalWidth > 0
) {
ctx.drawImage(
rowanIconImg,
ix,
iy,
iconSz,
iconSz
);
}
}

// draw readable banner on castle wall
// stretched on iron wall anchors below merlons
function drawWallCottonBanner(
ctx,
w,
wallTop,
wallH
) {
var by = Math.round(wallTop + 6);
var banH = Math.max(
78,
Math.round(wallH - 8)
);
var banW = Math.round(
banH * (685 / 260) * 1.1
);
var bx = Math.round((w - banW) * 0.5);

var yTopTie = by + 8;
var yBotTie = by + banH - 8;
var xLeftAnchor = bx - 14;
var xRightAnchor = bx + banW + 14;

// drop shadow on stone wall behind banner
// gives depth to stretched wall cloth
fillRoundBox(
ctx,
bx + 3,
by + 4,
banW,
banH,
8,
'rgba(9,13,22,0.38)',
null,
0
);

// forged iron wall anchor plates on stone
// hammered left and right of streamer
ctx.fillStyle = '#1E293B';
ctx.strokeStyle = '#090D16';
ctx.lineWidth = 2;
var anchors = [
[xLeftAnchor, yTopTie],
[xRightAnchor, yTopTie],
[xLeftAnchor, yBotTie],
[xRightAnchor, yBotTie]
];
for (var a = 0; a < anchors.length; a++) {
ctx.beginPath();
ctx.arc(
anchors[a][0],
anchors[a][1],
4.5,
0,
Math.PI * 2
);
ctx.fill();
ctx.stroke();
}

// solid single-color cotton background
// keeps clean colors without triangles
fillRoundBox(
ctx,
bx,
by,
banW,
banH,
8,
'#F5F0E6',
'#072E1B',
3.5
);

// horizontal taut cords from wall anchors
// fastens four corners to castle wall
ctx.strokeStyle = '#090D16';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(xLeftAnchor, yTopTie);
ctx.lineTo(bx + 7, yTopTie);
ctx.moveTo(xRightAnchor, yTopTie);
ctx.lineTo(bx + banW - 7, yTopTie);
ctx.moveTo(xLeftAnchor, yBotTie);
ctx.lineTo(bx + 7, yBotTie);
ctx.moveTo(xRightAnchor, yBotTie);
ctx.lineTo(bx + banW - 7, yBotTie);
ctx.stroke();

// corner grommets where cords tie in
// small dark green rings on cotton
ctx.fillStyle = '#072E1B';
var grommets = [
[bx + 7, yTopTie],
[bx + banW - 7, yTopTie],
[bx + 7, yBotTie],
[bx + banW - 7, yBotTie]
];
for (var g = 0; g < grommets.length; g++) {
ctx.beginPath();
ctx.arc(
grommets[g][0],
grommets[g][1],
2.8,
0,
Math.PI * 2
);
ctx.fill();
}

// draw full rowan events logo large
// fills banner for clear readability
if (
rowanFullLogoImg &&
rowanFullLogoImg.complete &&
rowanFullLogoImg.naturalWidth > 0
) {
var lh = banH - 10;
var lw = Math.round(lh * (685 / 260));
var lx = Math.round(
bx + (banW - lw) * 0.5
);
var ly = Math.round(
by + (banH - lh) * 0.5
);
ctx.drawImage(
rowanFullLogoImg,
lx,
ly,
lw,
lh
);
}
}

// draw castle wall spectators and meadow
// crowd cheers in melee and on victory
function drawCastleScene(
ctx,
w,
h,
wallBottomY,
showRail,
animPhase,
crowdMood,
leftKnight,
rightKnight,
lastChampId,
windDir
) {
var t = animPhase || 0;
var noCrowd = crowdMood === 'NONE';
var isVictory = crowdMood === 'VICTORY';
var isCheer =
isVictory || crowdMood === 'CHEER';

// 1. twilight slate sky backdrop
ctx.fillStyle = '#1E293B';
ctx.fillRect(0, 0, w, wallBottomY);

var wallH = Math.max(
68,
Math.round(wallBottomY * 0.4)
);
var wallTop = wallBottomY - wallH;
var merlonW = Math.max(22, Math.floor(w / 32));
var gapW = Math.max(14, Math.floor(merlonW * 0.62));
var stepX = merlonW + gapW;
var merlonH = Math.max(
14,
Math.round(wallH * 0.26)
);

// 2. banners on left and right of spectators
// shows fighter shields or brand icon on parade
if (w >= 600 && !noCrowd) {
var towerW = Math.max(48, w * 0.08);
var towerTop = 4;
var bannerH = Math.max(
36,
wallTop - towerTop + 2
);
var isChampL = Boolean(
leftKnight &&
lastChampId &&
leftKnight.id === lastChampId
);
var isChampR = Boolean(
rightKnight &&
lastChampId &&
rightKnight.id === lastChampId
);
if (leftKnight) {
drawFighterBanner(
ctx,
w * 0.05,
towerTop,
towerW,
bannerH,
leftKnight,
isChampL
);
} else {
drawPubLogoBanner(
ctx,
w * 0.05,
towerTop,
towerW,
bannerH
);
}
if (rightKnight) {
drawFighterBanner(
ctx,
w * 0.87,
towerTop,
towerW,
bannerH,
rightKnight,
isChampR
);
} else {
drawPubLogoBanner(
ctx,
w * 0.87,
towerTop,
towerW,
bannerH
);
}
}

// 3. 5 tiered rows of larger spectators
// skipped on waiting screen when noCrowd
if (w >= 600 && !noCrowd) {
var stLeft = w * 0.132;
var stRight = w * 0.868;
var standsTop = 4;
var numRows = wallTop > 130 ? 5 : 4;
var rowStep = Math.floor(
(wallTop - standsTop - 6) / numRows
);

ctx.fillStyle = '#151E2E';
ctx.fillRect(
stLeft,
standsTop,
stRight - stLeft,
wallTop - standsTop + 8
);

var seatStep = 38;
for (var row = 0; row < numRows; row++) {
var rowY = standsTop + 16 + row * rowStep;
ctx.strokeStyle = 'rgba(248,250,252,0.10)';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(stLeft, rowY + 14);
ctx.lineTo(stRight, rowY + 14);
ctx.stroke();

for (
var sx = stLeft + 22;
sx < stRight - 20;
sx += seatStep
) {
var seed =
Math.round(sx / seatStep) + row * 19;
var bounceSpeed = isVictory
? 9.0
: isCheer
? 7.0
: 3.0;
var bounceAmp = isVictory
? 7.5
: isCheer
? 5.2
: 2.0;
var bob =
Math.abs(
Math.sin(t * bounceSpeed + seed * 1.3)
) * bounceAmp;

var px = sx + (row % 2) * 16;
var py = rowY - bob;

// larger spectator shoulders (r = 12.2)
var tunicIdx = seed % 5;
ctx.fillStyle =
tunicIdx === 0
? '#7C2D12'
: tunicIdx === 1
? '#1E3A8A'
: tunicIdx === 2
? '#701A75'
: tunicIdx === 3
? '#065F46'
: '#881337';
ctx.beginPath();
ctx.arc(px, py + 10, 12.2, Math.PI, 0);
ctx.fill();

// larger spectator head (r = 7.8)
ctx.fillStyle = '#FED7AA';
ctx.beginPath();
ctx.arc(px, py - 2, 7.8, 0, Math.PI * 2);
ctx.fill();

// wave arms when cheering in melee or win
if (isCheer) {
ctx.strokeStyle = '#FED7AA';
ctx.lineWidth = 3;
var armWave =
Math.sin(t * 10 + seed) * 6;
ctx.beginPath();
ctx.moveTo(px - 8, py + 5);
ctx.lineTo(px - 14, py - 8 + armWave);
ctx.moveTo(px + 8, py + 5);
ctx.lineTo(px + 14, py - 8 - armWave);
ctx.stroke();
}
}
}
}

// 4. crenellated stone castle wall in front
ctx.fillStyle = '#475569';
ctx.fillRect(0, wallTop, w, wallH);

// draw battlements (зубцы крепостной стены)
ctx.fillStyle = '#64748B';
for (var mx = 8; mx < w; mx += stepX) {
ctx.fillRect(
mx,
wallTop - merlonH,
merlonW,
merlonH + 2
);
ctx.strokeRect(
mx,
wallTop - merlonH,
merlonW,
merlonH
);
}

// stone masonry courses on castle wall
ctx.strokeStyle = '#334155';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(0, wallTop + wallH * 0.48);
ctx.lineTo(w, wallTop + wallH * 0.48);
ctx.stroke();

ctx.strokeStyle = '#090D16';
ctx.lineWidth = 2.5;
ctx.beginPath();
ctx.moveTo(0, wallTop);
ctx.lineTo(w, wallTop);
ctx.moveTo(0, wallBottomY);
ctx.lineTo(w, wallBottomY);
ctx.stroke();

// 5. dark-green meadow lawn (лужайка)
ctx.fillStyle = '#14532D';
ctx.fillRect(
0,
wallBottomY,
w,
h - wallBottomY
);

// lush upper meadow band & turf stripes
var lawnH = h - wallBottomY;
ctx.fillStyle = '#15803D';
ctx.fillRect(0, wallBottomY, w, lawnH * 0.18);

ctx.fillStyle = '#166534';
ctx.fillRect(
0,
wallBottomY + lawnH * 0.36,
w,
lawnH * 0.22
);
ctx.fillRect(
0,
wallBottomY + lawnH * 0.74,
w,
lawnH * 0.16
);

// readable banner with full logo on wall
// drawn after lawn so bottom is not clipped
if (w >= 600 && !noCrowd) {
drawWallCottonBanner(
ctx,
w,
wallTop,
wallH,
merlonH
);
}

// 6. solid green flags along jousting lists
// uses logo background color without white
if (showRail) {
var wDir = windDir || 0;
var hasIcon = Boolean(
rowanIconImg &&
rowanIconImg.complete &&
rowanIconImg.naturalWidth > 0
);
for (var rx = 135; rx < w - 125; rx += 190) {
// tall iron flagpole post in turf
fillRoundBox(
ctx,
rx - 3,
318,
6,
108,
2,
'#475569',
'#090D16',
2
);

// dark iron finial ball atop pole
ctx.fillStyle = '#475569';
ctx.strokeStyle = '#090D16';
ctx.lineWidth = 1.8;
ctx.beginPath();
ctx.arc(rx, 314, 5.2, 0, Math.PI * 2);
ctx.fill();
ctx.stroke();

if (wDir === 0) {
// calm wind: solid green banner under bar
fillRoundBox(
ctx,
rx - 29,
320,
58,
4,
2,
'#334155',
'#090D16',
1.5
);
ctx.fillStyle = '#072E1B';
ctx.strokeStyle = '#090D16';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(rx - 26, 324);
ctx.lineTo(rx + 26, 324);
ctx.lineTo(rx + 26, 380);
ctx.lineTo(rx - 26, 380);
ctx.closePath();
ctx.fill();
ctx.stroke();

if (hasIcon) {
ctx.drawImage(
rowanIconImg,
rx - 23,
329,
46,
46
);
}
} else {
// wind blowing left (-1) or right (+1)
var wave =
Math.sin(t * 7.5 + rx * 0.04) * 4.5;
var fW = 62;
var fH = 54;
var tipX = rx + wDir * fW;
var midX = rx + wDir * (fW * 0.5);
var topY = 322;

ctx.fillStyle = '#072E1B';
ctx.strokeStyle = '#090D16';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(rx + wDir * 3, topY);
ctx.quadraticCurveTo(
midX,
topY - 2 + wave * 0.5,
tipX,
topY + 2 + wave
);
ctx.lineTo(tipX, topY + fH - 2 + wave);
ctx.quadraticCurveTo(
midX,
topY + fH + 2 + wave * 0.5,
rx + wDir * 3,
topY + fH
);
ctx.closePath();
ctx.fill();
ctx.stroke();

if (hasIcon) {
var icSz = 46;
var icX =
wDir > 0
? rx + 9
: rx - 9 - icSz;
var icY =
topY +
(fH - icSz) * 0.5 +
wave * 0.45;
ctx.drawImage(
rowanIconImg,
icX,
icY,
icSz,
icSz
);
}
}
}
}
}

// draw fallen knight lying on arena grass
// we render when rider is unseated by lance
function drawFallenKnightOnGround(
ctx,
x,
y,
facing,
knight
) {
if (!knight) return;
var col = getArmor(knight.colorIdx);
ctx.save();
ctx.translate(x, y);
ctx.scale(facing, Math.abs(facing));

// dark turf shadow under fallen knight
ctx.fillStyle = 'rgba(9,13,22,0.38)';
ctx.beginPath();
ctx.ellipse(0, 14, 58, 14, 0, 0, Math.PI * 2);
ctx.fill();

// knight lying on his back on the meadow
ctx.save();
ctx.rotate(-1.42);
fillRoundBox(
ctx,
-12,
8,
14,
28,
6,
'#64748B',
'#090D16',
2
);
fillRoundBox(
ctx,
4,
12,
14,
26,
6,
'#475569',
'#090D16',
2
);
drawBeerKnightBody(ctx, col, true);
drawHelm(
ctx,
0,
-48,
18,
knight.colorIdx,
knight.helmIdx,
true
);
ctx.restore();

// dropped shield on grass nearby
drawShield(
ctx,
36,
10,
18,
knight.colorIdx,
knight.shieldIdx,
knight.shieldDamage || 0
);

ctx.restore();
}

// draw chubby pony and stout beer knight
// horse_only_idle stops legs at rail end
function drawMountedKnight(
ctx,
x,
y,
facing,
knight,
animPhase,
poseState
) {
if (!knight) return;
var col = getArmor(knight.colorIdx);
var coat = getHorse(knight.horseIdx);
var tired = knight.isTired || false;
var shDmg = knight.shieldDamage || 0;

ctx.save();
ctx.translate(x, y);
ctx.scale(facing, Math.abs(facing));

var hasRider =
poseState !== 'horse_only' &&
poseState !== 'horse_only_run' &&
poseState !== 'horse_only_idle';
var isRun =
poseState === 'run' ||
poseState === 'horse_only_run';
var isStoppedHorse =
poseState === 'horse_only_idle';
var isRear =
hasRider &&
(poseState === 'rear' ||
poseState === 'victory');

var bounceY = isRun
? Math.sin(animPhase * 14) * 4.5
: isStoppedHorse || isRear
? 0
: Math.sin(animPhase * 3.5) * 1.5;

ctx.translate(-122, -88 + bounceY);

// pivot horse onto hind legs when rearing
var rearDeg = isRear
? -26 + Math.sin(animPhase * 6) * 2.5
: 0;
if (isRear) {
ctx.translate(88, 108);
ctx.rotate((rearDeg * Math.PI) / 180);
ctx.translate(-88, -108);
}

var hindLegA = isRun
? Math.sin(animPhase * 14) * 30
: isRear
? -rearDeg + 4
: 0;
var hindLegB = isRun
? -Math.sin(animPhase * 14) * 30
: isRear
? -rearDeg - 2
: 0;
var frontLegA = isRun
? Math.sin(animPhase * 14) * 30
: isRear
? -34 + Math.sin(animPhase * 8) * 14
: 0;
var frontLegB = isRun
? -Math.sin(animPhase * 14) * 30
: isRear
? -18 - Math.sin(animPhase * 8) * 14
: 0;
var tailWave = isRun
? 18 + Math.sin(animPhase * 14) * 12
: isRear
? 24 + Math.sin(animPhase * 6) * 6
: isStoppedHorse
? 4
: Math.sin(animPhase * 3) * 5;

// 1. horse tail hanging from rump
drawHorseTail(
ctx,
66,
64,
tailWave,
coat.mane
);

// 2. far pony legs (hind and front)
drawPonyLeg(
ctx,
98,
96,
hindLegA,
coat.leg,
coat.sock
);
drawPonyLeg(
ctx,
150,
94,
frontLegB,
coat.leg,
coat.sock
);

// 3. chubby pony bean body
ctx.fillStyle = coat.body;
ctx.strokeStyle = '#090D16';
ctx.lineWidth = 2.4;
ctx.beginPath();
ctx.moveTo(64, 74);
ctx.bezierCurveTo(62, 52, 84, 44, 114, 44);
ctx.bezierCurveTo(146, 44, 166, 52, 174, 70);
ctx.bezierCurveTo(182, 86, 176, 102, 158, 104);
ctx.lineTo(80, 104);
ctx.bezierCurveTo(64, 102, 58, 88, 64, 74);
ctx.closePath();
ctx.fill();
ctx.stroke();

// 4. pale rounded belly ellipse
ctx.fillStyle = coat.belly;
ctx.beginPath();
ctx.ellipse(
116,
96,
35,
11,
0,
0,
Math.PI * 2
);
ctx.fill();

if (coat.spot) {
ctx.fillStyle = coat.spot;
ctx.beginPath();
ctx.arc(84, 68, 7.5, 0, Math.PI * 2);
ctx.arc(98, 60, 5.5, 0, Math.PI * 2);
ctx.arc(88, 80, 4.5, 0, Math.PI * 2);
ctx.fill();
}

// 5. heraldic saddle blanket
ctx.fillStyle = col.main;
ctx.strokeStyle = '#090D16';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(86, 45);
ctx.lineTo(148, 45);
ctx.lineTo(154, 82);
ctx.lineTo(116, 90);
ctx.lineTo(80, 82);
ctx.closePath();
ctx.fill();
ctx.stroke();

// 6. near pony legs (hind and front)
drawPonyLeg(
ctx,
78,
94,
hindLegB,
coat.body,
coat.sock
);
drawPonyLeg(
ctx,
132,
96,
frontLegA,
coat.body,
coat.sock
);

// 7. cute pony head and ears
ctx.save();
var headDroop = tired ? 10 : 0;
var headTilt = isRear
? 14
: isRun
? 4
: 0;
ctx.translate(172, 62);
ctx.rotate(
((headDroop + headTilt) * Math.PI) /
180
);
ctx.translate(-172, -62);

ctx.fillStyle = coat.mane;
ctx.beginPath();
ctx.moveTo(152, 48);
ctx.quadraticCurveTo(162, 24, 180, 26);
ctx.lineTo(174, 56);
ctx.closePath();
ctx.fill();

ctx.fillStyle = coat.leg;
ctx.beginPath();
ctx.moveTo(170, 34);
ctx.lineTo(164, 13);
ctx.lineTo(182, 28);
ctx.closePath();
ctx.fill();

ctx.fillStyle = coat.body;
ctx.beginPath();
ctx.moveTo(186, 30);
ctx.lineTo(196, 11);
ctx.lineTo(176, 28);
ctx.closePath();
ctx.fill();

ctx.fillStyle = col.light;
ctx.beginPath();
ctx.moveTo(185, 26);
ctx.lineTo(192, 16);
ctx.lineTo(179, 25);
ctx.closePath();
ctx.fill();

ctx.fillStyle = coat.body;
ctx.strokeStyle = '#090D16';
ctx.lineWidth = 2.2;
ctx.beginPath();
ctx.ellipse(182, 48, 24, 21, 0, 0, Math.PI * 2);
ctx.fill();
ctx.stroke();

fillRoundBox(
ctx,
190,
36,
33,
23,
10,
coat.body,
'#090D16',
2.2
);
fillRoundBox(
ctx,
210,
38,
14,
19,
7,
coat.belly,
null,
0
);

ctx.strokeStyle = col.main;
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(174, 40);
ctx.lineTo(210, 48);
ctx.stroke();

ctx.fillStyle = '#090D16';
ctx.beginPath();
ctx.arc(190, 42, 3.6, 0, Math.PI * 2);
ctx.arc(218, 45, 2.2, 0, Math.PI * 2);
ctx.fill();

if (tired) {
ctx.fillStyle = 'rgba(241,245,249,0.75)';
var puff =
Math.abs(Math.sin(animPhase * 5)) * 8;
ctx.beginPath();
ctx.arc(
230 + puff,
48,
5 + puff * 0.3,
0,
Math.PI * 2
);
ctx.fill();
}
ctx.restore();

// 8. draw knight in saddle unless unseated
if (hasRider) {
ctx.save();
ctx.translate(116, 46);
if (isRear) {
ctx.rotate(0.22);
}

fillRoundBox(
ctx,
-5,
6,
14,
24,
6,
'#64748B',
'#090D16',
2
);

drawBeerKnightBody(ctx, col, tired);

if (
knight.weaponIdx !== undefined &&
knight.weaponIdx !== null &&
knight.weaponIdx >= 0
) {
drawWeapon(
ctx,
-22,
-18,
0.58,
knight.weaponIdx,
-0.45
);
}

drawHelm(
ctx,
0,
-48,
17,
knight.colorIdx,
knight.helmIdx,
tired
);

if (poseState !== 'parade_no_lance') {
ctx.save();
var lAng =
poseState === 'victory'
? -0.82
: poseState === 'rear'
? -0.64
: poseState === 'ready'
? -0.38
: 0.02;
ctx.translate(8, -16);
ctx.rotate(lAng);
drawLance(ctx, knight.colorIdx);
ctx.restore();
}

drawShield(
ctx,
12,
-12,
18,
knight.colorIdx,
knight.shieldIdx,
shDmg
);

ctx.restore();
}

ctx.restore();
}

// draw stout foot knight for melee duel
// supports guard windup strike block kneel
function drawFootKnight(
ctx,
x,
y,
facing,
knight,
animPhase,
meleeState
) {
if (!knight) return;
var col = getArmor(knight.colorIdx);
var tired = knight.isTired || false;
var shDmg = knight.shieldDamage || 0;

ctx.save();
ctx.translate(x, y);
ctx.scale(facing, Math.abs(facing));

var isKneel = meleeState === 'kneel';
var isWindup = meleeState === 'windup';
var isStrike = meleeState === 'strike';
var isBlock = meleeState === 'block';

var slump = 0;
if (isKneel) {
slump = 0.36;
} else if (isWindup) {
slump = -0.10;
} else if (isStrike) {
slump = 0.14;
} else if (isBlock) {
slump = -0.08;
} else if (tired) {
slump = 0.12 + Math.sin(animPhase * 3) * 0.03;
}

var dropY = isKneel ? 22 : tired ? 4 : 0;
ctx.translate(0, dropY);

var stride = 0;
if (isStrike) {
stride = 14;
} else if (isWindup) {
stride = 5;
} else if (isBlock) {
stride = -8;
}

fillRoundBox(
ctx,
-16 - stride * 0.4,
6,
14,
30,
6,
'#64748B',
'#090D16',
2.2
);
fillRoundBox(
ctx,
4 + stride,
6,
14,
30,
6,
'#475569',
'#090D16',
2.2
);

ctx.save();
ctx.rotate(slump);

drawBeerKnightBody(ctx, col, tired);

drawHelm(
ctx,
0,
-52,
19,
knight.colorIdx,
knight.helmIdx,
tired || isKneel
);

if (tired && !isKneel) {
ctx.fillStyle = 'rgba(241,245,249,0.65)';
var br =
Math.abs(Math.sin(animPhase * 4)) * 8;
ctx.beginPath();
ctx.arc(
22 + br,
-52,
4.5 + br * 0.3,
0,
Math.PI * 2
);
ctx.fill();
}

var swingAng = 0.35;
var wepX = 14;
var wepY = -22;
if (isWindup) {
swingAng = -0.58;
wepX = 6;
wepY = -30;
} else if (isStrike) {
swingAng = 1.46;
wepX = 24;
wepY = -16;
} else if (isBlock) {
swingAng = shDmg >= 2 ? 0.72 : 0.12;
wepX = shDmg >= 2 ? 20 : 6;
wepY = -24;
} else if (isKneel) {
swingAng = 2.05;
} else if (tired) {
swingAng = 0.75;
}

var shX = 12;
var shY = -14;
var shR = 20;
if (isBlock) {
shX = 25;
shY = -20;
shR = 22;
} else if (isStrike) {
shX = 6;
shY = -12;
}

// draw striking weapon over shield
if (isStrike || isWindup) {
drawShield(
ctx,
shX,
shY,
shR,
knight.colorIdx,
knight.shieldIdx,
shDmg
);
drawWeapon(
ctx,
wepX,
wepY,
0.95,
knight.weaponIdx,
swingAng
);
} else {
drawWeapon(
ctx,
wepX,
wepY,
0.95,
knight.weaponIdx,
swingAng
);
drawShield(
ctx,
shX,
shY,
shR,
knight.colorIdx,
knight.shieldIdx,
shDmg
);
}

ctx.restore();
ctx.restore();
}

// draw iron and stone weapon rack for parade
// spaces out all 12 3-color steel weapons
function drawWeaponRack(
ctx,
x,
y,
takenMap
) {
ctx.save();
ctx.translate(x, y);

fillRoundBox(
ctx,
-185,
36,
370,
18,
6,
'#334155',
'#090D16',
2.5
);
fillRoundBox(
ctx,
-170,
-58,
14,
98,
4,
'#475569',
'#090D16',
2.2
);
fillRoundBox(
ctx,
156,
-58,
14,
98,
4,
'#475569',
'#090D16',
2.2
);
fillRoundBox(
ctx,
-180,
-26,
360,
12,
4,
'#64748B',
'#090D16',
2.2
);

for (var i = 0; i < 12; i++) {
if (takenMap && takenMap[i]) continue;
var wx = -148 + i * 27;
drawWeapon(ctx, wx, 34, 0.65, i, 0);
}

ctx.restore();
}

function drawPortrait(
ctx,
w,
h,
knight
) {
ctx.clearRect(0, 0, w, h);
if (!knight) return;
var r = Math.min(w, h) * 0.27;
drawHelm(
ctx,
w * 0.35,
h * 0.56,
r,
knight.colorIdx,
knight.helmIdx,
false
);
drawShield(
ctx,
w * 0.7,
h * 0.54,
r * 0.86,
knight.colorIdx,
knight.shieldIdx,
knight.shieldDamage || 0
);
}

global.KnightArt = {
drawShield: drawShield,
drawHelm: drawHelm,
drawWeapon: drawWeapon,
drawWeaponRack: drawWeaponRack,
drawCastleScene: drawCastleScene,
drawPortrait: drawPortrait,
drawMountedKnight: drawMountedKnight,
drawFallenKnightOnGround:
drawFallenKnightOnGround,
drawFootKnight: drawFootKnight,
getArmor: getArmor
};
})(window);
