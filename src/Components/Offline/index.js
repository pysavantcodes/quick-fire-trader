import React from "react";

const Offline = () => {
  return (
    <div className="container-fluid position-fixed">
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center py-2 px-5">
            You are Currently Offline, <br /> try reconnecting.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Offline;
