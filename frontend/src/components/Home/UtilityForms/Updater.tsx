import React, { useState } from 'react';
import { updateUserSeatsByPinAPI } from '../../../api/usersAPI';
import formErrors from '../../../utils/errorHandlers/formErrors';
import {
  userUtilFormHandler,
  userUtilSetFormMessage,
} from '../../../utils/reducers/mainAppReducer';

interface Props {
  services: IService[];
  mainAppDispatch: React.Dispatch<any>;
}

const Updater = (props: Props) => {
  const [userPin, setUserPin] = useState('');
  const [seats, setSeats] = useState(0);
  const [selectedService, setSelectedService] = useState('');

  const updateUserHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserSeatsByPinAPI(userPin, seats, selectedService);
      userUtilSetFormMessage(
        'Successfully Updated Selection',
        'form__success',
        'util',
        props.mainAppDispatch
      );
      userUtilFormHandler('', props.mainAppDispatch);
    } catch (error: any) {
      formErrors(error, props.mainAppDispatch, 'util');
    }
  };

  const serviceInputs = props.services.map((service) => {
    const date = new Date(service.time);
    return (
      <div key={service._id} className="utility_input-container">
        <input
          className="utility_checkbox"
          type="checkbox"
          value={service._id}
          name={service._id}
          checked={selectedService === service._id}
          onChange={() => setSelectedService(service._id)}
          disabled={!service.seats || service.seats <= 0}
        ></input>
        <span>
          {date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
          })}{' '}
          {date.toLocaleTimeString('en-US', {
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    );
  });

  return (
    <div className={`utility_container ${''}`}>
      <div className="utility_header">
        <div className="utility_header-title">
          <p>Update Selection:</p>
        </div>
        <div
          className="utility_header-exit"
          onClick={() => {
            userUtilFormHandler('', props.mainAppDispatch);
            userUtilSetFormMessage(
              '',
              'form__success',
              'util',
              props.mainAppDispatch
            );
          }}
        >
          <svg
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </div>
      </div>
      <form className="utility_form" onSubmit={updateUserHandler}>
        <label className="label__control" htmlFor="seatsInput">
          User pin
        </label>
        <input
          name="userPin"
          className="input__control"
          type="text"
          value={userPin}
          onChange={(e) => setUserPin(e.target.value)}
        ></input>
        <label className="label__control" htmlFor="seatsInput">
          New seat total
        </label>
        <input
          name="seatsInput"
          className="input__control"
          type="number"
          min="1"
          max="10"
          value={seats}
          onChange={(e) => setSeats(parseInt(e.target.value))}
        ></input>
        {serviceInputs}
        <button className="button__control">Submit</button>
      </form>
    </div>
  );
};

export default Updater;
