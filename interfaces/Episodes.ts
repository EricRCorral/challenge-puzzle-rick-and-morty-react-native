export interface Episodes {
  [results: string]: [
    {
      id: string;
      name: string;
      air_date: string;
      episode: string;
      characters: [
        {
          name: string;
          image: string;
          id: string;
        }
      ];
    }
  ];
}
