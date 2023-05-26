import { $ } from '@state-manager'
import './styles.css'
import axios from 'axios'
import ImgPersonagens from '../../assets/stormtrooper.png'
import ImgPlanetas from '../../assets/planeta.png'
import ImgNaves from '../../assets/nave.png'
import logo from '../../assets/logoYellow.png'
import { Link } from '@routing'

export const HomePage = () => {
  const films = $([])
  axios.get(`https://swapi.dev/api/films/`).then(response => {
    const filmes = response.data.results
    films.next(filmes)
  })

  return <div id="home-page">
    <div className="content">
      <img src={logo} alt="Logo Star Wars" />
        <section>
          <h1>Star Wars Wiki</h1>
          <p>Star Wars Wiki, the most complete wikipedia about the Star Wars universe.</p>
          <p>Here you find everything you need to know about the Star Wars universe.</p>
        </section>

        
        <div className="spotlight">
          <div className="card-spotlight">
            <img src={ImgPersonagens} alt="Icone Personagens"></img>
            <div>
              <h1>Characters</h1>
              <p>Here you can find information about all the characters in the Star Wars franchise.</p>
              <Link to="/characters">Read more</Link>
            </div>
          </div>

          <div className="card-spotlight">
            <img src={ImgPlanetas} alt="Icone Planetas"></img>
            <div>
              <h1>Planets</h1>
              <p>Here you can find information about all the planets in the Star Wars franchise.</p>
              <Link to="/planets">Read more</Link>
            </div>
          </div>
        
          <div className="card-spotlight">
            <img src={ImgNaves} alt="Icone Espaço-Naves"></img>
            <div>
              <h1>Startships</h1>
              <p>Here you can find information about all the starships in the Star Wars franchise.</p>
              <Link to="/starships">Read more</Link>
            </div>
          </div>
      </div>
    </div>
  </div>
}