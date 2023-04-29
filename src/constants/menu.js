export const AUTH_MENU = [
  {
    id: 1,
    name: "login",
    path: "/login",
    permission: [],
    children: [],
  },
  {
    id: 2,
    name: "register",
    path: "/register",
    permission: [],
    children: [],
  },
];

export const DASHBOARD_MENU = [
  {
    id: 3,
    name: "Dashboard",
    path: "/",
    permission: [],
    children: [],
  },
];

export const PRIVATE_MENU = [
  {
    id: 6,
    name: "Supplier",
    path: "/suppliers",
    permission: [
      {
        position: "top-left",
        access: [
          {
            name: "create",
            method: "post",
          },
        ],
      },
      {
        position: "top-right",
        access: [
          {
            name: "Export",
          },
          // {
          //   name: "Import",
          // },
        ],
      },
      {
        position: "line",
        access: [
          {
            name: "Detail",
            modalType: "DefaultModal",
            method: null,
          },
          {
            name: "Edit",
            modalType: "FormModal",
            method: "put",
          },
          {
            name: "Delete",
            modalType: "ConfirmModal",
            method: "delete",
          },
        ],
      },
    ],
    children: [],
  },
  {
    id: 4,
    name: "Customer",
    path: "/customers",
    permission: [
      {
        position: "top-left",
        access: [
          {
            name: "create",
            method: "post",
          },
        ],
      },
      {
        position: "top-right",
        access: [
          {
            name: "Export",
          },
          // {
          //   name: "Import",
          // },
        ],
      },
      {
        position: "line",
        access: [
          {
            name: "Detail",
            modalType: "DefaultModal",
            method: null,
          },
          {
            name: "Edit",
            modalType: "FormModal",
            method: "put",
          },
          {
            name: "Delete",
            modalType: "ConfirmModal",
            method: "delete",
          },
        ],
      },
    ],
    children: [],
  },
  {
    id: 7,
    name: "Product Category",
    path: "/product-categories",
    permission: [
      {
        position: "top-left",
        access: [
          {
            name: "create",
            method: "post",
          },
        ],
      },
      {
        position: "top-right",
        access: [
          {
            name: "Export",
          },
          // {
          //   name: "Import",
          // },
        ],
      },
      {
        position: "line",
        access: [
          {
            name: "Detail",
            modalType: "DefaultModal",
            method: null,
          },
          {
            name: "Edit",
            modalType: "FormModal",
            method: "put",
          },
          {
            name: "Delete",
            modalType: "ConfirmModal",
            method: "delete",
          },
        ],
      },
    ],
    children: [],
  },
  {
    id: 5,
    name: "Sale",
    path: "/sales",
    permission: [
      {
        position: "top-left",
        access: [
          {
            name: "create",
            method: "post",
          },
        ],
      },
      {
        position: "top-right",
        access: [
          {
            name: "Export",
          },
          // {
          //   name: "Import",
          // },
        ],
      },
      {
        position: "line",
        access: [
          {
            name: "Detail",
            modalType: "DefaultModal",
          },
          {
            name: "Edit",
            modalType: "FormModal",
            method: "put",
          },
          {
            name: "Delete",
            modalType: "ConfirmModal",
            method: "delete",
          },
        ],
      },
    ],
    children: [],
  },
];
