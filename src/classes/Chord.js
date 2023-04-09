
import { Scale } from './Scale.js'


export const MAJOR_THIRD = 'major_third'
export const MINOR_THIRD = 'minor_third'



export class Chord {
  constructor(root, third, fifth) {
    this.root = root
    this.third = third
    this.fifth = fifth
  }


  get rootIndex() {
    return Scale.chromaticScale.findIndex((notes) =>
      notes.some((note) => note.equals(this.root.notes[0]))
    )
  }

  get thirdIndex() {
    return Scale.chromaticScale.findIndex((notes) =>
      notes.some((note) => note.equals(this.third.notes[0]))
    )
  }

  get fifthIndex() {
    return Scale.chromaticScale.findIndex((notes) =>
      notes.some((note) => note.equals(this.fifth.notes[0]))
    )
  }

  get thirdInterval() {
    const semitones = this.thirdIndex < this.rootIndex ? this.thirdIndex + 12 - this.rootIndex : this.thirdIndex - this.rootIndex
    if (semitones === 3) return MINOR_THIRD
    else return MAJOR_THIRD
  }

  get fifthInterval() {
    const semitones = this.fifthIndex < this.thirdIndex ? this.fifthIndex + 12 - this.thirdIndex : this.fifthIndex - this.thirdIndex
    if (semitones === 3) return MINOR_THIRD
    else return MAJOR_THIRD
  }

  get isMajor() {
    return this.thirdInterval === MAJOR_THIRD && this.fifthInterval === MINOR_THIRD
  }

  get isMinor() {
    return this.thirdInterval === MINOR_THIRD && this.fifthInterval === MAJOR_THIRD
  }

  get isDiminished() {
    return this.thirdInterval === MINOR_THIRD && this.fifthInterval === MINOR_THIRD
  }
}

Chord.prototype.equals = function (otherChord) {
  return otherChord
    && this.fifth.notes[0].chromaticEquals(otherChord.fifth.notes[0])
    && this.third.notes[0].chromaticEquals(otherChord.third.notes[0])
    && this.root.notes[0].chromaticEquals(otherChord.root.notes[0])
}

Chord.prototype.play = function (arpeggio = false) {

  if (arpeggio) {

    let audioCtx = new AudioContext();
    let oscillator = audioCtx.createOscillator();

    oscillator.frequency.value = this.root.notes[0].frequency;
    setTimeout(() => oscillator.frequency.value = this.third.notes[0].frequency, 1000);
    setTimeout(() => oscillator.frequency.value = this.fifth.notes[0].frequency, 2000);

    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 3);

  } else {
    const audioContexts = [new AudioContext(), new AudioContext(), new AudioContext()];
    const gains = audioContexts.map(ctx => ctx.createGain());
    const oscillators = audioContexts.map(ctx => ctx.createOscillator());

    oscillators[0].frequency.value = this.root.notes[0].frequency;
    oscillators[1].frequency.value = this.third.notes[0].frequency;
    oscillators[2].frequency.value = this.fifth.notes[0].frequency;

    oscillators[0].connect(audioContexts[0].destination);
    oscillators[1].connect(audioContexts[1].destination);
    oscillators[2].connect(audioContexts[2].destination);

    oscillators[0].connect(gains[0]);
    oscillators[1].connect(gains[1]);
    oscillators[2].connect(gains[2]);

    gains[0].connect(audioContexts[0].destination);
    gains[1].connect(audioContexts[1].destination);
    gains[2].connect(audioContexts[2].destination);

    oscillators[0].start();
    oscillators[1].start();
    oscillators[2].start();

    gains[0].gain.setTargetAtTime(0, audioContexts[0].currentTime + 0.5, 2);
    gains[1].gain.setTargetAtTime(0, audioContexts[1].currentTime + 0.5, 2);
    gains[2].gain.setTargetAtTime(0, audioContexts[2].currentTime + 0.5, 2);


    oscillators[0].stop(audioContexts[0].currentTime + 1);
    oscillators[1].stop(audioContexts[1].currentTime + 1);
    oscillators[2].stop(audioContexts[2].currentTime + 1);
  }
}

Chord.prototype.toString = function () {
  if (this.root && this.third && this.fifth) {
    return `${this.root.notes[0]} ${this.third.notes[0]} ${this.fifth.notes[0]}`
  } else {
    return ''
  }
}
