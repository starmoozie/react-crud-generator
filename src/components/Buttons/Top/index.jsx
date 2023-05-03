import Import from "../Import";
import Export from "../Export";

const buttons = {
  Import: Import,
  Export: Export,
};

const TopButton = ({ row, visibilityColumns, permission }) => {
  return (
    <>
      {permission?.map((button) => {
        const Button = buttons[button.name];

        return (
          <Button
            inputProps={button.inputProps}
            key={button.name.toLowerCase()}
            visibilityColumns={visibilityColumns}
            row={row}
          />
        );
      })}
    </>
  );
};

export default TopButton;
