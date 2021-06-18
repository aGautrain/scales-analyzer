import { Scale } from './classes/Scale'
import { Degree } from './classes/Degree'

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

export const majorScalePattern = [2, 2, 1, 2, 2, 2, 1]
// export const minorScalePattern = [2, 1, 2, 2, 1, 2, 2]

export const generateAll12Scales = (pattern) => {

    const scales = []

    Scale.chromaticScale.forEach((notes, startingIndex) => {

        let currentIndex = parseInt(startingIndex, 10)

        let scaleGenerated = new Scale(pattern.reduce((scale, currentPatternIncrementation) => {
            currentIndex += currentPatternIncrementation
            return [...scale, new Degree(Scale.chromaticScale[currentIndex % 12])]
        }, [new Degree(notes)]))

        // iterating through scale and chosing enharmony such as all notes are in the scale
        scaleGenerated.eliminateWrongEnharmonies()

        scaleGenerated.appendChords()

        scales.push(scaleGenerated)
    })
    
    // sorting scales to mimic circle of fifths
    scales.sort((scaleA, scaleB) => {

      // scales without alterations are shown first
      if (!scaleA.alteration) return -1;
      if (!scaleB.alteration) return 1;

      // scales with same alterations are ordered based on alterations quantity
      // sharp scales are shown second
      if (scaleA.alteration === scaleB.alteration) {

        // flat scales are shown third and in reverse order, to match circle of fifths
        const flat_coeff = scaleA.alteration === 'flat' ? -1 : 1;

        if (scaleA.numberOfAlteredDegrees > scaleB.numberOfAlteredDegrees) return 1 * flat_coeff;
        else return -1 * flat_coeff;
      } else {
        // prioritizing sharps over flat
        return scaleA.alteration === 'flat' ? 1 : -1;
      }
    });


    return scales;

};
