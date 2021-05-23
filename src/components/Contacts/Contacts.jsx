import { useContext } from "react";
import { ContactsContext } from "../../ContactsContext/ContactsContext";
import ShowError from "../Utilities/ShowError";

const Contacts = () => {
  let { utils, dispatch } = useContext(ContactsContext);

  let { fetchingContacts, contacts, fetchingError } = utils;

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
        </tr>
        {contacts.map((contact, index) => (
          <tr key={index} className="contact-row">
            <td>
              <div className="col-1">
                <div className="contact-circle">
                  {contact.firstName.split("")[0].toUpperCase()}
                </div>
              </div>
              <div className="col-11">
                <div style={{ paddingLeft: "1rem" }}>
                  {contact.firstName} {contact.lastName}
                </div>
              </div>
            </td>
            <td>
              <div className="col2-row1" style={{ width: "20rem" }}>
                {contact.phoneNumber}
              </div>
            </td>
            <td>
              <div className="col3-row1" style={{ width: "30rem" }}>
                {contact.address}
              </div>
            </td>
            <td>
              <div
                className="col4-row1"
                style={{ width: "20rem", height: "3rem" }}
              >
                <i className="fas fa-pencil-alt" />
                <i
                  className="far fa-trash-alt"
                  onClick={() =>
                    dispatch({
                      type: "DELETE_CONTACT",
                      id: contact.id,
                    })
                  }
                />
              </div>
            </td>
          </tr>
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
