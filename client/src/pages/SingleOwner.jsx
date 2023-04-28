import React from "react";
import { Row, Col } from "react-bootstrap";

import UpdateOwner from "../components/UpdateOwner";
import ProfileCard from "../components/ProfileCard";
import OwnerLandHoldings from "../components/OwnerLandHoldings";
import NavBar from "../components/NavBar";

const SingleOwner = () => {
  return (
    <div>
      <NavBar />
      <div className="m-2">
        <Row>
          <Col lg={4}>
            <ProfileCard />
            <UpdateOwner />
          </Col>
          <Col lg={8}>
            <OwnerLandHoldings />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SingleOwner;
