### ReactJS CRUD Generator

![image info](./images/ss.png)

Standard CRUD Generator ReactJS with validation.

### Usage

Use comment below to generate default crud components

```
npm run generate starmoozie:component {name}
```

### Supported Features

#### Fields

- Checkbox
- Date
- Repeatable
- Select
- Text

#### Columns

- Text
- Tooltip button

#### Filters

- Date

#### BE dynamic menu response format

```
[
    {
        "id": 1,
        "name": "Supplier",
        "path": "/suppliers",
        "permission": [
            {
                "access": [
                    {
                        "key": "create",
                        "name": "Create",
                        "type": null,
                        "method": "post",
                        "position": "top-left"
                    }
                ],
                "position": "top-left"
            },
            {
                "access": [
                    {
                        "key": "export",
                        "name": "Export",
                        "type": null,
                        "method": null,
                        "position": "top-right"
                    },
                    {
                        "key": "import",
                        "name": "Import",
                        "type": null,
                        "method": null,
                        "position": "top-right"
                    }
                ],
                "position": "top-right"
            },
            {
                "access": [
                    {
                        "key": "detail",
                        "name": "Detail",
                        "type": "Default",
                        "method": null,
                        "position": "line"
                    },
                    {
                        "key": "edit",
                        "name": "Edit",
                        "type": "Form",
                        "method": "put",
                        "position": "line"
                    },
                    {
                        "key": "delete",
                        "name": "Delete",
                        "type": "Confirm",
                        "method": "delete",
                        "position": "line"
                    }
                ],
                "position": "line"
            }
        ]
    },
]
```

#### Menu based Permissions

- [menu permissions](https://github.com/starmoozie/react-crud-generator/blob/main/src/constants/menu.js)

#### Packages

- Templating component [MUI](https://mui.com/)
- Field validation [React Hook Form](https://react-hook-form.com/), [Yup](https://github.com/jquense/yup)
- State management [Redux](https://redux.js.org/)
- Datatable [Material React Table](https://www.material-react-table.com/)
