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
  date: any;
  userId: number;
  originalLinkId?: number;
  createdAt?: any;
  updatedAt?: any;
}