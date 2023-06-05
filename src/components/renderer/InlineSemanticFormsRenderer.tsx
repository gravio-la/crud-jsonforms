import {ControlProps} from '@jsonforms/core'
import {withJsonFormsControlProps} from '@jsonforms/react'
import {FormControl, Grid, Hidden} from '@mui/material'
import {JSONSchema7} from 'json-schema'
import merge from 'lodash/merge'
import React, {useCallback, useEffect, useState} from 'react'
import {v4 as uuidv4} from 'uuid'

import SemanticJsonForm from '../SemanticJsonForm'
import {JsonFormsExtendedConfig} from "../types";
import {useInlineForm} from "../hooks/useInlineForm";

const InlineSemanticFormsRenderer = (props: ControlProps) => {
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
    } = props
    const appliedUiSchemaOptions = merge({}, config, uischema.options)
    const [editMode, _setEditMode] = useState(false)
    const [formData, setFormData] = useState({'@id': data})
    const {
        typeIRI,
        subSchema,
        uischemata,
        uischemaExternal } = useInlineForm(config as JsonFormsExtendedConfig, rootSchema, schema, uischema)

    const handleChange_ = useCallback(
        (v?: string) => {
            //FIXME: this is a workaround for a bug, that causes this to be called with the same value eternally
            if(v === data) return
            handleChange(path, v)
        },
        [path, handleChange, data],
    )


    const init = useCallback(() => {
        if (!data && !editMode) {
            const prefix = schema.title
            const newURI = `${prefix}${uuidv4()}`
            handleChange_(newURI)
        }
    }, [schema, data, handleChange_])

    useEffect(() => {
        init()
    }, [init])

    return (
        <Hidden xsUp={!visible}>
            <FormControl
                fullWidth={!appliedUiSchemaOptions.trim}
                id={id}
                variant={'standard'}
                sx={theme => ({marginBottom: theme.spacing(2)})}
            >
                {subSchema && (
                        <Grid container alignItems='baseline'>
                            <Grid item flex={'auto'}>
                                <SemanticJsonForm
                                    readonly={!editMode}
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

export default withJsonFormsControlProps(InlineSemanticFormsRenderer)
