import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { ContactsContext } from "../../ContactsContext/ContactsContext";
import { createContact } from "../../API_CALLS/mainAPIs";
import { isAuthenticated } from "../../API_CALLS/authAPIs";
import ShowError from "../Utilities/ShowError";
import LoadingButton from "../Utilities/LoadingButton";

const CreateContact = ({ show, onHide, close }) => {
  let { utils, dispatch } = useContext(ContactsContext);

  const { error, loading } = utils;

  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  });

  const { firstName, lastName, phoneNumber, address } = contactForm;

  // Get the user's access token
  var { token } = isAuthenticated();
  const accessToken = token.accessToken;

  // to close the modal after contact it created
  const handleClose = () => close(false);

  const sendContactToDatabase = (details) => {
    dispatch({ type: "UPDATE_LOADING", loading: true });
    dispatch({ type: "UPDATE_ERROR", error: "" });

    createContact(accessToken, details).then((data) => {
      if (!data) {
        dispatch({ type: "UPDATE_LOADING", loading: false });
        return dispatch({
          type: "UPDATE_ERROR",
          error:
            "Oops! We were unable to establish a connection to the server. Try again later.",
        });
      }

      // if there was an error
      if (data.code) {
        dispatch({ type: "UPDATE_LOADING", loading: false });
        return dispatch({
          type: "UPDATE_ERROR",
          error: data.message,
        });
      }
      // if contact is created successfully
      dispatch({ type: "UPDATE_LOADING", loading: false });
      dispatch({
        type: "UPDATE_ERROR",
        error: false,
      });

      dispatch({
        type: "ADD_CONTACT",
        newContact: {
          ...contactForm,
          id: data.id, // set the id to id from response payload
        },
      });

      setContactForm({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
      });
      handleClose();
    });
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
    sendContactToDatabase(contactForm);
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
          Add a new contact
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
              Create
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

CreateContact.propTypes = {
  close: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default CreateContact;
