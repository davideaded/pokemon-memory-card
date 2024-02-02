import { useState, useEffect } from 'react'
import '../styles/card.css'
import charizard from '../assets/charizard.png'

export default function Cards() {
	const [clickedCards, setClickedCards] = useState([]);
	const [points, setPoints] = useState(0);
	const [maxPoints, setMaxPoints] = useState(0);
	const [pokemons, setPokemons] = useState([]);

	useEffect(() => {
		const newPokemons = [];
		for (let i = 0; i < 12; i++) {
			newPokemons.push({ key: i, name: `charizard${i}`, image: charizard });
		}
		setPokemons(newPokemons);
	}, []);
	
	// useEffect(() => {
	// 	shuffle();
	// }, [clickedCards])

	const handleCardClick = (poke) => {
		if (clickedCards.includes(poke.key)) {
			setPoints(0);
			setClickedCards([]);
			return;
		}

		setClickedCards([...clickedCards, poke.key]);
		setPoints((p) => {
			let newPoint = p+1;
			if (newPoint > maxPoints) { setMaxPoints(newPoint) }
			return newPoint;
		});
	};

	const shuffle = () => {
		let mockCards = [...pokemons];
		const shuffledCards = [...pokemons];

		for (let i = shuffledCards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
		}

		console.log(shuffledCards);
		setPokemons(shuffledCards);
	};

	// if (pokemons.length === 0 ) {
	// 	return <div>Loading...</div>
	// }

	return (
		<>
			<div className="header">
				<h1>Points: {points} </h1>
				<h1>Max points: {maxPoints} </h1>
			</div>

			<div className="container">
				{pokemons.map(pokemon => (
					<div className="cardInfo" key={pokemon.key} onClick={() => handleCardClick(pokemon)}>
						<img src={pokemon.image} alt={pokemon.name}/>
						<h1> {pokemon.name} </h1>
					</div>
				))}
			</div>
		</>
	);
}
