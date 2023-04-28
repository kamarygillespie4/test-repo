import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";

const styles = {
  question: {
    display: "flex",
    flexDirection: "column",
    margin: "3% 1% 1% 1%",
    padding: "1%",
    borderBottom: "thin solid #ececec",
    borderRight: "thin solid #ececec",
    borderRadius: "10px",
  },
  label: {
    fontWeight: "normal",
  },
  button: {
    margin: "2%",
    padding: "3%",
  },
  container: {
    border: "1px  solid lightGray ",
    borderRadius: "10px",
    margin: "2%",
  },
  form: {
    padding: "5%",
  },
  header: {
    borderBottom: " double black",
    paddingBottom: "3%",
  },
};

const UpdateLandHolding = (props) => {
  const { ownerId, landHoldingId } = useParams();
  const navigate = useNavigate();

  const [legalEntity, setLegalEntity] = useState("");
  const [netAcres, setNetAcres] = useState("");
  const [ownerRoyalty, setOwnerRoyalty] = useState("");
  const [section, setSection] = useState("");
  const [township, setTownship] = useState("");
  const [range, setRange] = useState("");
  const [titleSource, setTitleSource] = useState("");

  const sectionName = section + "-" + township + "-" + range;
  const name = sectionName + "-" + legalEntity;

  const validateInput = () => {
    const errors = [];
    if (section && !section.match(/^\d{3}$/)) {
      errors.push("Section must be a 3-digit number.");
    }
    if (!township.match(/^\d{3}[NS]$/)) {
      errors.push('Township must be a 3-digit number followed by "N" or "S".');
    }
    if (!range.match(/^\d{3}[EW]$/)) {
      errors.push('Range must be a 3-digit number followed by "E" or "W".');
    }
    return errors;
  };

  useEffect(() => {
    fetch(`/api/owners/${ownerId}/landHoldings/${landHoldingId}`)
      .then((response) => response.json())
      .then((landHolding) => {
        setNetAcres(landHolding.netAcres);
        setOwnerRoyalty(landHolding.ownerRoyalty);
        setSection(landHolding.section);
        setTownship(landHolding.township);
        setRange(landHolding.range);
        setTitleSource(landHolding.titleSource);

        setLegalEntity(landHolding.legalEntity);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ownerId]);

  const handleSubmit = (e) => {
    console.log(legalEntity);
    console.log(netAcres);
    console.log(ownerRoyalty);
    console.log(section);
    console.log(township);
    console.log(range);
    console.log(titleSource);
    console.log(sectionName);
    console.log(name);
    const errors = validateInput();
    if (errors.length > 0) {
      alert(`Invalid input: ${errors.join("\n")}`);
      return;
    }
    const formData = {
      legalEntity,
      netAcres,
      ownerRoyalty,
      section,
      township,
      range,
      titleSource,
      sectionName,
      name,
    };
    fetch(`/api/owners/${ownerId}/landHoldings/${landHoldingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((landHolding) => {
        console.log(landHolding);
        navigate(`/protected/owners/${ownerId}/landHoldings/${landHoldingId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div style={styles.container}>
        <form
          className="landHoldingForm"
          style={styles.form}
          onSubmit={handleSubmit}
        >
          <h2 className="fs-4 fw-normal " style={styles.header}>
            Update Land Holding
          </h2>
          <Row>
            <Col>
              <div style={styles.question}>
                <label htmlFor="legalEntity">Legal Entity</label>
                <input
                  value={legalEntity}
                  onChange={(e) => setLegalEntity(e.target.value)}
                  type="text"
                  placeholder="Legal entity"
                  id="legalEntity"
                  name="legalEntity"
                />
              </div>
              <div style={styles.question}>
                <label htmlFor="netAcres" style={styles.label}>
                  Net Mineral Acres
                </label>
                <input
                  value={netAcres}
                  onChange={(e) => setNetAcres(e.target.value)}
                  type="text"
                  placeholder="Net Mineral Acres"
                  id="netAcres"
                  name="netAcres"
                />
              </div>
              <div style={styles.question}>
                <label htmlFor="ownerRoyalty" style={styles.label}>
                  Mineral Owner Royalty (%)
                </label>
                <input
                  value={ownerRoyalty}
                  onChange={(e) => setOwnerRoyalty(e.target.value)}
                  type="text"
                  placeholder="Mineral Owner Royalty"
                  id="ownerRoyalty"
                  name="ownerRoyalty"
                />
              </div>
              <div style={styles.question}>
                <label htmlFor="section" style={styles.label}>
                  Section
                </label>
                <input
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  type="text"
                  placeholder="Section"
                  id="section"
                  name="section"
                />
              </div>
            </Col>
            <Col>
              <div style={styles.question}>
                <label htmlFor="township" style={styles.label}>
                  Township
                </label>
                <input
                  value={township}
                  onChange={(e) => setTownship(e.target.value)}
                  type="text"
                  placeholder="Township"
                  id="township"
                  name="township"
                />
              </div>
              <div style={styles.question}>
                <label htmlFor="range" style={styles.label}>
                  Range
                </label>
                <input
                  value={range}
                  onChange={(e) => setRange(e.target.value)}
                  type="text"
                  placeholder="Range"
                  id="range"
                  name="range"
                />
              </div>
              <div style={styles.question}>
                <label htmlFor="titleSource" style={styles.label}>
                  Title Source
                </label>
                <div>
                  <input
                    type="radio"
                    name="titleSource"
                    value="Class A"
                    id="classA"
                    onChange={(e) => setTitleSource(e.target.value)}
                  />
                  <label htmlFor="classA">Class A</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="titleSource"
                    value="Class B"
                    id="classB"
                    onChange={(e) => setTitleSource(e.target.value)}
                  />
                  <label htmlFor="classB">Class B</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="titleSource"
                    value="Class C"
                    id="classC"
                    onChange={(e) => setTitleSource(e.target.value)}
                  />
                  <label htmlFor="classC">Class C</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="titleSource"
                    value="Class D"
                    id="classD"
                    onChange={(e) => setTitleSource(e.target.value)}
                  />
                  <label htmlFor="classD">Class D</label>
                </div>
              </div>
            </Col>
          </Row>
          <Button type="submit" variant="primary" style={styles.button}>
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateLandHolding;
