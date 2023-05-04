import Link from "@mui/material/Link";

const ExternalLinkColumn = ({ href, value, target }) => {
  return (
    <Link href={href} underline="none" target={target || "_self"}>
      {value}
    </Link>
  );
};

export default ExternalLinkColumn;
