import './App.css';
import { useEffect, useRef } from 'react';
import SideBar from './components/SideBar';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/style.scss';
import Header from './components/Header';
import InfoSong from './components/content/InfoSong';
import Control from './components/content/Control';

function App() {
  var library = null;
  var setLibrary = null;
  const audio = useRef();
  //hàm nhận state và setState từ component con
  const onChildMount = (dataFromChild) => {
    library = dataFromChild[0];
    setLibrary = dataFromChild[1];
  };

  //hàm thay đổi state đã nhận từ component con
  const libraryClick = () => {
    setLibrary(!library);
  };
  useEffect(() => {
    console.log('app render');
  });
  return (
    <div>
      <SideBar childMount={onChildMount}></SideBar>
      <div className='wrapper d-flex flex-column min-vh-100 '>
        <Header libraryCLick={libraryClick}></Header>
        <InfoSong ref={audio}></InfoSong>
        <Control audio={audio}></Control>
      </div>
    </div>
  );
}

export default App;
