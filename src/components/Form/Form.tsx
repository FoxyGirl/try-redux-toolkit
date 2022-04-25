import React, { FC, useState, useRef, useEffect } from 'react';

import { IPost } from '../../models/IPost';
import { FormButtonText, HelpText } from '../../types';

import Input from '../Input';
import Textarea from '../Textarea';

import './Form.css';

interface IForm {
  title: string;
  body: string;
  author: string;
}

interface IErrorState {
  title: string;
  body: string;
}

interface IValidateInfo {
  hasErrors: boolean;
  formData: IForm;
  errors: IErrorState;
  firstErrorEl: HTMLInputElement | HTMLTextAreaElement | null;
}

export const errorMessage = 'Required field';

export const defaultAuthor = 'unkown';
interface IFormProps {
  onFormSubmit: (post: IPost) => void;
  isLoading: boolean;
  isUpdate: boolean;
  post: IPost | null;
}

const defaulterrors = {
  title: '',
  body: '',
};

const Form: FC<IFormProps> = ({ onFormSubmit, isLoading, isUpdate, post }) => {
  const [hasErrors, setHasErrors] = useState<boolean>(false);
  const [errors, setErrors] = useState<IErrorState>({ ...defaulterrors });
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isUpdate) {
      setHasErrors(false);
      setErrors({ ...defaulterrors });
    }
  }, [isUpdate]);

  const clearForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const validateForm = (): IValidateInfo => {
    const target = formRef.current as HTMLFormElement & {
      title: { value: string };
      body: { value: string };
      author: { value: string };
    };

    let firstErrorEl: HTMLInputElement | HTMLTextAreaElement | null = null;

    let validateHasErrors = false;

    const title = target?.title.value.trim() || '';
    const titleError = title.length === 0 ? errorMessage : '';
    if (titleError) {
      firstErrorEl = titleRef.current;
      validateHasErrors = true;
    }

    const body = target.body.value.trim() || '';
    const bodyError = body?.length === 0 ? errorMessage : '';
    if (bodyError) {
      firstErrorEl = firstErrorEl ? firstErrorEl : bodyRef.current;
      validateHasErrors = true;
    }

    const author = target.author.value.trim() || '';

    const formData: IForm = {
      title,
      body,
      author: author ? author : HelpText.DEFAULT_AUTHOR,
    };

    return {
      hasErrors: validateHasErrors,
      formData,
      firstErrorEl,
      errors: {
        title: titleError,
        body: bodyError,
      },
    };
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const { hasErrors: validateHasErrors, formData, firstErrorEl, errors } = validateForm();

    setHasErrors(validateHasErrors);

    if (validateHasErrors) {
      setErrors(errors);
      firstErrorEl?.focus();
      return;
    }

    const newPost = post ? { ...formData, id: post.id } : formData;
    await onFormSubmit({ ...newPost } as IPost);
    clearForm();
  };

  const handleFormOnChange = () => {
    if (hasErrors) {
      const { hasErrors: newHasErrors, errors: newErrors } = validateForm();

      setHasErrors(newHasErrors);
      setErrors(newErrors);
    }
  };

  return (
    <form className="Form" onSubmit={handleSubmit} ref={formRef} onChange={handleFormOnChange}>
      <Input
        label="Title"
        name="title"
        error={errors.title}
        ref={titleRef}
        defaultValue={post?.title}
      />
      <Textarea
        label="Body"
        name="body"
        error={errors.body}
        ref={bodyRef}
        defaultValue={post ? post.body : ''}
      />
      <Input label="Author" name="author" defaultValue={post?.author} />

      <button data-testid="submitForm" disabled={isLoading || hasErrors}>
        {isLoading
          ? `${isUpdate ? FormButtonText.UPDATING_POST : FormButtonText.CREATING_POST}`
          : `${isUpdate ? FormButtonText.UPDATE_POST : FormButtonText.ADD_POST}`}
      </button>
    </form>
  );
};

export default Form;
