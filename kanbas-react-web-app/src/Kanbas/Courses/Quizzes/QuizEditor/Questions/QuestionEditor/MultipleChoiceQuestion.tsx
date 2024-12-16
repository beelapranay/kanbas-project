import { BsTrash3Fill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../store";
import { addOption, updateOption, deleteOption, setCorrectOptionIndex } from "../reducer";
import { useEffect, useState } from "react";

function MultipleChoiceQuestion() {
  const dispatch = useDispatch();
  const question = useSelector(
    (state: KanbasState) => state.questionsReducer.question
  );

  const [correctOptionIndex, setCorrectOptionIndexState] = useState<number>(0);

  useEffect(() => {
    if (question.correctOptionIndex !== undefined) {
      setCorrectOptionIndexState(question.correctOptionIndex);
    }
  }, [question.correctOptionIndex]);

  const deleteOpt = (id: number) => {
    dispatch(deleteOption(id));
  };

  const handleCorrectOptionChange = (index: number) => {
    setCorrectOptionIndexState(index);
    dispatch(setCorrectOptionIndex(index));
  };

  return (
    <div>
      {question.options?.map((option: any, index: number) => (
        <div key={option.id}>
          <label>Possible Answers</label>
          <input
            type="text"
            value={option.option}
            onChange={(e) =>
              dispatch(updateOption({ ...option, option: e.target.value }))
            }
          />
          <input
            type="radio"
            name="correctOption"
            checked={correctOptionIndex === index}
            onChange={() => handleCorrectOptionChange(index)}
          />
          <button className="btn" onClick={() => deleteOpt(option.id)}>
            <BsTrash3Fill />
          </button>
        </div>
      ))}
    </div>
  );
}
export default MultipleChoiceQuestion;