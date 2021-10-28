package xml.parser

fun interface XMLParser<T> {
    fun parse(xmlPath: String)
}