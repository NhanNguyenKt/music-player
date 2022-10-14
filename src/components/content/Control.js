import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import listSongs from '../../audio';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  showPlay,
  showPause,
  setPercent,
} from '../../features/playButton/controlSlice';
import { next, pre, choosing } from '../../features/chooseSong/songSlice';
import { Grid } from '@mui/material';

export default function Control({ audio }) {
  useEffect(() => {
    console.log('control render');
  });
  const playIcon = useSelector((state) => state.control.value);
  const songPlaying = useSelector((state) => state.songPlaying.value);

  const dispatch = useDispatch();
  const percent = useSelector((state) => state.control.percent);
  var convertTime = function (time) {
    var mins = Math.floor(time / 60);
    if (mins < 10) {
      mins = '0' + String(mins);
    }
    var secs = Math.floor(time % 60);
    if (secs < 10) {
      secs = '0' + String(secs);
    }

    return mins + ':' + secs;
  };
  useEffect(() => {
    const timerID = setInterval(() => {
      if (audio.current.currentTime === audio.current.duration) {
        dispatch(setPercent(0));
        dispatch(showPlay());
      } else {
        dispatch(
          setPercent((100 * audio.current.currentTime) / audio.current.duration)
        );
      }
    }, 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  const playCLick = (event) => {
    dispatch(showPause());
  };
  const pauseCLick = () => {
    dispatch(showPlay());
  };
  const onChangeTime = (e) => {
    dispatch(showPause());
    audio.current.currentTime = (e.target.value * audio.current.duration) / 100;
  };
  return (
    <div>
      <Grid container justifyContent='center' mt={5}>
        <Grid item xs={1} textAlign='center'>
          {audio.current ? convertTime(audio.current.currentTime) : '0:00'}
        </Grid>
        <Grid item xs={3}>
          <input
            style={{ width: '100%' }}
            type='range'
            min='0'
            max='100'
            value={percent ? percent : 0}
            onChange={onChangeTime}
          ></input>
        </Grid>

        <Grid item xs={1} textAlign='center'>
          {audio.current ? convertTime(audio.current.duration) : '--'}
        </Grid>
      </Grid>
      <Grid container mt={2} justifyContent='center'>
        <button
          onClick={() => {
            if (songPlaying === 0) {
              audio.current.currentTime = 0;
            } else {
              dispatch(pre());
            }
          }}
        >
          <NavigateBeforeIcon></NavigateBeforeIcon>
        </button>

        <button onClick={playIcon ? playCLick : pauseCLick}>
          {playIcon ? <PlayArrowIcon /> : <PauseIcon />}
        </button>
        <button
          onClick={() => {
            if (songPlaying === listSongs.length - 1) {
              dispatch(choosing(0));
            } else {
              dispatch(next());
            }
          }}
        >
          <NavigateNextIcon></NavigateNextIcon>
        </button>
      </Grid>
    </div>
  );
}
