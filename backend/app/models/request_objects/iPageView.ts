//not request model from FE, but keep pattern
export default interface IPageView {
  id?: number;
  userId: number;
  itemId: number;
  itemType: string;
  date: any;

  createdAt?: any;
  updatedAt?: any;
}