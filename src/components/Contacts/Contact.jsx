import { useState } from "react";
import UpdateContact from "./UpdateContact";
import Avatar from "../Avatar/Avatar";

const Contact = ({ contact, dispatch }) => {
  const [updateContactModal, setUpdateContactModal] = useState(false); // for createContact Modal

  return (
    <>
      <tr className="contact-row">
        <td>
          <div className="col-1">
            <Avatar name={contact.firstName} className="contact-circle" />
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
          <div className="col4-row1" style={{ width: "20rem", height: "3rem" }}>
            <i
              className="fas fa-pencil-alt"
              onClick={() => setUpdateContactModal(true)}
            />
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
      <UpdateContact
        contact={contact}
        dispatch={dispatch}
        show={updateContactModal}
        onHide={() => setUpdateContactModal(false)}
        close={setUpdateContactModal}
      />
    </>
  );
};

export default Contact;
