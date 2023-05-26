import { Link } from '@routing'
import logo from '../../assets/logoHorizontal.svg'
import './styles.css'

export const Header = () => {
 return <header>
    <nav className="nav-main">
        <Link to="/"><img src={logo} alt="Logo Star Wars"></img></Link>
        <ul>
            <li><Link to="/" class="home">HOME</Link></li>
            <li><Link to="/characters" class="personagens">CHARACTERS</Link></li>
            <li><Link to="/planets" class="planetas">PLANETS</Link></li>
            <li><Link to="/starships" class="espaco-naves">STARSHIPS</Link></li>
        </ul>
    </nav>
</header>
}