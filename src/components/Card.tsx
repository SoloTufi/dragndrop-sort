import React from 'react';

import style from './card.module.scss';

const Card: React.FC = () => {
	return (
		<div className={style.root}>
			<h2 className={style.title}>Карточка 1</h2>
		</div>
	);
};

export default Card;
