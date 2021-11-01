package xml.handler

import gem.Gem

class GemXMLHandler: XMLHandler<Gem> {
    private var gem = Gem()
    private val gems = ArrayList<Gem>()
    override val name: String
        get() = "Gem"

    override fun getElements() = gems
    override fun startTag(element: String, value: String) = when(element.lowercase()) {
        "gem" -> gem = Gem()
        "id" -> gem.id = value
        "name" -> gem.name = value
        "value" -> gem.value = value.toDouble()
        "original" -> gem.original = value
        "preciousness" -> gem.preciousness = Gem.Preciousness.valueOf(value.uppercase().replace('-', '_'))
        "color" -> gem.visualParameters.color = Gem.VisualParameters.Color.valueOf(value.uppercase().replace('-', '_'))
        "opacity" -> gem.visualParameters.opacity = value.toInt()
        else -> Unit
    }
    override fun endTag(element: String) {
        if (element.equals("gem", true)) {
            gems.add(gem)
            gem = Gem()
        }
    }
}