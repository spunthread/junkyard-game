import { useEffect, useState } from "react";
import Head from "./Head";
import Body from "./Body";
import Vehicle from "../vehicle";

export default props => {

	const [current, setCurrent] = useState('Junkyard');
	const [message, setMessage] = useState('\0');
	const [color, setColor] = useState('transparent');

	const [money, setMoney] = useState(250);
	const [level, setLevel] = useState(1);
	const [point, setPoint] = useState(0);
	const [energy, setEnergy] = useState(25);

	const [spaceP, setSpaceP] = useState(1);
	const [spaceW, setSpaceW] = useState(1);
	const [spaceS, setSpaceS] = useState(1);

	const [vehicleP, setVehicleP] = useState([]);
	const [vehicleW, setVehicleW] = useState([]);
	const [vehicleS, setVehicleS] = useState([]);

	const [outV, setOutV] = useState(null);
	const [inV, setInV] = useState(null);
	const [time, setTime] = useState(12);

	const updateSupply = () => {
		console.log('updateSupply called');
		if (time === 0) setInV(ogVehicle => {
			setTime(ogVehicle ? 90 : 30);
			return ogVehicle ? null : new Vehicle(level);
		});
		else setTime(ogTime => ogTime - 1);
	};
	useEffect(() => {
		const updatesupply = setTimeout(updateSupply, 1e3);
		return () => clearTimeout(updatesupply);
	}, [time]);

	const onSupplyBuy = () => {
		console.log('onSupplyBuy called');
		if (money < inV.price) {
			// set message, in red color
			console.log('Not Enough Money !');
			return;
		}
		if (spaceP - vehicleP < 1) {
			// set message, in red color
			console.log('Parkinglot is Full !');
			return;
		}
		setInV(ogVehicle => {
			setMoney(ogMoney => ogMoney - ogVehicle.price);
			setLevel(ogLevel => {
				const max = ogLevel * 1000;
				let total = 0;
				setPoint(ogPoint => {
					total = ogPoint + ogVehicle.level;
					return total % max;
				});
				return total >= max ? ogLevel + 1 : ogLevel;
			});
			return null;
		});
		setTime(60);
	};
	const onSupplySkip = () => { console.log('onSupplySkip called'); };

	return (
		<>
			<Head
				current={current}
				setCurrent={setCurrent}
				message={message}
				color={color}
				money={money}
				level={level}
				point={point}
				energy={energy}
			/> <
		Body current = { current } spaceP = { spaceP } spaceW = { spaceW } spaceS = { spaceS } vehicleP = { vehicleP } vehicleW = { vehicleW } vehicleS = { vehicleS } inV = { inV } time = { time } onSupplyBuy = { onSupplyBuy } onSupplySkip = { onSupplySkip }
		/> <
		/>
	);
};