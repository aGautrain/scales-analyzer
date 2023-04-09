import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { generateAll12Scales, majorScalePattern } from './scales';
import ScaleTable from './ScaleTable';
import PianoCanvas from './PianoCanvas'

const useStyles = makeStyles({
  title: {
    textAlign: 'center'
  }
});

function App() {

  const classes = useStyles();

  const majorScales = generateAll12Scales(majorScalePattern);
  //const minorScales = generateAll12Scales(minorScalePattern);

  const [focusDegree, setFocusDegree] = React.useState(undefined);

  // react.useEffect((degree) => {
  // // TODO Play chord  
  // }, [focusedDegree])

  /* const matchFocusDegree = React.useCallback((degree) => {
    return degree?.notes?.length && degree.notes.find((note) => note.equals(focusDegree?.notes[0]))
  }, [focusDegree]) */

  const matchFocusDegreeChord = React.useCallback((degree) => {
    return degree?.chord.equals(focusDegree?.chord)
  }, [focusDegree])

  const unfocus = React.useCallback(() => {
    setFocusDegree(undefined)
  }, [setFocusDegree])

  return (
    <>
      <h2 className={classes.title}>Gammes majeures</h2>
      <ScaleTable scales={majorScales} focusedDegree={focusDegree} unfocusFn={unfocus} focusFn={setFocusDegree} matchChordFn={matchFocusDegreeChord} />

      <PianoCanvas focusedDegree={focusDegree} />

      {/*<h2 className={classes.title}>Minor scales</h2>
      <ScaleTable scales={minorScales} />*/}

    </>
  );
}

export default App;
