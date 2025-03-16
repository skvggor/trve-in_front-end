export interface IHeaderContent {
  title: string;
  currentPosition: (string | JSX.Element)[];
  image: IImage;
  statusFromAPI: {
    time: string;
    status: string;
  };
}

export interface IStatusIndicator {
  indicatorBg: string;
  animate: string;
}
