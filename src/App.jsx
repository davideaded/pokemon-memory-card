import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card.jsx'
import charizard from './assets/charizard.png'

function App() {
	const [reorderedCards, setreorderedCards] = useState([]);
	const [clickedCards, setclickedCards] = useState([]);
	const [points, setpoints] = useState(0);
	const [maxPoints, setmaxPoints] = useState(0);
	const cards = [];

	useEffect(() => {
		shuffle();
	}, [clickedCards])

	const storeClickedCard = (card) => {
		if (clickedCards.includes(card)) {
			setpoints(0);
			setclickedCards([]);
			return;
		}

		setclickedCards([...clickedCards, card]);
		setpoints((p) => {
			let newPoint = p+1;
			if (newPoint > maxPoints) { setmaxPoints(newPoint) }
			return newPoint;
		});
	};

  for (let i = 0; i < 12; i++) {
    cards.push(
			<Card
        key={i}
        title={`Charizard ${i}`}
        image={charizard}
				handleCardClick={() => storeClickedCard(i)}
			/>
    );
  }

	const shuffle = () => {
		let mockCards = [...cards];
		const shuffledCards = [];

		while (mockCards.length !== 0) {
			let randomIndex = Math.floor(Math.random() * mockCards.length);
			let randomCard = mockCards[randomIndex];
			mockCards.splice(randomIndex, 1);
			shuffledCards.push(randomCard);
		}

		setreorderedCards(shuffledCards);
	};

  return (
		<>
			<h1>Points: {points}</h1>
			<h1>Max Points: {maxPoints} </h1>
			<div className='container'>
				{reorderedCards};
			</div>
			<button onClick={shuffle}>click</button>
		</>
  )
}

export default App
