import './Flag.module.css';

const Flag = ({ emoji, countryCode }) => {
    console.log("flag is called")
    // Determine flag code
    let code = '';

    if (emoji && emoji.length >= 2) {
        // Convert emoji to country code
        const codePoints = [...emoji].map(c => c.codePointAt(0) - 127397);
        code = String.fromCharCode(...codePoints).toLowerCase();
    } else if (countryCode && countryCode.length === 2) {
        code = countryCode.toLowerCase();
    } else {
        return null; // Invalid input
    }

    const url = `https://flagcdn.com/w80/${code}.png`;
    console.log(url)
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
