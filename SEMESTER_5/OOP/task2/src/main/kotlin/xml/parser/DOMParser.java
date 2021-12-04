package xml.parser;

import org.jetbrains.annotations.NotNull;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import xml.handler.XMLHandler;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;


public class DOMParser<T> extends XMLParser<T> {
    DOMParser(XMLHandler<T> handler){
        super(handler);
    }

    @Override
    public void parse(@NotNull String xmlPath) {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder;
        Document doc = null;
        try {
            builder = factory.newDocumentBuilder();
            doc = builder.parse(xmlPath);
        } catch (Exception e) {
            System.out.println(e);
        }

        assert doc != null;
        Element root = doc.getDocumentElement();
        NodeList planeNodes = root.getElementsByTagName(this.getHandler().getName());

        for (int i = 0; i < planeNodes.getLength(); i++) {
            Element planeElem = (Element) planeNodes.item(i);
            NodeList childNodes = planeElem.getChildNodes();

            for (int j = 0; j < childNodes.getLength(); j++) {
                if (childNodes.item(j).getNodeType() == Node.ELEMENT_NODE) {
                    Element child = (org.w3c.dom.Element) childNodes.item(j);
                    this.getHandler().startTag(child.getNodeName(), getChildValue(planeElem, child.getNodeName()));
                    NodeList childChildNodes = child.getChildNodes();

                    for (int k = 0; k < childChildNodes.getLength(); k++) {
                        if (childChildNodes.item(k).getNodeType() == Node.ELEMENT_NODE) {
                            Element childChild = (org.w3c.dom.Element) childChildNodes.item(k);
                            this.getHandler().startTag(childChild.getNodeName(), getChildValue(child, childChild.getNodeName()));
                        }
                    }
                }
            }
            this.getHandler().endTag(planeElem.getNodeName());
        }
    }


    private static String getChildValue(Element element, String name) {
        Element child = (Element) element.getElementsByTagName(name).item(0);
        if (child == null) {
            return "";
        }
        Node node = child.getFirstChild();
        return node.getNodeValue();
    }
}