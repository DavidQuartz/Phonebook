import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { ContactsContext } from "../../ContactsContext/ContactsContext";
import ShowError from "../Utilities/ShowError";
import LoadingButton from "../Utilities/LoadingButton";
import Avatar from "../Avatar/Avatar";

const UpdateContact = ({ show, onHide, close, contact }) => {
  let { utils, dispatch } = useContext(ContactsContext);

  const { error, loading } = utils;

  const [contactForm, setContactForm] = useState({});

  useEffect(() => {
    setContactForm({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phoneNumber: contact.phoneNumber,
      address: contact.address,
      id: contact.id,
    });
  }, [contact]);

  const { firstName, lastName, phoneNumber, address } = contactForm;

  // to close the modal after contact it created
  const handleClose = () => close(false);

  const dispatchUpdate = (contact) => {
    dispatch({ type: "UPDATE_CONTACT", updatedContact: contactForm });
    handleClose();
  };

  const handleChange = (e) => {
    let { value, name } = e.target;

    // clear error and loading anytime user begins typing
    dispatch({ type: "UPDATE_LOADING", loading: false });
    dispatch({
      type: "UPDATE_ERROR",
      error: false,
    });

    setContactForm({ ...contactForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // clear error and loading anytime user submits form to keep feedback fresh
    dispatch({ type: "UPDATE_LOADING", loading: false });
    dispatch({
      type: "UPDATE_ERROR",
      error: false,
    });

    dispatchUpdate(contactForm);
  };

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
          <Avatar name={firstName} className="contact-circle large" />
        </Modal.Title>
      </Modal.Header>
      <form className="create-contact" onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <ShowError error={error} />}
          <div className="form-group">
            <div className="row">
              <div className="col-6">
                <input
                  required
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="form-control"
                />
              </div>
              <div className="col-6">
                <input
                  required
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-3">
            <input
              required
              type="tel"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              className="form-control"
              placeholder="Phone number"
            />
          </div>
          <div className="form-group mt-3">
            <input
              required
              type="email"
              name="address"
              value={address}
              onChange={handleChange}
              className="form-control"
              placeholder="Email Address"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {loading ? (
            <LoadingButton className="btn btn-primary" />
          ) : (
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          )}
          <button type="button" className="btn btn-outline" onClick={onHide}>
            Cancel
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

UpdateContact.propTypes = {
  close: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default UpdateContact;
