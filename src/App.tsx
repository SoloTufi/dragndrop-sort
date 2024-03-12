import React from 'react';

import style from './app.module.scss';

type Card = {
	id: number;
	order: number;
	text: string;
};

function App() {
	const [cardList, setCardList] = React.useState<Card[]>([
		{ id: 1, order: 1, text: 'Карточка 1' },
		{ id: 2, order: 2, text: 'Карточка 2' },
		{ id: 3, order: 3, text: 'Карточка 3' },
		{ id: 4, order: 4, text: 'Карточка 4' },
	]);
	const [currentCard, setCurrentCard] = React.useState(cardList[0]);

	const dragHandlerStart = (event: React.DragEvent, card: Card) => {
		setCurrentCard(card);
	};

	const dragHandlerEnd = (event: React.DragEvent<HTMLDivElement>) => {
		(event.target as HTMLDivElement).style.background = '#3a3a3a';
	};

	const dragHandlerOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		(event.target as HTMLDivElement).style.background = '#2d2d2d';
	};

	const dropHandler = (event: React.DragEvent<HTMLDivElement>, card: Card) => {
		event.preventDefault();
		setCardList(
			cardList.map(current => {
				if (current.id === card.id) {
					return {
						...current,
						order: currentCard.order,
					};
				}
				if (current.id === currentCard.id) {
					return {
						...current,
						order: card.order,
					};
				}
				return current;
			}),
		);
		(event.target as HTMLDivElement).style.background = '#3a3a3a';
	};

	const sortCard = (a: any, b: any) => {
		if (a.order > b.order) {
			return 1;
		} else {
			return -1;
		}
	};

	return (
		<div className={style.wrapper}>
			<div className={style.app}>
				{cardList.sort(sortCard).map(card => (
					<div
						key={card.id}
						draggable
						onDrop={event => dropHandler(event, card)}
						onDragEnd={event => dragHandlerEnd(event)}
						onDragOver={event => dragHandlerOver(event)}
						onDragLeave={event => dragHandlerEnd(event)}
						onDragStart={event => dragHandlerStart(event, card)}
						className={style.root}
					>
						{card.text}
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
