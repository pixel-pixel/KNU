import React,{useState,useEffect} from 'react';
import Main from './Pages/Main/Main';
import Play from './Pages/Play/Play';
import {Switch, Route} from 'react-router-dom';
import './App.css';

function App() {

  const [ac,setAc] = useState<any>(null);

  useEffect(()=>{
    window.addEventListener('click',ac_add)
    window.addEventListener('drop',ac_add)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const ac_add = () =>{
    setAc(new AudioContext())
    window.removeEventListener('click',ac_add);
    window.removeEventListener('drop',ac_add);
  }

  return (
    <div className='main'>
      <Switch>
        <Route path='/Play' exact component={() => <Play ac={ac}/>} />
        <Route path='/' exact component={Main} />
      </Switch>
    </div>
  );
}

export default App;