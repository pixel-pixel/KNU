package xml.parser

import org.w3c.dom.Element
import org.w3c.dom.Node
import xml.handler.XMLHandler
import javax.xml.parsers.DocumentBuilderFactory

class DOMParser<T>(handler: XMLHandler<T>) : XMLParser<T>(handler) {
    override fun parse(xmlPath: String) {
        val factory = DocumentBuilderFactory.newInstance()
        val builder = factory.newDocumentBuilder()
        val document = builder.parse(xmlPath)
        val root = document.documentElement
        val nodes = root.getElementsByTagName(handler.name)

        for (i in 0..nodes.length) {
            val elem = nodes.item(i) as Element?
            val children = elem?.childNodes

            for (j in 0..children!!.length) {
                if (children.item(j).nodeType != Node.ELEMENT_NODE) continue

                val child = children.item(j) as Element
                handler.startTag(child.nodeName, getChildValue(elem, child.nodeName))
                val childNodes = child.childNodes

                for (k in 0..childNodes.length) {
                    if (childNodes.item(k).nodeType != Node.ELEMENT_NODE) continue

                    val childChild = childNodes.item(k) as Element
                    handler.startTag(childChild.nodeName, getChildValue(child, childChild.nodeName))
                }
            }
            handler.endTag(elem.nodeName)
        }
    }

    private fun getChildValue(element: Element?, name: String): String {
        val child = (element?.getElementsByTagName(name)?.item(0) as Element?) ?: return String()
        val node = child.firstChild
        return node.nodeValue
    }
}