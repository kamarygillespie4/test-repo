import React, { useState, useEffect } from "react";
import { Button, CardGroup, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const styles = {
  label: {
    fontWeight: "normal",
    borderBottom: "thin solid black",
    padding: "1% 0% 2% 0%",
  },
  title: {
    padding: "0% 3% 2% 0%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: " double black",
  },
  container: {
    margin: "2%",
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

function titleCase(str) {
  if (!str) {
    return "";
  }
  var arr = str.split(" ");
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    newArr.push(arr[i].charAt(0).toUpperCase() + arr[i].slice(1));
  }
  return newArr.join(" ");
}

function OwnerCard(props) {
  const { name, entityType, ownerType, address, ownerId } = props;
  const navigate = useNavigate();

  const handleViewOwner = () => {
    navigate(`/protected/owners/${ownerId}`);
  };

  return (
    <div style={styles.container}>
      <div className="ownerForm" style={styles.form}>
        <h2 className="fs-4 fw-normal mb-3" style={styles.header}>
          {titleCase(name)}
        </h2>
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
        <Button onClick={handleViewOwner} variant="dark">
          View Owner
        </Button>
      </div>
    </div>
  );
}

const AllOwners = (props) => {
  //const { ownerId } = props;
  const [owners, setOwners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/owners")
      .then((response) => response.json())
      .then((data) => setOwners(data));
  }, []);

  const handleAddOwner = () => {
    navigate(`/protected/ownerForm`);
  };
  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <div style={styles.title}>
          <h2>Viewing All Owners</h2>
          <Button
            variant="primary"
            onClick={handleAddOwner}
            style={styles.button}
          >
            Add Owner
          </Button>
        </div>
        <CardGroup>
          {owners.map((owner) => (
            <div className="col-md-6 col-lg-3 col-sm-12 my-3" key={owner._id}>
              <Card className="h-100 m-2">
                <OwnerCard
                  name={owner.name}
                  address={owner.address}
                  entityType={owner.entityType}
                  ownerType={owner.ownerType}
                  numberOfHoldings={owner.numberOfHoldings}
                  ownerId={owner._id}
                />
              </Card>
            </div>
          ))}
        </CardGroup>
      </div>
    </div>
  );
};

export default AllOwners;
