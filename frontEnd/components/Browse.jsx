import './TestBox.css'
import { useState, useEffect} from 'react'

function Browse(props) {
    // This allows for an art work to load on the first render
    useEffect(() => {
        getNextArtWork()
    }, [])

    const [artInfo, setArtistInfo] = useState(
        {
            department: "",
            culture: "",
            period: "",
            title: "",
            objectName: "",
            artistDisplayName: "",
            artistDisplayBio: "",

        }
    )
    const [image, setImage] = useState("")
    const [noImageState, setNoImageState] = useState(false)
    const [artWorkIndex, setArtWorkIndex] = useState(0)

    async function getNextArtWork() {

        if(props.artistInfo.objectIDs == null) {
            setNoImageState(true)
            return
        }

        let noImage = true
        let url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'
        let timeOut = 0

        while(noImage && timeOut <= 20)
        {
            timeOut++
            let index = props.artistInfo.objectIDs[artWorkIndex]
            let res = await fetch(url + index)
            let data = await res.json()    

            if (data.primaryImage == "") continue

            
            noImage = false
            setArtWorkIndex(prev => prev + 1)
            setImage(data.primaryImage)
            setArtistInfo ({
                department: data.department,
                culture: data.culture,
                period: data.period,
                title: data.title,
                objectName: data.objectName,
                artistDisplayName: data.artistDisplayName,
                artistDisplayBio: data.artistDisplayBio,
            })
        }

        if (noImage) {
            setNoImageState(true)
        }
    }

   
    return (
        <main>
            <div className="form">  
                {noImageState && <h2>couldn't find enough artwork</h2>}
                <h1>Image {artWorkIndex}</h1>
                <button onClick={getNextArtWork} className="form--button">
                   Next Art Work
                </button>
                <button onClick={getNextArtWork} className="form--button">
                    Previous Art Work
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
                    <p>{artInfo.objectName}</p>
                    <p>{artInfo.artistDisplayName}</p>
                    <p>{artInfo.artistDisplayBio}</p>
                </div>
            </div>
        </main>
    )
}


export default Browse