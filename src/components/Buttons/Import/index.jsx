import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import { Import as Icon } from "@icon";
import { UPLOAD as title } from "@constant";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenLoading, setCloseLoading } from "@reducer/operationReducer";
import { useLocation } from "react-router-dom";
import { processingData } from "@reducer/operationReducer";
import { setFetchUrl, handleErrorMessage } from "@util";

const Import = ({ inputProps }) => {
  const inputFile = useRef();
  const loading = useSelector((state) => state.operationReducer.loading);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleClick = () => {
    inputFile.current.click();
  };

  const handleChange = async (event) => {
    const file = event.target.files;

    if (file.length) {
      // Open loading
      dispatch(setOpenLoading());

      const formData = new FormData();
      formData.append("file", file);

      try {
        // Dispatching fetch api request
        await dispatch(
          processingData({
            body: formData,
            url: setFetchUrl(`${location.pathname}/import`),
            method: "POST",
          })
        ).unwrap();
      } catch (error) {
        // Handling error message
        alert(error.message);
      }
      // Close loading if finished
      dispatch(setCloseLoading());
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
        {...inputProps}
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
