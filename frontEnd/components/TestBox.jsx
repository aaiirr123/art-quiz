import './TestBox.css'
import { useState } from 'react'
import defaultImage from '../images/defaultImage.jpg'

function TestBox(props) {
    const [artInfo, setArtistInfo] = useState(
        {
            department: "",
            culture: "",
            period: "",
            title: "",
        }
    )
    const [image, setImage] = useState("")
    const [score, setScore] = useState(0)
    const [answers, setAnswers] = useState([])

    const answerList = answers.map(answer => <p className='answer'  key={answer}>{answer}</p>)

    function addScore(){
        setScore(oldScore => oldScore + 1)
        setAnswers(prevAnswers => [...prevAnswers, 'Aaron Crawford'])
    }

    async function getNewArt() {
        let randNum = getRandomInt(0, props.artistInfo.objectIDs.length)
        let index = props.artistInfo.objectIDs[randNum]
        let url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'
        fetch(url + index)
        .then(res => res.json())
        .then(data => {
            setImage(data.primaryImage)
            setArtistInfo(
                {
                    department: data.department,
                    culture: data.culture,
                    period: data.period,
                    title: data.title,
                })
            console.log(artInfo)
        })
    }

    return (
        <main>
            <div className="form">  
                <input
                    type="text"
                    placeholder="Search for Artist Name"
                    className="class--input"
                />
                <input
                    type="text"
                    placeholder="Name of Art Work"
                    className="class--input"
                />
                <button onClick={addScore} className="form--button">
                    Submit Answers
                </button>
                <button onClick={getNewArt} className="form--button">
                    Generate New Art
                </button>
                <button onClick={props.toggleGame} className="form--button">
                    Quit Game
                </button>
                <img src={image} className="art--image"/>
                <div>
                    <p>{artInfo.title}</p>
                    <p>{artInfo.culture}</p>
                    <p>{artInfo.department}</p>
                    <p>{artInfo.period}</p>
                </div>
            </div>
            <div className='answer--box'>
                <h1>Score: {score}</h1>
                {answerList}
            </div>
        </main>
    )
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default TestBox