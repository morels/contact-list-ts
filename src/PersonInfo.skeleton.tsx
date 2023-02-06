import React from "react";

function PersonInfoSkeleton() {
  return (
    <div className="person-info skeleton">
      <div className="head">
        <div className="avatar skeleton-animated" />
        <div className="wrapper">
          <div className="firstNameLastName skeleton-animated" />
          <div className="jobTitle skeleton-animated" />
        </div>
      </div>
      <div className="emailAddress skeleton-animated" />
    </div>
  );
}

export default PersonInfoSkeleton;
