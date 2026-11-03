# Android TV & Host Controller Rules

## 1. Project Architecture

### 1.1 Server Device (Android Phone)
- Runs Android APK with embedded Node.js.
- Node.js runs `server.js` with Express on port 3000.
- Server binds to `0.0.0.0` so all devices on Wi-Fi reach it.
- Server exposes `public/` directory statically.
- Server maintains authoritative game state in memory and JSON files (`data/`).
- No WebSockets; state sync happens via simple HTTP polling.

### 1.2 TV Client (Android TV / Old Browser)
- Opens `http://<PHONE_IP>:3000/` in TV browser.
- Displays game screen scaled to 1920x1080 via `tvscale.js`.
- No text input from TV is required.
- TV acts as audience/board display (Tournament Bracket & Combat Arena).
- Periodically polls `/api/state` using ES5 `XMLHttpRequest`.
- Renders procedurally via Canvas 2D and basic CSS.

### 1.3 Host Controller (Phone Browser)
- Presenter opens `http://<PHONE_IP>:3000/host` or operates on the host device.
- Large touch buttons to control flow: switch modes (PUB / CASH), toggle live mid-fight bets, accept match & tournament bets, award drink tokens, redeem pub prizes, start combat passes, and advance rounds.
- Sends actions via `POST /api/action` with JSON body.

## 2. Compatibility & Syntax (Strict ES5)
Target: Android TV 4.4 KitKat, legacy WebView, old Chrome.

### Allowed in Client Code:
- `var` for all declarations.
- Regular `function` declarations and expressions.
- Plain objects and arrays.
- `XMLHttpRequest` for HTTP calls.
- Standard loops (`for`, `while`).
- `window.requestAnimationFrame` with `setTimeout` fallback.
- Canvas 2D drawing primitives.
- Web Audio API (with availability check and mute switch).

### Forbidden in Client Code:
- `let`, `const`.
- Arrow functions (`() => {}`).
- Classes (`class`).
- `async` / `await` and mandatory Promises.
- Template literals (backticks).
- Destructuring, spread/rest (`...`).
- Modules (`import` / `export`).
- `Map`, `Set`, `Symbol`, `Proxy`.
- CSS Grid, heavy filters, backdrop-filter.
- External CDNs, libraries, font files, images, sound files.
- Yellow colors anywhere in UI or canvas rendering.

## 3. Screen Scaling & Safe Area
- Fixed virtual coordinate space: **1920 × 1080** (16:9).
- Scaled uniformly by `tvscale.js` using CSS transform `scale(...)`.
- Overscan safe area: 3% margin on all sides (`SAFE = 0.97`).
- All critical HUD text and scores kept inside the safe zone.

## 4. Code Formatting ("Human Mobile Style")

### Line Width
- Wrap code and comments aggressively at **28–38 characters**.
- Break arguments, method chains, long conditions across lines.

### Indentation
- Use **0-space (flat) indentation** in all JS and CSS files.

### Commenting Standard
- Two-line comment format:
```js
// what we do here
// how we do it
```
- Conversational lowercase English developer notes.
- NEVER use ASCII dividers.
- NEVER use JSDoc.
- NEVER use robotic AI verbs. Use: *get*, *set*, *put*, *check*, *hide*, *show*, *wait*, *skip*, *draw*, *fix*.
