import {useCallback, useMemo, useState} from 'react'
import {sladb, slent} from "./genSlubJSONLDSemanticProperties";
import {CRUDHook} from "../types";
import {create} from "zustand";
const baseIRI = sladb[''].value

/**
 * recursively go through the data and add @id for objects that have an id field
 * @param data
 * @param idFieldKeys the keys that are used to identify the id field
 */
const makeIRIsFromIDs: (data: any, idFieldKeys?: string[]) => any = (data, idFieldKeys = ['id', 'uuid']) => {
  if(!data) return data
  if(Array.isArray(data)) {
    return data.map(d => makeIRIsFromIDs(d, idFieldKeys))
  }
  if(typeof data === 'object') {
    const keys = Object.keys(data)
    const idFieldKey = keys.find(k => idFieldKeys.includes(k))
    const newData: any = Object.fromEntries(keys.map(k => [k, makeIRIsFromIDs(data[k], idFieldKeys)]))
    if(idFieldKey) {
      return {
        ...newData,
        '@id': slent(data[idFieldKey]).value
      }
    } else {
      return newData
    }
  }
  return data
}

//zustand hook for CRUD operations

type UseDataState = {
  data: {
        [k: string]: {
          [k: string]: any
        }
        },
  setData: (typeName: string, id: string, data: any) => void
  removeData: (typeName: string, id: string) => void
}

const useDataState = create<UseDataState>((set) => ({
  data: {},
  setData: (typeName, id, data) => {
    set(state => {
      return ({
        data: {
          ...state.data,
          [typeName]: {
            ...(state.data[typeName] || {}),
            [id]: data
          }
        }
      });
    })
  },
  removeData: (typeName, id) => {
    set(state => {
      const {[id]: _, ...rest} = state.data[typeName]
      return ({
        data: {
          ...state.data,
          [typeName]: rest
        }
      });
    })
  }
}))


export const useMock_CRUD: CRUDHook = (entityIRI, typeIRI, _schema,
                                       {
                                  askFetch,
                                  constructFetch,
                                  updateFetch,
                                  data,
                                  setData
                                }) => {

  const [isUpdate, setIsUpdate] = useState(false)

  const typeName = useMemo(() => typeIRI ? typeIRI.substring(baseIRI.length, typeIRI.length) : '', [typeIRI])
  const id = useMemo(() => typeof entityIRI === 'string' ? entityIRI.substring(entityIRI.lastIndexOf('#') + 1, entityIRI.length) : undefined, [entityIRI])
  const { data: storeData, setData: setDataStore, removeData } = useDataState(state => state )



  const exists = useCallback(async () => {
    if (!id) return false
    const resp =  data[typeName]?.[id]
    return resp?.id === id;

  }, [id, storeData, typeName])

  const load = useCallback(
      async () => {
        if (!id) return
        const resp =  storeData[typeName]?.[id]
        if(!resp) return
        const _data = makeIRIsFromIDs(
            Object.fromEntries(Object.entries(resp).filter(([,v]) => v !== undefined && v !== null)))
        const jsonldMixin = {
          '@type': typeIRI,
          '@context': {
            '@vocab': baseIRI
          }
        }
        setData({
          ..._data,
          ...jsonldMixin
        })
      }, [id, typeName, storeData, setData, typeIRI]
  )

  const remove = useCallback(
      async () => {
        if (!id) return
        removeData(id, typeName)
      },
      [id, typeName, removeData],
  )


  const save = useCallback(
      async () => {
        if (!data || !id) return
        setDataStore(typeName, id, data)
      },
      [id, data, isUpdate, setDataStore, typeName])

  return {
    exists,
    load,
    save,
    remove,
    isUpdate,
    setIsUpdate,
    // @ts-ignore
    ready: Boolean(askFetch && constructFetch && updateFetch)
  }
}


