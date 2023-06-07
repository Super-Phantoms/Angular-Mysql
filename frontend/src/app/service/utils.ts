import {API_BASE_URL} from 'src/app/constants/types';

export function getApiUrl(uri: string) {
    return `${API_BASE_URL}${uri}`;
}