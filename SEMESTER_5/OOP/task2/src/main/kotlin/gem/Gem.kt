package gem

data class Gem(
    val name: String,
    val preciousness: Preciousness,
    val original: String,
    val visualParameters: VisualParameters,
    val value: Double

) : Comparable<Gem> {
    data class VisualParameters(val color: Color, val opacity: Int) {
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
}