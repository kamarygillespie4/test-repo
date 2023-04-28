import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";

const styles = {
  label: {
    fontWeight: "normal",
    borderBottom: "thin solid black",
    padding: "5% 0%",
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
  button: {
    marginTop: "4%",
    padding: "3%",
  },
};

var titleCase = function (str) {
  if (!str || typeof str !== "string") return "";

  var arr = str.split(" ");
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    newArr.push(arr[i].charAt(0).toUpperCase() + arr[i].slice(1));
  }
  return newArr.join(" ");
};

const LandHoldingCard = () => {
  const { ownerId, landHoldingId } = useParams();

  const [legalEntity, setLegalEntity] = useState("");
  const [netAcres, setNetAcres] = useState("");
  const [ownerRoyalty, setOwnerRoyalty] = useState("");
  const [section, setSection] = useState("");
  const [township, setTownship] = useState("");
  const [range, setRange] = useState("");
  const [titleSource, setTitleSource] = useState("");
  const [name, setName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [owner, setOwner] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/owners/${ownerId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((owner) => {
        setOwner(owner.name);
        console.log(owner.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ownerId]);

  useEffect(() => {
    fetch(`/api/owners/${ownerId}/landHoldings/${landHoldingId}`)
      .then((response) => response.json())
      .then((landHolding) => {
        setName(landHolding.name);
        setNetAcres(landHolding.netAcres);
        setOwnerRoyalty(landHolding.ownerRoyalty);
        setSection(landHolding.section);
        setTownship(landHolding.township);
        setRange(landHolding.range);
        setTitleSource(landHolding.titleSource);
        setSectionName(landHolding.sectionName);
        setLegalEntity(landHolding.legalEntity);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ownerId]);

  const deleteLandHolding = () => {
    if (window.confirm("Are you sure you want to delete this landholding?")) {
      fetch(`/api/owners/${ownerId}/landHoldings/${landHoldingId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          alert("Land Holding deleted successfully!");
          navigate(`/protected/owners/${ownerId}`);
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred while deleting the Land Holding.");
        });
    }
  };

  return (
    <div style={styles.container}>
      <div className="landHoldingCard" style={styles.form}>
        <h2 className="fs-4 fw-normal mb-3" style={styles.header}>
          {titleCase(sectionName)} - {titleCase(legalEntity)}
        </h2>
        <Row>
          <Col>
            <p style={styles.label}>
              <span style={styles.span}>Name: </span>
              {titleCase(name)}
            </p>
            <p style={styles.label}>
              <span style={styles.span}>Owner: </span>
              {titleCase(owner)}
            </p>
            <p style={styles.label}>
              <span style={styles.span}>Legal Entity: </span>
              {titleCase(legalEntity)}
            </p>
            <p style={styles.label}>
              <span style={styles.span}>Net Mineral Acres: </span>
              {titleCase(netAcres)}
            </p>
            <p style={styles.label}>
              <span style={styles.span}>Mineral Owner Royalty (%): </span>
              {ownerRoyalty}
            </p>
          </Col>
          <Col>
            <p style={styles.label}>
              <span style={styles.span}>Section Name: </span>
              {titleCase(sectionName)}
            </p>
            <p style={styles.label}>
              <span style={styles.span}>Section: </span>
              {section}
            </p>
            <p style={styles.label}>
              <span style={styles.span}>Township: </span>
              {titleCase(township)}
            </p>
            <p style={styles.label}>
              <span style={styles.span}>Range: </span>
              {range}
            </p>
            <p style={styles.label}>
              <span style={styles.span}>Title Source: </span>
              {titleCase(titleSource)}
            </p>
          </Col>
          <Button
            variant="danger"
            style={styles.button}
            type="submit"
            onClick={deleteLandHolding}
          >
            Delete Land Holding
          </Button>
        </Row>
      </div>
    </div>
  );
};

export default LandHoldingCard;
