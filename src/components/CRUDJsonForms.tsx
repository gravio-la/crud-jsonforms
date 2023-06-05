import {
  isObjectArray,
  isObjectArrayControl,
  JsonFormsCore,
  JsonSchema,
  rankWith,
  scopeEndIs,
  scopeEndsWith,
  UISchemaElement
} from '@jsonforms/core'
import {materialCells, materialRenderers} from '@jsonforms/material-renderers'
import {JsonForms, JsonFormsInitStateProps} from '@jsonforms/react'
import {Edit, EditOff} from '@mui/icons-material'
import {Button, Grid, Hidden, IconButton} from '@mui/material'
import {JSONSchema7} from 'json-schema'
import {isEmpty} from 'lodash'
import React, {FunctionComponent, useCallback, useEffect, useMemo, useState} from 'react'

import AutoIdentifierRenderer from './renderer/AutoIdentifierRenderer'
import InlineCondensedSemanticFormsRenderer from './renderer/InlineCondensedSemanticFormsRenderer'
import InlineSemanticFormsRenderer from './renderer/InlineSemanticFormsRenderer'
import MaterialArrayOfLinkedItemRenderer from './renderer/MaterialArrayOfLinkedItemRenderer'
import MaterialCustomAnyOfRenderer, {materialCustomAnyOfControlTester} from './renderer/MaterialCustomAnyOfRenderer'
import TypeOfRenderer from './renderer/TypeOfRenderer'
import {CRUDOpsType, JsonFormsExtendedConfig, ParserMiddleware, SparqlBuildOptions} from './types'
import {useCRUD} from './hooks/useCRUD'

interface OwnProps {
  entityIRI?: string | undefined
  data: any,
  setData: (data: any) => void
  shouldLoadInitially?: boolean
  typeIRI?: string
  schema: JSONSchema7
  debugEnabled?: boolean
  queryBuildOptions?: SparqlBuildOptions
  jsonFormsProps?: Partial<JsonFormsInitStateProps>
  onInit?: (crudOps: CRUDOpsType) => void
  hideToolbar?: boolean
  readonly?: boolean
  parserMiddleware?: ParserMiddleware
  onEntityChange?: (entityIRI: string | undefined) => void
}

export type SemanticJsonFormsProps = OwnProps;

const renderers = [
  ...materialRenderers,
  {
    tester: materialCustomAnyOfControlTester,
    renderer: MaterialCustomAnyOfRenderer
  },  {
    tester: rankWith(10,
        scopeEndIs('@id')
    ),
    renderer: AutoIdentifierRenderer
  }, {
    tester: rankWith(10,
        scopeEndsWith('@type')
    ),
    renderer: TypeOfRenderer
  }, {
    tester: rankWith(5, isObjectArray),
    renderer: MaterialArrayOfLinkedItemRenderer
  }, {
    tester: rankWith(13,
        (uischema: UISchemaElement): boolean => {
          if (isEmpty(uischema)) {
            return false
          }
          const options = uischema.options
          return !isEmpty(options) && options['inline']
        }),
    renderer: InlineSemanticFormsRenderer
  },{
  tester: rankWith(14,
        (uischema: UISchemaElement, schema, ctx): boolean => {
          if (isEmpty(uischema) ||  isObjectArrayControl(uischema, schema, ctx)) {
            return false
          }
          const options = uischema.options
          return !isEmpty(options) && options['inline']
        }),
    renderer: InlineCondensedSemanticFormsRenderer
  }
]

const CRUDJsonForms: FunctionComponent<SemanticJsonFormsProps> =
    ({
       entityIRI,
       data,
       setData,
       shouldLoadInitially,
       typeIRI,
       schema,
       queryBuildOptions,
       jsonFormsProps = {},
       onInit,
       hideToolbar,
       readonly,
        parserMiddleware
     }) => {
      const [initiallyLoaded, setInitiallyLoaded] = useState<string | undefined>(undefined)
      const [editMode, setEditMode] = useState(!Boolean(readonly))
      const transformedData = useMemo(() => parserMiddleware ? parserMiddleware(data, schema) : data , [data, schema,parserMiddleware ])
      const jFConfig = useMemo(() => jsonFormsProps.config as JsonFormsExtendedConfig, [jsonFormsProps.config])

      const {
        exists,
        load,
        save,
        remove,
        setIsUpdate,
        ready
      } = useCRUD(
          entityIRI,
          typeIRI,
          schema,
          //@ts-ignore
          {
            useConcreteCRUD: jFConfig.useCRUDHook,
            defaultPrefix: jFConfig.defaultPrefix,
            setData: setData,
            data: transformedData,
            queryBuildOptions
          })


      useEffect(() => {
        if(!ready) return
        const testExistenceAndLoad = async () => {
          if (!entityIRI || !shouldLoadInitially || initiallyLoaded === entityIRI)
            return
          setIsUpdate(await exists())
          await load()
          setInitiallyLoaded(entityIRI)
        }
        setTimeout(() => testExistenceAndLoad(), 1)
        //todo why is it necessary
        //testExistenceAndLoad()
      }, [entityIRI, shouldLoadInitially, ready, setIsUpdate, exists, load, initiallyLoaded, setInitiallyLoaded])


      const handleFormChange = useCallback(
          (state: Pick<JsonFormsCore, 'data' | 'errors'>) => {
            setData(state.data )
          }, [setData])


      useEffect(() => {
        if (onInit) {
          onInit({load, save, remove})
        }
      }, [onInit, load, save, remove])

      const handleSave = useCallback(async () => {
        await save()
        await load()
        setEditMode(false)
      }, [save, setEditMode])


      return (<>
            <Hidden xsUp={hideToolbar}>
              <IconButton onClick={() => setEditMode(editMode => !editMode)}>{editMode ? <EditOff/> :
                  <Edit/>}</IconButton>
              {editMode && <>
                  <Button onClick={handleSave}>speichern</Button>
                  <Button onClick={remove}>entfernen</Button>
                  <Button onClick={load}>laden</Button>
              </>}
            </Hidden>
            <Grid container spacing={2}>
              <Grid item flexGrow={1}>
                <JsonForms
                    readonly={!editMode}
                    data={transformedData}
                    renderers={{
                      ...renderers,
                      ...(jsonFormsProps.renderers || {})
                    }}
                    cells={materialCells}
                    onChange={handleFormChange}
                    schema={schema as JsonSchema}
                    {...jsonFormsProps}

                />
              </Grid>
            </Grid>
          </>
      )
    }

export default CRUDJsonForms
