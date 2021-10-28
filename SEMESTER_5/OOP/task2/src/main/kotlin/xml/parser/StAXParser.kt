package xml.parser

import xml.handler.XMLHandler
import java.io.FileInputStream
import javax.xml.stream.XMLEventReader
import javax.xml.stream.XMLInputFactory
import javax.xml.stream.XMLStreamConstants
import javax.xml.stream.events.EndElement
import javax.xml.stream.events.StartElement
import javax.xml.stream.events.XMLEvent

class StAXParser<T>(handler: XMLHandler<T>) : XMLParser<T>(handler) {
    override fun parse(xmlPath: String) {
        val factory = XMLInputFactory.newInstance()
        val reader: XMLEventReader = factory.createXMLEventReader(FileInputStream(xmlPath))
        var event: XMLEvent
        var startElement: StartElement
        var endElement: EndElement

        while (reader.hasNext()) {
            event = reader.nextEvent()

            when (event.eventType) {
                XMLStreamConstants.START_ELEMENT -> {
                    startElement = event.asStartElement()
                    event = reader.nextEvent()
                    handler.startTag(startElement.name.localPart, event.asCharacters().data)
                }
                XMLStreamConstants.END_ELEMENT -> {
                    endElement = event.asEndElement()
                    handler.endTag(endElement.name.localPart)
                }
                else -> Unit
            }
        }
    }
}