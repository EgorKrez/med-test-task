import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../axiosInstance";
import { AxiosInstance } from "axios";

export interface IUser {
  readonly id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  personId: string;
  login: string;
  email: string;
  phone: string;
  confirmPassword: string;
  oldPassword: string;
  newPassword: string;
  readonly avatar: string;
}

export interface IUserState {
  user: IUser;
  edit: IUser;
  loading: boolean;
  userInitialized: boolean;
  error: string | null | undefined;
}

export interface IEditPersonData {
  firstName: string;
  lastName: string;
  middleName: string;
  personId: string;
  login: string;
  email: string;
  phone: string;
}

const initialState: IUserState = {
  user: {
    id: "",
    firstName: "",
    lastName: "",
    middleName: "",
    confirmPassword: "",
    oldPassword: "",
    newPassword: "",
    login: "",
    phone: "",
    personId: "",
    email: "",
    avatar: "",
  },
  edit: {
    id: "",
    firstName: "",
    lastName: "",
    middleName: "",
    confirmPassword: "",
    oldPassword: "",
    newPassword: "",
    login: "",
    phone: "",
    personId: "",
    email: "",
    avatar: "",
  },
  loading: false,
  error: null,
  userInitialized: false,
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    const response = await axiosInstance.get("user");

    return response.data;
  }
);
export const postUserPasswordData = createAsyncThunk(
  "user/postUserPasswordData",
  async ({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }): Promise<AxiosInstance> => {
    return await axiosInstance.post(`user/password`, {
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
  }
);

export const postEditPersonData = createAsyncThunk(
  "user/postEditPersonData",
  async ({
    editData,
  }: {
    editData: IEditPersonData;
  }): Promise<AxiosInstance> => {
    return await axiosInstance.post(`user/edit`, {
      ...editData,
    });
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setEditFirstName: (s, { payload }: PayloadAction<string>) => {
      s.edit.firstName = payload;
    },
    setEditLastName: (s, { payload }: PayloadAction<string>) => {
      s.edit.lastName = payload;
    },
    setEditMiddleName: (s, { payload }: PayloadAction<string>) => {
      s.edit.middleName = payload;
    },
    setEditOldPassword: (s, { payload }: PayloadAction<string>) => {
      s.edit.oldPassword = payload;
    },
    setEditNewPassword: (s, { payload }: PayloadAction<string>) => {
      s.edit.newPassword = payload;
    },
    setEditConfirmPassword: (s, { payload }: PayloadAction<string>) => {
      s.edit.confirmPassword = payload;
    },
    setEditLogin: (s, { payload }: PayloadAction<string>) => {
      s.edit.login = payload;
    },
    setEditPhone: (s, { payload }: PayloadAction<string>) => {
      s.edit.phone = payload;
    },
    setEditPersonId: (s, { payload }: PayloadAction<string>) => {
      s.edit.personId = payload;
    },
    setEditEmail: (s, { payload }: PayloadAction<string>) => {
      s.edit.email = payload;
    },
    setEditPersonData: (s, { payload }: PayloadAction<IEditPersonData>) => {
      s.user.firstName = payload.firstName;
      s.user.lastName = payload.lastName;
      s.user.middleName = payload.middleName;
      s.user.login = payload.login;
      s.user.phone = payload.phone;
      s.user.personId = payload.personId;
      s.user.email = payload.email;
    },
    cleanPasswordData: (s) => {
      s.edit.oldPassword = "";
      s.edit.newPassword = "";
      s.edit.confirmPassword = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.edit = action.payload;
        state.userInitialized = true;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.userInitialized = true;
      });
  },
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
