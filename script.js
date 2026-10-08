// Grab the elements we'll need
const micBtn = document.getElementById('micBtn');
const micStopBtn = document.getElementById('micStopBtn');
const micStatus = document.getElementById('micStatus');
const textBox = document.getElementById('textBox');

// The Web Speech API is prefixed in some browsers (Chrome), so we check both
const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;

if (!SpeechRecognitionAPI) {
  micStatus.textContent = 'Speech recognition not supported in this browser. Try Chrome.';
  micBtn.disabled = true;
} else {
  // Set up the recognizer once
  recognition = new SpeechRecognitionAPI();
  recognition.continuous = true;      // keep listening until we stop it
  recognition.interimResults = true;  // show partial results as you speak
  recognition.lang = 'en-US';

  // Fires whenever new speech is recognized
  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = 0; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    textBox.value = transcript;
  };

  recognition.onerror = (event) => {
    micStatus.textContent = 'Error: ' + event.error;
  };
}

micBtn.addEventListener('click', () => {
  recognition.start();
  micStatus.textContent = 'Listening...';
  micBtn.disabled = true;
  micStopBtn.disabled = false;
});

micStopBtn.addEventListener('click', () => {
  recognition.stop();
  micStatus.textContent = 'Not listening';
  micBtn.disabled = false;
  micStopBtn.disabled = true;
});
const speakNormalBtn = document.getElementById('speakNormalBtn');

function speak(text, pitch = 1, rate = 1) {
  // speechSynthesis is the browser's built-in TTS engine
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = pitch; // range: 0 (low) to 2 (high), default 1
  utterance.rate = rate;   // range: 0.1 (slow) to 10 (fast), default 1
  window.speechSynthesis.speak(utterance);
}

speakNormalBtn.addEventListener('click', () => {
  const text = textBox.value.trim();
  if (text) speak(text, 1, 1); // normal pitch and rate
});
const animalSelect = document.getElementById('animalSelect');
const speakAnimalBtn = document.getElementById('speakAnimalBtn');

// Each animal = a pitch + rate "preset"
const animalVoices = {
  cat:   { pitch: 1.9, rate: 1.3 },  // high and quick
  dog:   { pitch: 0.6, rate: 0.9 },  // low-ish and gruff
  cow:   { pitch: 0.3, rate: 0.7 },  // very low and slow
  mouse: { pitch: 2.0, rate: 1.5 },  // highest and fastest
  lion:  { pitch: 0.2, rate: 0.8 },  // lowest, deliberate
};

speakAnimalBtn.addEventListener('click', () => {
  const text = textBox.value.trim();
  const chosenAnimal = animalSelect.value;

  if (!text) return;
  if (chosenAnimal === 'none') {
    alert('Pick an animal first!');
    return;
  }

  const preset = animalVoices[chosenAnimal];
  speak(text, preset.pitch, preset.rate);
});