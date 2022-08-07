import { useEffect, useReducer } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalContext, globalReducer, globalState } from './GlobalContext'
import Nav from './comps/nav'
import Header from './comps/header'
import Storage from './pages/storage'
import Garage from './pages/garage'
import Market from './pages/market'
import Parking from './pages/parking'
import Junkyard from './pages/junkyard'
import NotFound from './pages/notfound'

export default function App() {
	console.log('App Render', Date.now())

	const [state, dispatch] = useReducer(globalReducer, globalState)

	// Non Ideal the entire app and all sub components rerendered every 3 sec
	useEffect(() => {
		console.log('App Effected', Date.now())
		// react dom diffs the markup but still has to rerun all js layer logics
		const eid = setInterval(() => dispatch({ type: 'ENERGYINCREASE' }), 3e3)
		return () => clearInterval(eid)
		// please check render behaviour with context consumers and ideally try to abstract the state as a class with props and methods
	}, [])

	return (
		<GlobalContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Junkyard />} />
					<Route path="parking" element={<Parking />} />
					<Route path="garage" element={<Garage />} />
					<Route path="storage" element={<Storage />} />
					<Route path="market" element={<Market />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Nav />
			</BrowserRouter>
		</GlobalContext.Provider>
	)
}
