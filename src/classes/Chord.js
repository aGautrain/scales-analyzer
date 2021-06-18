
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

Chord.prototype.equals = function(otherChord) {
  return otherChord
    && this.fifth.notes[0].chromaticEquals(otherChord.fifth.notes[0])
    && this.third.notes[0].chromaticEquals(otherChord.third.notes[0])
    && this.root.notes[0].chromaticEquals(otherChord.root.notes[0])
}

Chord.prototype.toString = function() {
  if (this.root && this.third && this.fifth) {
    return `${this.root.notes[0]} ${this.third.notes[0]} ${this.fifth.notes[0]}`
  } else {
    return ''
  }
}
