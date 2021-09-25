import "./css/Parkinglot.css";
import React from "react";

const Parkinglot = props => {
	return (
		<div className="P">
			<header>
				<span>Vehicle: {props.vehicle.length}</span>
				<span>Space: {props.space}</span>
				<span>Expand: 💲{props.space * 1e3}</span>
				<button onClick={props.onUpgrade}>Upgrade</button>
			</header>
			<section>
				{props.vehicle.map(vehicle =>
				<p key={vehicle.id}>
					<span>{vehicle.name}</span>
					<img src={vehicle.img} alt="🚘️" width="48" height="48" />
					<span>
						🔥 {vehicle.move}
						<button value={vehicle.id} onClick={props.onMove}>Move</button>
					</span>
				</p>
				)}
			</section>
		</div>
	);
};

export default Parkinglot;