import { Link } from "react-router-dom";

export default function ErrorElement() {
  return (
    <>
      <p>Something Went Wrong</p>
      <Link to={"/"}>Go Back</Link>
    </>
  );
}
