export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateProductDto {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}
