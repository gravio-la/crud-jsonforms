import {GenericCRUDHook} from '../types'

export const useCRUD: GenericCRUDHook = (
    entityIRI,
    typeIRI,
    schema,
    { useConcreteCRUD, ...options }) =>
    useConcreteCRUD(entityIRI, typeIRI, schema, options)
