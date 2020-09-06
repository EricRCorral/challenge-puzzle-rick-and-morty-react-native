export interface Data {
  results: [
    {
      id: string;
      name: string;
      type?: string;
      gender?: string;
      species?: string;
      image?: string;
      dimension?: string;
      air_date?: string;
      episode?: string;
      characters?: [
        {
          name: string;
          image: string;
          id: string;
        }
      ];
      residents?: [
        {
          name: string;
          image: string;
          id: string;
        }
      ];
    }
  ];
  info: {
    pages: number;
    next: number;
  };
}
