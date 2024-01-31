import '../styles/card.css'

export default function Card({title, image}) {
	const handleClick = () => {
		console.log('clicked');
	}

	return (
		<div className="cardInfo" onClick={() => handleClick()}>
			<img src={image} />
			<h1>{title}</h1>
		</div>
	)
}
