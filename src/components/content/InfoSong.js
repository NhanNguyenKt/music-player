import { forwardRef, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import listSongs from '../../audio';
import { next, choosing } from '../../features/chooseSong/songSlice';
import { showPause } from '../../features/playButton/controlSlice';

function InfoSong(props, ref) {
  const firstPlay = useRef(0);
  const songPlaying = useSelector((state) => state.songPlaying.value);
  const isPlay = useSelector((state) => state.control.value);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('infosong render');
    //console.log(listSongs[songPlaying].source)
  });
  useEffect(() => {
    if (firstPlay.current > 1) {
      dispatch(showPause());
    }
    firstPlay.current = firstPlay.current + 1;
  }, [songPlaying]);
  useEffect(() => {
    ref && isPlay ? ref.current.pause() : ref.current.play();
  }, [isPlay, songPlaying]);
  return (
    <div>
      <audio
        ref={ref}
        src={
          listSongs[songPlaying]
            ? listSongs[songPlaying].source
            : listSongs[0].source
        }
        onEnded={() => {
          if (songPlaying === listSongs.length - 1) {
            dispatch(choosing(0));
          } else {
            dispatch(next());
          }
        }}
      ></audio>
    </div>
  );
}
export default forwardRef(InfoSong);
