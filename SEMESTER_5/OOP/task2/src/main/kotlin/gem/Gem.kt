package gem

data class Gem(
    val name: String,
    val preciousness: Preciousness,
    val original: String,
    val visualParameters: VisualParameters,
    val value: Double
)