import PropTypes from 'prop-types';
import React from 'react';
import '../style/feature.css';

function Feature({ icon, altText, title, content }) {
  return (
    <div className="feature-item">
      <img src={icon} alt={altText} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{content}</p>
    </div>
  );
}

export default Feature;

Feature.propTypes = {
  icon: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
