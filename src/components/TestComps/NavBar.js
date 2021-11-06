export default props => {
	return (
		<nav>
			<button onClick={e => props.setCurrent(e.target.textContent)} disabled={props.current === 'Junkyard'}>Junkyard</button>
			<button onClick={e => props.setCurrent(e.target.textContent)} disabled={props.current === 'Parkinglot'}>Parkinglot</button>
			<button onClick={e => props.setCurrent(e.target.textContent)} disabled={props.current === 'Workshop'}>Workshop</button>
			<button onClick={e => props.setCurrent(e.target.textContent)} disabled={props.current === 'Storeroom'}>Storeroom</button>
		</nav>
	);
};