import { forwardRef } from 'react';

type InputProps = {
  name: string;
  label: string;
  error?: string;
  defaultValue?: string;
};

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>((props, ref) => {
  const { label, name, error, defaultValue } = props;

  return (
    <label className="Label">
      <span>{`${label}:`}</span>
      <input
        type="text"
        name={name}
        ref={ref}
        className={error ? 'Input-wrong' : ''}
        defaultValue={defaultValue}
      />
      {!!error && <div className="Error">{error}</div>}
    </label>
  );
});

export default Input;
