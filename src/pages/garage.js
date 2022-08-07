import { useContext } from "react"
import { GlobalContext } from "../GlobalContext"

export default function Garage() {
  console.log('Garage Render', Date.now())

  const { state } = useContext(GlobalContext)
  const { garage, garagemax } = state

  return (
    <section>
      <aside>
        <div>
          <p>Cars: {garage.length}</p>
          <p>Space {garagemax}</p>
        </div>
        <div>
          <strong>${garagemax * 1e3}</strong>
          <button>Expand</button>
        </div>
      </aside>
    </section>
  )
}
