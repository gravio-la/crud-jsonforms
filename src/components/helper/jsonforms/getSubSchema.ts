import {JsonSchema, resolveSchema} from "@jsonforms/core";

export const getSubSchema = (schema: JsonSchema, rootSchema: JsonSchema, path: string): JsonSchema => {
  const schema2 = {
    ...schema,
    $ref: path
  }
  const {properties: _ , ...schemaWithoutProperties} = rootSchema
  const resolvedSchema = resolveSchema(schema2 as JsonSchema, '', rootSchema as JsonSchema)
  return {
    ...schemaWithoutProperties,
    ...resolvedSchema
  } as JsonSchema
}
