import { NavLink } from "react-router-dom";

export default function Nav() {
	console.log('Nav Render', Date.now())

	return (
		<nav>
			<NavLink to="/">Yard</NavLink>
			<NavLink to="/parking">Parking</NavLink>
			<NavLink to="/garage">Garage</NavLink>
			<NavLink to="/storage">Storage</NavLink>
		</nav>
	)
}