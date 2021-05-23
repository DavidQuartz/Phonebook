import PropTypes from "prop-types";

// To show loading button
const LoadingButton = ({ className }) => {
  return (
    <button className={className} type="button" disabled>
      <span
        className="spinner-border spinner-border-lg"
        role="status"
        aria-hidden="true"
      />
    </button>
  );
};

LoadingButton.propTypes = {
  className: PropTypes.string.isRequired,
};

export default LoadingButton;
