import React from 'react';

const SelectInput = ({ id, name, value, className, onChange, children, required }) => {
    return (
        <select
            id={id}
            name={name}
            value={value}
            className={className}
            onChange={onChange}
            required={required}
        >
            {children}
        </select>
    );
};

export default SelectInput;