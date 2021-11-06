export default props => {
	return (
		<div>
			<img src="res/Money0.png" alt="💵" width="48" height="48" />
			<p>
				<span>Money</span>
				<strong>💲{props.money.toFixed(2)}</strong>
			</p>
		</div>
	);
};