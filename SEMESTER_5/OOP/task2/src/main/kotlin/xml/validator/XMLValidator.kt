package xml.validator

import java.io.File
import javax.xml.transform.stream.StreamSource
import javax.xml.validation.SchemaFactory

object XMLValidator {
    fun validate(xmlFile: String, xsdFile: String): Boolean {
        return try {
            val factory = SchemaFactory.newInstance("http://www.w3.org/2001/XMLSchema")
            val schema = factory.newSchema(File(xsdFile))
            val validator = schema.newValidator()
            validator.validate(StreamSource(File(xmlFile)))
            true
        } catch (e: Exception) {
            println("Validation error: " + e.message)
            false
        }
    }
}