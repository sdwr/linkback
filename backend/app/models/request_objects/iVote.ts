export default interface IVote {
  id?: number;
  linkId: number;
  userId: number;
  voteValue: number;
  date: any;

  createdAt?: any;
  updatedAt?: any;
}