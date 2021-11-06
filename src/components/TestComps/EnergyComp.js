export default props => {
	return (
		<div>
			<img src="res/Energy0.png" alt="🔥" width="48" height="48" />
			<p>
				<span>Energy</span>
				<strong>{props.energy}🔺{props.level * 100}</strong>
				<progress value={props.energy} max={props.level * 100}></progress>
			</p>
		</div>
	);
};