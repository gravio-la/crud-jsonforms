import {JSONSchema7, JSONSchema7Definition} from 'json-schema'
import {isObject} from 'lodash'

import {filterForPrimitiveProperties} from '../jsonSchema'
import {GenJSONLDSemanticPropertiesFunction} from "../../types";

export const defs: (schema: JSONSchema7) => NonNullable<JSONSchema7['definitions']> = (schema: JSONSchema7) => schema.$defs || schema.definitions || {}

export const recursivelyFindRefsAndAppendStub: (schema: JSONSchema7, rootSchema?: JSONSchema7) => JSONSchema7 = (schema: JSONSchema7, rootSchema = schema) => {
  const definitionsKey = '$defs' in rootSchema ? '$defs' : 'definitions'
  if (schema.$ref) {
    return {
      ...schema,
      $ref: `${schema.$ref}Stub`
    }
  }
  if (isObject(schema.items)) {
    return {
      ...schema,
      items: recursivelyFindRefsAndAppendStub(schema.items as JSONSchema7, rootSchema)
    }
  }
  if (schema.properties) {
    return {
      ...schema,
      properties: Object.fromEntries(Object.entries(schema.properties).map(([k, s]) => [k, recursivelyFindRefsAndAppendStub(s as JSONSchema7, rootSchema)] as [string, JSONSchema7Definition]))
    }
  }
  if (defs(schema)) {
    return {
      ...schema,
      [definitionsKey]: Object.fromEntries(Object.entries(defs(schema)).map(([k, s]) => [k, recursivelyFindRefsAndAppendStub(s as JSONSchema7, rootSchema)] as [string, JSONSchema7Definition]))
    }
  }
  return schema
}

export const definitionsToStubDefinitions = (definitions: JSONSchema7['definitions']) =>
    (Object.entries(definitions || {}).reduce((acc, [key, value]) => {
      const stubKey = `${key}Stub`
      const stub = {
        ...(isObject(value) ? value : {}),
        properties: isObject(value) ? filterForPrimitiveProperties(value.properties) : undefined
      }
      return {
        ...acc,
        [stubKey]: stub
      }
    }, {}) as JSONSchema7['definitions'])


export const prepareStubbedSchema = (schema: JSONSchema7, genJSONLDSemanticProperties?: GenJSONLDSemanticPropertiesFunction) => {
  const definitionsKey = '$defs' in schema ? '$defs' : 'definitions'

  const withJSONLDProperties: (name: string, schema: JSONSchema7) => JSONSchema7 = (name: string, schema: JSONSchema7) => ({
    ...schema,
    properties: {
      ...schema.properties,
      ...(genJSONLDSemanticProperties ? genJSONLDSemanticProperties(name) : {})
    }
  }) as JSONSchema7

  const stubDefinitions = definitionsToStubDefinitions(defs(schema))
  const schemaWithRefStub = recursivelyFindRefsAndAppendStub(schema)

  const stubbedSchema = {
    ...schemaWithRefStub,
    [definitionsKey]: {
      ...stubDefinitions,
      ...schemaWithRefStub[definitionsKey]
    }
  }

  const definitionsWithJSONLDProperties = Object.entries(defs(stubbedSchema)).reduce<JSONSchema7['definitions']>((acc, [key, value]) => {
    return {
      ...acc,
      [key]: withJSONLDProperties(key, value as JSONSchema7)
    }
  }, {}) as JSONSchema7['definitions']

  const stubbedSemanticSchema: JSONSchema7 = {
    ...stubbedSchema,
    [definitionsKey]: definitionsWithJSONLDProperties
  }


  return stubbedSemanticSchema
}

export const bringDefinitionsToTop = (schema: JSONSchema7, key: string) => {
  const definitionsKey = '$defs' in schema ? '$defs' : 'definitions'
  return ({
    ...schema,
    ...((schema[definitionsKey] as any)[key] || {})
  })
}

export const allDefinitions = (schema: JSONSchema7) => Object.keys(defs(schema))

