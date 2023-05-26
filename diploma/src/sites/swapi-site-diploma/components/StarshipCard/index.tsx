import { FC } from '@common'
import './styles.css'
import { Starship } from '../../types/Starship'

export const StarshipCard: FC<Starship> = ({
  name,
  model,
  manufacturer,
  cost_in_credits,
  length,
  max_atmosphering_speed,
  crew,
  passengers,
  cargo_capacity,
  consumables,
  hyperdrive_rating,
  MGLT,
  starship_class
}) => {
 return <div className="card-naves" key={name}>
    <h2>{name}</h2>
    <span>Model: {model}</span>
    <span>Manufacturer: {manufacturer}</span>
    <span>Cost in Credits: {cost_in_credits}</span>
    <span>Length: {length}</span>
    <span>max_atmosphering_speed: {max_atmosphering_speed}</span>
    <span>Crew: {crew}</span>
    <span>Passengers: {passengers}</span>
    <span>Cargo Capacity: {cargo_capacity}</span>
    <span>Consumables: {consumables}</span>
    <span>Hyperdrive Rating: {hyperdrive_rating}</span>
    <span>MGLT: {MGLT}</span>
    <span>Starship Class: {starship_class}</span>
  </div>
}