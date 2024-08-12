import { RootState } from './reducers';

export const selectToken = (state: RootState) => state.auth.token;
