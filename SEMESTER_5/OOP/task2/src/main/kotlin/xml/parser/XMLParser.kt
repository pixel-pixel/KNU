package xml.parser

import xml.handler.XMLHandler

abstract class XMLParser<T>(
    val handler: XMLHandler<T>
) {
    abstract fun parse(xmlPath: String)
}