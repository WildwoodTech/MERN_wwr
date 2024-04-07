import { userUtilSetFormMessage } from '../reducers/mainAppReducer';

const formErrors = (error: any, dispatch: any, formType: 'main' | 'util') => {
  let formMessage = 'server error';

  if (!error.response) {
    formMessage = 'Please select a service';
    return userUtilSetFormMessage(
      formMessage,
      'form__error',
      formType,
      dispatch
    );
  } else {
    if (
      error.response.data.error ===
      'User validation failed: email: email is invalid'
    ) {
      formMessage = 'This is not a valid email';
      return userUtilSetFormMessage(
        formMessage,
        'form__error',
        formType,
        dispatch
      );
    }
    if (error.response.data.error === 'user not found') {
      formMessage = 'This email was not found';
      return userUtilSetFormMessage(
        formMessage,
        'form__error',
        formType,
        dispatch
      );
    }
    if (error.response.data.error === 'user with that pin not found') {
      formMessage = 'Not a valid pin';
      return userUtilSetFormMessage(
        formMessage,
        'form__error',
        formType,
        dispatch
      );
    }
    switch (error.response.status) {
      case 500:
        formMessage = 'There was a server error, please refresh';
        break;
      case 409:
        formMessage = 'This email is already in use';
        break;
      case 406:
        formMessage = 'All fields are required';
        break;
      case 405:
        formMessage = 'There are not enough seats available in that service';
        break;
      case 404:
        formMessage = 'All fields are required';
        break;
      default:
        formMessage = 'All fields are required';
        break;
    }
  }

  userUtilSetFormMessage(formMessage, 'form__error', formType, dispatch);
};

export default formErrors;
