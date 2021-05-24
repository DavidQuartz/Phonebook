import { useContext } from "react";
import { ContactsContext } from "../../ContactsContext/ContactsContext";
import ShowError from "../Utilities/ShowError";
import Contact from "./Contact";

const Contacts = () => {
  let { utils, dispatch } = useContext(ContactsContext);

  let { fetchingContacts, contacts, fetchingError, error } = utils;

  return fetchingError ? ( // error from internet or firebase
    <ShowError error={fetchingError} />
  ) : fetchingContacts ? ( // showing a loading spinner if contacts are being fetched from firebase
    <div>
      <span
        className="spinner-border spinner-border-lg"
        role="status"
        aria-hidden="true"
      />
    </div>
  ) : contacts && contacts.length > 0 ? ( // if there are one or more contacts
    <table className="table">
      <thead className="thead-inverse">
        <tr>
          <th>Name</th>
          <th>Phone number</th>
          <th>Email address</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Contacts ({contacts.length})</td>
          <td>{error && <ShowError error={error} />}</td>
        </tr>
        {contacts.map((contact, index) => (
          <Contact key={index} contact={contact} dispatch={dispatch} />
        ))}
      </tbody>
    </table>
  ) : (
    // if there are no contacts
    <div>
      <p>You have no contacts.</p>
    </div>
  );
};

export default Contacts;
