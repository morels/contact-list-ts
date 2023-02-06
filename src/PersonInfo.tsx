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
    <article
      className={clsx("person-info", props.selected && "selected")}
      onClick={props.onClick}
    >
      <div className="head">
        <img src={logo} className="avatar" alt="logo" />
        <div className="wrapper">
          <p className="firstNameLastName text-ellipsible">{data.firstNameLastName}</p>
          <p className="jobTitle text-ellipsible">{data.jobTitle}</p>
        </div>
      </div>
      <p className="emailAddress">{data.emailAddress}</p>
    </article>
  );
}

export default PersonInfo;
