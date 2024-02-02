import { useState, useEffect } from 'react'

export default function FetchPokemons() {
	const [pokemons, setPokemons] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const ids = generateRandomIds(12);
				const promises = ids.map( async id => {
					const url = `https://pokeapi.co/api/v2/pokemon/${id}`
					const response = await fetch(url);
					return await response.json();
				});

				const results = await Promise.all(promises);
				const fetchedPokemons = results.map((pokemon) => ({
					key: pokemon.id,
					name: pokemon.name,
					image: pokemon.sprites.front_default,
				}));

				setPokemons(fetchedPokemons);
			} catch (e) {
				console.error('Error fetching data: ', e);
			}
		};

		fetchData();
	}, [])

	
	const generateRandomIds = (amount) => {
		const ids = new Set();

		// 493 is all pokemons up to the 4th generation
		while (ids.size < amount) {
			let randomId = Math.floor(Math.random() * 493);
			ids.add(randomId);
		}

		return Array.from(ids);
	}

	return pokemons;
}
