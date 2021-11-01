package xml.parser

import xml.handler.XMLHandler

abstract class XMLParser<T>(
    protected val handler: XMLHandler<T>
) {

    abstract fun parse(xmlPath: String)
}