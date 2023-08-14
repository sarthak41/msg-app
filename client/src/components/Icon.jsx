import PropTypes from "prop-types";

export default function Icon({ src, alt, onClick }) {
  return (
    <button className="flex justify-center align-center icon">
      <img src={src} alt={alt} onClick={onClick} />
    </button>
  );
}

Icon.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};
