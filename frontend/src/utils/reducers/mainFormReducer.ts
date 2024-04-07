export const mainFormReducer = (state: IServiceFormState, action: any) => {
  switch (action.type) {
    case "HANDLE INPUT":
      return {
        ...state,
        [action.field]: action.payload,
      };
    case "HANDLE NUMBER":
      return {
        ...state,
        [action.field]: action.payload,
      };
    case "HANDLE STUDENT NUMBER":
      return {
        ...state,
        students: {
          ...state.students,
          [action.field]: action.payload,
        },
      };
    case "TOGGLE CHILDERN FORM":
      return {
        ...state,
        children: !state.children,
      };
    case "CLEAR MAIN FORM":
      return {
        ...initialMainFormState,
      };
    default:
      return state;
  }
};

export const initialMainFormState: IServiceFormState = {
  serviceId: "",
  name: "",
  email: "",
  userseats: 0,
  children: false,
  students: {
    nursery: 0,
    twoyears: 0,
    threeyears: 0,
    fouryears: 0,
    kindergarten: 0,
    wildlife: 0,
  },
};

export const mainFormClearHandler = (
  mainFormDispatch: (value: any) => void
) => {
  mainFormDispatch({
    type: "CLEAR MAIN FORM",
  });
};

export const mainFormChangeTextHandler = (
  e: any,
  mainFormDispatch: (value: any) => void
) => {
  mainFormDispatch({
    type: "HANDLE INPUT",
    field: e.target.name,
    payload: e.target.value,
  });
};

export const mainFormChangeServiceHandler = (
  e: any,
  mainFormDispatch: (value: any) => void
) => {
  mainFormDispatch({
    type: "HANDLE INPUT",
    field: e.target.name,
    payload: e.target.value,
  });
};

export const mainFormChangeNumberHandler = (
  e: any,
  mainFormDispatch: (value: any) => void
) => {
  mainFormDispatch({
    type: "HANDLE NUMBER",
    field: e.target.name,
    payload: parseInt(e.target.value),
  });
};

export const mainFormChangeStudentNumberHandler = (
  e: any,
  mainFormDispatch: (value: any) => void
) => {
  mainFormDispatch({
    type: "HANDLE STUDENT NUMBER",
    field: e.target.name,
    payload: parseInt(e.target.value),
  });
};
