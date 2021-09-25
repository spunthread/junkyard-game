import "./css/Workshop.css";
import React from "react";

const Workshop = props => {
	return (
		<div className="W">
			<header>
				<span>Vehicle: {props.vehicle.length}</span>
				<span>Space: {props.space}</span>
				<span>Expand: ${props.space * 2e3}</span>
				<button onClick={props.onUpgrade}>Upgrade</button>
			</header>
			<section>{props.vehicle.map(v => {
				switch (v.stage) {
					case -1: return (
						<div key={v.id}>
							<aside>
								<span>{v.name}</span>
								<img src={v.img} alt="🚘️" width="48" height="48" />
							</aside>
							<article>
								<p>
									<span>🔥 {v.work}</span>
									<button value={v.id} onClick={props.onWork}>Work</button>
								</p>
							</article>
						</div>
					);
					case 0: return (
						<div key={v.id}>
							<aside>
								<span>{v.name}</span>
								<img src={v.img} alt="🚘️" width="48" height="48" />
							</aside>
							<article>
								<p>
									<span>Battery</span>
									<img src="res/Thermo0.png" alt="🌡️" width="48" height="48" />
								</p>
								<p>
									<span>{v.parts[0].maxTime - v.parts[0].time} Sec</span>
									<progress value={v.parts[0].time} max={v.parts[0].maxTime} ></progress>
								</p>
							</article>
						</div>
					);
					case 1: return (
						<div key={v.id}>
							<aside>
								<span>{v.name}</span>
								<img src={v.img} alt="🚘️" width="48" height="48" />
							</aside>
							<article>
								<p>
									<span>Engine</span>
									<img src="res/Thermo0.png" alt="🌡️" width="48" height="48" />
								</p>
								<p>
									<span>{v.parts[1].maxTime - v.parts[1].time} Sec</span>
									<progress value={v.parts[1].time} max={v.parts[1].maxTime} ></progress>
								</p>
							</article>
						</div>
					);
					case 2: return (
						<div key={v.id}>
							<aside>
								<span>{v.name}</span>
								<img src={v.img} alt="🚘️" width="48" height="48" />
							</aside>
							<article>
								<p>
									<span>Windows</span>
									<img src="res/Thermo0.png" alt="🌡️" width="48" height="48" />
								</p>
								<p>
									<span>{v.parts[2].maxTime - v.parts[2].time} Sec</span>
									<progress value={v.parts[2].time} max={v.parts[2].maxTime} ></progress>
								</p>
							</article>
						</div>
					);
					case 3: return (
						<div key={v.id}>
							<aside>
								<span>{v.name}</span>
								<img src={v.img} alt="🚘️" width="48" height="48" />
							</aside>
							<article>
								<p>
									<span>Rims</span>
									<img src="res/Thermo0.png" alt="🌡️" width="48" height="48" />
								</p>
								<p>
									<span>{v.parts[3].maxTime - v.parts[3].time} Sec</span>
									<progress value={v.parts[3].time} max={v.parts[3].maxTime} ></progress>
								</p>
							</article>
						</div>
					);
					case 4: return (
						<div key={v.id}>
							<aside>
								<span>{v.name}</span>
								<img src={v.img} alt="🚘️" width="48" height="48" />
							</aside>
							<article>
								<p>
									<span>Brakes</span>
									<img src="res/Thermo0.png" alt="🌡️" width="48" height="48" />
								</p>
								<p>
									<span>{v.parts[4].maxTime - v.parts[4].time} Sec</span>
									<progress value={v.parts[4].time} max={v.parts[4].maxTime} ></progress>
								</p>
							</article>
						</div>
					);
					case 5: return (
						<div key={v.id}>
							<aside>
								<span>{v.name}</span>
								<img src={v.img} alt="🚘️" width="48" height="48" />
							</aside>
							<article>
								<p>
									<span>Drivetrain</span>
									<img src="res/Thermo0.png" alt="🌡️" width="48" height="48" />
								</p>
								<p>
									<span>{v.parts[5].maxTime - v.parts[5].time} Sec</span>
									<progress value={v.parts[5].time} max={v.parts[5].maxTime} ></progress>
								</p>
							</article>
						</div>
					);
					case 6: return (
						<div key={v.id}>
							<aside>
								<span>{v.name}</span>
								<img src={v.img} alt="🚘️" width="48" height="48" />
							</aside>
							<article>
								<p>
									<span>Transmission</span>
									<img src="res/Thermo0.png" alt="🌡️" width="48" height="48" />
								</p>
								<p>
									<span>{v.parts[6].maxTime - v.parts[6].time} Sec</span>
									<progress value={v.parts[6].time} max={v.parts[6].maxTime} ></progress>
								</p>
							</article>
						</div>
					);
					case 7: return (
						<div key={v.id}>
							<aside>
								<span>{v.name}</span>
								<img src={v.img} alt="🚘️" width="48" height="48" />
							</aside>
							<article>
								<p>
									<span>Electronics</span>
									<img src="res/Thermo0.png" alt="🌡️" width="48" height="48" />
								</p>
								<p>
									<span>{v.parts[7].maxTime - v.parts[7].time} Sec</span>
									<progress value={v.parts[7].time} max={v.parts[7].maxTime} ></progress>
								</p>
							</article>
						</div>
					);
					case 8: return (
						<div key={v.id}>
							<aside>
								<span>{v.name}</span>
								<img src={v.img} alt="🚘️" width="48" height="48" />
							</aside>
							<article>
								<p>
									<span>Fluids</span>
									<img src="res/Thermo0.png" alt="🌡️" width="48" height="48" />
								</p>
								<p>
									<span>{v.parts[8].maxTime - v.parts[8].time} Sec</span>
									<progress value={v.parts[8].time} max={v.parts[8].maxTime} ></progress>
								</p>
							</article>
						</div>
					);
					case 9: return (
						<div key={v.id}>
							<aside>
								<span>{v.name}</span>
								<img src={v.img} alt="🚘️" width="48" height="48" />
							</aside>
							<article>
								<p>
									<span>Scrap</span>
									<img src="res/Thermo0.png" alt="🌡️" width="48" height="48" />
								</p>
								<p>
									<span>{v.parts[9].maxTime - v.parts[9].time} Sec</span>
									<progress value={v.parts[9].time} max={v.parts[9].maxTime} ></progress>
								</p>
							</article>
						</div>
					);
					case 10: return (
						<div key={v.id}>
							<aside>
								<span>{v.name}</span>
								<img src={v.img} alt="🚘️" width="48" height="48" />
							</aside>
							<article>
								<p>
									<span>🔥 {v.store}</span>
									<button value={v.id} onClick={props.onStore}>Store</button>
								</p>
							</article>
						</div>
					);
					default: return null;
				}
			})}</section>
		</div>
	);
};

export default Workshop;