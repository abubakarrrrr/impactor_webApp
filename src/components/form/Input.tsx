import React from 'react';

const Input = ({ name, type, placeholder, icon, register, min, max }) => {
  return (
    <div className="relative">
      <input
        {...register} 
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        min={min}
        max={max}
        className="rounded h-10 w-full focus:shadow-outline border border-gray-100 focus:border-primary pl-14 shadow-md focus:outline-none"
      />
      <img src={icon} alt="Icon" className="absolute top-3 left-3" />
    </div>
  );
};

export default Input;