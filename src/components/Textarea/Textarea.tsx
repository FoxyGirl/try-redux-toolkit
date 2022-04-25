import { forwardRef } from 'react';

type TextareaProps = {
  name: string;
  label: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  defaultValue?: string;
};

type Ref = HTMLTextAreaElement;

const Textarea = forwardRef<Ref, TextareaProps>((props, ref) => {
  const { label, name, error, defaultValue } = props;

  return (
    <label className="Label">
      <span>{`${label}:`}</span>
      <textarea
        name={name}
        ref={ref}
        className={error ? 'Textarea-wrong' : ''}
        defaultValue={defaultValue}
      />
      {!!error && <div className="Error">{error}</div>}
    </label>
  );
});

export default Textarea;
