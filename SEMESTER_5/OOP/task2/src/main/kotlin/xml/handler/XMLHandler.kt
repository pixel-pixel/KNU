package xml.handler

import gem.Gem

interface XMLHandler<T> {
    fun getElements(): List<T>
    fun startTag(element: String, value: String)
    fun endTag(element: String)
}