import React from 'react';

export default function ProductForm(props) {
  const {
    submitHandler, onChangeHandler, imageHandler, data,
  } = props;
  const product = data || {};
  return (
    <form onSubmit={submitHandler} encType="multipart/form-data">
      <label htmlFor="title">title: </label>
      <input type="text" name="title" id="title" value={product.title || ''} onChange={onChangeHandler} required />
      <label htmlFor="description">description: </label>
      <textarea onChange={onChangeHandler} rows="4" cols="50" type="text" name="description" id="description" required />
      <label htmlFor="price">price: </label>
      <input onChange={onChangeHandler} type="number" name="price" id="price" required />
      <label htmlFor="category">category: </label>
      <select onChange={onChangeHandler} id="category" name="category" required defaultValue="">
        <option disabled value="">Select an option</option>
        <option value="Samsung">Samsung</option>
        <option value="Apple">Apple</option>
      </select>
      {/* <input onChange={onChangeHandler} type="text" name="category" id="category" value={data.category || ''} />  required */}
      <label htmlFor="quantity">quantity: </label>
      <input onChange={onChangeHandler} type="number" name="quantity" id="quantity" required />
      <label htmlFor="manufacturer">manufacturer: </label>
      <input onChange={onChangeHandler} type="text" name="manufacturer" id="manufacturer" required />
      <label htmlFor="weight">weight: </label>
      <input
        onChange={onChangeHandler}
        type="number"
        name="weight"
        id="weight"
        required
      />
      <label htmlFor="images">image: </label>
      {/* {data && <image src={data.image} />} */}
      <input type="file" name="image" onChange={imageHandler} id="images" required />
      <button type="submit">Submit</button>
    </form>
  );
}
