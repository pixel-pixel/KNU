import gem.*
import xml.parser.GemsParser

fun main() {
    val parser = GemsParser()
    val gems = parser.parse("src/main/res/gems.xml", "src/main/res/gems.xsd", "DOM")

    println(gems)
}
