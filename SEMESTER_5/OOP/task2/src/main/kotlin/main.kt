import gem.Gem
import gem.Preciousness
import gem.VisualParameters
import gem.gemComparator
import java.util.*

fun main() {
    val gemList = listOf(
        Gem(
            "Rubin",
            Preciousness.PRECIOUS,
            "Drogobych",
            VisualParameters(VisualParameters.Color.RED, 90),
            13.4
        ),
        Gem(
            "Nifrit",
            Preciousness.SEMI_PRECIOUS,
            "Stebnik",
            VisualParameters(VisualParameters.Color.GREEN, 10),
            0.0
        ),
        Gem(
            "Agat",
            Preciousness.SEMI_PRECIOUS,
            "Truskavets",
            VisualParameters(VisualParameters.Color.ORANGE, 42),
            1.7
        ),
    )

    Collections.sort(gemList, gemComparator())

    println(gemList)
}
