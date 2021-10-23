import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function DynamicForm(props) {
  const { submitHandler, imageHandler, formFormat, defaultRequired } = props;
  const { formData, setFormData } = useContext(UserContext)
  
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

  function renderLabel(name, key) {
    return (
      <label htmlFor={name} key={key}>
        {capitalizeFirstLetter(name)}:
      </label>
    )
  }

  function renderInput(name, value, type, required, key) {
    return (
      <input
        type={type}
        name={name}
        id={name}
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
        required={required}
        key={key}
        onKeyDown={(e) => {
          if(type === "number") {
            blockInvalidChar(e)
          }
        }}
      />
    )
  }

  function renderTextArea(name, value, type, required, key) {
    return (
      <textarea
        onChange={onChangeHandler}
        value={value || ''}
        rows="4"
        cols="50"
        type={type}
        name={name}
        id={name}
        required={required}
        key={key}
      />
    )
  }

  function renderSelect(name, value, required, key) { //TODO make options param
    return (
      <select
        name={name}
        id={name}
        value={value || ''}
        required={required}
        onChange={onChangeHandler}
        key={key}
      >
        <option disabled value="">Select an option</option>
        <option value="Samsung">Samsung</option>
        <option value="Apple">Apple</option>
      </select>
    )
  }

  function renderField(name, required, type, key, value = null) {
    switch (name) {
      case 'description':
        return renderTextArea(name, value, type, required, key);
      case 'category':
        return renderSelect(name, value, required, key);
      default:
        return renderInput(name, value, type, required, key);
    }
  }

  const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

  return (
    <form onSubmit={submitHandler} encType="multipart/form-data">
      {
        formFormat.map((item, index) => {
          let { name, prompt, regexRule, required, type } = item;
          required = defaultRequired !== undefined
            ? defaultRequired
            : required;
          const value = formData[name];
          const labelKey = 'label'+index;
          const fieldKey = 'input'+index;
          const fragmentKey = 'fragment'+index;
          
          return (
            <React.Fragment key={fragmentKey}>
              {renderLabel(name, labelKey)}
              {renderField(name, required, type, fieldKey, value)}
              <br />
            </React.Fragment>
          )
        })
      }
      <button type="submit">Submit</button>
    </form>
  );
}
