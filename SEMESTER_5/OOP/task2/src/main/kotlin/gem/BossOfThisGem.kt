package gem

class BossOfThisGem(
    private val gems: MutableList<Gem>
) {
    fun sort() = gems.sort()
    override fun toString() = gems.toString()
    public fun gems() = gems
}