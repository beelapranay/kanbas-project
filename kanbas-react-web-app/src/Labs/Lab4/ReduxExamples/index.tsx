import { useSelector, useDispatch } from "react-redux";
import AddRedux from "./AddRedux";
import CounterRedux from "./CounterRedux";
export default function HelloRedux() {
  const { message } = useSelector((state: any) => state.helloReducer);
  return (
    <div id="wd-hello-redux">
      <h3>Hello Redux</h3>
      <h4>{message}</h4> <hr />
      <AddRedux />
      <CounterRedux />
    </div>
  );
}
