import axios from "axios";
import _ from "lodash";

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

export const setFetchUrl = (path, method, id) => {
  const endpoint = method.toLowerCase() === "post" ? path : `${path}/${id}`;

  return `${import.meta.env.VITE_BASE_API_URL}${
    import.meta.env.VITE_ENDPOINT_API
  }${endpoint}`;
};

export const defaultFetch = async (
  location,
  columnFilters,
  pageIndex,
  pageSize,
  sorting
) => {
  const path = `${import.meta.env.VITE_ENDPOINT_API}${location}`;
  const filtereData = removeUndefinedArray(columnFilters);

  const fetchURL = new URL(path, import.meta.env.VITE_BASE_API_URL);

  fetchURL.searchParams.set("page", `${pageIndex + 1}`);
  fetchURL.searchParams.set("per_page", `${pageSize}`);
  fetchURL.searchParams.set("filters", JSON.stringify(filtereData));
  fetchURL.searchParams.set("sort", JSON.stringify(sorting));

  const response = await fetch(fetchURL.href);
  const json = await response.json();

  return json;
};

export async function fetchApi(params) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
    url: params.url,
    method: params.method,
  };

  if (params.body) {
    config.data = JSON.stringify(params.body);
  }

  try {
    const response = await axios.request(config);

    return response.data;
  } catch (error) {
    const message = error.response.data.message;
    return Promise.reject(
      Array.isArray(message) ? JSON.stringify(message) : message
    );
  }
}

export const handleErrorMessage = (error, setError) => {
  const message = error.message;
  const isArray = Array.isArray(message);

  // Set error validation message if message is array
  if (isArray) {
    Object.entries(message).forEach(([key, value]) => {
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
