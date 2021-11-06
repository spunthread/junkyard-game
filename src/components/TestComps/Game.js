import { useEffect, useState } from "react";
import Head from "./Head";
import Body from "./Body";
import Vehicle from "../../vehicle";

export default props => {

	const [current, setCurrent] = useState('Junkyard');
	const [message, setMessage] = useState('');
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
		setTime(ogTime => {
			if (ogTime === 0) {
				let t = 0;
				setInV(ogVehicle => {
					if (!ogVehicle) {
						t = 30;
						setMessage('New Vehicle arrived !!');
						setColor('green');
						return new Vehicle(level);
					} else {
						t = 90;
						return null;
					}
				});
				console.log('t is', t);
				return t;
			} else {
				return ogTime - 1;
			}
		});
	};
	useEffect(() => {
		const updatesupply = setTimeout(updateSupply, 1e3);
		return () => clearTimeout(updatesupply);
	}, [time]);

	const onSupplyBuy = () => {
		if (money < inV.price) {
			setMessage('Not Enough Money !');
			setColor('red');
			return;
		}
		if (spaceP - vehicleP < 1) {
			setMessage('Parkinglot is Full !');
			setColor('red');
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
				console.log('total is', total);
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