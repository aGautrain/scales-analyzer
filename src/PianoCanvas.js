import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CanvaScale } from './classes/CanvaScale'

const useStyles = makeStyles({
  canvas: {
    textAlign: 'center',
    backgroundColor: 'black',
    margin: 'auto',
    display: 'block'
  },
  item: {
    display: 'inline-block',
    padding: '0 10px'
  }
});

export default function PianoCanvas({ focusedDegree }) {

  const classes = useStyles()

  const canvasRef = React.useRef(undefined)
  const [canvas, setCanvas] = React.useState(undefined)

  React.useEffect(() => {
    setCanvas(new CanvaScale(canvasRef.current))
  }, [])

  React.useEffect(() => {
    if (canvas) {
      if (focusedDegree?.chord) {
        canvas.setHighlightedChord(focusedDegree.chord)
        canvas.init()
      } else {
        canvas.setHighlightedChord(undefined)
        canvas.init()
      }
    }
  }, [canvas, focusedDegree])

  return (
    <div>
      <canvas width="880" height="242" ref={canvasRef} className={classes.canvas}></canvas>

      <ul style={{ textAlign: 'center', paddingLeft: 0 }}>
        {canvas?.canvas?.scale?.map((note, index) =>
          <li key={index} className={classes.item}>
            {focusedDegree?.notes[0].chromaticEquals(note[0]) ?
              <b>{note[0].toString()}</b>
              : <>{note[0].toString()}</>
            }
          </li>
        )}
      </ul>
    </div>
  )
}
