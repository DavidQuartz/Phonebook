import { createContext, useReducer, useEffect, useCallback } from "react";
import database from "../FireBase/firebase.config";
import { isAuthenticated } from "../API_CALLS/authAPIs";
import { contactsReducer } from "../Reducers/ContactsReducer";

export const ContactsContext = createContext();

const ContactsContextProvider = (props) => {
  // App global state
  const [utils, dispatch] = useReducer(contactsReducer, {
    loading: false,
    fetchingContacts: false,
    fetchingError: false,
    error: false,
    contacts: [],
  });

  // fetch the contacts
  const fetchContacts = useCallback(async () => {
    dispatch({ type: "FETCHING_CONTACTS" });
    dispatch({ type: "UPDATE_FETCHING_ERROR", error: "" });
    try {
      const { user } = isAuthenticated();
      if (user) {
        const snapshot = await database.collection("Contact").get();
        snapshot.forEach((doc) => {
          // make sure to populate only docs which were created by current user
          // also make sure doc has firstName for use in green circle div
          if (doc.data().firstName && doc.data().userId === user.id)
            dispatch({
              type: "ADD_CONTACT",
              newContact: {
                id: doc.id,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                phoneNumber: doc.data().phoneNumber,
                address: doc.data().address,
              },
            });
        });
        dispatch({ type: "DONE_FETCHING_CONTACTS" });
        dispatch({ type: "UPDATE_FETCHING_ERROR", error: false });
      }
    } catch (error) {
      dispatch({ type: "UPDATE_FETCHING_ERROR", error: error.message });
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) fetchContacts();

    // cleanup
    return () => {
      mounted = false;
    };
  }, [fetchContacts]);

  return (
    <ContactsContext.Provider value={{ utils, dispatch }}>
      {props.children}
    </ContactsContext.Provider>
  );
};

export default ContactsContextProvider;
