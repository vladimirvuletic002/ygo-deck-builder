import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import '../styles/CardsDB.css'

function CardsDB(){
    const [searchParams] = useSearchParams()
    const name = searchParams.get("name")
    const [displayName, setDisplayName] = useState("")
    const [error, setError] = useState("")
    const [cardImage, setCardImage] = useState("")
    const [typeLine, setTypeLine] = useState([])
    const [description, setDescription] = useState("")
    const [atk, setAtk] = useState("")
    const [def, setDef] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try{
			setError("")

			const response = await fetch(`http://localhost:3000/api/cards?name=${encodeURIComponent(name)}`)

			if(!response.ok){
				setCardImage("")
                throw new Error("Could not fetch card")
			}

			const data = await response.json()

			setCardImage(data.imageURL)
            setDisplayName(data.cardName)
            setTypeLine(data.typeLine)
            setDescription(data.cardDescription)
            setAtk(data.atk)
            setDef(data.def)

		}
		catch(error){
			setError(error.message)
		}
        }
        fetchData()
        
    }, [name])

    return (
        <div>
            {error && <p className="error">{error}</p>}

            {cardImage && (
            <>
            <div className="card-image-div">
                
                    
                    <h4>{displayName}</h4>
                    <img 
                        className="card-db-image"
                        src={cardImage}
                        alt="NO-CARD"
                    />
                    
                
            </div>

            <div className="card-description-div">
                <div className="card-description-text">
                    {typeLine && (
                        <p className="card-description-type">
                        [{typeLine[0]}/{typeLine[1]}]
                    </p>
                    )}
                    
                    <p>{description}</p>
                    
                    {atk && (
                        <p className="atk-def">ATK/ {atk} DEF/ {def}</p>
                    )}
                    
                
                </div>
            </div>
            </>
            )}

        </div>
    )
}

export default CardsDB