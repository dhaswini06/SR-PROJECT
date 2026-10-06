# Speech Recognition — Live Web App

A real-time, browser-based speech-to-text tool built on the native **Web
Speech API**. No backend, no build step — open `index.html` and it works.

## Features

- Live, continuous speech-to-text transcription
- Start / Stop controls
- Language picker (English – India/US/UK, Hindi, Tamil)
- Copy transcript to clipboard, with confirmation
- Graceful fallback message when a browser doesn't support speech recognition

## Tools / Technologies Used

| Technology | Purpose |
|---|---|
| Web Speech API (`SpeechRecognition`) | Browser-native speech-to-text engine |
| HTML5 | Page structure |
| CSS3 | Responsive, light/dark-aware styling |
| JavaScript (ES6+) | Recognition control, live transcript rendering |
| Clipboard API | `navigator.clipboard.writeText()` for the Copy button |

## How It Works

1. The user clicks **Start Listening**; the browser asks for microphone permission.
2. `SpeechRecognition.start()` is called with `continuous: true` and the selected language (default `en-IN`).
3. The browser's built-in speech engine streams recognized text back via the `onresult` event, both interim (in-progress) and final results.
4. The page renders the growing transcript live as results arrive.
5. **Stop** ends the session; **Copy** writes the full transcript to the clipboard; **Clear** resets it.

## Running Locally

No installation needed — just open the file:

```bash
git clone https://github.com/<your-username>/speech-recognition-webapp.git
cd speech-recognition-webapp
# then just open index.html in Chrome or Edge
```

Or serve it locally (recommended, since some browsers restrict microphone access on `file://` pages):

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Browser Support

Best in **Chrome** or **Edge** (desktop or Android) — these implement the
Web Speech API. Safari and Firefox have limited or no support.

## License

MIT
