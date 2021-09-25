import "./css/Junkyard.css"
import React from "react";

const Junkyard = props => {
	const VehicleSupply = props.supplyVehicle?
		<aside>
			<span>{props.supplyVehicle.name}</span>
			<img src={props.supplyVehicle.img} alt="🚘️" width="48" height="48" />
			<span>${props.supplyVehicle.price.toFixed(2)}</span>
			<label>
				<button onClick={props.onBuy}>Buy</button>
				<button onClick={props.onSkip}>Skip</button>
			</label>
			<span>{props.supplyTime} Sec</span>
		</aside>:
		<aside>
			<span>Next Vehicle ...</span>
			<span>{props.supplyTime} Sec</span>
		</aside>;

		return (
			<div className="J">
				<aside>
					<p>Parkinglot: <span>{props.parkinglotCount}/{props.parkinglotSpace}</span></p>
					<p>Workshop: <span>{props.workshopCount}/{props.workshopSpace}</span></p>
					<p>Storeroom: <span>{props.storeroomCount}/{props.storeroomSpace}</span></p>
				</aside>
				{VehicleSupply}
			</div>
		);
};

export default Junkyard;