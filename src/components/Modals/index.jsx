import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import loadable from "@loadable/component";

const Modal = ({
  details,
  createFields,
  editFields,
  createValidation,
  editValidation,
}) => {
  const modal = useSelector((state) => state.modalReducer);

  return (
    <>
      {modal.showModal && (
        <Dialog open={modal.showModal} fullWidth maxWidth={modal.size}>
          <DialogTitle>{modal.action}</DialogTitle>
          <ModalType
            type={modal.type}
            details={details}
            createFields={createFields}
            editFields={editFields}
            createValidation={createValidation}
            editValidation={editValidation}
            row={modal.row}
            action={modal.action}
            access={modal.access}
          />
        </Dialog>
      )}
    </>
  );
};

const ModalType = ({
  type,
  details,
  createFields,
  editFields,
  createValidation,
  editValidation,
  row,
  action,
  access,
}) => {
  const ModalComponent = loadable(async () => await import(`./${type}`));

  return (
    <ModalComponent
      action={action}
      row={row.original}
      fields={row ? editFields : createFields}
      validation={row ? editValidation : createValidation}
      columns={details}
      access={access}
    />
  );
};

export default Modal;
