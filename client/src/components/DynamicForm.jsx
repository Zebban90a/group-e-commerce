import React from 'react';

export default function ProductForm(props) {
  const {
    submitHandler, onChangeHandler, imageHandler, data,
  } = props;
  
  /* 
  hide arrows input type number https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp
  */

  const productForm = {
    title: {
      required: true,
      regexRule: null,
      type: 'text',
      prompt: null
    },
    description: {
      required: true,
      regexRule: null,
      type: 'text',
      prompt: null
    },
    price: {
      required: true,
      regexRule: null,
      type: 'number',
      prompt: null
    },
    category: {
      required: true,
      regexRule: null,
      type: 'text',
      prompt: null
    },
    quantity: {
      required: true,
      regexRule: null,
      type: 'number',
      prompt: null
    },
    manufacturer: {
      required: true,
      regexRule: null,
      type: 'text',
      prompt: null
    },
    weight: {
      required: true,
      regexRule: null,
      type: 'number',
      prompt: null
    }
  }

  const {
    title,
    description,
    price,
    category,
    quantity,
    manufacturer,
    weight
  } = data || {};

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function renderLabel(key) {
    <label htmlFor={key}>{capitalizeFirstLetter(key)}: </label>
  }

  function renderInput(key, value, type, required) { //TODO make required param
    return (
      <input
        type={type}
        name={key}
        id={key}
        value={value || ''}
        onChange={onChangeHandler}
        required={required}
      />
    )
  }

  function renderTextArea(key, value, type, required) { //TODO make required param
    return (
      <textarea
        onChange={onChangeHandler}
        value={value || ''}
        rows="4"
        cols="50"
        type={type}
        name={key}
        id={key}
        required={required}
      />
    )
  }

  function renderSelect(key, value, required) { //TODO make options param
    return (
      <select
        name={key}
        id={key}
        value={value || ''}
        required={required}
      >
        <option disabled value="">Select an option</option>
        <option value="Samsung">Samsung</option>
        <option value="Apple">Apple</option>
      </select>
    )
  }

  function renderImageBrowser() {
    return (
      <>
        //* {data && <image src={data.image} />} //TODO make preview for existing or selected image
        <input
          type="file"
          name="image"
          onChange={imageHandler}
          id="images"
          required
        />
      </>
    )
  }

  function renderField(key, required, type) {
    switch (key) {
      case description:
        return renderTextArea(key, required, type);
      case image:
        return renderImageBrowser();
      case category:
        return renderSelect();
      default:
        return renderInput(key, required, type);
    }
  }

  return (
    <form onSubmit={submitHandler} encType="multipart/form-data">
      (
        
      )
      <button type="submit">Submit</button>
    </form>
  );
}
