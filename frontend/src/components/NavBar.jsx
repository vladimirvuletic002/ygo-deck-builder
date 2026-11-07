import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/NavBar.css"

function NavBar(){
    const [cardName, setCardName] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    function handleNavToBuild(){
        navigate('/')
    }

    function handleNavToDB(){
        navigate('/cards-db')
    }

    function handleSearch(){
        if (!cardName.trim()) {
            setError("Enter card name!")
            return
        }

        setCardName("")
        setError("")
        navigate(`/cards-db?name=${encodeURIComponent(cardName)}`)
        

    }
    
    return(
        <div className="nav">
            <div className="title">Deck Builder</div>

            <div className="build-deck-page" onClick={handleNavToBuild}>
                Build Deck
            </div>

            <div className="cards-db-page" onClick={handleNavToDB}>
                Cards DB
            </div>

            <div className="search-bar">
                {error && <p className="error">{error}</p>}
                <input id="card-name-search" className="card-name" 
                type="text" 
                value={cardName}
                placeholder="Search for the card"
                onChange={e => setCardName(e.target.value)}
                />
                
                <button id="search-btn" onClick={handleSearch}>Search</button>
            
            </div>

            

        </div>
    )
}

export default NavBar