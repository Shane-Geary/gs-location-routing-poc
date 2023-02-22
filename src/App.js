import {useEffect} from 'react'

import './App.css'

import Navigation from './Navigation'

function App() {

  useEffect(() => {
    navigator.serviceWorker.ready.then(registration => {
      registration.periodicSync.register('my-sync', {
        minInterval: 10 * 10 * 1000,
      })
    })    
  }, [])

  return (
    <div className="App">
      <div
        style={{
          width: window.innerWindow,
          height: window.innerHeight
        }}
      >
        <Navigation />
      </div>
    </div>
  )
}

export default App