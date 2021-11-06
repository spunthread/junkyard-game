export default props => {
	return (
		<div>
			<img src="res/Star.png" alt="🌟" width="48" height="48" />
			<p>
				<span>Level</span>
				<strong>{props.level}🔺{props.point}</strong>
				<progress value={props.point} max={props.level * 1000}></progress>
			</p>
		</div>
	);
};