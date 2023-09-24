export const ProductExample = {
  product_id: 1,
  product_code: 1,
  name: '',
  description: '',
  unit_measure: '',
  quantity: '',
  stock_min: '',
  stock_max: '',
  sale_price: '',
  demand: '',
  initial_quantity: 1,
  final_quantity: 1,
  category: {
    category_id: 1,
    name: '',
    description: '',
  },
  supplier: {
    supplier_id: 1,
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zip_code: 10000,
    phone_number: 1000000000,
    email_address: '',
    website: '',
    credit_limit: 1,
  },
};

export const UpdatedExample = {
  generatedMaps: [],
  raw: [],
  affected: 1,
};

export const BadRequestExample = {
  description: 'Bad Request',
  schema: {
    example: {
      message: [''],
      error: 'Bad Request',
      statusCode: 400,
    },
  },
};

export const notFoundResponseExample = ({ objectName }) => {
  return {
    description: 'Not Found',
    schema: {
      example: {
        message: `${objectName} not found`,
        error: 'Not Found',
        statusCode: 404,
      },
    },
  };
};

export const deletedResponseExample = ({ objectName }) => {
  return {
    description: `The ${objectName} has been successfully deleted.`,
  };
};
