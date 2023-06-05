import {withJsonFormsControlProps} from '@jsonforms/react'
import {Edit, EditOff} from '@mui/icons-material'
import {FormControl, Hidden, IconButton} from '@mui/material'
import {JSONSchema7} from 'json-schema'
import merge from 'lodash/merge'
import React, {useCallback, useState} from 'react'
import {v4 as uuidv4} from 'uuid'

import SemanticJsonForm from '../SemanticJsonForm'
import {CRUDOpsType, JsonFormsExtendedConfig} from "../types";
import MuiEditDialog from "../dialog/MuiEditDialog";
import {useInlineForm} from "../hooks/useInlineForm";
import {ControlProps} from "@jsonforms/core";

const InlineSemanticFormsRendererModal = (props: ControlProps) => {
  const {
    id,
    schema,
    uischema,
    visible,
    config,
    data,
    handleChange,
    path,
    rootSchema,
    label
  } = props
  const appliedUiSchemaOptions = merge({}, config, uischema.options)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [formData, setFormData] = useState({'@id': data})
  const [CRUDOps, setCRUDOps] = useState<CRUDOpsType | undefined>()
  const {load, save, remove} = CRUDOps || {}

  const {
    typeIRI,
    subSchema,
    uischemata,
    uischemaExternal,
    DiscoverAutocomplete} = useInlineForm(config as JsonFormsExtendedConfig, rootSchema, schema, uischema)

  const handleChange_ = useCallback(
      (v?: string) => {
        //FIXME: this is a workaround for a bug, that causes this to be called with the same value eternally
        if(v === data) return
        handleChange(path, v)
      },
      [path, handleChange, data],
  )


  const handleToggle = useCallback(() => {
    const prefix = schema.title
    if (!data && !modalIsOpen) {
      const newURI = `${prefix}${uuidv4()}`
      handleChange_(newURI)
    }
    setModalIsOpen(!modalIsOpen)
  }, [schema, data, handleChange_, setModalIsOpen, modalIsOpen])

  const handleSave = useCallback(
      async () => {
        if (!save) return
        await save()
        //emitToSubscribers(subscriptionKeys.GLOBAL_DATA_CHANGE, subscriptions)
        setModalIsOpen(false)
      },
      [save, setModalIsOpen])
  const handleRemove = useCallback(
      async () => {
        if (!remove) return
        await remove()
        setModalIsOpen(false)
      },
      [remove, setModalIsOpen],
  )

  return (
      <Hidden xsUp={!visible}>
        <FormControl
            fullWidth={!appliedUiSchemaOptions.trim}
            id={id}
            variant={'standard'}
            sx={theme => ({marginBottom: theme.spacing(2)})}
        >
          <IconButton onClick={(e) => { e.stopPropagation() ; handleToggle()}}>{modalIsOpen ? <EditOff/> : <Edit/>}</IconButton>
          {modalIsOpen && subSchema && (
              <MuiEditDialog
                  title={label || ''}
                  open={modalIsOpen}
                  onClose={handleToggle}
                  onCancel={handleToggle}
                  onSave={handleSave}
                  onReload={load}
                  search={
                    DiscoverAutocomplete && <DiscoverAutocomplete
                        typeIRI={typeIRI}
                        title={label || ''}
                        onSelectionChange={selection => handleChange_(selection?.value)}/>
                  }
                  onRemove={handleRemove}>
                <SemanticJsonForm
                    data={formData}
                    hideToolbar={true}
                    entityIRI={data}
                    setData={_data => setFormData(_data)}
                    shouldLoadInitially
                    typeIRI={typeIRI}
                    schema={subSchema as JSONSchema7}
                    jsonFormsProps={{
                      uischema: uischemaExternal || undefined,
                      uischemas: uischemata,
                      config
                    }}
                    onEntityChange={handleChange_}
                    onInit={(crudOps) => setCRUDOps(crudOps)}
                />
              </MuiEditDialog>)}
        </FormControl>
      </Hidden>
  )
}

export default withJsonFormsControlProps(InlineSemanticFormsRendererModal)
