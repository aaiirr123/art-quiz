import './App.css'
import { useState, useEffect} from 'react'
import Header from '../components/Header'
import TestBox from '../components/TestBox'
import Search from '../components/Search'
import Browse from '../components/Browse'

function App() {
  const [inGame, setInGame] = useState(false)
  const [gameMode, setGameMode] = useState("Quiz")
  const [artistInfo, setArtistInfo] = useState(
    {
      artistName: "",
      objectIDs: []
    })

  
  function getSearchBoxArtistWorks() {
    getArtistWorks(
      artistInfo.artistName,
      (prevState, data) => {
        return {
          ...prevState,
          objectIDs: data.objectIDs
        }
      }
    )
  }
  
  function getArtistWorks(artistName, callback) {
    let searchURL = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&artistOrCulture=true&q='

    fetch(searchURL + artistName)
    .then(res => res.json())
    .then(data => setArtistInfo(
        prevState => callback(prevState, data)
    ))
    .then(() => changeGameMode())
  }
  

  function getSuggestedArtistWorks(suggestedName) {
    getArtistWorks(
      suggestedName,
      (prevState, data) => {
        return {
          artistName: suggestedName,
          objectIDs: data.objectIDs
        }
      }
    )
    
  }

  function handleArtistChange(event) {
    setArtistInfo(prevInfo => {
      return {
        ...prevInfo,
        [event.target.name]: event.target.value 
      }
    })
  }

  function handleGameModeChange(event) {
    setGameMode(event.target.value)
  }


  function changeGameMode() {
    setInGame(prevState => !prevState)
  }

  return (
    <div>
      <Header />
      {inGame && gameMode == "Quiz" && <TestBox 
        toggleGame={changeGameMode}
        artistInfo={artistInfo}
      />}
      {inGame && gameMode == "Browse" && <Browse 
        toggleGame={changeGameMode}
        artistInfo={artistInfo}
      />}
      {!inGame && <Search 
        getSearchBoxArtistWorks={getSearchBoxArtistWorks} 
        handleArtistChange={handleArtistChange} 
        handleGameModeChange={handleGameModeChange}
        gameMode={gameMode}
        getSuggestedArtistWorks={getSuggestedArtistWorks}
      />}
    </div>
  )
}

export default App
