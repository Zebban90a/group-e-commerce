import React from 'react';

export default function ProductForm(props) {
  const {submitHandler, onChangeHandler, imageHandler, formInput} = props;
  const data = formInput || {};

  return (
    <form onSubmit={submitHandler} encType="multipart/form-data">
      <label htmlFor="title">title: </label>
      <input onChange={onChangeHandler} type="text" name="title" id="title" value={data.title || ''} required />
      <label htmlFor="description">description: </label>
      <textarea onChange={onChangeHandler} rows='4' cols='50' type="text" name="description" id="description" value={data.description || ''} required />
      <label htmlFor="price">price: </label>
      <input onChange={onChangeHandler} type="number" name="price" id="price" value={data.price || 0} required />
      <label htmlFor="category">category: </label>
      <select onChange={onChangeHandler} id="category" name="category" required defaultValue="-- select an option --" selected="-- select an option --">
        <option disabled selected value="-- select an option --">-- select an option --  </option>
        <option value="Samsung">Samsung</option>
        <option value="Apple">Apple</option>
      </select>
      {/* <input onChange={onChangeHandler} type="text" name="category" id="category" value={data.category || ''} />  required*/}
      <label htmlFor="quantity">quantity: </label>
      <input onChange={onChangeHandler} type="number" name="quantity" id="quantity" value={data.quantity || ''} required />
      <label htmlFor="manufacturer">manufacturer: </label>
      <input onChange={onChangeHandler} type="text" name="manufacturer" id="manufacturer" value={data.manufacturer || ''} required />
      <label htmlFor="weight">weight: </label>
      <input
        onChange={onChangeHandler}
        type="number"
        name="weight"
        id="weight"
        value={data.weight || ''}
        required
      />
      <label htmlFor="images">image: </label>
      {/* {data && <image src={data.image} />} */}
      <input type="file" name="image" onChange={imageHandler} id="images" required/>
      <button type="submit">Submit</button>
    </form>
  )
}
