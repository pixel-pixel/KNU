import { FC } from "@common";
import './styles.css'
import { Character } from "../../types/Character";

export const CharacterCard: FC<Character> = ({
  name,
  height,
  mass,
  hair_color,
  skin_color,
  eye_color,
  birth_year,
  gender,
}) => {
  return <div className="card-personagem">
    <h2>{name}</h2>
    <span>Height: {height / 100} m</span>
    <span>Mass: {mass} kg</span>
    <span>Hair Color: {hair_color}</span>
    <span>Skin Color: {skin_color}</span>
    <span>Eye Color: {eye_color}</span>
    <span>Birth Year: {birth_year}</span>
    <span>Gender: {gender}</span>
</div>
}