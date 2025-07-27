import React from 'react';
import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type = 'primary', onClick }) {

    const base =
        'bg-yellow-400 text-sm uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';

    const styles = {
        primary: `${base} px-4 py-4 md:px-6 sm:py-4`,
        small: `${base} px-4 py-2 md:px-5 md:py-2.5 text-xs`,
        secondary: `border-2 text-sm border-stone-300 uppercase font-semibold text-stone-800 
        inline-block tracking-wide rounded-full hover:bg-stone-300 
        hover:text-stone-800  focus:text-stone-800 transition-colors
        duration-300 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 
        disabled:cursor-not-allowed px-4 py-2.5 md:px-6 sm:py-3.5`
    };

    const styleClass = styles[type] || styles.primary;

    if (to) {
        return <Link to={to} className={styleClass}>{children}</Link>;
    }

    if (onClick) {
        return (
            <button onClick={onClick} disabled={disabled} className={styleClass}>
                {children}
            </button>
        );
    }

    return (
        <button disabled={disabled} className={styleClass}>
            {children}
        </button>
    );
}

export default Button;
