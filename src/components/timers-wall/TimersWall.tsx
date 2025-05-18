import intervalObj from '../../../config/interval.json'
import citiesObj from '../../../config/cities.json'
import './TimersWall.css'
import Timer from '../Timer'
const TimersWall = () => {
   const {cities} = citiesObj;
  const {interval} = intervalObj;
  return (
    <div className="container typography">
     { cities.map(c => <Timer city={c} interval={interval}></Timer>)}
   </div>
  )
}

export default TimersWall