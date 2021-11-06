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

	const updateSupply = () => { console.log('updateSupply called');
		if (time === 0) {
			if (inV == null) {
				setInV(new Vehicle(level));
				setTime(30);
			} else {
				setInV(null);
				setTime(120);
			}
		} else setTime(time - 1);
	};
	useEffect(() => {
		const updatesupply = setTimeout(updateSupply, 1e3);
		return () => clearTimeout(updatesupply);
	}, [time]);

	const onSupplyBuy = () => { console.log('onSupplyBuy called');
		// check money, if low && show message, in red color
		// check spaceP - vehicleP.len < 1 if low && show message, in red color
		// clear supply interval
		// change state of money to - inV.price
		// change state of vehicleP.concat inV
		if (money < inV.price) {
			// set message, in red color
		}
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
			/>
			<Body
				current={current}
				spaceP={spaceP}
				spaceW={spaceW}
				spaceS={spaceS}
				vehicleP={vehicleP}
				vehicleW={vehicleW}
				vehicleS={vehicleS}
				inV={inV}
				time={time}
				onSupplyBuy={onSupplyBuy}
				onSupplySkip={onSupplySkip}
			/>
		</>
	);
};