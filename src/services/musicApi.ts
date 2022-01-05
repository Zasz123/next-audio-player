import baseApi from './baseApi';

import { IMusic, IGetPlayListResponseDTO } from 'interfaces/music';

export const musicApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPlayList: build.query<Array<IMusic>, void>({
      query: () => `/musics`,
      transformResponse: (response: IGetPlayListResponseDTO) =>
        response.playList,
    }),
  }),
});

export const { useGetPlayListQuery, useLazyGetPlayListQuery } = musicApi;
