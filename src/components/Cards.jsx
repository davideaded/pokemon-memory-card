import { useState, useEffect } from 'react'
import '../styles/card.css'
import FetchPokemons from '../api/PokeApi.jsx'

export default function Cards() {
	const newPokemons = FetchPokemons();
	const [gameStats, setGameStats] = useState({
		points: 0,
		maxPoints: 0,
		clickedCards: [],
		gameOver: false,
	});
	const [pokemons, setPokemons] = useState([]);

	useEffect(() => {
		const fetchedPokemons = [];
		for (let pokemon of newPokemons) {
			fetchedPokemons.push({ key: pokemon.key, name: pokemon.name, image: pokemon.image });
		}
		setPokemons(fetchedPokemons);
	}, [newPokemons]);

	const handleCardClick = (poke) => {
		if (gameStats.clickedCards.includes(poke.key)) {
			const newGameStat = { ...gameStats, points: 0, clickedCards: [] };
			setGameStats(newGameStat)
			return;
		}

		const newGamePoint = gameStats.points + 1;
		const newGameStat = {
			...gameStats,
			clickedCards: [...gameStats.clickedCards, poke.key],
			points: newGamePoint,
			maxPoints: Math.max(newGamePoint, gameStats.maxPoints),
			gameOver: newGamePoint === pokemons.length ? true : false,
		}

		setGameStats(newGameStat);
	};

	useEffect(() => {
		if (pokemons.length !== 0) {
			shuffle();
		}
	}, [gameStats]);

	const shuffle = () => {
		const shuffledCards = [...pokemons];

		for (let i = shuffledCards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
		}

		setPokemons(shuffledCards);
	};

	if (pokemons.length === 0 ) {
		return <div>Loading...</div>
	}

	return (
		<>
			<div className="header">
			{
				gameStats.gameOver && <h1>You won!</h1>
			}
			{
				!gameStats.gameOver && (
					<>
						<h1>Points: {gameStats.points}</h1>
						<h1>Max points: {gameStats.maxPoints}</h1>
					</>
				)
			}
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
