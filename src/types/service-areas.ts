export type ServiceCounty = {
  title: string;
  image: string;
  towns: {
    name: string;
    highlight?: boolean;
  }[];
};
