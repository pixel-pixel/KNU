package gem

data class VisualParameters(
    val color: Color,
    val opacity: Int
) {
    enum class Color {
        GREEN,
        RED,
        BLUE,
        YELLOW,
        ORANGE
    }
}