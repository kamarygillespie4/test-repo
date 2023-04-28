import React from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import NavBar from "../components/NavBar";
import UpdateLandHolding from "../components/UpdateLandHolding";
import LandHoldingCard from "../components/LandHoldingCard";

const SingleLandHolding = () => {
  const { ownerId, landHoldingId } = useParams();

  const [owner, setOwner] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/owners/${ownerId}/landHoldings/${landHoldingId}`)
      .then((response) => response.json())
      .then((owner) => {
        setOwner(owner);
      })
      .catch((error) => {
        setError(error);
      });
  }, [ownerId]);
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!owner) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="m-2">
        <Row>
          <Col lg={6}>
            <LandHoldingCard />
          </Col>
          <Col lg={6}>
            <UpdateLandHolding />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SingleLandHolding;
