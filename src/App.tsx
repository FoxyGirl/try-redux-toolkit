import { useEffect } from 'react';

import { countSlice } from './store/reducers/CountSlice';

import { useAppSelector, useAppDispatch } from './hooks/redux';
import './App.css';
import { fetchUsers } from './store/reducers/ActionCreators';

import Posts from './components/Posts';
import Posts2 from './components/Posts2';

function App() {
  const { increment, decrement } = countSlice.actions;
  const { count } = useAppSelector((state) => state.countReducer);
  const dispatch = useAppDispatch();

  const { users, isLoading, error } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(fetchUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIncrement = () => {
    dispatch(increment(5));
  };

  const handleDecrement = () => {
    dispatch(decrement(5));
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>It works</p>
      </header>
      <h2>Count: {count}</h2>
      <p className="Buttons-wrapper">
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>&ndash;</button>
      </p>
      <div className="App-main">
        {/* One request from the same query (using cash) */}
        <Posts />
        <Posts2 />
      </div>
      {isLoading && <h2 data-testid="usersLoading">Loading...</h2>}
      <p className="Users-wrapper">{users.length > 0 && JSON.stringify(users, null, 2)}</p>
      {error && (
        <h2 style={{ color: 'red' }} data-testid="usersError">
          {error}
        </h2>
      )}
    </div>
  );
}

export default App;
