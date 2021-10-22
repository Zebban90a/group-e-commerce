import React from 'react';

export default function DynamicForm(props) {
  const {
    submitHandler, onChangeHandler, imageHandler, formInput, requirements
  } = props;
  console.log('data below');
  console.log(formInput);
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
        value={value || ''}
        onChange={onChangeHandler}
        required={required}
        key={key}
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

  function renderImageBrowser(key, required) {
    return (
      <input
        type="file"
        name="image"
        onChange={imageHandler}
        id="images"
        required={required}
        key={key}
      />
    )
  }

  function renderField(name, required, type, key, value = null) {
    switch (name) {
      case 'description':
        return renderTextArea(name, value, type, required, key);
      case 'image':
        return renderImageBrowser(key, required);
      case 'category':
        return renderSelect(name, value, required, key);
      default:
        return renderInput(name, value, type, required, key);
    }
  }

  return (
    <form onSubmit={submitHandler} encType="multipart/form-data">
      {
        requirements.map((item, index) => {
          const { name, prompt, regexRule, required, type } = item;
          const value = formInput ? formInput[name] : null;
          const labelKey = 'label'+index;
          const fieldKey = 'input'+index;

          return (
            <React.Fragment key={'fragment'+index}>
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
