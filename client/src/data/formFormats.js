const productForm = [
  {
    name: 'title',
    required: true,
    regexRule: null,
    type: 'text',
    prompt: null
  },
  {
    name: 'description',
    required: true,
    regexRule: null,
    type: 'text',
    prompt: null,
    isMultiLine: true
  },
  {
    name: 'price',
    required: true,
    regexRule: /[^0-9]/g,
    type: 'number',
    prompt: null
  },
  {
    name: 'category',
    required: true,
    regexRule: null,
    type: 'text',
    prompt: null
  },
  {
    name: 'quantity',
    required: true,
    regexRule: /[^0-9]/g,
    type: 'number',
    prompt: null
  },
  {
    name: 'manufacturer',
    required: true,
    regexRule: null,
    type: 'text',
    prompt: null
  },
  {
    name: 'weight',
    required: true,
    regexRule: /[^0-9]/g,
    type: 'number',
    prompt: null
  },
  {
    name: 'images',
    required: true,
    regexRule: null,
    type: 'file',
    prompt: null
  }
];

export default productForm;