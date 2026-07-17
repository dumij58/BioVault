import {useEffect, useState} from 'react'
import { Env } from "./Env";
import './App.css'

function App() {

  useEffect(() => {
    fetch(`${Env.API_BASE_URL}/ping`)
        .then(response => response.text())
        .then(body => console.log(body));
  }, []);

  return (
    <>
      <h1>BioVault</h1>
      <h3>Research Sample and Biological Sequence Repository</h3>
    </>
  )
}

export default App
