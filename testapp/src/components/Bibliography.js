import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type checking

const Bibliography = ({ references }) => {
  return (
    <div className="bibliography">
      <h2>Bibliography</h2>
      <ul>
        {references.map((reference, index) => (
          <li key={index}>
            {reference.author}. ({reference.year}).{' '}
            <a href={reference.link} target="_blank" rel="noopener noreferrer">
              {reference.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Define propTypes for type checking
Bibliography.propTypes = {
  references: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Bibliography;
