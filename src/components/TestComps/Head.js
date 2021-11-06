import MoneyComp from "./MoneyComp";
import LevelComp from "./LevelComp";
import EnergyComp from "./EnergyComp";
import NoticePanel from "./NoticePanel";
import NavBar from "./NavBar";


export default props => {
	return (
		<header>
			<section>
				<MoneyComp money={props.money} />
				<LevelComp level={props.level} point={props.point} />
				<EnergyComp energy={props.energy} level={props.level} />
			</section>
			<NoticePanel color={props.color} message={props.message} />
			<NavBar current={props.current} setCurrent={props.setCurrent} />
		</header>
	);
};