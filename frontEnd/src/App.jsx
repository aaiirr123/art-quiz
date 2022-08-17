import './App.css'
import { useState } from 'react'
import Header from '../components/Header'
import TestBox from '../components/TestBox'
import Search from '../components/Search'

function App() {
  const [inGame, setInGame] = useState(false)
  const [artistInfo, setArtistInfo] = useState(
    {
      artistName: "",
      objectIDs: []
    })

  function getArtistWorks() {
    let searchURL = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&artistOrCulture=true&q='
    let artistName = artistInfo.artistName
    console.log(artistInfo.artistName)
    fetch(searchURL + artistName)
    .then(res => res.json())
    .then(data => setArtistInfo(
      prevState => {
        return {
          ...prevState,
          objectIDs: data.objectIDs
        }
      }
    ))

    changeGameMode()
  }

  function handleChange(event) {
    setArtistInfo(prevInfo => {
      return {
        ...prevInfo,
        [event.target.name]: event.target.value 
      }
    })
  }

  function changeGameMode() {
    setInGame(prevState => !prevState)
  }

  return (
    <div>
      <Header />
      {inGame && <TestBox 
        toggleGame={changeGameMode}
        artistInfo={artistInfo}
      />}
      {!inGame && <Search 
        getArtistWorks={getArtistWorks} 
        handleChange={handleChange} 
      />}
    </div>
  )
}

export default App
