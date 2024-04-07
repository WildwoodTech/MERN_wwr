import {
  mainFormChangeNumberHandler,
  mainFormChangeTextHandler,
} from "../../../utils/reducers/mainFormReducer";

interface Props {
  mainFormState: IServiceFormState;
  mainFormDispatch: React.Dispatch<any>;
  mainAppState: IMainAppState;
}

const Inputs = (props: Props) => {
  return (
    <>
      <label className="label__control" htmlFor="userseats">
        Seats 1-10
      </label>
      <input
        id="userseats"
        className={`input__control ${
          props.mainAppState.formStatusMessage && "input__error"
        }`}
        type="number"
        min="1"
        max="10"
        value={props.mainFormState.userseats}
        onChange={(e) => mainFormChangeNumberHandler(e, props.mainFormDispatch)}
        name="userseats"
      />
      <label className="label__control" htmlFor="name">
        Name
      </label>
      <input
        className={`input__control ${
          props.mainAppState.formStatusMessage && "input__error"
        }`}
        type="text"
        name="name"
        value={props.mainFormState.name}
        onChange={(e) => mainFormChangeTextHandler(e, props.mainFormDispatch)}
      />
      <label className="label__control" htmlFor="email">
        Email
      </label>
      <input
        className={`input__control ${
          props.mainAppState.formStatusMessage && "input__error"
        }`}
        type="email"
        name="email"
        value={props.mainFormState.email}
        onChange={(e) => mainFormChangeTextHandler(e, props.mainFormDispatch)}
      />
    </>
  );
};

export default Inputs;
