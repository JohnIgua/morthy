import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'

const RESIDENTS_PERPAGE = 12;

function App() {
  const [location, setLocation] = useState()
  const [nameLocation, setNameLocation] = useState("")
  const [page, setPage] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    setNameLocation(e.target.idLocation.value)
  }

  const pagination = () => {
    const maxLimit = page * RESIDENTS_PERPAGE;
    const minLimit = maxLimit - RESIDENTS_PERPAGE;
    const newResidents = location?.residents.slice(minLimit, maxLimit);
    return newResidents
  }

  const numbersPage = () => {
    const quantityPages = Math.ceil(location?.residents.length / RESIDENTS_PERPAGE);
    const arrayPages = []
    for(let i = 1; i <= quantityPages; i++){
      arrayPages.push(i)
    }
    return arrayPages
  }

  const getRandomNumber = (maxNumber) => {
    return Math.floor(Math.random() * maxNumber) + 1
  }

  useEffect(() => {
    const dimension = nameLocation === "" ? getRandomNumber(126) : nameLocation
    const URL = `https://rickandmortyapi.com/api/location/${dimension}`
    axios.get(URL)
      .then((res) => setLocation(res.data))
      .catch((err) => console.log(err))
    }, [nameLocation])

  return (
    <div className='casiTodo'>
        <h1>Hello parceritos</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" id='idLocation' placeholder='type a location id' />
          <button>Search</button>
        </form>
        <LocationInfo location={location}/>
          <section className='residentList'>
            {
              //location?.residents.map(residentUrl => <ResidentCard key={residentUrl} residentUrl={residentUrl} />)
              pagination()?.map(residentUrl => <ResidentCard key={residentUrl} residentUrl={residentUrl} />)
            }
          </section>
        <ul className='numbersAbajo'>
          {
            numbersPage().map(numberPage => <li onClick={() => setPage (numberPage)} key={numberPage} className='containtNumber'> 
            {numberPage} </li>)
          }
        </ul>
    </div>
  )
}

export default App
