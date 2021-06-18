import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { MAJOR_THIRD } from './classes/Chord';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    '&:hover': { cursor: 'pointer' }
  },
  tableContainer: {
      width: '90%',
      margin: 'auto'
  },
  tableCell: {
    // padding: '15px 0',
    opacity: 0.5
  },
  sectionChord: {
    height: '100px',
    textAlign: 'center',
    padding: '20px 0'
  },
  sectionChordTitle: {
    marginBottom: 0
  }
});

function NoteCell({ notes, chord, matchFocus, onClick }) {
  const classes = useStyles()
    return (
        <TableCell  align="center"
                    className={classes.tableCell}
                    style={{ opacity: matchFocus ? 1 : 0.5, backgroundColor: chord.isMajor ? '#A9CCE3' : chord.isDiminished ? '#FFFFFF' : '#EAF2F8' }}
                    onClick={onClick}>
                    {notes[0].toString()}
        </TableCell>
    )
}

function ChordDisplayer({ chord }) {
  const classes = useStyles()
  return (
    <section className={classes.sectionChord}>
      <h3 className={classes.sectionChordTitle}>{ chord? chord.toString() : 'Aucun accord sélectionné' }</h3>
      {
        chord &&
        <>
          { chord.isMajor ? 'Accord Parfait Majeur'
              : chord.isDiminished ? 'Accord Mineur Diminué' : 'Accord Parfait Mineur' }
        </>
      }
      <br/>
      { chord && <small>{ chord.thirdInterval === MAJOR_THIRD ? 4 : 3 } / { chord.fifthInterval === MAJOR_THIRD ? 4 : 3 }</small>}
    </section>
  )
}


export default function ScaleTable({ scales, focusedDegree, unfocusFn, focusFn, matchChordFn }) {
  const classes = useStyles()

  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Gamme</TableCell>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">2</TableCell>
              <TableCell align="center">3</TableCell>
              <TableCell align="center">4</TableCell>
              <TableCell align="center">5</TableCell>
              <TableCell align="center">6</TableCell>
              <TableCell align="center">7</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scales.map((scale, scaleIndex) => (
              <TableRow hover key={scaleIndex}>

                  <TableCell component="th" scope="row">
                      { scale.tonic.toString().toUpperCase() }
                  </TableCell>

                  {scale.degrees.map((degree, degreeIndex) =>
                      degreeIndex < 7 ?
                          <NoteCell key={scaleIndex + '-' + degreeIndex}
                          onClick={() => focusFn(degree)}
                          notes={degree.notes}
                          chord={degree.chord}
                          matchFocus={matchChordFn(degree)} />
                          : undefined
                  )}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ChordDisplayer chord={focusedDegree?.chord} />
    </>
  );
}
