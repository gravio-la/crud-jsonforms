import {Box} from "@mui/material";
import CRUDJsonForms from "./CRUDJsonForms";
import {JSONSchema7} from "json-schema";
import React, {useState} from "react";
import {exampleData, exhibitionClassIRI} from "./example/fixture";
import exhibitionSchema from "./example/Exhibition.schema";
import {uischemas} from "./helper/uischemas";
import genSlubJSONLDSemanticProperties, {sladb, slent} from "./example/genSlubJSONLDSemanticProperties";
import {useMock_CRUD} from "./example/useMock_CRUD";
import {JsonFormsExtendedConfig} from "./types";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Story} from "@storybook/react";
import {bringDefinitionsToTop, prepareStubbedSchema} from "./helper/jsonforms";

const baseIRI = sladb[''].value;
const uischemata = uischemas(exhibitionSchema, baseIRI);
const config: JsonFormsExtendedConfig = {
  baseIRI,
  entityBaseIRI: slent[''].value,
  defaultPrefix: baseIRI,
  useCRUDHook: useMock_CRUD,
  genJSONLDSemanticProperties: genSlubJSONLDSemanticProperties
}

const queryClient = new QueryClient()
export default {
  title: 'CRUDJsonForms',
  component: CRUDJsonForms,
  decorators: [
    (Story: Story) => (
        <QueryClientProvider client={queryClient}><Story /></QueryClientProvider>
    )
  ],
}

const typeName = 'Exhibition'
const schema = bringDefinitionsToTop( prepareStubbedSchema(exhibitionSchema as JSONSchema7, genSlubJSONLDSemanticProperties), typeName)
export const Default = () => {
  const [formData, setFormData] = useState(exampleData)
   return <Box>
      <CRUDJsonForms
          data={formData}
          entityIRI={formData['@id']}
          setData={_data => setFormData(_data)}
          shouldLoadInitially
          typeIRI={exhibitionClassIRI}
          schema={schema as JSONSchema7}
          jsonFormsProps={{
            uischemas: uischemata,
            config
          }}
      />
    </Box>
}
