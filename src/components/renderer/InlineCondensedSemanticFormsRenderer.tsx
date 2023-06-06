import {ControlProps, Resolve} from '@jsonforms/core'
import {useJsonForms, withJsonFormsControlProps} from '@jsonforms/react'
import {Box, FormControl, Grid, Hidden, IconButton, Typography} from '@mui/material'
import {JSONSchema7} from 'json-schema'
import merge from 'lodash/merge'
import React, {useCallback, useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid'

import {CRUDJsonForms} from '../CRUDJsonForms'
import {Edit, EditOff} from "@mui/icons-material";
import {JsonFormsExtendedConfig} from "../types";
import {useInlineForm} from "../hooks/useInlineForm";

const InlineCondensedSemanticFormsRenderer = (props: ControlProps) => {
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
    label,
    description
  } = props
  const appliedUiSchemaOptions = merge({}, config, uischema.options)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({'@id': data})
  const ctx = useJsonForms()
  const [realLabel, setRealLabel] = useState('')

  const {
    typeIRI,
    subSchema,
    uischemata,
    uischemaExternal,
    DiscoverAutocomplete
  } = useInlineForm(config as JsonFormsExtendedConfig, rootSchema, schema, uischema)

  const handleChange_ = useCallback(
      (v?: string) => {
        //FIXME: this is a workaround for a bug, that causes this to be called with the same value eternally
        if (v === data) return
        handleChange(path, v)
      },
      [path, handleChange, data],
  )

  useEffect(() => {
    let label_ = ''
    if (data) {
      const parentData = Resolve.data(ctx?.core?.data, path.substring(0, path.length - ('@id'.length + 1)))
      label_ = parentData?.label || parentData?.name || parentData?.title || parentData?.['@id']?.value || ''
    }
    setRealLabel(label_)
  }, [data, ctx?.core?.data, path, setRealLabel]);

  const newURI = useCallback(() => {
    if (!data) {
      const prefix = schema.title
      const newURI = `${prefix}${uuidv4()}`
      handleChange_(newURI)
    }
  }, [schema, data, handleChange_])

  useEffect(() => {
    if (editMode)
      newURI()
  }, [newURI, editMode])


  return (
      <Hidden xsUp={!visible}>
        <Grid container alignItems='baseline'>
         <Grid item flex={'auto'}>
            {DiscoverAutocomplete
                ? (realLabel
                    ? <DiscoverAutocomplete
                        key={'not empty'}
                        readonly={Boolean(ctx.readonly)}
                        typeIRI={typeIRI}
                        title={description || label || ''}
                        defaultSelected={{value: data, label: realLabel}}
                        onSelectionChange={(selection) => handleChange_(selection?.value)}/>
                    : <DiscoverAutocomplete
                        key={'empty'}
                        readonly={Boolean(ctx.readonly)}
                        typeIRI={typeIRI}
                        title={description || label || ''}
                        onSelectionChange={selection => handleChange_(selection?.value)}/>)
                : <><Typography variant={'body1'}>{label }: {realLabel || <Box component='span' sx={theme => ({color: theme.palette.grey[500]})} >no data</Box>}</Typography></>}
          </Grid>
          <Grid item>
            <IconButton onClick={() => setEditMode(editMode => !editMode)}>{editMode ? <><EditOff/></> :
                <Edit/>}</IconButton>
          </Grid>
        </Grid>


        <FormControl
            fullWidth={!appliedUiSchemaOptions.trim}
            id={id}
            variant={'standard'}
            sx={theme => ({marginBottom: theme.spacing(2)})}
        >
          {subSchema && editMode && (
              <Grid container alignItems='baseline'>
                <Grid item flex={'auto'}>
                  <CRUDJsonForms
                      readonly={false}
                      data={formData}
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
                  />
                </Grid>
              </Grid>)
          }
        </FormControl>
      </Hidden>
  )
}

export default withJsonFormsControlProps(InlineCondensedSemanticFormsRenderer)
