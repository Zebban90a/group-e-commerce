import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components'

const StyledInput = styled.input`
  border: transparent;
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
    -webkit-appearance: none; //Chrome, Safari, Edge, Opera
    margin: 0;
  }
  -moz-appearance: textfield; //Firefox
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
  const { submitHandler, imageHandler, formFormat, defaultRequired } = props;
  const { formData, setFormData } = useContext(UserContext)
  const [alert, setAlert] = useState({});

  function onChangeHandler(e) {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormData({...formData,[inputName]: inputValue,});
  }

  /* 
  hide arrows input type number https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp
  */

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function renderLabel(name, key, required) {
    return (
      <StyledLabel htmlFor={name} key={key}>
        {capitalizeFirstLetter(name)}{required ? '*' : ''}:
      </StyledLabel>
    )
  }

  function renderInput(name, value, type, key, isMultiLine) {
    return (
      <StyledInput
        type={type}
        name={name}
        id={name}
        key={key}
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
          if(type === "number") {
            blockInvalidChar(e)
          }
        }}
      />
    )
  }

  function renderTextArea(name, value, type, key) {
    return (
      <textarea
        onChange={onChangeHandler}
        value={value || ''}
        rows="4"
        cols="50"
        type={type}
        name={name}
        id={name}
        key={key}
      />
    )
  }

  function renderSelect(name, value, key) { //TODO make options param
    return (
      <select
        name={name}
        id={name}
        value={value || ''}
        onChange={onChangeHandler}
        key={key}
      >
        <option disabled value="">Select an option</option>
        <option value="Samsung">Samsung</option>
        <option value="Apple">Apple</option>
      </select>
    )
  }

  function renderField(name, type, key, value = null) {
    switch (name) {
      case 'description':
        return renderTextArea(name, value, type, key);
      case 'category':
        return renderSelect(name, value, key);
      default:
        return renderInput(name, value, type, key);
    }
  }
  
  const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
  
/*   const regexNumber = /[^0-9]/g;
  const inputTest = 's123';
  console.log(regexNumber.exec(inputTest)); */

  const preSubmit = (e) => {
    e.preventDefault()
    console.log(e);
    //TODO change element type based on type?
    //TODO check required and regex (EVEN IF not required)
    /*
    onchange / validate but only show red when existing field and green when correcting
    submit / validate each field, red on incorrect fields, green when correcting
    */
    //submitHandler()
  }

  const validateFields = () => { //regular function maybe?
    // how to not run unnessesary tests, use states?
    // only check which fields are not filled but required?

    /* 
    validFields setValidfields
    
    */

  }

  const isValid = (e) => { //Use for one field
    const inputName = e.target.name;
    const inputValue = e.target.value;

    
  }

  return (
    <form onSubmit={preSubmit} encType="multipart/form-data">
      {
        formFormat.map((item, index) => {
          let { name, prompt, regexRule, required, type } = item;

          prompt = prompt !== undefined
            ? prompt
            : '';
          /* required = defaultRequired !== undefined
            ? defaultRequired
            : required; */
          
          const value = formData[name];
          const labelKey = 'label'+index;
          const fieldKey = 'input'+index;
          const fragmentKey = 'fragment'+index;
          
          return (
            <React.Fragment key={fragmentKey}>
              {renderLabel(name, labelKey, required)}
              {renderField(name, type, fieldKey, value, regexRule)}
              <br />
              <WarningText>{alert[name] && prompt}</WarningText>
            </React.Fragment>
          )
        })
      }
      <button type="submit">Submit</button>
    </form>
  );
}
