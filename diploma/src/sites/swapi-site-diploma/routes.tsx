import { Route } from "@routing"
import { HomePage } from "./pages/HomePage"
import { PlanetsPage } from "./pages/PlanetsPage"
import { CharactersPage } from "./pages/CharactersPage"
import { Starships } from "./pages/Starships"

export const Routes = () => {
    return <div>
        <Route path="/" to={HomePage} />
        <Route path="/characters" to={CharactersPage} />
        <Route path="/planets" to={PlanetsPage} />
        <Route path="/starships" to={Starships} />
    </div>
}