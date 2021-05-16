import React, { Fragment } from "react";

export default function SelectCarrera() {
  return (
    <Fragment>
  <div className="row">
  <div className="col-md-12">

    <select className="mdb-select colorful-select dropdown-primary md-form" multiple>
      <option value="" disabled selected>Choose your country</option>
      <option value="1">USA</option>
      <option value="2">Germany</option>
      <option value="3">France</option>
      <option value="4">Poland</option>
      <option value="5">Japan</option>
    </select>
    <label className="mdb-main-label">Label example</label>
    <button className="btn-save btn btn-primary btn-sm">Save</button>

  </div>
</div>
    </Fragment>
  );
}
