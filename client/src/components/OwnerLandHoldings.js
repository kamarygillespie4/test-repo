import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Col, Row } from "react-bootstrap";

const styles = {
  button: {
    margin: "2%",
    padding: "3%",
  },
  container: {
    border: "1px  solid lightGray ",
    borderRadius: "10px",
    margin: "1%",
  },

  form: {
    padding: "1% 3% 1% 3%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: " double black",
  },
  empty: {
    padding: "3%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

var titleCase = function (str) {
  if (!str) return "";

  var arr = str.split(" ");
  var newArr = [];

  for (var i = 0; i < arr.length; i++) {
    newArr.push(arr[i].charAt(0).toUpperCase() + arr[i].slice(1));
  }

  return newArr.join(" ");
};

function LandHoldingCard(props) {
  const { landHolding, ownerId } = props;

  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(
      `/protected/owners/${ownerId}/landHoldings/${props.landHoldingId}`
    );
  };

  return (
    <div className="owner-card">
      <div className="m-3">
        <Card.Body className="m-1">
          <Card.Title className="mb-3">
            Section Name: {titleCase(landHolding.sectionName)}
          </Card.Title>
          <Row className="mb-3 fs-6">
            <Col lg={3}>
              <Card.Text>
                Legal Entity: {titleCase(landHolding.legalEntity)}
              </Card.Text>
              <Card.Text>Net Acres: {landHolding.netAcres}</Card.Text>
            </Col>
            <Col lg={3}>
              <Card.Text>Owner Royalty: {landHolding.ownerRoyalty}</Card.Text>
              <Card.Text>Section: {landHolding.section}</Card.Text>
            </Col>
            <Col lg={3}>
              <Card.Text>Township: {landHolding.township}</Card.Text>
              <Card.Text>Range: {landHolding.range}</Card.Text>
            </Col>
            <Col lg={3}>
              <Card.Text>Title Source: {landHolding.titleSource}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </div>
      <div className="text-muted">
        <Card.Footer className="h-100 d-flex flex-column ">
          <Button
            variant="dark"
            style={styles.button}
            onClick={handleViewClick}
          >
            View
          </Button>
        </Card.Footer>
      </div>
    </div>
  );
}

const OwnerLandHoldings = (props) => {
  const { ownerId } = useParams();
  const [owner, setOwner] = useState(null);
  const [landHoldings, setLandHoldings] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/owners/${ownerId}`)
      .then((response) => response.json())
      .then((owner) => {
        setOwner(owner);
        setLandHoldings(owner.landHoldings);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ownerId]);

  const handleAddLandHolding = () => {
    navigate(`/protected/owners/${ownerId}/landHoldings`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 className="fs-4 fw-normal">Land Holdings</h2>

        <Button
          variant="primary"
          onClick={handleAddLandHolding}
          style={styles.button}
        >
          Add Land Holding
        </Button>
      </div>
      <div>
        {owner && owner.landHoldings && owner.landHoldings.length > 0 ? (
          owner.landHoldings.map((landHolding) => (
            <div style={styles.container}>
              <LandHoldingCard
                landHolding={landHolding}
                ownerId={ownerId}
                landHoldingId={landHolding._id}
              />
            </div>
          ))
        ) : (
          <div style={styles.empty}>
            <p>This owner has no land holdings</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerLandHoldings;
