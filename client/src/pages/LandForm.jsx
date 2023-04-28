import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

const styles = {
  question: {
    display: "flex",
    flexDirection: "column",
    margin: "2%",
  },
  header: {
    marginBottom: "1%",
    fontWeight: "bolder",
  },
  label: {
    fontWeight: "normal",
  },
  button: {
    float: "left",
    background: "blue",
    color: "white",
    width: "100%",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    marginTop: "2%",
    padding: "2%",
  },
  container: {
    border: "1px  solid lightGray ",
    borderRadius: "10px",
    margin: "2%",
  },
  form: {
    padding: "5%",
  },
};
const LandForm = () => {
  const { ownerId } = useParams();

  const [legalEntity, setLegalEntity] = useState("");
  const [netAcres, setNetAcres] = useState("");
  const [ownerRoyalty, setOwnerRoyalty] = useState("");
  const [section, setSection] = useState("");
  const [township, setTownship] = useState("");
  const [range, setRange] = useState("");
  const [titleSource, setTitleSource] = useState("");

  const sectionName = section + "-" + township + "-" + range;
  const name = sectionName + " " + legalEntity;

  const navigate = useNavigate();
  const validateInput = () => {
    const errors = [];

    if (!section.match(/^\d{3}$/)) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
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
    fetch(`/api/owners/${ownerId}/landHoldings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

    navigate(`/protected/owners/${ownerId}`);
  };

  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <div style={styles.form}>
          <form className="landHoldingForm">
            <div style={styles.header}>
              <h2 className="fs-4 ">Create Land Holding</h2>
            </div>
            <div style={styles.question}>
              <label htmlFor="legalEntity" style={styles.label}>
                Legal Entity
              </label>
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
              <label style={styles.label}>Title Source</label>
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
                  id="classb"
                  onChange={(e) => setTitleSource(e.target.value)}
                />
                <label htmlFor="classb">Class B</label>
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

            <button onClick={handleSubmit} type="submit" style={styles.button}>
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandForm;
