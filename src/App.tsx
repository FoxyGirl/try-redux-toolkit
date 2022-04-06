import React from 'react';

import { userSlice } from './store/reducers/UserSlice';
import { countSlice } from './store/reducers/CountSlice';

import { useAppSelector, useAppDispatch } from './hooks/redux';
import './App.css';

function App() {
  const {increment, decrement} = countSlice.actions;
  const {count} = useAppSelector(state => state.countReducer);
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(increment(5))
  }

  const handleDecrement = () => {
    dispatch(decrement(5))
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          It works
        </p>
        <h2>Count: {count}</h2>
        <p className="Buttons-wrapper">
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>&ndash;</button>
        </p>

      </header>
    </div>
  );
}

export default App;
