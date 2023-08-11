import PropTypes from "prop-types";

export default function Icon({src, alt}) {
  return (
    <button className="flex justify-center align-center icon">
        <img src={src} alt={alt} />
    </button>
  );
}

Icon.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
};
