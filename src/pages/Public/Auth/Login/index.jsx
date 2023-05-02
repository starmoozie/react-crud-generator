import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Link as RouterLink } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useAuth } from "@hook";
import { validation } from "./validation";
import TextField from "@field/Text";
import { processingData } from "@reducer/operationReducer";
import { setFetchUrl, handleErrorMessage } from "@util";
import { useDispatch } from "react-redux";
import { setOpenLoading, setCloseLoading } from "@reducer/operationReducer";
import Alert from "@component/Alerts/Alert";

const Login = (props) => {
  const { path } = props;
  const dispatch = useDispatch();
  const { login } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    resolver: yupResolver(validation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const from = path;
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
      {errors.nonValidation ? (
        <Alert message={errors.nonValidation.message} />
      ) : (
        <></>
      )}
      <Typography
        component="h1"
        variant="h5"
        sx={{ textTransform: "capitalize" }}
        align={"center"}
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
          header={`Email Address`}
          accessorKey={`email`}
          control={control}
          errors={errors}
          setValue={setValue}
          autoFocus
        />
        <TextField
          header={`Password`}
          accessorKey={`password`}
          control={control}
          errors={errors}
          setValue={setValue}
          type="password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          sx={{ marginTop: 2 }}
        />
        <Button
          //   disabled={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {title}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link variant="body2" component={RouterLink} to={`/register`}>
              {"Don't have an account? Register"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
