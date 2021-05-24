import PropTypes from "prop-types";

// error alert component
const ShowError = ({ error }) => {
  return (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
};

ShowError.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ShowError;
