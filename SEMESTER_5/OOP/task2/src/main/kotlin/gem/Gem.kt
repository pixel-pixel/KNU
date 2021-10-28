package gem

data class Gem(
    var id: String = "",
    var name: String = "",
    var value: Double = 0.0,
    var original: String = "",
    var preciousness: Preciousness = Preciousness.PRECIOUS,
    var visualParameters: VisualParameters = VisualParameters(VisualParameters.Color.RED, 0),
) : Comparable<Gem> {

    override fun compareTo(other: Gem) = when {
        this.name > other.name -> 1
        this.name < other.name -> -1
        this.preciousness == Preciousness.PRECIOUS && other.preciousness == Preciousness.SEMI_PRECIOUS -> 1
        this.preciousness == Preciousness.SEMI_PRECIOUS && other.preciousness == Preciousness.PRECIOUS -> -1
        this.value > other.value -> 1
        this.value < other.value -> -1
        this.original > other.original -> 1
        this.original < other.original -> 1
        else -> 0
    }

    data class VisualParameters(
        var color: Color, var opacity: Int
    ) {
        enum class Color {
            GREEN,
            RED,
            BLUE,
            YELLOW,
            ORANGE
        }
    }

    enum class Preciousness {
        PRECIOUS,
        SEMI_PRECIOUS
    }
}