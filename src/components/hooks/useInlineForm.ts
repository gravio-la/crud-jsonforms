import {JsonFormsExtendedConfig} from "../types";
import {useMemo} from "react";
import {uischemas} from "../helper/uischemas";
import {useUISchemaForType} from "../helper/uischemaForType";
import {ControlElement, JsonFormsUISchemaRegistryEntry, JsonSchema} from "@jsonforms/core";
import {getSubSchema} from "../helper/jsonforms/getSubSchema";

export const useInlineForm: (config: JsonFormsExtendedConfig, rootSchema: JsonSchema, schema: JsonSchema, uischema: ControlElement) => {
  uischemaExternal: any;
  uischemata: JsonFormsUISchemaRegistryEntry[],
  subSchema: JsonSchema,
  typeIRI: string | undefined,
  DiscoverAutocomplete: JsonFormsExtendedConfig['renderDiscoverAutocomplete']
} = (config, rootSchema,schema, uischema) => {
  const {baseIRI} = config
  const uischemata = useMemo(() => rootSchema ? uischemas(rootSchema, baseIRI) : [], [rootSchema, baseIRI])
  const {$ref, typeIRI} = uischema.options?.context || {}
  const uischemaExternal = useUISchemaForType(typeIRI || '', baseIRI)
  const subSchema = useMemo(() => $ref && getSubSchema(schema, rootSchema, $ref), [$ref, schema, rootSchema])
  const { renderDiscoverAutocomplete : DiscoverAutocomplete} = config

  return {
    uischemaExternal,
    uischemata,
    subSchema,
    typeIRI,
    DiscoverAutocomplete
  }
}
