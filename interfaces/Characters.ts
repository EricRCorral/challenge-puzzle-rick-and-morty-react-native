export interface Characters {
  [results: string]: [{
    id: string;
    name: string;
    type: string;
    gender: string;
    species: string;
    image: string;
  }];
}
