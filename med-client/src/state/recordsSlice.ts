import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../axiosInstance";

export interface IRecord {
  metadata: number;
  services: number;
  book: number;
  name: string;
  etcData: number;
}

export type Order = "asc" | "desc";

export interface IRecordsState {
  search: string;
  order: Order;
  orderBy: string;
  selected: string[];
  page: number;
  limit: number;
  records: IRecord[];
  totalItems: number;
}

const initialState: IRecordsState = {
  search: "",
  order: "asc",
  orderBy: "",
  selected: [],
  page: 0,
  limit: 20,
  records: [],
  totalItems: 0,
};

interface IFetchRecordsResponse {
  items: IRecord[];
  totalItems: number;
}

interface IWithRecordsState {
  records: IRecordsState;
}

export const fetchRecords = createAsyncThunk<IFetchRecordsResponse>(
  "fetchRecords",
  async (_, { getState }) => {
    const {
      records: { search, page, limit },
    } = getState() as IWithRecordsState;

    const { data } = await axiosInstance.post<IFetchRecordsResponse>(
      `records/find`,
      {
        page,
        limit,
        search,
      }
    );

    return data;
  }
);

const recordsSlice = createSlice({
  name: "recordsSlice",
  initialState,
  reducers: {
    setSearch: (s, { payload }: PayloadAction<string>) => {
      s.search = payload;
    },
    setOrder: (s, { payload }: PayloadAction<Order>) => {
      s.order = payload;
    },
    setOrderBy: (s, { payload }: PayloadAction<string>) => {
      s.orderBy = payload;
    },
    setSelected: (s, { payload }: PayloadAction<string[]>) => {
      s.selected = payload;
    },
    setPage: (s, { payload }: PayloadAction<number>) => {
      s.page = payload;
    },
    setLimit: (s, { payload }: PayloadAction<number>) => {
      s.limit = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchRecords.fulfilled,
      (state, { payload: { items, totalItems } }) => {
        state.records = items;
        state.totalItems = totalItems;
      }
    );
  },
});

export const recordsActions = recordsSlice.actions;

export const recordsReducer = recordsSlice.reducer;
