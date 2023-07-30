import { model, Schema } from 'mongoose';

export const productCompanies = [ 'ikea', 'liddy', 'caressa', 'marcos' ] as const;
export type ProductCompanies = typeof productCompanies[number];

export type IProduct = {
  name: string,
  price: number,
  featured?: boolean,
  rating: number,
  createdAt?: Date,
  company: ProductCompanies
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [ true, 'product name must be provided' ]
  },
  price: {
    type: Number,
    required: [ true, 'product price must be provided' ]

  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  company: {
    type: String,
    enum: {
      values: productCompanies,
      message: '{VALUE} is not supported'
    },
  }
});

export default model('Product', productSchema);