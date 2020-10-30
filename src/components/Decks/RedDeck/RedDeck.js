import React, { useContext, useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button'
import axios from 'axios'

const RedDeck = () => {
	const [color, setColor] = useState('red')
	const [type, setType] = useState('creature')
	const [manaCost, setManaCost] = useState(1)
	const [cards, setCards] = useState(null)

	useEffect(() => {
		const url = `https://api.scryfall.com/cards/search?q=c%3A${color}+t%3a${type}+cmc%3a${manaCost}`
		// const url = `https://api.scryfall.com/cards/search?q=t%3Aisland`
		axios.get(url).then((res) => {
			setCards(res.data.data)
			// console.log(res.data.data)
		})
	}, [color, type, manaCost])

	const handleSubmit = (event) => {
		event.preventDefault()

		setColor(event.target.color.value)
		setType(event.target.type.value)
		setManaCost(event.target.mana.value)
	}

	if (!cards) {
		return <></>
	} else {
		return (
			<div>
				<form className='card-filter' onSubmit={handleSubmit}>
					<select class='' id='color'>
						<option hidden=''>Color</option>
						<option>Blue</option>
						<option>Red</option>
					</select>
					<select class='' id='type'>
						<option hidden=''>Card Type</option>
						<option>Creature</option>
						<option>Sorcery</option>
						<option>Instant</option>
					</select>
					<select class='' id='mana'>
						<option hidden=''>Converted Mana Cost</option>
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
					</select>
					<Button variant='secondary' size='sm' type='submit' block>
						Search Cards
					</Button>
				</form>
				<div className='card-list'>
					{cards.map((card) => {
						if (card.image_uris && card.id) {
							return (
								<div>
									<img
										src={card.image_uris.normal}
										alt='Magic The Gathering Card'
									/>
									{card.id}
								</div>
							)
						} else {
							// console.log(card.name)
							return <div></div>
						}
					})}
				</div>
			</div>
		)
	}
}

export default RedDeck