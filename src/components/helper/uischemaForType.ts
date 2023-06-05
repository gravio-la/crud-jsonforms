// @ts-ignore
import {useQuery} from '@tanstack/react-query'
import {useMemo} from 'react'


export const useUISchemaForType = (typeIRI: string, baseIRI: string) => {
  const typeName = useMemo(() => typeIRI.substring(baseIRI.length, typeIRI.length), [typeIRI, baseIRI])
  const {data} = useQuery(['uischema', typeIRI], () => fetch(`./uischema/${typeName}.uischema.json`).then(async res => {
    let schema = null
    try {
       schema = await res.json()
    } catch (e) {
      console.log(`No uischema found for ${typeName}`)
    }
    return schema
  }), {
    retry: false,
    refetchOnWindowFocus: false,
    onError: (_err: any) => {}
  })
  return data
}
