import './Search.css'
import defaultImage from '../images/defaultImage.jpg'
import {useState} from 'react'

function Search(props) {

    return (
        <main>
        <div className="form">  
            <input
                type="text"
                name="artistName"
                onChange={props.handleChange}
                placeholder="Search for Artist Name"
                className="class--input"
            />
            <button onClick={props.getArtistWorks} className="form--button">
                Search for images by artist
            </button>
            <img src={defaultImage} className="art--image"/>
        </div>
    </main>
    )
} 
export default Search