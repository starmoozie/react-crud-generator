import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { handleCloseModal } from "@reducer/modalReducer";
import { setOpenLoading, setCloseLoading } from "@reducer/operationReducer";
import SubmitButton from "@button/Submit";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldArray from "./FieldArray";
import CloseButton from "../Buttons/Close";
import { useLocation } from "react-router-dom";
import { processingData } from "@reducer/operationReducer";
import { setFetchUrl, handleErrorMessage } from "@util";
import Alert from "../Alerts/Alert";
import { useCookies } from "react-cookie";

export const mapDefaultCreateValue = (fields) =>
  fields.reduce(
    (obj, item) => (
      (obj[item.accessorKey] = item.children
        ? [mapDefaultCreateValue(item.children)]
        : ""),
      obj
    ),
    {}
  );

export const b = (fields) => {
  return fields.map((field) =>
    Object.keys(field)
      .map((e) => ({ name: e, value: field[e] }))
      .reduce((obj, item) => ((obj[item.name] = item.value), obj), {})
  );
};

export const mapDefaultEditValue = (fields, row) =>
  fields
    .map((field) => ({
      name: field.accessorKey,
      value: Array.isArray(row[field.accessorKey])
        ? b(row[field.accessorKey])
        : row[field.accessorKey],
    }))
    .reduce((obj, item) => ((obj[item.name] = item.value), obj), {});

export const FormModal = (props) => {
  const { validation, row, access } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const [cookies] = useCookies();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    resolver: yupResolver(validation),
    defaultValues: row
      ? mapDefaultEditValue(props.fields, row)
      : mapDefaultCreateValue(props.fields),
  });

  const onSubmit = async (body) => {
    // Open loading
    dispatch(setOpenLoading());

    const url = setFetchUrl(location.pathname, row?.id);

    try {
      // Dispatching fetch api request
      const a = await dispatch(
        processingData({
          token: cookies.profile?.token,
          body: body,
          url: url,
          method: access.method,
        })
      ).unwrap();

      // Close Modal
      dispatch(handleCloseModal());
    } catch (error) {
      // Handling error message
      handleErrorMessage(error, setError);
    }
    // Close loading if finished
    dispatch(setCloseLoading());
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: -3 }}>
      <DialogContent>
        <Grid container spacing={2}>
          {errors.nonValidation ? (
            <Alert message={errors.nonValidation.message} />
          ) : (
            <></>
          )}

          {props.fields.map((field, index) => {
            return (
              <RenderChild
                key={field.accessorKey}
                field={field}
                row={row}
                index={index}
                control={control}
                errors={errors}
                setValue={setValue}
              />
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pr: 3, pb: 3 }}>
        <CloseButton />
        <SubmitButton />
      </DialogActions>
    </Box>
  );
};

const RenderChild = (props) => {
  const { field, row, index, control, errors, setValue } = props;
  const { attributes } = field;
  const size = attributes || { xs: 12, sm: 12, md: 12 };

  return (
    <Grid item {...size}>
      <FieldArray
        field={field}
        row={row}
        index={index}
        control={control}
        errors={errors}
        setValue={setValue}
      />
    </Grid>
  );
};

export default FormModal;
