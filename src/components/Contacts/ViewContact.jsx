import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { ContactsContext } from "../../ContactsContext/ContactsContext";
import Avatar from "../Avatar/Avatar";

const ViewContact = ({
  show,
  onHide,
  close,
  contact,
  setUpdateContactModal,
}) => {
  let { utils, dispatch } = useContext(ContactsContext);

  const [person, setPerson] = useState({});

  useEffect(() => {
    setPerson({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phoneNumber: contact.phoneNumber,
      address: contact.address,
      id: contact.id,
    });
  }, [contact]);

  const { firstName, lastName, phoneNumber, address } = person;

  // to close the modal
  const handleClose = () => close(false);

  return (
    <Modal
      animation={false}
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="viewContact-icons">
            <div>
              <i
                className="fas fa-pencil-alt"
                onClick={() => {
                  setUpdateContactModal(true);
                  handleClose();
                }}
              />
              <i
                className="far fa-trash-alt"
                onClick={() => {
                  dispatch({
                    type: "DELETE_CONTACT",
                    id: contact.id,
                  });
                  handleClose();
                }}
              />
              <i className="fas fa-times" onClick={handleClose} />
            </div>
          </div>
          <div className="d-flex">
            <Avatar name={firstName} className="contact-circle m-3" />
            <h2 className="m-3">
              {firstName} {lastName}
            </h2>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <hr />
        <p>Phone: {phoneNumber}</p>
        <p>Email address: {address}</p>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

ViewContact.propTypes = {
  close: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default ViewContact;
