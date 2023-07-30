import Product, { IProduct, ProductCompanies, productCompanies } from "../models/product.js";
import { RequestHandler } from "express";

interface AppResponseBody {
  success: boolean,
  products: IProduct[],
  error?: string | Error
}

interface AppRequestHandler<
  P = object,
  ReqBody = object,
  ReqQuery = object
> extends RequestHandler<
  P,
  AppResponseBody,
  ReqBody,
  ReqQuery
> {
}

type RequestAllProductsQueryFields =
  'featured'
  | 'name'
  | 'company'
  | 'sort'
  | 'fields'
  | 'limit'
  | 'page';
type RequestAllProductsQuery = Record<RequestAllProductsQueryFields, string>;
export const getAllProducts: AppRequestHandler<
  never,
  never,
  RequestAllProductsQuery
> = async (req, res) => {
  const { featured, name, company, sort, fields, limit, page } = req.query;
  const queryObject: Partial<{
    featured: IProduct['featured'],
    company: IProduct['company'],
    name: unknown,
    sort: string,
    fields: string,
    numericFilters: string,
    page: string,
    limit: string
  }> = {};

  if (featured) {
    queryObject.featured = featured === 'true';
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  if (company && productCompanies.includes(company as ProductCompanies)) {
    queryObject.company = company as ProductCompanies;
  }

  const sortList = sort
    ? sort.split(',').join(' ')
    : '-createdAt';
  const selectList = fields
    ? fields.split(',').join(' ')
    : {};

  const productPage = page ? Number(page) : 1;
  const productLimit = limit ? Number(limit) : 10;
  const skip = (productPage - 1) * productLimit;

  const result = await Product
    .find(queryObject)
    .sort(sortList)
    .select(selectList)
    .skip(skip)
    .limit(productLimit);

  res.status(200).json({
    success: true,
    products: result
  });
};
export const getAllProductsStatic: AppRequestHandler = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products
  });
};