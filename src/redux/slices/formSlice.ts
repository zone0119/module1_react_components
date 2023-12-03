
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  uncontrolledFormData: {
    name: string;
    age: number;
    email: string;
  };
  reactHookFormData: {
    name: string;
    age: number;
    email: string;
  };
}

const initialState: FormState = {
  uncontrolledFormData: {
    name: '',
    age: 0,
    email: '',
  },
  reactHookFormData: {
    name: '',
    age: 0,
    email: '',
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateUncontrolledFormData: (state, action: PayloadAction<FormState['uncontrolledFormData']>) => {
      state.uncontrolledFormData = action.payload;
    },
    updateReactHookFormData: (state, action: PayloadAction<FormState['reactHookFormData']>) => {
      state.reactHookFormData = action.payload;
    },
  },
});

export const { updateUncontrolledFormData, updateReactHookFormData } = formSlice.actions;
export default formSlice.reducer;
