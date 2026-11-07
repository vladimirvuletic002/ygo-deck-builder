import { useImperativeHandle } from "react"
import { useState, useEffect } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"
import '../styles/Home.css'

function Home(){
	const [error, setError] = useState("")
	const [cardName, setCardName] = useState("")
	const [slots, setSlots] = useState(() => {
		const savedSlots = localStorage.getItem("deck")

		return savedSlots ? JSON.parse(savedSlots) : Array(40).fill(null)
	})
	
	useEffect(() => {
		localStorage.setItem("deck", JSON.stringify(slots))
	}, [slots])


	//Dodavanje karte
	async function handleAddCard(){

		const emptyIndex = slots.findIndex(slot => slot === null)

		if(!cardName.trim()){
			setError("Enter card name!")
			return
		}

		if(emptyIndex === -1){
			setError("Deck is full!")
			return
		}

		try{
			setError("")

			const response = await fetch(`http://localhost:3000/api/cards?name=${encodeURIComponent(cardName)}`)

			if(!response.ok){
				throw new Error("Could not fetch card")
			}

			const data = await response.json()

			setSlots(prevSlots => {
				const updatedSlots = [...prevSlots]
				updatedSlots[emptyIndex] = data.imageURL
				return updatedSlots
			})

			setCardName("")

		}
		catch(error){
			setError(error.message)
		}
	} 

	// brisanje karte
	function handleClearSlot(index){
		setSlots(prevSlots => {
			const updatedSlots = [...prevSlots]
			updatedSlots[index] = null
			return updatedSlots
		})
	}

	function handleClearDeck(){
		setSlots(() => Array(40).fill(null))
	}
	
	
	return(
		<div>
			

			<div className="card-name-section">
                <h4>Input Card Name</h4>
				<input id="card-name-input" className="card-name" type="text" 
                value={cardName}
                onChange={e => setCardName(e.target.value)}
                />
                
                <button id="add-btn" onClick={handleAddCard}>Add</button>
				{error && <p className="error">{error}</p>}
            </div>

			<div id="deck-slots">
				{slots.map((imageURL, index) => (
					<div key={index} 
						 id={`card-slot${index+1}`}
						 className="card-slot"
					>
						{imageURL && (
							<img
								id={`card-image${index+1}`}
								className="card-image"
								src={imageURL}
								alt="Card"
								onClick={() => handleClearSlot(index)}
							/>
						)}
					</div>
				))}

			</div>	

			<div>
				<button className="clear-btn" onClick={handleClearDeck}>Clear Deck</button>
			</div>

			

		</div>
		
	)
}

export default Home
