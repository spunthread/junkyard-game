import { useCallback, useEffect, useState } from "react";
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
		const timeout = setTimeout(() => setNote({ message: '', color: 'transparent' }), 25e2);
		return () => clearTimeout(timeout);
	}, [message]);

	useEffect(() => {
		const timeout = setTimeout(() => (energy < (level * 100)) && setEnergy(energy + 1), 3e4);
		return () => clearTimeout(timeout);
	}, [energy, level]);

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
	};
	useEffect(() => {
		const timeout = setTimeout(updateSupply, 1e3);
		return () => clearTimeout(timeout);
	}, [time]);

	const newScore = (score, inc) => {
		const max = score.level * 1000;
		const total = score.point + inc;
		const level = total >= max ? score.level + 1 : score.level;
		const point = total % max;
		return { level, point };
	};

	const onSupplyBuy = () => {
		if (money < inV.price)
			return setNote({ message: 'Not Enough Money !', color: 'red' });

		if (spaceP - vehicleP.length < 1)
			return setNote({ message: 'Parkinglot is Full !', color: 'red' });

		setInV(ogVehicle => {
			setMoney(ogMoney => ogMoney - ogVehicle.price);
			setVehicleP(ogVehicleP => ogVehicleP.concat(ogVehicle));
			setScore(ogScore => newScore(ogScore, ogVehicle.level));
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