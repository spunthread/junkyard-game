import { createContext } from 'react'

export const GlobalContext = createContext()

const defaultState = {
	money: 500,
	points: 0,
	level: 1,
	energy: 70,
	parking: [],
	parkingmax: 1,
	garage: [],
	garagemax: 1,
	storage: [],
	storagemax: 1,

	// more would acumulate ...
}

const storage = localStorage.getItem('save')

export const globalState = storage ? JSON.parse(storage) : defaultState

export const globalReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		// more cases need research ...
		case 'ENERGYINCREASE': {
			const { energy, level } = state
			return { ...state, energy: Math.min(energy + 10, level * 100) }
		}
		case 'ENERGYDECREASE': {
			const { energy } = state
			return { ...state, energy: energy - payload }
		}
		case 'SAVE': {
			localStorage.setItem('save', JSON.stringify(state))
			return null
		}
		default:
			return state
	}
}

// the entire app and all it's sub components re-renders every dispatch
// react dom diffs the markup but still has to re-run all js layer logics
// check render behaviour with context consumers
// ideally try to abstract the state as a class with props and methods