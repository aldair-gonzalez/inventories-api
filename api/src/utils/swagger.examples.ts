export const CategoryExample = {
  name: '',
  description: '',
  category_id: 1,
};

export const SupplierExample = {
  name: '',
  description: '',
  address: '',
  city: '',
  state: '',
  zip_code: 11111,
  phone_number: 1111111111,
  email_address: '',
  website: '',
  credit_limit: 1,
  supplier_id: 1,
};

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

export const TransactionExample = {
  name: '',
  description: '',
  transaction_id: 1,
};

export const FinanceExample = {
  finance_id: 1,
  date: '',
  amount: 1,
  description: '',
  transaction: {
    transaction_id: 1,
    name: '',
    description: '',
  },
};

export const OrderStatusesExample = {
  order_status_id: 1,
  name: '',
  description: '',
};

export const PurchaseOrderExample = {
  purchase_order_id: 1,
  date: '',
  delivery_date: '',
  total_amount: 1,
  supplier: {
    supplier_id: 1,
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zip_code: 11111,
    phone_number: 5611042722,
    email_address: '',
    website: '',
    credit_limit: 1,
  },
  order_status: {
    order_status_id: 1,
    name: '',
    description: '',
  },
};

export const PurchaseOrderDetailsExample = {
  purchase_order_detail_id: 1,
  quantity: 1,
  price: 1,
  product: {
    product_id: 1,
    product_code: 1,
    name: '',
    description: '',
    unit_measure: '',
    quantity: 1,
    stock_min: 1,
    stock_max: 1,
    sale_price: 1,
    demand: 1,
    initial_quantity: 1,
    final_quantity: null,
  },
  purchase_order: {
    purchase_order_id: 1,
    date: '',
    delivery_date: '',
    total_amount: 1,
  },
};

export const LotExample = {
  lot_id: 1,
  lot_number: '',
  purchase_order: {
    purchase_order_id: 1,
    date: '',
    delivery_date: '',
    total_amount: 1,
  },
};

export const InventoryExample = {
  inventory_id: 1,
  quantity: 1,
  unit_cost: 1,
  purchase_date: '',
  expiration_date: '',
  product: {
    product_id: 1,
    product_code: 1,
    name: '',
    description: '',
    unit_measure: '',
    quantity: 1,
    stock_min: 1,
    stock_max: 1,
    sale_price: 1,
    demand: 1,
    initial_quantity: 1,
    final_quantity: null,
  },
  purchase_order: {
    purchase_order_id: 1,
    date: '',
    delivery_date: '',
    total_amount: 1,
  },
  lot: null,
};

export const DiscountExample = {
  discount_id: 1,
  discount_type: '',
  discount_amount: 1,
  discount_start_date: '',
  discount_end_date: '',
  product: {
    product_id: 1,
    product_code: 1,
    name: '',
    description: '',
    unit_measure: '',
    quantity: 1,
    stock_min: 1,
    stock_max: 1,
    sale_price: 1,
    demand: 1,
    initial_quantity: 1,
    final_quantity: null,
  },
};

export const SaleExample = {
  sale_id: 1,
  date: '',
  total_amount: 1,
  payment_method: {
    payment_method_id: 1,
    name: '',
    description: '',
  },
};

export const PaymentMethodExample = {
  payment_method_id: 1,
  name: '',
  description: '',
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
