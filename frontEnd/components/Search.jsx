import './Search.css'
import defaultImage from '../images/defaultImage.jpg'
import popularArtists from '../data/suggestedArtists'

function Search(props) {

    const artistSuggestions = popularArtists.map(artist => {
        return (
            <button className='suggestion--button' 
            onClick={() => props.getSuggestedArtistWorks(artist)}>
               {artist}
            </button>
        )
    })

    return (
        <main>
        <div className="form">  
            <input
                type="text"
                name="artistName"
                onChange={props.handleArtistChange}
                placeholder="Search for Artist Name"
                className="class--input"
            />
            <button onClick={props.getSearchBoxArtistWorks} className="form--button">
                Search for images by artist
            </button>
            <div>
                <h2>Select Mode</h2>
                <input type="radio" 
                    value="Quiz"
                    name="gameMode" 
                    checked={props.gameMode === "Quiz"}
                    onChange={props.handleGameModeChange}
                /> Quiz

                <input type="radio" 
                    value="Browse"
                    name="gameMode" 
                    checked={props.gameMode === "Browse"}
                    onChange={props.handleGameModeChange}
                /> Browse
            </div>
            <img src={defaultImage} className="art--image"/>
            <h2 className='suggestion--text'>Popular Artisits</h2>
            {artistSuggestions}
        </div>
    </main>
    )
} 
export default Search