import './TestBox.css'
import { useState, useEffect} from 'react'

function TestBox(props) {
    useEffect(() => {
        getNewArt()
    }, [])
    
    let usedImages = []

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
    const [showAnswer, setShowAnswer] = useState(false)

    const answerList = answers.map(answer => <p className='answer'  key={answer}>{answer}</p>)

    function addScore(){
        setScore(oldScore => oldScore + 1)
        setAnswers(prevAnswers => [...prevAnswers, 'Aaron Crawford'])
    }
    async function getNewArt() {
        setShowAnswer(false)
        if(props.artistInfo.objectIDs == null) {
            setNoImageState(true)
            return
        }

        let noImage = true
        let url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'
        let timeOut = 0

        while(noImage && timeOut <= 5)
        {
            timeOut++
            let randNum
            do
                randNum = getRandomInt(0, props.artistInfo.objectIDs.length - 1)
            while(randNum in usedImages)

            let index = props.artistInfo.objectIDs[randNum]
            let res = await fetch(url + index)
            let data = await res.json()
            console.log("at inedex " + index)
    
            let imageUrl ="" 

            if (data.primaryImage != ""){
                imageUrl = data.primaryImage
            }
            else if (data.primaryImageSmall != "") {
                imageUrl = data.primaryImageSmall
            }
            else if (data.additionalImages.length > 0) {
                imageUrl = data.additionalImages[0]
            }
            else continue

            usedImages.push(randNum)
            noImage = false

            setImage(data.primaryImage)
            setArtistInfo ({
                department: data.department,
                culture: data.culture,
                period: data.period,
                title: data.title,
            })
        }
        if (timeOut >= 5) {
            setNoImageState(true)
        }
    }

   
    return (
        <main>
            <div className="form">  
                <input
                    type="text"
                    placeholder="Title of work?"
                    className="class--input"
                />
                <button onClick={addScore} className="form--button">
                    Submit Answers
                </button>
                <button onClick={getNewArt} className="form--button">
                    Skip
                </button>
                <button onClick={() => setShowAnswer( prev => !prev)} className="form--button">
                    Show Answer
                </button>
                <button onClick={props.toggleGame} className="form--button">
                    Quit Game
                </button>
                <img src={image} className="art--image"/>
                {   showAnswer &&
                    <div>
                        <p>{artInfo.title}</p>
                    </div>
                }
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