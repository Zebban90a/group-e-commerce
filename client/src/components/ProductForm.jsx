import React from 'react';

export default function ProductForm(props) {
  const { submitHandler, onChangeHandler, imageHandler, formInput } = props;
  const data = formInput || {};

  return (
    <form onSubmit={submitHandler} encType="multipart/form-data">
      <label htmlFor="title">title: </label>
      <input onChange={onChangeHandler} type="text" name="title" id="title" value={data.title || ''} />
      <label htmlFor="description">description: </label>
      <input onChange={onChangeHandler} type="text" name="description" id="description" value={data.description || ''} />
      <label htmlFor="price">price: </label>
      <input onChange={onChangeHandler} type="number" name="price" id="price" value={data.price || 0} />
      <label htmlFor="category">category: </label>
      <input onChange={onChangeHandler} type="text" name="category" id="category" value={data.category || ''} />
      <label htmlFor="quantity">quantity: </label>
      <input onChange={onChangeHandler} type="number" name="quantity" id="quantity" value={data.quantity || ''} />
      <label htmlFor="manufacturer">manufacturer: </label>
      <input onChange={onChangeHandler} type="text" name="manufacturer" id="manufacturer" value={data.manufacturer || ''} />
      <label htmlFor="weight">weight: </label>
      <input
        onChange={onChangeHandler}
        type="number"
        name="weight"
        id="weight"
        value={data.weight || ''}
      />
      <label htmlFor="images">image: </label>
      {/* {data && <image src={data.image} />} */}
      <input type="file" name="image" onChange={imageHandler} id="images" />
      <button type="submit">Submit</button>
    </form>
  )
}
