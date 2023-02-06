import React from "react";
import clsx from "clsx";

type Props = {
  data: {
    firstNameLastName: string;
    jobTitle: string;
    emailAddress: string;
  };
  selected?: boolean;
  onClick?: (_:any) => void;
};

function PersonInfo(props: Props) {
  const { data } = props;
  return (
    <div
      className={clsx("person-info", props.selected && "selected")}
      onClick={props.onClick}
    >
      <div className="firstNameLastName">{data.firstNameLastName}</div>
      <div className="jobTitle">{data.jobTitle}</div>
      <div className="emailAddress">{data.emailAddress}</div>
    </div>
  );
}

export default PersonInfo;
