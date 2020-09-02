export interface Locations {
  [results: string]: [
    {
      id: string;
      name: string;
      type: string;
      dimension: string;
      residents: [
        {
          name: string;
          image: string;
          id: string;
        }
      ];
    }
  ];
}
