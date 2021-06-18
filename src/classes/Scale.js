import { Chord } from './Chord'
import { Degree } from './Degree'
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

  static diatonicToneIsFollowedBySemiTone = function (tone) {
    return ['do', 'ré', 'fa', 'sol', 'la'].includes(tone)
  }

  static diatonicScale = ['do', 'ré', 'mi', 'fa', 'sol', 'la', 'si'];

  static chromaticScale = [
    [new Note('do'), new Note('si', 'sharp')],
    [new Note('ré', 'flat'), new Note('do', 'sharp')],
    [new Note('ré')],
    [new Note('mi', 'flat'), new Note('ré', 'sharp')],
    [new Note('mi'), new Note('fa', 'flat')],
    [new Note('fa'), new Note('mi', 'sharp')],
    [new Note('fa', 'sharp'), new Note('sol', 'flat')],
    [new Note('sol')],
    [new Note('la', 'flat'), new Note('sol', 'sharp')],
    [new Note('la')],
    [new Note('si', 'flat'), new Note('la', 'sharp')],
    [new Note('si'), new Note('do', 'flat')]
  ];
}

Scale.prototype.eliminateWrongEnharmonies = function() {

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
      let previousDegree = this.degrees[index-1]
      let previousNote = previousDegree.notes[0].note

      let previousNoteIndex = Scale.diatonicScale.indexOf(previousNote)
      const currentNoteIndex = (previousNoteIndex + 1) % 7

      this.degrees[index] = new Degree(degree.notes.filter((note) => Scale.diatonicScale.indexOf(note.note) === currentNoteIndex))
    }
  })
}

Scale.prototype.appendChords = function () {

  this.degrees.forEach((root, index) => {

    const third = this.degrees[(index+2)%7]
    const fifth = this.degrees[(index+4)%7]

    this.degrees[index].chord = new Chord(
      root,
      third,
      fifth
    )
  })
}

Scale.prototype.toString = function() {
  return this.degrees?.reduce((res, degree) => `${res} ${degree?.notes[0].toString()}`, '')
}
