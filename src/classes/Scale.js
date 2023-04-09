import { Chord } from './Chord'
import { Degree } from './Degree'
import { Note } from './Note'

export class Scale {
  constructor(degrees) {
    this.degrees = degrees
  }

  get alteration() {
    const degreeWithAlteration = this.degrees?.find((degree) => degree.notes[0].alteration)
    if (!degreeWithAlteration) return undefined
    else return degreeWithAlteration.notes[0].alteration
  }

  get numberOfAlteredDegrees() {
    return this.degrees?.filter((degree) => degree.notes[0].alteration).length
  }

  get tonic() {
    return this.degrees ? this.degrees[0].notes[0] : null
  }

  static diatonicToneIsFollowedByNonDiatonicSemiTone = function (tone) {
    return ['do', 'ré', 'fa', 'sol', 'la'].includes(tone)
  }

  static diatonicToneIsPrecededByNonDiatonicSemiTone = function (tone) {
    return ['ré', 'mi', 'sol', 'la', 'si'].includes(tone)
  }

  static diatonicScale = ['do', 'ré', 'mi', 'fa', 'sol', 'la', 'si']; // heptatonic (= 7)

  static pentatonicScale = ['do', 'ré', 'mi', 'sol', 'la']; // pentatonic (= 5) constructed on the circle of fifths

  static chromaticScale = [
    [new Note('do', null, 261.626), new Note('si', 'sharp')],
    [new Note('ré', 'flat', 277.183), new Note('do', 'sharp')],
    [new Note('ré', null, 293.665)],
    [new Note('mi', 'flat', 311.127), new Note('ré', 'sharp')],
    [new Note('mi', null, 329.628), new Note('fa', 'flat')],
    [new Note('fa', null, 349.228), new Note('mi', 'sharp')],
    [new Note('fa', 'sharp', 369.994), new Note('sol', 'flat')],
    [new Note('sol', null, 391.995)],
    [new Note('la', 'flat', 415.305), new Note('sol', 'sharp')],
    [new Note('la', null, 440)],
    [new Note('si', 'flat', 466.164), new Note('la', 'sharp')],
    [new Note('si', null, 493.883), new Note('do', 'flat')]
  ];
}

Scale.prototype.eliminateWrongEnharmonies = function () {

  this.degrees[0] = new Degree([this.tonic])

  // eliminating impossible alterations
  if (this.tonic.alteration) {
    this.degrees = this.degrees.map((degree) => {
      return new Degree(degree.notes.filter((note) => !note.alteration || note.alteration === this.tonic.alteration))
    })
  }

  // ensuring do - ré - mi - fa - sol - la - si pattern
  this.degrees.forEach((degree, index) => {

    if (index > 0 && degree.notes.length === 2) {
      let previousDegree = this.degrees[index - 1]
      let previousNote = previousDegree.notes[0].note

      let previousNoteIndex = Scale.diatonicScale.indexOf(previousNote)
      const currentNoteIndex = (previousNoteIndex + 1) % 7

      this.degrees[index] = new Degree(degree.notes.filter((note) => Scale.diatonicScale.indexOf(note.note) === currentNoteIndex))
    }
  })
}

Scale.prototype.appendChords = function () {

  this.degrees.forEach((root, index) => {

    const third = this.degrees[(index + 2) % 7]
    const fifth = this.degrees[(index + 4) % 7]

    this.degrees[index].chord = new Chord(
      root,
      third,
      fifth
    )
  })
}

Scale.prototype.toString = function () {
  return this.degrees?.reduce((res, degree) => `${res} ${degree?.notes[0].toString()}`, '')
}
