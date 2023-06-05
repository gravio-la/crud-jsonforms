import {NamespaceBuilder} from '@rdfjs/namespace'
import {Bindings, DatasetCore, Quad, ResultStream} from '@rdfjs/types'
import {JSONSchema7} from "json-schema";

export type CRUDOpsType = {
  load: () => Promise<void>
  save: () => Promise<void>
  remove: () => Promise<void>
}

export type WalkerOptions = {
  omitEmptyArrays: boolean
  omitEmptyObjects: boolean
  maxRecursionEachRef: number
  maxRecursion: number
}
export interface SparqlBuildOptions {
  base?: string;
  prefixes?: Record<string, string | NamespaceBuilder>;
}

export type CRUDFunctions = {
  updateFetch: (query: string) => Promise<ResultStream<any> | boolean | void | ResultStream<Bindings> | ResultStream<Quad>>
  constructFetch: (query: string) => Promise<DatasetCore>
  selectFetch: (query: string) => Promise<any>
  askFetch: (query: string) => Promise<boolean>
}

export type CRUDOptions = CRUDFunctions & {
  defaultPrefix: string
  data: any
  setData: (data: any) => void
  walkerOptions?: Partial<WalkerOptions>
  queryBuildOptions?: SparqlBuildOptions
  upsertByDefault?: boolean
  ready?: boolean
}

export type CRUDHookResult = {
  load: () => Promise<void>;
  ready: boolean;
  save: () => Promise<void>;
  exists: () => Promise<boolean>;
  setIsUpdate: (value: (((prevState: boolean) => boolean) | boolean)) => void;
  remove: () => Promise<void>;
  isUpdate: boolean
}

export type CRUDHook = (entityIRI: string | undefined, typeIRI: string | undefined, schema: any, options: CRUDOptions) => CRUDHookResult

export type GenericCRUDOptions = CRUDOptions & {
  useConcreteCRUD: CRUDHook
}

export type GenericCRUDHook = (entityIRI: string | undefined, typeIRI: string | undefined, schema: any, options: GenericCRUDOptions) => CRUDHookResult

export type GenJSONLDSemanticPropertiesFunction = (modelName: string) => {
  "@type": { const: string; type: string };
  "@id": { title: string; type: string }
}

export type AutocompleteSuggestion = {
  label: string;
  value: string;
};

export type DiscoverAutocompleteProps = {
  selected?: AutocompleteSuggestion | null
  onSelectionChange?: (selection: AutocompleteSuggestion | null) => void
  typeIRI?: string
  title?: string
  readonly?: boolean
  defaultSelected?: AutocompleteSuggestion | null
}

export type JsonFormsExtendedConfig = {
  baseIRI: string
  entityBaseIRI: string
  defaultPrefix: string
  genJSONLDSemanticProperties?: GenJSONLDSemanticPropertiesFunction
  useCRUDHook: CRUDHook
  renderDiscoverAutocomplete?: (props: DiscoverAutocompleteProps) => React.ReactElement
}

export type ParserMiddleware = (data: any, schema: JSONSchema7) => any
