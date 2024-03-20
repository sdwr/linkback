export default interface ITagLink {
  id?: number;
  tagId: number;
  linkId: number;
  userId?: number;
  date: any;

  //generated fields
  voteSum?: number;
  
  createdAt?: any;
  updatedAt?: any;
}