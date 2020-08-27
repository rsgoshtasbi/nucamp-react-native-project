import * as ActionTypes from "./ActionTypes";

export const people = (state = { errMess: null, people: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PERSON:
      const id = state.people.length;
      action.payload.id = id;
      return {
        ...state,
        errMess: null,
        people: [...state.people, action.payload],
      };
    case ActionTypes.ADD_PEOPLE:
      return { ...state, errMess: null, people: action.payload };

    default:
      return state;
  }
};
