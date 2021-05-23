import { useState } from "react";

import Contacts from "../../components/Contacts/Contacts";
import CreateContact from "../../components/Contacts/CreateContact";

const Dashboard = () => {
  const [modalShow, setModalShow] = useState(false); // for createContact Modal

  return (
    <div className="dashboard">
      <CreateContact
        show={modalShow}
        onHide={() => setModalShow(false)}
        close={setModalShow}
      />
      <div className="row">
        <div className="col-md-4 col-lg-3 col-xl-2 d-none d-sm-none d-md-block d-xl-block d-lg-block">
          <div className="dashboard-buttons position-fixed">
            <button
              className="btn btn-primary"
              onClick={() => setModalShow(true)}
            >
              + Create contact
            </button>
            <button className="btn btn-secondary">Contacts</button>
          </div>
        </div>
        <div className="dashboard-contacts col-md-8 col-lg-9 col-xl-10 col-12">
          <div className="card">
            <div className="overflow-auto">
              <Contacts />
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-buttons d-block d-sm-block d-md-none d-xl-none d-lg-none">
        <div className="dashboard-buttons position-fixed">
          <button
            className="btn btn-primary mr-3"
            onClick={() => setModalShow(true)}
          >
            + Create
          </button>
          <button className="btn btn-secondary">Contacts</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
