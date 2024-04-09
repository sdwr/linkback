//import { DateTime } from 'luxon';

export default interface ILink {
  id?: number;
  url: string;
  domain?: string;
  contentId?: string;
  startTime?: number;
  endTime?: number;
  duration?: number;
  
  isClip: boolean;
  loopClip: boolean;
  embeddable: boolean;
  title: string;
  description: string;

  userId: number;
  originalLinkId?: number;
  
  totalViews?: number;

  //generated fields
  voteSum?: number;
  pageViews?: number;
  
  date: any;
  createdAt?: any;
  updatedAt?: any;
}