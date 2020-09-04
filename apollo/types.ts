export interface Info {
  pages: number;
  next: number;
}

export interface Characters {
  characters: {
    results: [
      {
        id: string;
        name: string;
        type: string;
        gender: string;
        species: string;
        image: string;
      }
    ];
    info: Info;
  };
}

export interface Locations {
  locations: {
    results: [
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
    info: Info;
  };
}

export interface Episodes {
  episodes: {
    results: [
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
    info: Info;
  };
}
