import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import { Import as Icon } from "@icon";
import { UPLOAD as title } from "@constant";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenLoading, setCloseLoading } from "@reducer/operationReducer";

const Import = () => {
  const inputFile = useRef();
  const loading = useSelector((state) => state.operationReducer.loading);
  const dispatch = useDispatch();

  const handleClick = () => {
    inputFile.current.click();
  };

  const handleChange = async (event) => {
    const file = event.target.files;

    if (file.length) {
      dispatch(setOpenLoading());
      setTimeout(() => {
        console.log(file);
        dispatch(setCloseLoading());
      }, 5000);
      // const formData = new FormData();
      // formData.append("file", file);
      // axios
      //   .request({
      //     headers: { Authorization: `Bearer ${cookies.token}` },
      //     method: "POST",
      //     url: "http://localhost:8000/api/v1/customers-upload/",
      //     data: formData,
      //     onUploadProgress: (e) => handleUploadProgress(e, file.name),
      //   })
      //   .then((e) => {});
    }
  };

  return (
    <>
      <Tooltip arrow title={title}>
        <IconButton onClick={handleClick} disabled={loading}>
          <Icon />
        </IconButton>
      </Tooltip>
      <input
        name="file"
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={(e) => handleChange(e)}
      />
    </>
  );
};

export default Import;
