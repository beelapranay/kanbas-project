import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../store";
import { setQuestion, updateOption } from "../reducer";
import { useEffect, useState } from "react";

function TrueFalse() {
  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );

  const dispatch = useDispatch();

  const [trueFalse, setTrueFalse] = useState(true);

  useEffect(() => {
    if (question.options.length > 0) {
      setTrueFalse(question.options[0].option === "True");
    } else {
      dispatch(setQuestion({ ...question, options: [{ id: "1", option: "True" }] }));
      setTrueFalse(true);
    }
  }, [question, dispatch]);

  const handleRadioChange = (value: boolean) => {
    setTrueFalse(value);
    dispatch(updateOption({ ...question.options[0], option: value ? "True" : "False" }));
  };

  return (
    <div>
      <div>
        <input
          checked={trueFalse}
          type="radio"
          name="trueFalse"
          onChange={() => handleRadioChange(true)}
        />
        <label>True</label>
      </div>
      <div>
        <input
          checked={!trueFalse}
          type="radio"
          name="trueFalse"
          onChange={() => handleRadioChange(false)}
        />
        <label>False</label>
      </div>
    </div>
  );
}

export default TrueFalse;