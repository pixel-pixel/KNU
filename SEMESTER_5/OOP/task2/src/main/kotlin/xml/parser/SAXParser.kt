package xml.parser

import org.xml.sax.Attributes
import org.xml.sax.helpers.DefaultHandler
import xml.handler.XMLHandler
import java.io.File
import javax.xml.parsers.SAXParserFactory
import kotlin.text.StringBuilder

class SAXParser<T>(handler: XMLHandler<T>) : XMLParser<T>(handler) {
    override fun parse(xmlPath: String) {
        val saxFactory = SAXParserFactory.newInstance()
        val saxParser = saxFactory.newSAXParser()
        val saxHandler = SAXHandler(handler)
        saxParser.parse(File(xmlPath), saxHandler)
    }

    class SAXHandler<T>(
        private val handler: XMLHandler<T>
    ): DefaultHandler() {
        private var data = StringBuilder()

        override fun startElement(uri: String, localName: String, qName: String, attributes: Attributes) {
            data = StringBuilder()
        }
        override fun endElement(uri: String, localName: String, qName: String) {
            if(qName.equals(handler.name, true)) handler.endTag(handler.name)
            handler.startTag(qName, data.toString())
        }
        override fun characters(ch: CharArray, start: Int, length: Int) {
            data.append(String(ch, start, length))
        }
    }
}