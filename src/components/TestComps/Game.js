import { useEffect, useState } from "react";
import Head from "./Head";
import Body from "./Body";
import Vehicle from "../../vehicle";

export default props => {

	const [current, setCurrent] = useState('Junkyard');
	const [{message, color}, setNote] = useState({ message: '', color: 'transparent' });

	const [money, setMoney] = useState(250);
	const [{level, point}, setScore] = useState({ level: 1, point: 0 });
	const [energy, setEnergy] = useState(25);

	const [spaceP, setSpaceP] = useState(1);
	const [spaceW, setSpaceW] = useState(1);
	const [spaceS, setSpaceS] = useState(1);

	const [vehicleP, setVehicleP] = useState([]);
	const [vehicleW, setVehicleW] = useState([]);
	const [vehicleS, setVehicleS] = useState([]);

	const [outV, setOutV] = useState(null);
	const [inV, setInV] = useState(null);
	const [time, setTime] = useState(10);
	
	useEffect(() => {
		if (!message) return null;
		const timeout = setTimeout(() => setNote({ message: '', color: 'transparent' }), 24e2);
		return () => clearTimeout(timeout);
	}, [message]);

	const updateSupply = () => {
		if (time === 0) {
			if (inV == null) {
				setTime(30);
				setInV(new Vehicle(level));
				setNote({ message: 'New Vehicle Arrived !!', color: 'green'});
			} else {
				setTime(90);
				setInV(null);
			}
		} else {
			setTime(ogTime => ogTime - 1);
		}
	/*
		setTime(ogTime => {
			if (!ogTime) {
				
				setInV(ogVehicle => {
					if (!ogVehicle) {
						time = 30;
						setMessage('New Vehicle arrived !!');
						setColor('green');
						return new Vehicle(level);
					} else {
						time = 90;
						return null;
					}
				});
				
				return t;
				
			} else {
				return ogTime - 1;
			}
		});
	*/
	};
	useEffect(() => {
		const timeout = setTimeout(updateSupply, 1e3);
		return () => clearTimeout(timeout);
	}, [time]);

	const onSupplyBuy = () => {
		if (money < inV.price)
			return setNote({ message: 'Not Enough Money !', color: 'red' });

		if (spaceP - vehicleP.length < 1)
			return setNote({ message: 'Parkinglot is Full !', color: 'red' });

		setInV(ogVehicle => {
			setMoney(ogMoney => ogMoney - ogVehicle.price);
			setVehicleP(ogVehicleP => ogVehicleP.concat(ogVehicle));
			setScore(({level: ogLevel, point: ogPoint}) => {
				const max = ogLevel * 1000;
				const total = ogPoint + ogVehicle.level;
				const level = total >= max ? ogLevel + 1 : ogLevel;
				const point = total % max;
				return { level, point };
			});
			return null;
		});
		setTime(60);
	};

	const onSupplySkip = () => {
		setInV(null);
		setTime(15);
	};

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