import React from 'react';

const GenericLogo = ({ src, alt = 'Logo', ...props }) => (
    <img
        src={src}
        alt={alt}
        style={{ width: '8rem', height: 'auto', objectFit: 'contain' }}
        {...props}
    />
);

export default GenericLogo;