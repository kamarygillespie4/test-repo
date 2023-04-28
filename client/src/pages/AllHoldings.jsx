import React, { useState, useEffect } from "react";
import Navbar from "./../components/NavBar";
import { CardGroup, Card } from "react-bootstrap";

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
    fontSize: "small",
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

function AllHoldings() {
  const [landHoldings, setLandHoldings] = useState([]);

  useEffect(() => {
    fetch("/api/owners/landHoldings")
      .then((res) => res.json())
      .then((data) => setLandHoldings(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.title}>
          <h2>Viewing All Land Holdings</h2>
        </div>
        <CardGroup>
          {landHoldings && landHoldings.length === 0 && (
            <p>No land holdings found.</p>
          )}
          {Array.isArray(landHoldings) &&
            landHoldings.map((landHolding) => (
              <div
                className="col-md-6 col-lg-3 col-sm-12 my-3"
                key={landHolding._id}
              >
                <Card className="h-100 m-2">
                  <div style={styles.container}>
                    <div className="ownerForm" style={styles.form}>
                      <h2 className="fs-5 fw-normal mb-3" style={styles.header}>
                        {titleCase(landHolding.name)}
                      </h2>
                      <p style={styles.label}>
                        <span style={styles.span}>Legal Entity:</span>{" "}
                        {landHolding.legalEntity}
                      </p>
                      <p style={styles.label}>
                        <span style={styles.span}>Net Acres:</span>{" "}
                        {landHolding.netAcres}
                      </p>
                      <p style={styles.label}>
                        <span style={styles.span}>Owner Royalty:</span>{" "}
                        {landHolding.ownerRoyalty}
                      </p>

                      <p style={styles.label}>
                        <span style={styles.span}>Title Source:</span>{" "}
                        {landHolding.titleSource}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
        </CardGroup>
      </div>
    </div>
  );
}

export default AllHoldings;
