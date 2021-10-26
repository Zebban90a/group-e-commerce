const productForm = {
  title : {
    required: true,
    regexRule: /^\S.{1,}$/,
    type: 'text',
    prompt: null
  },
  description : {
    required: true,
    regexRule: /^\S./m,
    type: 'text',
    prompt: null,
    isMultiLine: true
  },
  price : {
    required: true,
    regexRule: /^[0-9]+$/,
    type: 'number',
    prompt: null
  },
  category : {
    required: true,
    regexRule: /^.{1,}$/,
    type: 'text',
    prompt: null
  },
  quantity : {
    required: true,
    regexRule: /^[0-9]+$/,
    type: 'number',
    prompt: null
  },
  manufacturer : {
    required: true,
    regexRule: /^.{1,}$/,
    type: 'text',
    prompt: null
  },
  weight : {
    required: true,
    regexRule: /^[0-9]+$/,
    type: 'number',
    prompt: null
  },
  images : {
    required: true,
    regexRule: null,
    type: 'file',
    prompt: null
  }
};

export default productForm;