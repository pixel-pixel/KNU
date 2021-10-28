import gem.*

fun main() {
    val gems = BossOfThisGem(
        mutableListOf(
            Gem(
                "Rubin",
                Gem.Preciousness.PRECIOUS,
                "Drogobych",
                Gem.VisualParameters(Gem.VisualParameters.Color.RED, 90),
                13.4
            ),
            Gem(
                "Nifrit",
                Gem.Preciousness.SEMI_PRECIOUS,
                "Stebnik",
                Gem.VisualParameters(Gem.VisualParameters.Color.GREEN, 10),
                0.0
            ),
            Gem(
                "Agat",
                Gem.Preciousness.SEMI_PRECIOUS,
                "Truskavets",
                Gem.VisualParameters(Gem.VisualParameters.Color.ORANGE, 42),
                1.7
            ),
        )
    )

    println(gems)
    gems.sort()
    println(gems)
}
