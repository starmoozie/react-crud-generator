import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link as RouterLink, useLocation } from "react-router-dom";
import TextField from "@field/Text";

import { validation } from "./validation";
import { processingData } from "@reducer/operationReducer";
import { setFetchUrl, handleErrorMessage } from "@util";
import { useDispatch } from "react-redux";
import { setOpenLoading, setCloseLoading } from "@reducer/operationReducer";
import { useAuth } from "@hook";

const Register = (props) => {
  const { path } = props;
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    resolver: yupResolver(validation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const location = useLocation();
  const dispatch = useDispatch();
  const { login } = useAuth();

  const from = location.pathname;
  const title = from.replace("/", "");

  const submit = async (body) => {
    // Open loading
    dispatch(setOpenLoading());

    const url = setFetchUrl(path);

    try {
      // Dispatching fetch api request
      const response = await dispatch(
        processingData({
          body: body,
          url: url,
          method: "POST",
        })
      ).unwrap();

      login(response.data);
    } catch (error) {
      // Handling error message
      handleErrorMessage(error, setError);
    }
    // Close loading if finished
    dispatch(setCloseLoading());
  };

  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        sx={{ textTransform: "capitalize" }}
        align="center"
      >
        {title}
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(submit)}
        sx={{ mt: 1 }}
      >
        <TextField
          header={`Name`}
          accessorKey={`name`}
          control={control}
          errors={errors}
          setValue={setValue}
          autoFocus
        />
        <TextField
          header={`Email`}
          accessorKey={`email`}
          control={control}
          errors={errors}
          setValue={setValue}
        />
        <TextField
          header={`Password`}
          accessorKey={`password`}
          control={control}
          errors={errors}
          setValue={setValue}
          type="password"
        />
        <TextField
          header={`Password Confirmation`}
          accessorKey={`password_confirmation`}
          control={control}
          errors={errors}
          setValue={setValue}
          type="password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 4, mb: 2 }}
        >
          {title}
        </Button>
        <Grid container>
          <Grid item xs>
            <>
              <Typography variant="body2">
                {"Already have an account?"}{" "}
                <Link variant="body2" component={RouterLink} to={`/login`}>
                  {"Login"}
                </Link>
              </Typography>
            </>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Register;
