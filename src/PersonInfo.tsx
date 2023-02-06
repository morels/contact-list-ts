import React from "react";
import clsx from "clsx";
import logo from './avatar.svg';

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
      <div className="head">
        <img src={logo} className="avatar" alt="logo" />
        <div className="wrapper">
          <div className="firstNameLastName text-ellipsible">{data.firstNameLastName}</div>
          <div className="jobTitle text-ellipsible">{data.jobTitle}</div>
        </div>
      </div>
      <div className="emailAddress">{data.emailAddress}</div>
    </div>
  );
}

export default PersonInfo;
