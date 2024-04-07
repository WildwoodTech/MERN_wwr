import {
  userUtilFormHandler,
  userUtilSetFormMessage,
} from "../../../utils/reducers/mainAppReducer";
import { mainFormChangeServiceHandler } from "../../../utils/reducers/mainFormReducer";

interface Props {
  _id: string;
  time: Date;
  seats: number;
  key: React.Key;
  mainFormDispatch: React.Dispatch<any>;
  mainAppDispatch: React.Dispatch<any>;
  mainFormState: IServiceFormState;
}

const Service = (props: Props) => {
  const date = new Date(props.time);

  return (
    <label>
      <div
        className={`
        home_service-selector ${
          !props.seats || props.seats <= 0
            ? "home_service-selector-disabled"
            : props.mainFormState.serviceId === props._id
            ? "home_service-selector-active"
            : "home_service-selector-inactive"
        }
        `}
      >
        <p className="home_service-selector-time">
          {date.toLocaleTimeString("en-US", {
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className="home_service-selector-date">
          {date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
          })}
        </p>
        <p className="home_service-selector-label">Seats:</p>
        {props.seats <= 0 ? (
          <p className="home_service-selector-seats">Full</p>
        ) : (
          <p className="home_service-selector-seats">{props.seats}</p>
        )}
        <input
          type="radio"
          value={props._id}
          checked={props.mainFormState.serviceId === props._id}
          name="serviceId"
          className="home_service-selector-Radio"
          onChange={(e) => {
            mainFormChangeServiceHandler(e, props.mainFormDispatch);
            userUtilFormHandler("", props.mainAppDispatch);
            userUtilSetFormMessage(
              "",
              "form__error",
              "main",
              props.mainAppDispatch
            );
            userUtilSetFormMessage(
              "",
              "form__error",
              "util",
              props.mainAppDispatch
            );
          }}
          disabled={!props.seats || props.seats <= 0}
        />
      </div>
    </label>
  );
};

export default Service;
