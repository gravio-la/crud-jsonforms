import {
  ArrayLayoutProps,
  composePaths,
  computeLabel,
  createDefaultValue,
} from '@jsonforms/core'
import map from 'lodash/map'
import merge from 'lodash/merge'
import range from 'lodash/range'
import React, {useCallback,useState} from 'react'

import { ArrayLayoutToolbar } from './ArrayToolbar'
import ExpandPanelRenderer from './ExpandPanelRenderer'
import {useJsonForms} from "@jsonforms/react";

const MaterialArrayLayoutComponent = (props: ArrayLayoutProps)=> {
  const [expanded, setExpanded] = useState<string|boolean>(false)
  const innerCreateDefaultValue = useCallback(() => createDefaultValue(props.schema), [props.schema])
  const handleChange = useCallback((panel: string) => (_event: any, expandedPanel: boolean) => {
    setExpanded(expandedPanel ? panel : false)
  }, [])
  const isExpanded = (index: number) =>
      expanded === composePaths(props.path, `${index}`)

  const {
    data,
    path,
    schema,
    uischema,
    errors,
    addItem,
    renderers,
    cells,
    label,
    required,
    rootSchema,
    config,
    uischemas
  } = props
  const appliedUiSchemaOptions = merge(
      {},
      config,
      props.uischema.options
  )
  const { readonly } = useJsonForms()

  return (
      <div>
        <ArrayLayoutToolbar
            label={computeLabel(
                label,
                Boolean(required),
                appliedUiSchemaOptions.hideRequiredAsterisk
            )}
            errors={errors}
            path={path}
            addItem={addItem}
            createDefault={innerCreateDefaultValue}
            readonly={readonly}
        />
        <div>
          {data > 0 ? (
              map(range(data), index => {
                return (
                    <ExpandPanelRenderer
                        index={index}
                        expanded={isExpanded(index)}
                        schema={schema}
                        path={path}
                        handleExpansion={handleChange}
                        uischema={uischema}
                        renderers={renderers}
                        cells={cells}
                        key={index}
                        rootSchema={rootSchema}
                        enableMoveUp={index != 0}
                        enableMoveDown={index < data - 1}
                        config={config}
                        childLabelProp={appliedUiSchemaOptions.elementLabelProp}
                        uischemas={uischemas}
                        readonly={readonly}
                    />
                )
              })
          ) : (
              <p>No data</p>
          )}
        </div>
      </div>
  )
}

const MaterialArrayLayout = React.memo(MaterialArrayLayoutComponent)
export default MaterialArrayLayout
