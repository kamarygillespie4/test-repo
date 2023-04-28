import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const styles = {
  label: {
    fontWeight: "normal",
    borderBottom: "thin solid black",
    padding: "1% 0% 2% 0%",
  },
  container: {
    border: "1px  solid lightGray ",
    margin: "2%",
    borderRadius: "10px",
  },
  form: {
    padding: "5%",
  },
  header: {
    borderBottom: " double black",
    paddingBottom: "3%",
  },
  span: {
    fontWeight: "bold",
    borderRadius: "5px",
    background: "#f5f5f5",
    padding: "1%",
    marginRight: "2%",
  },
};

const titleCase = function (str) {
  if (!str) {
    return "";
  }
  var arr = str.split(" ");
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    newArr.push(arr[i].charAt(0).toUpperCase() + arr[i].slice(1));
  }
  return newArr.join(" ");
};

const ProfileCard = (props) => {
  const { ownerId } = useParams();

  const [name, setName] = useState("");
  const [entityType, setEntityType] = useState("");
  const [ownerType, setOwnerType] = useState("");
  const [address, setAddress] = useState("");
  const [landHoldingCount, setLandHoldingCount] = useState(0);

  useEffect(() => {
    fetch(`/api/owners/${ownerId}`)
      .then((response) => response.json())
      .then((owner) => {
        setName(owner.name);
        setEntityType(owner.entityType);
        setOwnerType(owner.ownerType);
        setAddress(owner.address);
        setLandHoldingCount(owner.landHoldingCount);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ownerId]);

  return (
    <div style={styles.container}>
      <div className="ownerForm" style={styles.form}>
        <h2 className="fs-4 fw-normal mb-3" style={styles.header}>
          {titleCase(name)}'s Profile
        </h2>
        <p style={styles.label}>
          <span style={styles.span}>Land Holdings: </span>
          {landHoldingCount}
        </p>
        <p style={styles.label}>
          <span style={styles.span}>Entity Type: </span>
          {titleCase(entityType)}
        </p>
        <p style={styles.label}>
          <span style={styles.span}>Owner Type: </span>
          {titleCase(ownerType)}
        </p>
        <p style={styles.label}>
          <span style={styles.span}>Address: </span>
          {titleCase(address)}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
