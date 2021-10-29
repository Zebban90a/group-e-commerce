/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';

const StyledInput = styled.input`
  width: 60%;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  border-color: ${(props) => (props.warning ? 'red' : '#979797')};
  padding: 4px;
  margin: 1px;
  &:focus {
    margin: 0px;
    outline: none;
    border-width: 2px;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

const StyledTextArea = styled.textarea`
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  border-color: ${(props) => (props.warning ? 'red' : '#979797')};
  padding: 4px;
  margin: 1px;
  &:focus {
    margin: 0px;
    outline: none;
    border-width: 2px;
  }
`;

const WarningText = styled.div`
    font-size: 0.8em;
    color: red;
    height: 16px;
`;

const MainWarningText = styled.div`
    color: red;
    height: 16px;
`;

const StyledLabel = styled.label`
  display: block;
`;

export default function DynamicForm(props) {
  const { submitHandler, formFormat } = props;
  const { formData, setFormData, setFormImage } = useContext(UserContext);

  const [validFields, setValidFields] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const isValid = (name, value) => {
    const { regexRule, required } = formFormat[name];

    if (required && !value) {
      return false;
    }
    if (regexRule && !regexRule.exec(value)) {
      return false;
    }
    return true;
  };

  function formIsValid() {
    let output = true;

    for (const name in formFormat) {
      const value = formData[name];
      const fieldStatus = isValid(name, value);
      setValidFields((prevFields) => ({ ...prevFields, [name]: fieldStatus }));

      if (!fieldStatus) output = false;
    }
    return output;
  }

  const blockInvalidNumberInput = (e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

  function onChangeHandler(e) {
    const { name } = e.target;
    let value = '';
    const { type } = formFormat[name];

    if (type === 'file') {
      // eslint-disable-next-line prefer-destructuring
      value = e.target.files[0];
      setFormImage({ file: value });
    } else {
      value = e.target.value;
    }
    setFormData({ ...formData, [name]: value });
    setValidFields({ ...validFields, [name]: isValid(name, value) });
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function renderLabel(data) {
    const { name, labelKey, required } = data;
    return (
      <StyledLabel htmlFor={name} key={labelKey}>
        {capitalizeFirstLetter(name)}
        {required ? '*' : ''}
        :
      </StyledLabel>
    );
  }

  function renderInput(data) {
    const {
      name, value, type, fieldKey,
    } = data;
    return (
      <StyledInput
        name={name}
        id={name}
        key={fieldKey}
        type={type}
        value={
          type === 'file'
            ? undefined
            : value || ''
        }
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onChangeHandler}
        onKeyDown={(e) => {
          if (type === 'number') {
            blockInvalidNumberInput(e);
          }
        }}
        warning={
          (validFields[name] === false) && showAlert
        }
      />
    );
  }

  function renderTextArea(data) {
    const { name, value, fieldKey } = data;
    return (
      <StyledTextArea
        name={name}
        value={value || ''}
        id={name}
        key={fieldKey}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onChangeHandler}
        rows="4"
        cols="50"
        warning={
          validFields[name] === false && showAlert
        }
      />
    );
  }

  function renderSelect(data) {
    const { name, value, fieldKey } = data;

    return (
      <select
        name={name}
        id={name}
        value={value || ''}
        onChange={onChangeHandler}
        key={fieldKey}
      >
        <option disabled value="">Select an option</option>
        <option value="samsung">Samsung</option>
        <option value="apple">Apple</option>
      </select>
    );
  }

  function renderField(data) {
    const { name } = data;

    switch (name) {
      case 'description':
        return renderTextArea(data);
      case 'category':
        return renderSelect(data);
      default:
        return renderInput(data);
    }
  }

  function preSubmit(e) {
    e.preventDefault();
    if (formIsValid()) {
      submitHandler(e);
    } else {
      setShowAlert(true);
    }
  }

  return (
    <form
      onSubmit={(e) => { preSubmit(e, submitHandler); }}
      encType="multipart/form-data"
    >
      {
        Object.values(formFormat).map((item, index) => {
          const name = Object.keys(formFormat)[index];
          const {
            required, regexRule, type,
          } = item;
          let { prompt } = item;

          prompt = prompt !== undefined
            ? prompt
            : '';

          const value = formData[name];
          const labelKey = `label${index}`;
          const fieldKey = `input${index}`;
          const fragmentKey = `fragment${index}`;

          return (
            <React.Fragment key={fragmentKey}>
              {renderLabel({ name, labelKey, required })}
              {renderField({
                name, type, fieldKey, value, regexRule,
              })}
              <br />
              <WarningText>
                {
                  ((validFields[name] === false) && showAlert)
                  && (prompt || 'Invalid input')
                }
              </WarningText>
            </React.Fragment>
          );
        })
      }
      <button type="submit">Submit</button>
      <MainWarningText>
        {showAlert && 'Please check the highlighted fields'}
      </MainWarningText>
    </form>
  );
}
