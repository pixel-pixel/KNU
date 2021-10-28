import gem.*
import xml.parser.GemsParser

fun main() {
    var parser = GemsParser()
    val gems = parser.parse("src/main/res/gems.xml", "src/main/res/gems.xsd", "SAX")

    println(gems)
}
