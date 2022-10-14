import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { choosing } from '../features/chooseSong/songSlice';
import listSongs from '../audio';

export default function SideBar({ childMount }) {
  const [library, setLibrary] = useState(true);
  const choosingSong = useSelector((state) => state.songPlaying.value);
  const dispatch = useDispatch();
  useEffect(() => {
    childMount([library, setLibrary]);
  }, [childMount, library]);
  //useEffect(() => { dispatch(showPlay()) }, [choosingSong])
  useEffect(() => {
    console.log('sidebar render');
  });
  const onSongClick = (index) => {
    //setSelectedSong(el)
    dispatch(choosing(index));
    //dispatch(showPlay())
  };

  return (
    <>
      <CSidebar
        style={{
          boxShadow: 'rgb(204 204 204) 2px 2px 50px',
          backgroundColor: 'white',
        }}
        className='library'
        position='fixed'
        visible={library}
      >
        <CSidebarBrand style={{ backgroundColor: 'white' }}>
          <h3 style={{ color: 'black' }}>Library</h3>
        </CSidebarBrand>
        <CSidebarNav>
          {listSongs.map((el, index) => (
            <Button
              key={index}
              onClick={() => onSongClick(index)}
              style={{
                height: '70px',
                backgroundColor: index === choosingSong ? 'pink' : '',
                color: '#646464',
                textTransform: 'none',
              }}
            >
              {el.title}
            </Button>
          ))}
        </CSidebarNav>
      </CSidebar>
    </>
  );
}
