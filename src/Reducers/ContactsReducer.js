// import { v4 as uuidv4 } from "uuid";
import database from "../FireBase/firebase.config";

export const contactsReducer = (state, action) => {
  const { contacts } = state;

  switch (action.type) {
    case "FETCHING_CONTACTS":
      return {
        ...state,
        fetchingContacts: true,
      };
    case "DONE_FETCHING_CONTACTS":
      return {
        ...state,
        fetchingContacts: false,
        error: false,
      };
    case "DELETE_CONTACT":
      database
        .collection("Contact")
        .doc(action.id)
        .delete()
        .then((res) => res)
        .catch((error) => {
          console.error("Error removing document: ", error);
        });

      // remove contact from list
      const newContacts = contacts.filter((contact) => {
        return contact.id !== action.id;
      });
      // return new state, udating the contacts
      return {
        ...state,
        contacts: newContacts,
      };

    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [
          {
            id: action.newContact.id, // only used in the front-end to uniquely identify contacts
            firstName: action.newContact.firstName,
            lastName: action.newContact.lastName,
            phoneNumber: action.newContact.phoneNumber,
            address: action.newContact.address,
          },
          ...contacts,
        ],
      };

    case "UPDATE_LOADING":
      return {
        ...state,
        loading: action.loading,
      };

    case "UPDATE_ERROR":
      return {
        ...state,
        error: action.error,
      };

    case "UPDATE_FETCHING_ERROR":
      return {
        ...state,
        fetchingError: action.error,
      };

    default:
      return state;
  }
};
