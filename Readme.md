### ReactJS CRUD Generator

Standard CRUD Generator ReactJS with validation.

![image info](./images/ss2.png)

### Usage

Use comment below to generate default crud components

```
npm run generate starmoozie:component {name}
```

### Supported Features

#### Fields

- Checkbox

```
    import { CheckboxField } from "@field";
    {
        accessorKey: "refund_payabled",
        header: "Pay Refund",
        Cell: (props) => <CheckboxField {...props} />,
    },
```

- Date

```
    import { CheckboxField } from "@field";
    {
        accessorKey: "refund_payabled",
        header: "Pay Refund",
        Cell: (props) => <CheckboxField {...props} />,
    },
```

- Repeatable

```
    {
        accessorKey: "items",
        header: "Items",
        children: [
        {
            accessorKey: "product",
            header: "Product",
        },
        {
            accessorKey: "sell_price",
            header: "Sell Price",
        },
        ],
    },
```

- Select

```
    import { SelectField } from "@field";
    {
        accessorKey: "refund_payabled",
        header: "Pay Refund",
        Cell: (props) => (
            <SelectField
                {...props}
                endpoint="/products"
                filters={[ // If add filter params to be
                    {
                        id: "is_sold",
                        value: "false",
                    },
                ]}
                primaryKey="id"
                attribute="code"
                defaultValue={props.row?.items[props.index]?.product || ""}
            />
        ),,
    },
```

- Text

```
    import { TextField } from "@field";
    {
        accessorKey: "refund_payabled",
        header: "Pay Refund",
        Cell: (props) => {
            return <TextField {...props} />;
        },
    },
```

#### Columns

- Text (Active by default)

```
    import TextColumn from "@column/Text";
    {
        accessorKey: "refund",
        header: "Refund",
        Cell: (props) => {
        return <TextColumn {...prop} />;
        },
    },
```

- Tooltip button

```
    import TooltipColumn from "@column/Tooltip";
    {
        accessorKey: "refund",
        header: "Refund",
        Cell: ({ row }) => {
        return <TooltipColumn title={"Tooltip"} value={"value"} color={"error"} />;
        },
    },
```

#### Filters

- Date

```
    import DateFilter from "@filter/Date";

    {
        accessorKey: "date",
        header: "Date",
        Filter: ({ column }) => (
            <DateFilter setFilterValue={column.setFilterValue} />
        ),
    },

```

- DateRange

```

    import DateRangeFilter from "@filter/DateRange";

    {
        accessorKey: "date",
        header: "Date",
        Filter: ({ column }) => (
            <DateRangeFilter setFilterValue={column.setFilterValue} />
        )
    },

```

- Select (Default by material-react-table)

```

    {
        accessorKey: 'city',
        header: 'City',
        filterVariant: 'select',
        filterSelectOptions: [
          { text: 'Male', value: 'Male' },
          { text: 'Female', value: 'Female' },
          { text: 'Other', value: 'Other' },
        ],,
    },

```

- Multi Select (Default by material-react-table)

```

    {
        accessorKey: 'city',
        header: 'City',
        filterVariant: 'multi-select',
        filterSelectOptions: [
          { text: 'Male', value: 'Male' },
          { text: 'Female', value: 'Female' },
          { text: 'Other', value: 'Other' },
        ],,
    },

```

- Checkbox (Default by material-react-table)

```

    {
        accessorKey: "refund",
        header: "Refund",
        filterVariant: "checkbox",
    },

```

- Range (Default by material-react-table)

```

    {
        accessorKey: "refund",
        header: "Refund",
        filterVariant: "range",
    },

```

- Text (Active by default material-react-table)

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

```

```
