import '../styles/card.css'

export default function Card({title, image, handleCardClick}) {
	return (
		<div className="cardInfo" onClick={handleCardClick}>
			<img src={image} />
			<h1>{title}</h1>
		</div>
	)
}
