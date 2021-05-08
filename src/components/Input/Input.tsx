import React from 'react';
import classNames from 'classnames';
import './input.scss';

interface inputOwnProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width: string;
  placeholder: string;
}

const Input = (props: inputOwnProps) => {
  const { value, onChange, width, placeholder } = props;

  return (
    <input
      className="input-main"
      value={value}
      onChange={onChange}
      style={{ width: width }}
      placeholder={placeholder}
    />
  );
};

export default Input;
