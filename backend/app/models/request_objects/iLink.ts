//import { DateTime } from 'luxon';

export default interface ILink {
  id?: number;
  url: string;
  domain?: string;
  contentId?: string;
  startTime?: number;
  endTime?: number;
  
  isClip: boolean;
  loopClip: boolean;
  embeddable: boolean;
  title: string;
  description: string;

  userId: number;
  originalLinkId?: number;
  
  //generated fields
  voteSum?: number;
  
  date: any;
  createdAt?: any;
  updatedAt?: any;
}