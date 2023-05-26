import { FC } from '@common'
import './styles.css'
import { Planet } from '../../types/Planet'

export const PlanetCard: FC<Planet> = ({
  name,
  rotation_period,
  orbital_period,
  diameter,
  climate,
  gravity,
  terrain,
  surface_water,
  population
}) => {
  return <div className="card-planetas" key={name}>
    <h2>{name}</h2>
    <span>Rotation Period: {rotation_period}</span>
    <span>Orbital Period: {orbital_period}</span>
    <span>Diameter: {diameter}</span>
    <span>Climate: {climate}</span>
    <span>Gravity: {gravity}</span>
    <span>Terrain: {terrain}</span>
    <span>Surface Water: {surface_water}</span>
    <span>Population: {population}</span>
  </div>
}