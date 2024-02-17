import { Route, Routes } from 'react-router-dom';
import { Profile } from './Profile/Profile';
import { UserContext } from '../utils/UserContext';
import { fetchUser } from '../utils/fetchUser';

export function RoutesHandler() {
  const user = fetchUser()?.data;
  return (
    <Routes>
      <Route
        path="/profile"
        element={
          <UserContext.Provider value={user}>
            <Profile />
          </UserContext.Provider>
        }
      />
    </Routes>
  );
}
