export const productForm = {
  title: {
    required: true,
    regexRule: /^\S.{1,}$/,
    type: 'text',
    prompt: null,
  },
  description: {
    required: true,
    regexRule: /^\S./m,
    type: 'text',
    prompt: null,
    isMultiLine: true,
  },
  price: {
    required: true,
    regexRule: /^[0-9]+$/,
    type: 'number',
    prompt: null,
  },
  category: {
    required: true,
    regexRule: /^.{1,}$/,
    type: 'text',
    prompt: null,
  },
  quantity: {
    required: true,
    regexRule: /^[0-9]+$/,
    type: 'number',
    prompt: null,
  },
  manufacturer: {
    required: true,
    regexRule: /^.{1,}$/,
    type: 'text',
    prompt: null,
  },
  weight: {
    required: true,
    regexRule: /^[0-9]+$/,
    type: 'number',
    prompt: null,
  },
  images: {
    required: true,
    regexRule: null,
    type: 'file',
    prompt: null,
  },
};

export const userForm = {
  fullName: {
    required: true,
    type: 'text',
  },
  email: {
    required: true,
    type: 'email',
  },
  tel: {
    required: false,
    type: 'tel',
  },
  street: {
    required: false,
    type: 'text',
  },
  houseNumber: {
    required: false,
    type: 'number',
  },
  zip: {
    required: false,
    type: 'number',
  },
  city: {
    required: false,
    type: 'text',
  },
};
