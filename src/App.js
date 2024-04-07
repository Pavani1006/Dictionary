import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [word,setWord]=useState('');
  const [data,setData]=useState('');
  const [error,setError]=useState(null);
  const getDetails=async ()=>{
    try{
    const x=await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`);
      setData(x.data[0]);
      setWord('');
      setError(null);
    console.log(x);
   
  }
  catch(err)
  {
     console.log(err);
     setError('nooo');
  }
}
// const speech =()=> {
//   let audio = new Audio(data.phonetics[0].audio);
//   audio.play();
// }
const speech = () => {
  try {
    if (data && data.phonetics && data.phonetics[0] && data.phonetics[0].audio) {
      let audio = new Audio(data.phonetics[0].audio);
      audio.play();
    } else {
      throw new Error('Audio not found');
    }
    setError(null); 
  } catch (err) {
    console.error(err);
    setError('Audio not found');
  }
};

  return (
  <div className='container'>
    <div className='card'>
      <div className='head'>
      <h1>Dictionary</h1>
      </div>
      <div className='header'>
        <input id='text' type='text' value={word} placeholder='Enter word       ' onChange={(e)=>setWord(e.target.value)} />
        <button className='search' onClick={()=>getDetails()}><i className="fa fa-search"></i></button>
      </div>
      {data &&
      <div className='content'>
        {data.meanings[0].definitions[0].definition &&
        <div className='speech'>
        <h1>{data.word}</h1>
        {error && <p>{error}</p>}
        {data.phonetics[0].audio &&
        <button className='play' onClick={()=>speech()}><i className="fa fa-play-circle"></i></button>}
        </div>}
        <h4 >{data.phonetic}</h4>
        {data.meanings[0].definitions[0].definition &&
        <div>
        <h4 >Definition:</h4>
        <p className='def'> {data.meanings[0].definitions[0].definition}</p> </div>}
        <h4 >Parts of speech:</h4 >
        <p>{data.meanings[0].partOfSpeech}</p>
        {data.meanings[0].definitions[0].example &&
        <div><h4 >Example:</h4>
        <p>{data.meanings[0].definitions[0].example}</p>
        </div>}
      </div>
      }
    </div>
  </div>
  );
}

export default App;
