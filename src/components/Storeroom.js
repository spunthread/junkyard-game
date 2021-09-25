import "./css/Storeroom.css";
import React from "react";

const Storeroom = props => {
	return (
		<div className="S">
			<header>
				<span>Vehicle: {props.vehicle.length}</span>
				<span>Space: {props.space}</span>
				<span>Expand: ${props.space * 1.5e3}</span>
				<button onClick={props.onUpgrade}>Upgrade</button>
			</header>
			<section>
				{props.vehicle.map(vehicle =>
					<p key={vehicle.id}>
						<span>{vehicle.name}</span>
						<img src={vehicle.img} alt="🚘️" width="48" height="48" />
						<button value={vehicle.id} onClick={props.onSell}>Sell</button>
					</p>
				)}
			</section>
		</div>
	);
};

export default Storeroom;