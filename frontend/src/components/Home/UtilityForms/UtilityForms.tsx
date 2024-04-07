import React from "react";
import {
  userUtilFormHandler,
  userUtilSetFormMessage,
} from "../../../utils/reducers/mainAppReducer";
import { mainFormClearHandler } from "../../../utils/reducers/mainFormReducer";
import Deleter from "./Deleter";
import Requester from "./Requester";
import Updater from "./Updater";

interface Props {
  services: IService[];
  mainAppState: IMainAppState;
  mainFormDispatch: React.Dispatch<any>;
  mainAppDispatch: React.Dispatch<any>;
}

const UtilityForms = (props: Props) => {
  return (
    <div className="utility">
      <div className="utility_selector">
        <button
          className="utility_button button__control"
          onClick={() => {
            userUtilFormHandler("updater", props.mainAppDispatch);
            mainFormClearHandler(props.mainFormDispatch);
            userUtilSetFormMessage(
              "",
              "form__error",
              "util",
              props.mainAppDispatch
            );
            userUtilSetFormMessage(
              "",
              "form__error",
              "main",
              props.mainAppDispatch
            );
          }}
        >
          Update Your Selection
        </button>
        <button
          className="button__control utility_button"
          onClick={() => {
            userUtilFormHandler("deleter", props.mainAppDispatch);
            mainFormClearHandler(props.mainFormDispatch);
            userUtilSetFormMessage(
              "",
              "form__error",
              "util",
              props.mainAppDispatch
            );
            userUtilSetFormMessage(
              "",
              "form__error",
              "main",
              props.mainAppDispatch
            );
          }}
        >
          Remove Your Spot
        </button>
        <button
          className="button__control utility_button"
          onClick={() => {
            userUtilFormHandler("requester", props.mainAppDispatch);
            mainFormClearHandler(props.mainFormDispatch);
            userUtilSetFormMessage(
              "",
              "form__error",
              "util",
              props.mainAppDispatch
            );
            userUtilSetFormMessage(
              "",
              "form__error",
              "main",
              props.mainAppDispatch
            );
          }}
        >
          Request User Pin
        </button>
      </div>
      {props.mainAppState.userUtilFormMessage && (
        <p className={`utility_status ${props.mainAppState.userUtilFormClass}`}>
          {props.mainAppState.userUtilFormMessage}
        </p>
      )}
      {props.mainAppState.userUtilFormState === "updater" && (
        <Updater
          // form={props.setUtilForm}
          services={props.services}
          mainAppDispatch={props.mainAppDispatch}
          // formMessage={props.setUtilFormMessage}
          // formStatusStyle={setUtilFormStatusStyle}
        ></Updater>
      )}
      {props.mainAppState.userUtilFormState === "deleter" && (
        <Deleter
          mainAppDispatch={props.mainAppDispatch}
          // form={props.setUtilForm}
          // formMessage={props.setUtilFormMessage}
          // formStatusStyle={setUtilFormStatusStyle}
        ></Deleter>
      )}
      {props.mainAppState.userUtilFormState === "requester" && (
        <Requester
          mainAppDispatch={props.mainAppDispatch}
          // form={props.setUtilForm}
          // formMessage={props.setUtilFormMessage}
          // formStatusStyle={setUtilFormStatusStyle}
        ></Requester>
      )}
    </div>
  );
};

export default UtilityForms;
