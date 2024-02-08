let recording = false;
let currentTrack = 1;
const recordedTracks = {
  1: [],
  2: [],
  3: [],
  4: [],
};
let startTime;
let recordedSounds = [];

const KeyToSound = {
  a: document.querySelector("#s1"),
  s: document.querySelector("#s2"),
  d: document.querySelector("#s3"),
  f: document.querySelector("#s4"),
  g: document.querySelector("#s5"),
  h: document.querySelector("#s6"),
  j: document.querySelector("#s7"),
  k: document.querySelector("#s8"),
  l: document.querySelector("#s9"),
};

function onTrackChange() {
  const checkedTracks = document.querySelectorAll(".trackCheckbox:checked");
  checkedTracks.forEach((checkedTrack) => {
    const track = parseInt(checkedTrack.getAttribute("data-track"));
    currentTrack = track;
    console.log("Current track is", currentTrack);
  });
  if (checkedTracks.length === 0) {
    currentTrack = null;
    console.log("Current track is", currentTrack);
  }
}

function startRecording() {
  // spradzamy czy currentTrack nie jest null, jeśli jest to znaczy, że nie ma żadnego zaznaczonego checkboxa
  // poprawia to błąd w którym mieliśmy zaznaczony track 1 i po odznaczeniu i włączeniu nagrywania dalej nagrywał się track 1
  if (!recording && currentTrack !== null) {
    recording = true;
    startTime = Date.now();
    recordedTracks[currentTrack] = [];
    recordedSounds = [];
    console.log("Recording started on track", currentTrack);
  }
}

function stopRecording() {
  if (recording) {
    recording = false;
    console.log("Recording stopped");
  }
}

function playRecording() {
  const selectedTracks = document.querySelectorAll(".trackCheckbox:checked");
  selectedTracks.forEach((checkedTrack) => {
    // pobieramy numer tracku
    const track = parseInt(checkedTrack.getAttribute("data-track"));
    // pobieramy nagrane dźwięki z tablicy recordedTracks dla danego tracku, który był zaznaczony
    const soundsToPlay = recordedTracks[track];
    console.log(`Playback started for track ${track}`);
    if (soundsToPlay.length > 0) {
      soundsToPlay.forEach((event) => {
        setTimeout(() => {
          playSound(event.key);
        }, event.time);
      });
    } else {
      console.log(`No sounds recorded for track ${track}`);
    }
  });
}

function onKeyPress(event) {
  // keytosound[event.key] zwraca wartość z obiektu KeyToSound dla klucza event.key
  const sound = KeyToSound[event.key];
  if (sound) {
    playSound(sound);
    if (recording && currentTrack !== null) {
      // jeśli nagrywamy i jest wybrany jakiś track, to zapisujemy dźwięk do tablicy recordedTracks
      recordedTracks[currentTrack].push({
        key: sound,
        // startTime to czas od rozpoczęcia nagrywania w milisekundach, by odtworzyć dźwięk w odpowiednim czasie
        time: Date.now() - startTime,
      });
    }
  }
}

function playSound(sound) {
  // currentTime = 0 pozwala na odtwarzanie dźwięku od początku, nawet jeśli nie skończył się poprzedni
  sound.currentTime = 0;
  sound.play();
}

document.addEventListener("keypress", onKeyPress);
document.getElementById("record").addEventListener("click", startRecording);
document.getElementById("stop").addEventListener("click", stopRecording);
document.getElementById("play").addEventListener("click", playRecording);

const trackCheckboxes = document.querySelectorAll(".trackCheckbox");
trackCheckboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", onTrackChange)
);
