# CRUD JSONForms

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

CRUD-JSONForms is a React component that builds upon the functionality of [JSON Forms](https://jsonforms.io/) to allow sophisticated form handling. This component extends the JSON Forms capabilities with custom renderers for recursively embedding new JSON forms for linked items in one-to-many and many-to-many relationships. It is perfect for complex forms where objects need to be interrelated and referred back to at a later stage.

This component is unopinionated regarding the storage strategy, requiring only an implementation for the `create`, `load`, `update`, and `remove` methods. Each of these methods receives a JSONSchema, which represents the shape of the data, the data itself (for `create` and `update`), or some kind of identifier (for `load`, `remove`, and `update`).

## Summary
- Unopinionated storage strategy
- Robust handling of linked items in one-to-many and many-to-many relationships
- CRUD operations (`create`, `load`, `update`, and `remove`) with JSONSchema and data

## Quick Start
```
yarn add @graviola/crud-jsonforms
```
After installing, you can use it in your React component like so:

```jsx
import { CRUDJsonForms } from '@graviola/crud-jsonforms';

// Create your CRUD functions
// and store them within useCustom_CRUD

const config = {
    baseIRI: 'http://example.com/ontology/',
    entityBaseIRI: 'http://http://example.com/entity#',
    defaultPrefix: 'http://example.com/ontology/',
    useCRUDHook: useCustom_CRUD,
    genJSONLDSemanticProperties: () => {}
}

const MyFormComponent = () => {
    const [formData, setFormData] = useState(exampleData)
    return <CRUDJsonForms
        data={formData}
        entityIRI={formData['@id']}
        typeIRI={formData['@type']}
        setData={data => setFormData(data)}
        schema={schema}
        jsonFormsProps={{
            config
        }}
    />
}
```
## Usage

The key prop for `CRUDJsonForms` component is the `schema` prop. This prop should contain your JSONSchema which determines the structure of your form.

The component also requires a hook which implements the CRUD functions (`create`, `load`, `update`, `remove`). You can see the example mock implementation
to get an idea how the interface looks like.

These functions provide the component with the ability to handle CRUD operations based on your specific implementation.

## Architecture
`CRUD-JSONForms` builds on the flexible and data-driven nature of JSON Forms. It extends this with recursive renderer components, which allow the embedding of new JSON forms for linked items within a form, allowing for one-to-many and many-to-many relationships.

The architecture of `CRUD-JSONForms` is designed to allow maximum customization while providing powerful defaults. Users can create their own CRUD functions based on their storage strategy, making this component flexible to fit into any existing or new react project.
You can also refer to the existing Inline-Forms renderer as a basis and implement your own one.

## Perspective

- further simplify the interface and strip out the reliance on semantic properties like '@id' and '@type'
- provide an extension to the CRUD-JSONForms that makes it fully compatible with JSON-LD (produce JSON-LD documents)
- provide some default `useCRUDHooks` in separate packages


## Developing

To start the development  run :

```
yarn start
```

This will build the library, run the watcher and also run Storybook.
To open Storybook manually open your Browser and navigate to [http://localhost:6060](http://localhost:6060).
Start developing your components in `src/components` folder and update the `src/index.js` file accordingly.
Always provide an `YourComponent.story.tsx` file, so your component will show up in Storybook.



## Scripts

- `yarn start` : Only serves Storybook.
- `yarn build` : Builds your library (build can be found in `dist` folder).
- `yarn storybook:build` : Builds the static Storybook in case you want to deploy it.
- `yarn test` : Runs the tests.
- `yarn test:coverage`: Runs the test and shows the coverage.
- `yarn lint` : Runs the linter, Typescript typecheck and stylelint.
- `yarn lint:fix` : Runs the linter, Typescript typecheck and stylelint and fixes automatic fixable issues.
- `yarn eslint`: Runs only the JavaScript linter.
- `yarn eslint:fix`: Runs only the JavaScript linter and fixes automatic fixable issues.
- `yarn stylelint`: Runs only the style linter.
- `yarn stylelint:fix`: Runs only the style linter and fixes automatic fixable issues.
- `yarn check-types`: Runs typescript type checker.
- `yarn release` : Publishes your Library on NPM or your private Registry (depending on your config in your `.npmrc` file).
- `yarn deploy`: Deploys the Storybook to GitHub Pages.

## Contributing
We welcome contributions to `CRUD-JSONForms`! Check out our [Contributing Guide](CONTRIBUTING.md) for guidelines on how to proceed.

## License
This project is licensed under the terms of the [MIT license](LICENSE).

## Resources

### JSONForms

- [JSON Forms](https://jsonforms.io/)
