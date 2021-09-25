import "./css/Game.css";
import React from "react";
import Vehicle from "../vehicle";
import Junkyard from "./Junkyard";
import Parkinglot from "./Parkinglot";
import Workshop from "./Workshop";
import Storeroom from "./Storeroom";
import VehicleSeller from "./VehicleSeller";

class Game extends React.Component {


	constructor(props) {
		super(props);
		this.hideNotice = this.hideNotice.bind(this);
		this.onNavButtonClick = this.onNavButtonClick.bind(this);
		this.onSupplyBuy = this.onSupplyBuy.bind(this);
		this.onSupplySkip = this.onSupplySkip.bind(this);
		this.updateEnergy = this.updateEnergy.bind(this);
		this.updateSupply = this.updateSupply.bind(this);
		this.onParkinglotUpgrade = this.onParkinglotUpgrade.bind(this);
		this.onParkinglotMove = this.onParkinglotMove.bind(this);
		this.onWorkshopUpgrade = this.onWorkshopUpgrade.bind(this);
		this.onWorkshopWork = this.onWorkshopWork.bind(this);
		this.onWorkshopStore = this.onWorkshopStore.bind(this);
		this.onStoreroomUpgrade = this.onStoreroomUpgrade.bind(this);
		this.onStoreroomSell = this.onStoreroomSell.bind(this);
		this.onStoreroomSold = this.onStoreroomSold.bind(this);
		this.onVehicleSell = this.onVehicleSell.bind(this);
		this.state = {
			showTab: 'Junkyard',
			noticeMessage: '.',
			noticeColor: 'transparent',

			money: 250,
			level: 1,
			point: 0,
			energy: 25,
			parkinglotSpace: 1,
			workshopSpace: 1,
			storeroomSpace: 1,
			parkinglotVehicle: [],
			workshopVehicle: [],
			storeroomVehicle: [],
			sellingVehicle: null,
			supplyVehicle: null,
			supplyTime: 12
		};
	}


	onNavButtonClick(ev) {
		this.setState({ showTab: ev.target.textContent });
	}
	hideNotice() {
		this.setState({
			noticeMessage: '.',
			noticeColor: 'transparent'
		});
	}
	updateEnergy() {
		this.setState(state => {
			if (state.energy + 1 > state.level * 100) {
				return { energy: state.energy };
			} else {
				return { energy: state.energy + 1 };
			}
		});
	}
	updateSupply() {
		if (this.state.supplyTime === 0) {
			if (this.state.supplyVehicle) {
				this.setState({
					supplyVehicle: null,
					supplyTime: 120
				});
			} else {
				clearTimeout(this.noticeTimer);
				this.setState({
					supplyVehicle: new Vehicle(this.state.level),
					supplyTime: 30,
					noticeMessage: 'New Vehicle arrived !!',
					noticeColor: 'green'
				});
				this.noticeTimer = setTimeout(this.hideNotice, 1e3);
			}
		} else {
			this.setState(state => ({ supplyTime: state.supplyTime - 1 }));
		}
	}
	onSupplyBuy() {
		if (this.state.money < this.state.supplyVehicle.price) {
			clearTimeout(this.noticeTimer);
			this.setState({
				noticeMessage: 'Not Enough Money !!',
				noticeColor: 'red'
			});
			this.noticeTimer = setTimeout(this.hideNotice, 2e3);
			return;
		}
		if (this.state.parkinglotSpace - this.state.parkinglotVehicle.length < 1) {
			clearTimeout(this.noticeTimer);
			this.setState({
				noticeMessage: 'Parkinglot is Full !!',
				noticeColor: 'red'
			});
			this.noticeTimer = setTimeout(this.hideNotice, 2e3);
			return;
		}
		clearInterval(this.supplyTimer);
		this.setState(state => {
			return {
				money: state.money - state.supplyVehicle.price,
				parkinglotVehicle: state.parkinglotVehicle.concat(state.supplyVehicle),
				level: state.point + state.supplyVehicle.level >= state.level * 1000 ? state.level + 1 : state.level,
				point: (state.point + state.supplyVehicle.level) % (state.level * 1000),
				supplyVehicle: null,
				supplyTime: 120
			};
		});
		this.supplyTimer = setInterval(this.updateSupply, 1e3);
	}
	onSupplySkip() {
		clearInterval(this.supplyTimer);
		this.setState({
			supplyVehicle: null,
			supplyTime: 12
		});
		this.supplyTimer = setInterval(this.updateSupply, 1e3);
	}
	onParkinglotUpgrade() {
		if (this.state.money < this.state.parkinglotSpace * 1e3) {
			clearTimeout(this.noticeTimer);
			this.setState({
				noticeMessage: 'Not Enough Money !!',
				noticeColor: 'red'
			});
			this.noticeTimer = setTimeout(this.hideNotice, 2e3);
			return;
		}
		this.setState(state => ({
			money: state.money - state.parkinglotSpace * 1e3,
			parkinglotSpace: state.parkinglotSpace + 1
		}));
	}
	onParkinglotMove(ev) {
		const vehicle = this.state.parkinglotVehicle.find(v => v.id === ev.target.value);
		if (!vehicle) {
			clearTimeout(this.noticeTimer);
			this.setState({
				noticeMessage: 'Unknown Vehicle Selected !!',
				noticeColor: 'red'
			});
			this.noticeTimer = setTimeout(this.hideNotice, 2e3);
			return;
		}
		if (this.state.energy < vehicle.move) {
			clearTimeout(this.noticeTimer);
			this.setState({
				noticeMessage: 'Not Enough Energy !!',
				noticeColor: 'red'
			});
			this.noticeTimer = setTimeout(this.hideNotice, 2e3);
			return;
		}
		if (this.state.workshopSpace - this.state.workshopVehicle.length < 1) {
			clearTimeout(this.noticeTimer);
			this.setState({
				noticeMessage: 'Workshop is Full !!',
				noticeColor: 'red'
			});
			this.noticeTimer = setTimeout(this.hideNotice, 2e3);
			return;
		}
		this.setState(state => ({
			parkinglotVehicle: state.parkinglotVehicle.filter(v => v.id !== ev.target.value),
			workshopVehicle: state.workshopVehicle.concat(vehicle),
			level: (state.point + vehicle.move) >= (state.level * 1000) ? state.level + 1 : state.level,
			point: (state.point + vehicle.move) % (state.level * 1000),
			energy: state.energy - vehicle.move,
		}));
	}
	onWorkshopUpgrade() {
		if (this.state.money < this.state.workshopSpace * 2e3) {
			clearTimeout(this.noticeTimer);
			this.setState({
				noticeMessage: 'Not Enough Money !!',
				noticeColor: 'red'
			});
			this.noticeTimer = setTimeout(this.hideNotice, 2e3);
			return;
		}
		this.setState(state => ({
			money: state.money - state.workshopSpace * 2e3,
			workshopSpace: state.workshopSpace + 1
		}));
	}
	onWorkshopWork(ev) {
		const vehicle = this.state.workshopVehicle.find(v => v.id === ev.target.value);
		if (!vehicle) {
			clearTimeout(this.noticeTimer);
			this.setState({
				noticeMessage: 'Unknown Vehicle Selected !!',
				noticeColor: 'red'
			});
			this.noticeTimer = setTimeout(this.hideNotice, 2e3);
			return;
		}
		if (this.state.energy < vehicle.work) {
			clearTimeout(this.noticeTimer);
			this.setState({
				noticeMessage: 'Not Enough Energy !!',
				noticeColor: 'red'
			});
			this.noticeTimer = setTimeout(this.hideNotice, 2e3);
			return;
		}
		vehicle.startWork(() => {
			clearTimeout(this.noticeTimer);
			this.setState({
				noticeMessage: 'A Vehicle is done !!',
				noticeColor: 'blue'
			});
			this.noticeTimer = setTimeout(this.hideNotice, 1e3);
		});
		this.setState(state => ({
			level: (state.point + vehicle.work) >= (state.level * 1000) ? state.level + 1 : state.level,
			point: (state.point + vehicle.work) % (state.level * 1000),
			energy: state.energy - vehicle.work
		}));
	}
	onWorkshopStore(ev) {
		const vehicle = this.state.workshopVehicle.find(v => v.id === ev.target.value);
		if (!vehicle) {
			clearTimeout(this.noticeTimer);
			this.setState({
				noticeMessage: 'Unknown Vehicle Selected !!',
				noticeColor: 'red'
			});
			this.noticeTimer = setTimeout(this.hideNotice, 2e3);
			return;
		}
		if (this.state.energy < vehicle.store) {
			clearTimeout(this.noticeTimer);
			this.setState({
				noticeMessage: 'Not Enough Energy !!',
				noticeColor: 'red'
			});
			this.noticeTimer = setTimeout(this.hideNotice, 2e3);
			return;
		}
		if (this.state.storeroomSpace - this.state.storeroomVehicle.length < 1) {
			clearTimeout(this.noticeTimer);
			this.setState({
				noticeMessage: 'Storeroom is Full !!',
				noticeColor: 'red'
			});
			this.noticeTimer = setTimeout(this.hideNotice, 2e3);
			return;
		}
		this.setState(state => ({
			workshopVehicle: state.workshopVehicle.filter(v => v.id !== ev.target.value),
			storeroomVehicle: state.storeroomVehicle.concat(vehicle),
			level: (state.point + vehicle.store) >= (state.level * 1000) ? state.level + 1 : state.level,
			point: (state.point + vehicle.store) % (state.level * 1000),
			energy: state.energy - vehicle.store,
		}));
	}
	onStoreroomUpgrade() {
		if (this.state.money < this.state.storeroomSpace * 1.5e3) {
			clearTimeout(this.noticeTimer);
			this.setState({
				noticeMessage: 'Not Enough Money !!',
				noticeColor: 'red'
			});
			this.noticeTimer = setTimeout(this.hideNotice, 2e3);
			return;
		}
		this.setState(state => ({
			money: state.money - state.storeroomSpace * 1.5e3,
			storeroomSpace: state.storeroomSpace + 1
		}));
	}
	onStoreroomSell(ev) {
		const vehicle = this.state.storeroomVehicle.find(v => v.id === ev.target.value);
		if (!vehicle) {
			clearTimeout(this.noticeTimer);
			this.setState({
				noticeMessage: 'Unknown Vehicle Selected !!',
				noticeColor: 'red'
			});
			this.noticeTimer = setTimeout(this.hideNotice, 2e3);
			return;
		}
		this.setState({
			sellingVehicle: vehicle,
			showTab: 'VehicleSeller'
		});
	}
	onStoreroomSold() {
		this.setState(state => ({
			storeroomVehicle: state.storeroomVehicle.filter(v => state.sellingVehicle.id !== v.id),
			level: (state.point + state.sellingVehicle.level) >= (state.level * 1000) ? state.level + 1 : state.level,
			point: (state.point + state.sellingVehicle.level) % (state.level * 1000),
		}));
	}
	onVehicleSell(partIdx) {
		this.setState(state => ({ money: state.money + state.sellingVehicle.parts[partIdx].price }));
	}


	render() {
		return (
			<>
				<header>
					<section>
						<div>
							<img src="res/Money0.png" alt="💵" width="48" height="48" />
							<p>
								<span>Money</span>
								<strong>💲{this.state.money.toFixed(2)}</strong>
							</p>
						</div>
						<div>
							<img src="res/Star.png" alt="🌟" width="48" height="48" />
							<p>
								<span>Level</span>
								<strong>{this.state.level}🔺{this.state.point}</strong>
								<progress value={this.state.point} max={this.state.level * 1000}></progress>
							</p>
						</div>
						<div>
							<img src="res/Energy0.png" alt="🔥" width="48" height="48" />
							<p>
								<span>Energy</span>
								<strong>{this.state.energy}🔺{this.state.level * 100}</strong>
								<progress value={this.state.energy} max={this.state.level * 100}></progress>
							</p>
						</div>
					</section>
					<h2 style={{ color: this.state.noticeColor}}>{this.state.noticeMessage}</h2>
					<nav>
						<button onClick={this.onNavButtonClick} disabled={this.state.showTab === 'Junkyard'}>Junkyard</button>
						<button onClick={this.onNavButtonClick} disabled={this.state.showTab === 'Parkinglot'}>Parkinglot</button>
						<button onClick={this.onNavButtonClick} disabled={this.state.showTab === 'Workshop'}>Workshop</button>
						<button onClick={this.onNavButtonClick} disabled={this.state.showTab === 'Storeroom'}>Storeroom</button>
					</nav>
				</header>
				<section>
					{
						this.state.showTab === 'Junkyard' ?
							<Junkyard
								onBuy={this.onSupplyBuy}
								onSkip={this.onSupplySkip}
								supplyTime={this.state.supplyTime}
								supplyVehicle={this.state.supplyVehicle}
								parkinglotSpace={this.state.parkinglotSpace}
								parkinglotCount={this.state.parkinglotVehicle.length}
								workshopSpace={this.state.workshopSpace}
								workshopCount={this.state.workshopVehicle.length}
								storeroomSpace={this.state.storeroomSpace}
								storeroomCount={this.state.storeroomVehicle.length}
							/> :
							this.state.showTab === 'Parkinglot' ?
								<Parkinglot
									onMove={this.onParkinglotMove}
									onUpgrade={this.onParkinglotUpgrade}
									space={this.state.parkinglotSpace}
									vehicle={this.state.parkinglotVehicle}
								/> :
								this.state.showTab === 'Workshop' ?
									<Workshop
										onWork={this.onWorkshopWork}
										onStore={this.onWorkshopStore}
										onUpgrade={this.onWorkshopUpgrade}
										space={this.state.workshopSpace}
										vehicle={this.state.workshopVehicle}
									/> :
									this.state.showTab === 'Storeroom' ?
										<Storeroom
											onSell={this.onStoreroomSell}
											onUpgrade={this.onStoreroomUpgrade}
											space={this.state.storeroomSpace}
											vehicle={this.state.storeroomVehicle}
										/> :
										this.state.showTab === 'VehicleSeller' ?
											<VehicleSeller
												onSell={this.onVehicleSell}
												onSold={this.onStoreroomSold}
												vehicle={this.state.sellingVehicle}
											/> :
											this.state.showTab
					}
				</section>
			</>
		);
	}


	componentDidMount() {
		this.energyTimer = setInterval(this.updateEnergy, 3e4);
		this.supplyTimer = setInterval(this.updateSupply, 1e3);
		this.noticeTimer = 0;
	}
	componentWillUnmount() {
		clearInterval(this.energyTimer);
		clearInterval(this.supplyTimer);
		clearTimeout(this.noticeTimer);
	}
}

export default Game;
