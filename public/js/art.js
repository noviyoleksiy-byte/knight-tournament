// applique paper cutout artist for knights
// we draw stout beer knights and ponies
(function (global) {
'use strict';

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

// trace shield path helper for double border
// we reuse exact silhouette for clip and rim
function traceShieldPath(ctx, r, sType) {
ctx.beginPath();
if (sType === 0) {
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
} else if (sType === 1) {
ctx.moveTo(-r, -r * 0.82);
ctx.lineTo(r, -r * 0.82);
ctx.lineTo(r * 0.88, r * 0.25);
ctx.lineTo(0, r * 1.15);
ctx.lineTo(-r * 0.88, r * 0.25);
} else if (sType === 2) {
ctx.arc(0, 0, r * 0.98, 0, Math.PI * 2);
} else if (sType === 3) {
ctx.moveTo(-r * 0.88, -r * 1.02);
ctx.lineTo(r * 0.88, -r * 1.02);
ctx.lineTo(r * 0.88, r * 1.02);
ctx.lineTo(-r * 0.88, r * 1.02);
} else if (sType === 4) {
ctx.moveTo(0, -r * 1.18);
ctx.lineTo(r * 0.98, 0);
ctx.lineTo(0, r * 1.18);
ctx.lineTo(-r * 0.98, 0);
} else {
ctx.moveTo(-r * 0.92, -r * 0.88);
ctx.lineTo(r * 0.92, -r * 0.88);
ctx.lineTo(r * 0.96, r * 0.55);
ctx.lineTo(0, r * 1.12);
ctx.lineTo(-r * 0.96, r * 0.55);
}
ctx.closePath();
}

// draw applique shield with bold double rim
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
var sType = Math.abs(shieldIdx || 0) % 6;

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
ctx.lineWidth = r * 0.36;
ctx.beginPath();
ctx.moveTo(-r * 0.95, r * 0.35);
ctx.lineTo(0, -r * 0.45);
ctx.lineTo(r * 0.95, r * 0.35);
ctx.stroke();
} else if (sType === 2) {
ctx.beginPath();
ctx.arc(0, 0, r * 0.52, 0, Math.PI * 2);
ctx.fill();
ctx.fillStyle = col.dark;
ctx.beginPath();
ctx.arc(0, 0, r * 0.24, 0, Math.PI * 2);
ctx.fill();
} else if (sType === 3) {
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
ctx.beginPath();
ctx.moveTo(0, -r * 0.58);
ctx.lineTo(r * 0.5, 0);
ctx.lineTo(0, r * 0.58);
ctx.lineTo(-r * 0.5, 0);
ctx.closePath();
ctx.fill();
} else {
ctx.fillStyle = col.dark;
ctx.fillRect(0, -r * 1.2, r * 1.2, r * 2.4);
ctx.fillStyle = col.light;
ctx.beginPath();
ctx.arc(0, -r * 0.1, r * 0.38, 0, Math.PI * 2);
ctx.fill();
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

// draw castle wall and dark green meadow
// gives bright stone and grass contrast
function drawCastleScene(
ctx,
w,
h,
wallBottomY,
showRail
) {
// 1. twilight slate sky backdrop
ctx.fillStyle = '#1E293B';
ctx.fillRect(0, 0, w, wallBottomY);

// 2. distant castle towers on left & right
var towerW = Math.max(48, w * 0.08);
var towerTop = Math.max(8, wallBottomY - 145);
ctx.fillStyle = '#334155';
ctx.strokeStyle = '#090D16';
ctx.lineWidth = 2;
ctx.fillRect(
w * 0.06,
towerTop,
towerW,
wallBottomY - towerTop
);
ctx.strokeRect(
w * 0.06,
towerTop,
towerW,
wallBottomY - towerTop
);
ctx.fillRect(
w * 0.86,
towerTop,
towerW,
wallBottomY - towerTop
);
ctx.strokeRect(
w * 0.86,
towerTop,
towerW,
wallBottomY - towerTop
);

// 3. crenellated stone castle wall
var wallH = Math.max(42, wallBottomY * 0.42);
var wallTop = wallBottomY - wallH;
var merlonW = Math.max(22, Math.floor(w / 32));
var gapW = Math.max(14, Math.floor(merlonW * 0.62));
var stepX = merlonW + gapW;
var merlonH = Math.max(14, wallH * 0.34);

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

// 4. dark-green meadow lawn (лужайка)
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

// 5. optional tilt rail for jousting arena
if (showRail) {
fillRoundBox(
ctx,
76,
388,
w - 152,
24,
4,
'#64748B',
'#090D16',
2.5
);
ctx.fillStyle = '#94A3B8';
ctx.fillRect(80, 390, w - 160, 7);
for (var rx = 120; rx < w - 110; rx += 140) {
fillRoundBox(
ctx,
rx - 5,
388,
10,
42,
2,
'#475569',
'#090D16',
2
);
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

var bounceY = isRun
? Math.sin(animPhase * 14) * 4.5
: isStoppedHorse
? 0
: Math.sin(animPhase * 3.5) * 1.5;

ctx.translate(-122, -88 + bounceY);

var legA = isRun
? Math.sin(animPhase * 14) * 30
: 0;
var legB = isRun
? -Math.sin(animPhase * 14) * 30
: 0;
var tailWave = isRun
? 18 + Math.sin(animPhase * 14) * 12
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

// 2. far pony legs
drawPonyLeg(
ctx,
98,
96,
legA,
coat.leg,
coat.sock
);
drawPonyLeg(
ctx,
150,
94,
legB,
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

// 6. near pony legs
drawPonyLeg(
ctx,
78,
94,
legB,
coat.body,
coat.sock
);
drawPonyLeg(
ctx,
132,
96,
legA,
coat.body,
coat.sock
);

// 7. cute pony head and ears
ctx.save();
var headDroop = tired ? 10 : 0;
ctx.translate(172, 62);
ctx.rotate(
((headDroop + (isRun ? 4 : 0)) * Math.PI) /
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
? -0.95
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

drawWeapon(
ctx,
wepX,
wepY,
0.95,
knight.weaponIdx,
swingAng
);

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

drawShield(
ctx,
shX,
shY,
shR,
knight.colorIdx,
knight.shieldIdx,
shDmg
);

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
