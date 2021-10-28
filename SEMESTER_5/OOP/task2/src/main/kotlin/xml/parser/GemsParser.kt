package xml.parser

import gem.Gem
import xml.handler.GemXMLHandler
import xml.validator.XMLValidator
import java.lang.Exception
import java.util.*
import kotlin.collections.ArrayList

class GemsParser {
    private lateinit var parser: XMLParser<Gem>

    fun parse(xmlPath: String, xsdPath: String, parserType: String): List<Gem> {
        if (!XMLValidator.validate(xmlPath, xsdPath)) throw Exception("validation error")

        val handler = GemXMLHandler()
        val result: List<Gem>

        when (parserType.uppercase()) {
            else -> parser = StAXParser(handler)
        }

        parser.parse(xmlPath)
        result = handler.getElements()
        Collections.sort(result)
        return result
    }
}