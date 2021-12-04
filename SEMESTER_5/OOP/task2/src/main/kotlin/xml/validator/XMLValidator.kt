package xml.validator

import java.io.File
import javax.xml.transform.stream.StreamSource
import javax.xml.validation.SchemaFactory

object XMLValidator {
    fun validate(xmlFile: String, xsdFile: String): Boolean {
        val factory = SchemaFactory.newInstance("http://www.w3.org/2001/XMLSchema")
        val schema = factory.newSchema(File(xsdFile))
        val validator = schema.newValidator()
        validator.validate(StreamSource(File(xmlFile)))
        return true
    }
}