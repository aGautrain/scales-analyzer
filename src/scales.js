class Note {
    constructor(note, alteration) {
        this.note = note;
        this.alteration = alteration;
    }
}

export const majorScalePattern = [2, 2, 1, 2, 2, 2, 1];
export const minorScalePattern = [2, 1, 2, 2, 1, 2, 2];

const fullScaleWithEnharmony = {
    0:      [new Note('do'), new Note('si', 'sharp')],
    1:      [new Note('do', 'sharp'), new Note('ré', 'flat')],
    2:      [new Note('ré')],
    3:      [new Note('ré', 'sharp'), new Note('mi', 'flat')],
    4:      [new Note('mi'), new Note('fa', 'flat')],
    5:      [new Note('fa'), new Note('mi', 'sharp')],
    6:      [new Note('fa', 'sharp'), new Note('sol', 'flat')],
    7:      [new Note('sol')],
    8:      [new Note('sol', 'sharp'), new Note('la', 'flat')],
    9:      [new Note('la')],
    10:     [new Note('la', 'sharp'), new Note('si', 'flat')],
    11:     [new Note('si'), new Note('do', 'flat')]
};

export const generateAll12Scales = (pattern) => {

    console.info(pattern);

    const scales = [];

    Object.entries(fullScaleWithEnharmony).forEach(([startingIndex, notes]) => {

        let currentIndex = parseInt(startingIndex, 10);

        const scaleGenerated = pattern.reduce((scale, currentPatternIncrementation) => {
            currentIndex += currentPatternIncrementation;
            return [...scale, fullScaleWithEnharmony[currentIndex % 12]];
        }, [notes]);

        scales.push(scaleGenerated);

    });

    return scales;

};