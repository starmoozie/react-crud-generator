import axios from "axios";
import _, { isObject } from "lodash";

export const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

export const removeUndefinedArray = (array) =>
  array.filter((object) =>
    _.isArray(object.value)
      ? _.reject(object.value, _.isUndefined).length === 2
      : true
  );

export const filterVisibilityColumns = (columns) =>
  Object.entries(columns)
    .filter(([k, v]) => v)
    .map(([k]) => k);

export const removeArrayObjectContainsArray = (array, compareArray) =>
  array.map((data) => {
    const filterData = Object.keys(data)
      .filter((key) => compareArray.includes(key))
      .map((item) => ({ [_.capitalize(item)]: data[item] }))
      .reduce((acc, key) => ({ ...acc, ...key }), {});

    return filterData;
  });

export const findCurrentAccess = (access, property) =>
  access.find((acc) => acc.name.toLowerCase() === property.toLowerCase());

export const setFetchUrl = (path, id) => {
  const endpoint = id ? `${path}/${id}` : path;

  return `${import.meta.env.VITE_BASE_API_URL}${
    import.meta.env.VITE_ENDPOINT_API
  }${endpoint}`;
};

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
    const message = error.response?.data?.message || error.message;

    return Promise.reject(
      Array.isArray(message) || isObject(message)
        ? JSON.stringify(message)
        : message
    );
  }
}

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

export const getNestedObjectValue = (object, key) =>
  key.split(".").reduce((prev, cur) => prev[cur], object);
