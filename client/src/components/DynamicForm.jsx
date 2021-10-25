import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components'

const StyledInput = styled.input`
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  border-color: ${props => props.warning ? "red" : "#979797"};
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
`

const StyledTextArea = styled.textarea`
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  border-color: ${props => props.warning ? "red" : "#979797"};
  padding: 4px;
  margin: 1px;
  &:focus {
    margin: 0px;
    outline: none;
    border-width: 2px;
  }
`

const WarningText = styled.div`
    font-size: 0.8em;
    color: red;
    height: 16px;
`

const StyledLabel = styled.label`
  display: block;
`

export default function DynamicForm(props) {
  const { submitHandler, imageHandler, formFormat } = props;
  const { formData, setFormData } = useContext(UserContext)
  const [alert, setAlert] = useState({});

  function onChangeHandler(e) {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    
    setFormData({...formData,[inputName]: inputValue,});
    setAlert({...alert, [inputName] : !isValid(inputName, inputValue)})
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function renderLabel(data) {
    const { name, labelKey, required } = data
    return (
      <StyledLabel htmlFor={name} key={labelKey}>
        {capitalizeFirstLetter(name)}{required ? '*' : ''}:
      </StyledLabel>
    )
  }

  function renderInput(data) {
    const { name, value, type, fieldKey } = data;
    return (
      <StyledInput
        name={name}
        name={name}
        id={name}
        key={fieldKey}
        type={type}
        value={
          type === 'file'
          ? undefined
          : value || ''
        }
        onChange={
          type === 'file'
          ? imageHandler
          : onChangeHandler
        }
        onKeyDown={(e) => {
          if (type === "number") {
            blockInvalidNumberInput(e)
          }
        }}
        warning={alert[name]}
      />
    )
  }

  function renderTextArea(data) {
    const { name, value, type, fieldKey } = data;
    return (
      <StyledTextArea
        name={name}
        value={value || ''}
        name={name}
        id={name}
        key={fieldKey}
        onChange={onChangeHandler}
        rows="4"
        cols="50"
        warning={alert[name]}
      />
    )
  }

  function renderSelect(data) {
    const { name, value, fieldKey } = data;
    
    return (
      <select //TODO make options param?
        name={name}
        id={name}
        value={value || ''}
        onChange={onChangeHandler}
        key={fieldKey}
      >
        <option disabled value="">Select an option</option>
        <option value="Samsung">Samsung</option>
        <option value="Apple">Apple</option>
      </select>
    )
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
  
  const blockInvalidNumberInput = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
  
  function preSubmit(e, submitHandler) {
    e.preventDefault();
    validateFields(e)
    //submitHandler(e);
  }
  console.log(!!/^.{1,}$/.exec(undefined));
  const validateFields = (e) => {

    for (const field in formFormat) {
      const value = formData[field];
      console.log(field, value);
      setAlert({...alert, [field] : !isValid(field, value)})
    }
    
  }
  
  useEffect(() => {
    console.log(alert);
  }, [alert])

  const isValid = (name, value) => {
    const { regexRule, required } = formFormat[name];
    //const isEmpty = (required && !value);
    //console.log(name, (!isEmpty && !!regexRule.exec(value)));
    return !!regexRule.exec(value);
  }
  //!FIXME NUMBER REGEX DOES NOT REACT ON EMPTY FIELDS!
  return (
    <form onSubmit={(e)=> { preSubmit(e, submitHandler) }} encType="multipart/form-data">
      {
        Object.values(formFormat).map((item, index) => {
          const name = Object.keys(formFormat)[index]
          let { required, regexRule, type, prompt } = item;

          prompt = prompt !== undefined
            ? prompt
            : '';
          
          const value = formData[name];
          const labelKey = 'label'+index;
          const fieldKey = 'input'+index;
          const fragmentKey = 'fragment'+index;
          
          return (
            <React.Fragment key={fragmentKey}>
              {renderLabel({name, labelKey, required})}
              {renderField({name, type, fieldKey, value, regexRule})}
              <br />
              <WarningText>{alert[name] && (prompt || 'Invalid value')}</WarningText>
            </React.Fragment>
          )
        })
      }
      <button type="submit">Submit</button>
    </form>
  );
}
