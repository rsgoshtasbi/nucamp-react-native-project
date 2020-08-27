import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const addPeople = (people) => ({
  type: ActionTypes.ADD_PEOPLE,
  payload: people,
});

export const fetchPeople = () => (dispatch) => {
  return fetch(baseUrl + "people")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((people) => {
      console.log("dispatch", people);
      dispatch(addPeople(people));
    })
    .catch((error) => {
      console.log(error);
      // dispatch(commentsFailed(error.message));
    });
};

export const addPerson = (comment) => ({
  type: ActionTypes.ADD_PERSON,
  payload: comment,
});

export const postPerson = ({
  name,
  company,
  yoe,
  reactSkill,
  reactNativeSkill,
  pictureUri,
}) => (dispatch) => {
  const newPerson = {
    name,
    company,
    yoe,
    reactSkill,
    reactNativeSkill,
    pictureUri,
  };

  setTimeout(() => {
    dispatch(addPerson(newPerson));
  }, 2000);
};
