import "./css/VehicleSeller.css";
import React from "react";

class VehicleSeller extends React.Component {
	constructor(props) {
		super(props);
		this.updatePrice = this.updatePrice.bind(this);
		this.onSell = this.onSell.bind(this);
		this.state = {
			sellParts: 0,
			soldPrice: 0
		};
	}
	updatePrice() {
		this.props.vehicle.parts.filter(part => !part.sold).forEach(part => part.price = this.props.vehicle.price * part.ratio * (0.6 + Math.random()));
	}
	onSell(ev) {
		const partNumber = Number(ev.target.value);
		const partObj = this.props.vehicle.parts[partNumber];
		partObj.sold = true;
		this.props.onSell(partNumber);
		this.setState(state => {
			if (state.sellParts === 1) this.props.onSold();
			return {
				sellParts: state.sellParts - 1,
			 	soldPrice: state.soldPrice + partObj.price
			};
		});
	}
	render() {
		return (
			<div className="V">
				<header>
					<aside>
						<span>Price: 💲{this.props.vehicle.price.toFixed(2)}</span>
						<span>Sold: 💲{this.state.soldPrice.toFixed(2)}</span>
						<span>Take: 💲{(this.state.soldPrice - this.props.vehicle.price).toFixed(2)}</span>
					</aside>
					<aside>
						<span>{this.props.vehicle.name}</span>
						<img src={this.props.vehicle.img} alt="🚘️" width="48" height="48" />
					</aside>
				</header>
				<section>
					<div>
						<span>Battery</span>
						<img src="res/Thermo0.png" alt="🌡️" width="48" height="48" />
						<span>💲{this.props.vehicle.parts[0].price.toFixed(2)}</span>
						<button value={0} disabled={this.props.vehicle.parts[0].sold} onClick={this.onSell}>Sell</button>
					</div>
					<div>
						<span>Engine</span>
						<img src="res/Thermo0.png" alt="🌡️" width="48" height="48" />
						<span>💲{this.props.vehicle.parts[1].price.toFixed(2)}</span>
						<button value={1} disabled={this.props.vehicle.parts[1].sold} onClick={this.onSell}>Sell</button>
					</div>
					<div>
						<span>Windows</span>
						<img src="res/Thermo0.png" alt="🌡️" width="48" height="48" />
						<span>💲{this.props.vehicle.parts[2].price.toFixed(2)}</span>
						<button value={2} disabled={this.props.vehicle.parts[2].sold} onClick={this.onSell}>Sell</button>
					</div>
					<div>
						<span>Rims</span>
						<img src="res/Thermo0.png" alt="🌡️" width="48" height="48" />
						<span>💲{this.props.vehicle.parts[3].price.toFixed(2)}</span>
						<button value={3} disabled={this.props.vehicle.parts[3].sold} onClick={this.onSell}>Sell</button>
					</div>
					<div>
						<span>Brakes</span>
						<img src="res/Thermo0.png" alt="🌡️" width="48" height="48" />
						<span>💲{this.props.vehicle.parts[4].price.toFixed(2)}</span>
						<button value={4} disabled={this.props.vehicle.parts[4].sold} onClick={this.onSell}>Sell</button>
					</div>
					<div>
						<span>Drivertrain</span>
						<img src="res/Thermo0.png" alt="🌡️" width="48" height="48" />
						<span>💲{this.props.vehicle.parts[5].price.toFixed(2)}</span>
						<button value={5} disabled={this.props.vehicle.parts[5].sold} onClick={this.onSell}>Sell</button>
					</div>
					<div>
						<span>Transmission</span>
						<img src="res/Thermo0.png" alt="🌡️" width="48" height="48" />
						<span>💲{this.props.vehicle.parts[6].price.toFixed(2)}</span>
						<button value={6} disabled={this.props.vehicle.parts[6].sold} onClick={this.onSell}>Sell</button>
					</div>
					<div>
						<span>Electronics</span>
						<img src="res/Thermo0.png" alt="🌡️" width="48" height="48" />
						<span>💲{this.props.vehicle.parts[7].price.toFixed(2)}</span>
						<button value={7} disabled={this.props.vehicle.parts[7].sold} onClick={this.onSell}>Sell</button>
					</div>
					<div>
						<span>Fluids</span>
						<img src="res/Thermo0.png" alt="🌡️" width="48" height="48" />
						<span>💲{this.props.vehicle.parts[8].price.toFixed(2)}</span>
						<button value={8} disabled={this.props.vehicle.parts[8].sold} onClick={this.onSell}>Sell</button>
					</div>
					<div>
						<span>Scrap</span>
						<img src="res/Thermo0.png" alt="🌡️" width="48" height="48" />
						<span>💲{this.props.vehicle.parts[9].price.toFixed(2)}</span>
						<button value={9} disabled={this.props.vehicle.parts[9].sold} onClick={this.onSell}>Sell</button>
					</div>
				</section>
			</div>
		);
	}
	componentDidMount() {
		this.priceTimer = setInterval(this.updatePrice, 28e2);
		this.updatePrice();
		const parts = this.props.vehicle.parts.filter(part => !part.sold).length;
		const price = this.props.vehicle.parts.reduce((sum, part) => sum + (part.sold?part.price:0), 0);
		this.setState({ sellParts: parts, soldPrice: price });
	}
	componentWillUnmount() {
		clearInterval(this.priceTimer);
	}
}

export default VehicleSeller;