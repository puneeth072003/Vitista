import "./App.css";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { increment, decrement } from "./redux/slices/sample";

function App() {
  const counter = useAppSelector((state) => state.sample);
  const dispatch = useAppDispatch();

  return (
    <>
      <h1 className="text-[3rem] text-[red]">Hello World</h1>
      <h3>Count is {counter}</h3>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </>
  );
}

export default App;
