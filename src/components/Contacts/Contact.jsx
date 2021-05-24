import { useState } from "react";
import UpdateContact from "./UpdateContact";
import Avatar from "../Avatar/Avatar";
import ViewContact from "./ViewContact";

const Contact = ({ contact, dispatch }) => {
  const [updateContactModal, setUpdateContactModal] = useState(false); // for createContact Modal
  const [viewContactModal, setViewContactModal] = useState(false); // for viewContact Modal

  return (
    <>
      <tr
        className="contact-row"
        onClick={(e) =>
          e.target.tagName.toLowerCase() !== "i" && setViewContactModal(true)
        }
      >
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
              value="edit"
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
        show={updateContactModal}
        onHide={() => setUpdateContactModal(false)}
        close={setUpdateContactModal}
      />
      <ViewContact
        contact={contact}
        show={viewContactModal}
        onHide={() => setViewContactModal(false)}
        close={setViewContactModal}
        setUpdateContactModal={setUpdateContactModal}
      />
    </>
  );
};

export default Contact;
