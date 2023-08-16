import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import authReducer from './authSlice';
import usersReducer from './usersSlice';
import connectionReducer from './connectionSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const usersPersistConfig = {
  key: 'users',
  storage,
};

const connectionPersistConfig = {
  key: 'connection',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedUsersReducer = persistReducer(usersPersistConfig, usersReducer);
const persistedConnectionReducer = persistReducer(connectionPersistConfig, connectionReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    users: persistedUsersReducer,
    connection: persistedConnectionReducer,
  },
});

export const persistor = persistStore(store);

export default store;
