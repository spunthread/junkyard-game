import Junkyard from "./Junkyard";

export default props => {
	return (
		<section>
			{
				props.current === 'Junkyard' &&
				<Junkyard
					spaceP={props.spaceP}
					spaceW={props.spaceW}
					spaceS={props.spaceS}
					countP={props.vehicleP.length}
					countW={props.vehicleW.length}
					countS={props.vehicleS.length}
					onBuy={props.onSupplyBuy}
					onSkip={props.onSupplySkip}
					time={props.time}
					inV={props.inV}
				/>
			}
		</section>
	);
};