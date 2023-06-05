import {
  ArrayLayoutProps,
  isObjectArrayWithNesting,
  RankedTester,
  rankWith
} from '@jsonforms/core'
import { withJsonFormsArrayLayoutProps } from '@jsonforms/react'
import { Hidden } from '@mui/material'
import React, { useCallback } from 'react'

import MaterialArrayLayout from './MaterialArrayLayout'

export const MaterialArrayOfLinkedItemRenderer = ({
  visible,
  enabled,
  id,
  uischema,
  schema,
  label,
  rootSchema,
  renderers,
  cells,
  data,
  path,
  errors,
  uischemas,
  addItem
}: ArrayLayoutProps) => {
  const addItemCb = useCallback((p: string, value: any) => addItem(p, value), [
    addItem
  ])
  return (
    <Hidden xsUp={!visible}>
      <MaterialArrayLayout
        label={label}
        uischema={uischema}
        schema={schema}
        id={id}
        rootSchema={rootSchema}
        errors={errors}
        enabled={enabled}
        visible={visible}
        data={data}
        path={path}
        addItem={addItemCb}
        renderers={renderers}
        cells={cells}
        uischemas={uischemas}
        translations={{}}
      />
    </Hidden>
  )
}

export const materialArrayLayoutTester: RankedTester = rankWith(
  4,
  isObjectArrayWithNesting
)
export default withJsonFormsArrayLayoutProps(MaterialArrayOfLinkedItemRenderer)
