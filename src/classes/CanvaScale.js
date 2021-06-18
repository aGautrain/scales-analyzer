import { Scale } from './Scale'

class Canvas {

  constructor(canvas) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.scale = [...Scale.chromaticScale, ...Scale.chromaticScale]
  }

  static highlightColor = '#20639B'

  init(chord) {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    this.drawBackground()
    this.drawOctave(2, 0, chord)
  }

  drawBackground() {
    this.context.fillStyle = 'whitesmoke'
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height)
  }

  drawWhiteKey(offset, width, height, highlighted = false) {
    this.context.strokeStyle = highlighted ? Canvas.highlightColor : 'black'
    this.context.fillStyle = highlighted ? Canvas.highlightColor : 'white'
    if (highlighted) this.context.fillRect(20+offset, 20, width, height)
    this.context.strokeRect(20+offset, 20, width, height)

    return width
  }

  drawBlackKey(offset, width, height, highlighted = false) {
    this.context.fillStyle = highlighted ? Canvas.highlightColor : 'black'
    this.context.fillRect(20+offset, 20, width, height)

    return width
  }

  drawOctave(nbOctaves = 2, offset = 0, chord = undefined, drawn = undefined) {

    const whiteNoteWidth = 60, whiteNoteHeight = 200
    const blackNoteWidth = 30, blackNoteHeight = 120

    let currentOctaveWidth = 0, whiteKeyIndex = 0

    const chordDrawn = drawn || { root: false, third: false, fifth: false }


    // const whiteKeys = [...Scale.chromaticScale.filter((notes) => notes.some((note) => !note.alteration))]
    // const blackKeys = [...Scale.chromaticScale.filter((notes) => notes.every((note) => !!note.alteration))]


    // TODO draw white keys first (from all octaves) then black keys
    // OR clever function drawing a chord after keyboard has been drawn

    Scale.chromaticScale.forEach((notes, index) => {
      const matchesRoot = chord && !chordDrawn.root && notes.find((note) => note.equals(chord.root.notes[0]))
      const matchesThird = chord && chordDrawn.root && !chordDrawn.third && notes.find((note) => note.equals(chord.third.notes[0]))
      const matchesFifth = chord && chordDrawn.root && chordDrawn.third && !chordDrawn.fifth && notes.find((note) => note.equals(chord.fifth.notes[0]))

      if (matchesRoot) chordDrawn.root = true
      if (matchesThird) chordDrawn.third = true
      if (matchesFifth) chordDrawn.fifth = true

      const highlighted = matchesRoot || matchesThird || matchesFifth

      if (notes.every((note) => note.alteration)) {
        this.drawBlackKey(offset + whiteKeyIndex*whiteNoteWidth - blackNoteWidth / 2, blackNoteWidth, blackNoteHeight, highlighted)
      } else {
        this.drawWhiteKey(offset + whiteKeyIndex*whiteNoteWidth, whiteNoteWidth, whiteNoteHeight, highlighted)
        currentOctaveWidth += whiteNoteWidth
        whiteKeyIndex++
      }


    })

    /*
    whiteKeys.forEach((notes, index) => {

      const matchesRoot = chord && !chordDrawn.root && notes.find((note) => note.equals(chord.root.notes[0]))
      const matchesThird = chord && chordDrawn.root && !chordDrawn.third && notes.find((note) => note.equals(chord.third.notes[0]))
      const matchesFifth = chord && chordDrawn.root && chordDrawn.third && !chordDrawn.fifth && notes.find((note) => note.equals(chord.fifth.notes[0]))

      if (matchesRoot) chordDrawn.root = true
      if (matchesThird) chordDrawn.third = true
      if (matchesFifth) chordDrawn.fifth = true

      const highlighted = matchesRoot || matchesThird || matchesFifth

      this.drawWhiteKey(offset + whiteKeyIndex*whiteNoteWidth, whiteNoteWidth, whiteNoteHeight, highlighted)
      currentOctaveWidth += whiteNoteWidth
      whiteKeyIndex++
    })

    whiteKeyIndex = 0

    Scale.chromaticScale.forEach((notes, index) => {

      if (blackKeys.includes(notes)) {

        const matchesRoot = chord && !chordDrawn.root && notes.find((note) => note.equals(chord.root.notes[0]))
        const matchesThird = chord && chordDrawn.root && !chordDrawn.third && notes.find((note) => note.equals(chord.third.notes[0]))
        const matchesFifth = chord && chordDrawn.root && chordDrawn.third && !chordDrawn.fifth && notes.find((note) => note.equals(chord.fifth.notes[0]))

        if (matchesRoot) chordDrawn.root = true
        if (matchesThird) chordDrawn.third = true
        if (matchesFifth) chordDrawn.fifth = true

        const highlighted = matchesRoot || matchesThird || matchesFifth

        this.drawBlackKey(offset + whiteKeyIndex*whiteNoteWidth - blackNoteWidth / 2, blackNoteWidth, blackNoteHeight, highlighted)

      } else { whiteKeyIndex++ }
    }) */

    if (nbOctaves > 1) this.drawOctave(nbOctaves - 1, currentOctaveWidth, chord, chordDrawn)
  }


}

export class CanvaScale {
  canvas
  chord
  constructor(canvas) {
    this.canvas = new Canvas(canvas)
    this.canvas.init()
  }

  init() {
    this.canvas.init(this.chord)
  }

  setHighlightedChord(chord) {
    this.chord = chord
  }
}
