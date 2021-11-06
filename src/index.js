import "./components/css/index.css";
import React from "react";
import ReactDOM from "react-dom";
import Game from "./components/TestComps/Game";
// import { useState, useEffect } from "react";


ReactDOM.render(
	<React.StrictMode>
		<Game />
		{/* <App /> */}
	</React.StrictMode>,
	document.getElementById('root')
);
/*
function App(props) {
	const [message, setMessage] = useState('');

	useEffect(() => {
		if (!message) return null;
		const timeout = setTimeout(() => setMessage(''), 1e3);
		return () => clearTimeout(timeout);
	}, [message]);

	return (
		<div>
			<h2>{message}</h2>
			<section>
				<button onClick={e => {
					console.log('First Clicked', message);
					setMessage('First Button Clicked');
				}}>First</button>
				<button onClick={e => {
					console.log('Second Clicked', message);
					setMessage('Second Button Clicked');
				}}>Second</button>
				<button onClick={e => {
					console.log('Third Clicked', message);
					setMessage('Third Button Clicked');
				}}>Third</button>
			</section>
		</div>
	);
}
*/