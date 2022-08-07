import { useContext } from "react"
import { GlobalContext } from "../GlobalContext"

export default function Junkyard() {
	console.log('Junkyard Render', Date.now())

	const { state } = useContext(GlobalContext)
	const { garage, garagemax, parking, parkingmax, storage, storagemax } = state

	return (
		<section>
			<aside>
				<div>
					Garage Cars: {garage.length}
					Garage Space {garagemax}
				</div>
				<div>
					Parking Cars: {parking.length}
					Parking Space {parkingmax}
				</div>
				<div>
					Storage Cars: {storage.length}
					Storage Space {storagemax}
				</div>
			</aside>
			<article>
				{Boolean(Math.round(Math.random())) ? (
					<>
						<figure>
							<img alt="." />
							<figcaption>$350</figcaption>
							<figcaption>Vehicle 1-1</figcaption>
						</figure>
						<div>
							<button>Skip</button>
							<button>Buy</button>
						</div>
					</>
				) : (
					<h5>Next Please ...</h5>
				)}
				<p>Timer: 30 sec</p>
			</article>
		</section>
	)
}
