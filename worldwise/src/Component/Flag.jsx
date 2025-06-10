// Flag.js

import './Flag.module.css';


const Flag = ({ emoji }) => {
    if (!emoji || emoji.length < 2) return null; // Guard clause

    const codePoints = [...emoji].map(c => c.codePointAt(0) - 127397);
    const code = String.fromCharCode(...codePoints).toLowerCase();
    const url = `https://flagcdn.com/w80/${code}.png`;

    return (
        <img
            src={url}
            alt={`${code.toUpperCase()} Flag`}
            className="flag-img"
            style={{ width: '25px' }}
        />
    );
};

export default Flag;
