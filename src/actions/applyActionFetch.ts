import { ItemId } from '../models/ItemId';
import { requestMethodTypes } from '../constants/requestMethodTypes';

const HEADERS = {
  'Content-Type': 'application/json',
  'access-control-allow-origin': '*',
};

export const getFetch = (apiUrl: RequestInfo) => (): Promise<Response> =>
  fetch(apiUrl, {
    method: requestMethodTypes.GET,
    mode: 'cors', redirect: 'follow',
    headers: HEADERS
  });

export const postFetch = (apiUrl: RequestInfo) => (text: string): Promise<Response> =>
  fetch(apiUrl, {
    method: requestMethodTypes.POST,
    headers: HEADERS,
    body: JSON.stringify({
      'Text': text
    })
  });

export const putFetch = (apiUrl: RequestInfo) => (id: ItemId, text: string): Promise<Response> =>
  fetch(`${apiUrl}/${id}`, {
    method: requestMethodTypes.PUT,
    headers: HEADERS,
    body: JSON.stringify({
      'Id': id,
      'Text': text
    })
  });

export const deleteFetch = (apiUrl: RequestInfo) => (id: ItemId): Promise<Response> =>
  fetch(`${apiUrl}/${id}`, {
    method: requestMethodTypes.DELETE,
    headers: HEADERS,
  });
