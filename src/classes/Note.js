import { Scale } from './Scale'

export class Note {
    constructor(note, alteration) {
        this.note = note
        this.alteration = alteration
    }

    get alterationSymbol() {
        if (this.alteration) return this.alteration === 'flat' ? '♭' : '#'
        else return ''
    }

    get chromaticIndex() {
      return Scale.chromaticScale.findIndex(
        (chromatic) => chromatic.some((_) => this.equals(_))
      )
    }
}

Note.prototype.toString = function() {
    if (this.note && this.alteration) {
        return `${this.note.capitalize()}${this.alterationSymbol}`
    } else if (this.note) {
        return `${this.note.capitalize()}`
    } else {
        return ''
    }
}

Note.prototype.equals = function(otherNote) {
  return this.note === otherNote?.note && this.alteration === otherNote?.alteration
}

Note.prototype.chromaticEquals = function(otherNote) {
  return this.chromaticIndex === otherNote.chromaticIndex
}
