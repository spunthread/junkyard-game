export default props => {
	return (
		<div className="J">
			<aside>
				<p>Parkinglot: <span>{props.countP}/{props.spaceP}</span></p>
				<p>Workshop: <span>{props.countW}/{props.spaceW}</span></p>
				<p>Storeroom: <span>{props.countS}/{props.spaceS}</span></p>
			</aside>
			<aside>
				{array.length ? <>
					<span>{props.inV.name}</span>,
					<img src={props.inV.img} alt="🚘️" width="48" height="48" />,
					<span>${props.inV.price.toFixed(2)}</span>,
					<label>
						<button onClick={props.onBuy}>Buy</button>
						<button onClick={props.onSkip}>Skip</button>
					</label>
				</> : <span>Next Vehicle ...'</span>}
				<span>{props.time} Sec</span>
			</aside>
		</div>
	);
};