import database from "../FireBase/firebase.config";

export const contactsReducer = (state, action) => {
  let { contacts } = state;

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

    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [
          {
            id: action.newContact.id,
            firstName: action.newContact.firstName,
            lastName: action.newContact.lastName,
            phoneNumber: action.newContact.phoneNumber,
            address: action.newContact.address,
          },
          ...contacts,
        ],
      };

    case "DELETE_CONTACT":
      // remove the contact from  firebase database
      database
        .collection("Contact")
        .doc(action.id)
        .delete()
        .then((res) => res)
        .catch((error) => {
          return {
            ...state,
            error: error.message,
          };
        });

      // remove contact from list
      const newContacts = contacts.filter((contact) => {
        return contact.id !== action.id;
      });

      // return new state, udating the contacts list
      return {
        ...state,
        contacts: newContacts,
      };

    case "UPDATE_CONTACT":
      const { updatedContact } = action;

      // update the contact in firebase database
      database
        .collection("Contact")
        .doc(updatedContact.id)
        .update(updatedContact)
        .then((res) => {})
        .catch((error) => {
          return {
            ...state,
            error: error.message,
          };
        });

      // update the contact in the global state
      for (let index = 0; index < contacts.length; index++) {
        if (contacts[index].id === updatedContact.id) {
          contacts[index] = updatedContact;
          break;
        }
      }

      // return new state after udating the contacts list
      return state;

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
