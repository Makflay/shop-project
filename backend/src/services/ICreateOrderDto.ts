export interface ICreateOrderDto {
  userId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}
