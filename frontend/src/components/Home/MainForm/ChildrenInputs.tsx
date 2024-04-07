import { mainFormChangeStudentNumberHandler } from "../../../utils/reducers/mainFormReducer";

interface Props {
  mainFormDispatch: React.Dispatch<any>;
  mainAppState: IMainAppState;
}

const ChildrenInputs = (props: Props) => {
  return (
    <>
      <label className="label__control" htmlFor="nursery">
        How many 0 - 23 months old?
      </label>
      <select
        className={`select__control ${
          props.mainAppState.formStatusMessage && "input__error"
        }`}
        onChange={(e) =>
          mainFormChangeStudentNumberHandler(e, props.mainFormDispatch)
        }
        name="nursery"
        defaultValue={0}
        required
      >
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>

      <label className="label__control" htmlFor="twoyears">
        How many 2 year olds?
      </label>
      <select
        className={`select__control ${
          props.mainAppState.formStatusMessage && "input__error"
        }`}
        onChange={(e) =>
          mainFormChangeStudentNumberHandler(e, props.mainFormDispatch)
        }
        name="twoyears"
        defaultValue={0}
        required
      >
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>

      <label className="label__control" htmlFor="threeyears">
        How many 3 year olds?
      </label>
      <select
        className={`select__control ${
          props.mainAppState.formStatusMessage && "input__error"
        }`}
        onChange={(e) =>
          mainFormChangeStudentNumberHandler(e, props.mainFormDispatch)
        }
        name="threeyears"
        defaultValue={0}
        required
      >
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>

      <label className="label__control" htmlFor="fouryears">
        How many 4 year olds?
      </label>
      <select
        className={`select__control ${
          props.mainAppState.formStatusMessage && "input__error"
        }`}
        onChange={(e) =>
          mainFormChangeStudentNumberHandler(e, props.mainFormDispatch)
        }
        name="fouryears"
        defaultValue={0}
        required
      >
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>

      <label className="label__control" htmlFor="kindergarten">
        How many 5 years old - Kindergarten?
      </label>
      <select
        className={`select__control ${
          props.mainAppState.formStatusMessage && "input__error"
        }`}
        onChange={(e) =>
          mainFormChangeStudentNumberHandler(e, props.mainFormDispatch)
        }
        name="kindergarten"
        defaultValue={0}
        required
      >
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>

      <label className="label__control" htmlFor="wildlife">
        How many in 1st - 5th grade?
      </label>
      <select
        className={`select__control ${
          props.mainAppState.formStatusMessage && "input__error"
        }`}
        onChange={(e) =>
          mainFormChangeStudentNumberHandler(e, props.mainFormDispatch)
        }
        name="wildlife"
        defaultValue={0}
        required
      >
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>
    </>
  );
};

export default ChildrenInputs;
