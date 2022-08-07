import { useContext } from "react"
import { Outlet } from "react-router-dom"
import { GlobalContext } from "../GlobalContext"

export default function Header() {
	console.log('Header Render', Date.now())

	const { state, dispatch } = useContext(GlobalContext)
	const { money, points, level, energy } = state
	const save = () => dispatch({ type: 'SAVE' })

	return (
		<>
			<header>
				<div>
					${money}
				</div>
				<div>
					<p>{points}</p>
					<p>{level}</p>
				</div>
				<div>
					<p>{energy}</p>
					<p>{level * 1e2}</p>
				</div>
				<div>
					<button onClick={save}>Save</button>
				</div>
			</header>
			<Outlet />
		</>
	)
}