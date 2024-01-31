import React, { useState } from 'react'
import './App.css'
import Card from './components/Card.jsx'
import charizard from './assets/charizard.png'

function App() {
	const [newCardsArray, setNewCardsArray] = useState([]);
	const cardArray = [];

	for (let i = 0; i < 12; i++) {
		cardArray.push(<Card key={i} title={`Charizard${i}`} image={charizard} />);
	}

	const handleClick = () => {
		let mockArray = [...cardArray];
		let newCardsArray = [];
		
		while (mockArray.length != 0) {
			const randomIndex = Math.floor(Math.random() * mockArray.length);
			const randomCard = mockArray[randomIndex];
			newCardsArray.push(randomCard);
			mockArray.splice(randomIndex, 1);
		}

		setNewCardsArray(newCardsArray);
		console.log(newCardsArray);
	}

  return (
		<>
			<div className='container'>
				{newCardsArray.length === 0 ? cardArray : newCardsArray}
			</div>
			<button onClick={handleClick}>Reorder</button>
		</>
  )
}

export default App
