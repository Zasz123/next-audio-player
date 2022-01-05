export interface IMusic {
  id: number;
  title: string;
  url: string;
  createdAt: Date | string;
}

export interface IGetPlayListResponseDTO {
  playList: Array<IMusic>;
}
