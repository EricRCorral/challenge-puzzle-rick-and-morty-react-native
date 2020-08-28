import { Data } from "./Data";

export interface State {
  name: string;
  filter: string;
  data: Data;
  fetching: boolean;
  currentCard: number;
  isFilterSelect: boolean;
  error?: boolean;
  getDataAction?: any;
  setNameAction?: any;
  setFilterSelectAction?: any;
  setCurrentCardAction?: any;
  setFilterAction?: any
}
