import React from "react";
import TextField from "@field/Text";
import { useFieldArray } from "react-hook-form";
import RepeatableField from "@field/Repeatable";

const FieldArray = ({ field, row, control, errors, setValue, index }) => {
  const { accessorKey, Cell, header } = field;
  const defaultValue = row?.[field.accessorKey];
  const Component = Cell ? Cell : TextField;

  const { fields, append, remove } = useFieldArray({
    control,
    name: field.accessorKey,
  });

  return (
    <>
      {field.children ? (
        <RepeatableField
          field={field}
          row={row}
          autoFocus={!index}
          accessorKey={accessorKey}
          header={header}
          defaultValue={defaultValue}
          control={control}
          errors={errors}
          setValue={setValue}
          append={append}
          remove={remove}
          children={fields}
        />
      ) : (
        <Component
          field={field}
          row={row}
          autoFocus={!index}
          accessorKey={accessorKey}
          header={header}
          defaultValue={defaultValue}
          control={control}
          errors={errors}
          setValue={setValue}
        />
      )}
    </>
  );
};

export default FieldArray;
