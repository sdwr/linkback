//not request model from FE, but keep pattern
export default interface IPageView {
  id?: number;
  userSessionId: number;
  linkId: number;
  date: any;

  createdAt?: any;
  updatedAt?: any;
}