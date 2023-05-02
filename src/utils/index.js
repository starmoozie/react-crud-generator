import axios from "axios";
import { isObject, isArray, reject, isUndefined, capitalize } from "lodash";

/**
 * Convert number to rupiah format
 * @param {Int} number
 * @returns
 */
export const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

/**
 * Remove undefined values from array object
 * @param {ArrayOfObject} array
 * @returns
 */
export const removeUndefinedArray = (array) =>
  array.filter((object) =>
    isArray(object.value)
      ? reject(object.value, isUndefined).length === 2
      : true
  );

/**
 * Handle visible columns table before export
 * @param {Object} columns
 * @returns
 */
export const filterVisibilityColumns = (columns) =>
  Object.entries(columns)
    .filter(([k, v]) => v)
    .map(([k]) => k);

/**
 * Convert camel to snake case
 * @param {String} str
 * @returns String
 */
export const camelToSnakeCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

/**
 * Handle data before export
 * @param {ArrayOfObject} array
 * @param {Array} compareArray
 * @returns Array of object
 */
export const removeArrayObjectContainsArray = (array, compareArray) =>
  array.map((data) =>
    compareArray
      .map((column) => {
        // Indicates column is nested object because contains dot
        const hasDot = column.includes(".");

        // if column contains dot, then call call object from column contains dot
        const value = hasDot
          ? getNestedObjectValue(data, column)
          : data[column];

        // If has dot, get first array after split, mybe, same as table cell header
        const header = hasDot ? camelToSnakeCase(column).split(".")[0] : column;

        // Then replace dashed with space
        const label = header.replace("_", " ");

        return {
          [capitalize(label)]: isArray(value) ? JSON.stringify(value) : value,
        };
      })
      .reduce((acc, key) => ({ ...acc, ...key }), {})
  );

export const findCurrentAccess = (access, property) =>
  access.find((acc) => acc.name.toLowerCase() === property.toLowerCase());

/**
 * Set url before fetching
 * @param {String} path
 * @param {String|Int} id
 * @returns
 */
export const setFetchUrl = (path, id) => {
  const endpoint = id ? `${path}/${id}` : path;

  return `${import.meta.env.VITE_BASE_API_URL}${
    import.meta.env.VITE_ENDPOINT_API
  }${endpoint}`;
};

/**
 * Handle fetching api to backend
 * @param {Object} params
 * @returns
 */
export async function fetchApi(params) {
  const query = params.query
    ? {
        params: params.query,
      }
    : {};

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
    url: params.url,
    method: params.method,
    ...query,
  };

  if (params.body) {
    config.data = JSON.stringify(params.body);
  }

  try {
    const response = await axios.request(config);

    return response.data;
  } catch (error) {
    const err = error.response?.data;
    const message = err?.errors || err?.message || error.message;

    return Promise.reject(
      Array.isArray(message) || isObject(message)
        ? JSON.stringify(message)
        : message
    );
  }
}

/**
 * Handle show error messages after fetching
 * @param {Object} error
 * @param {reactHookForm hooks} setError
 */
export const handleErrorMessage = (error, setError) => {
  const message = error.message;
  let parsed = "";

  try {
    parsed = JSON.parse(message);
  } catch (error) {
    parsed = false;
  }

  // Set error validation message if message is array
  if (parsed) {
    Object.entries(parsed).forEach(([key, value]) => {
      setError(key, {
        type: "server",
        message: value.join(", "),
      });
    });
  } else {
    // Set error validation message if message is string
    setError("nonValidation", {
      type: "server",
      message: message,
    });
  }
};

/**
 * Handle show field error validation messages
 * @param {String} accessorKey
 * @param {String} header
 * @param {Int} index
 * @param {String} parent
 * @param {Object} errors
 * @returns Object
 */
export const handleClientValidationMessage = (
  accessorKey,
  header,
  index,
  parent,
  errors
) => {
  let isError = false;
  let message = "";

  if (parent) {
    const split = accessorKey.split(".");
    const name = split.slice(-1).pop();

    const error = errors[parent]?.[index]?.[name];
    isError = error ? true : false;
    message = error?.message?.replace(accessorKey, header) || "";
  } else {
    isError = !!errors[accessorKey];
    message = isError
      ? errors[accessorKey].message.replace(accessorKey, header)
      : "";
  }

  return {
    isError: isError,
    message: message,
  };
};

/**
 * Handle get object value from key contains dot
 * @param {Object} object
 * @param {String} key
 * @returns Object
 */
export const getNestedObjectValue = (object, key) =>
  key.split(".").reduce((prev, cur) => prev[cur], object);

/**
 * Handle state changes after fetching
 * @param {stateReducer} state
 * @param {actionReducer} action
 */
export const handleAfterFetch = (state, action) => {
  state.changed = Math.random().toString(36).slice(2, 7);
  state.openAlert = true;
  state.alertMessage = action.payload.message;
};
