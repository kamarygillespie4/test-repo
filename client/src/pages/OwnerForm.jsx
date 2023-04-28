import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
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
const OwnerForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [entityType, setEntityType] = useState("");
  const [ownerType, setOwnerType] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(entityType);
    console.log(ownerType);
    console.log(address);

    const formData = {
      name,
      entityType,
      ownerType,
      address,
    };

    fetch("/api/owners", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 409) {
          return response.json().then((data) => {
            window.alert(data.message);
          });
        } else if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "There is already an owner with that same name and address."
          );
        }
      })
      .then((owner) => {
        console.log(owner);
        if (owner) {
          navigate(`/protected/owners/${owner._id}`);
        }
      })
      .catch((error) => {
        console.error(error);
        window.alert(error.message);
      });
  };
  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <div style={styles.form}>
          <form className="ownerForm" onSubmit={handleSubmit}>
            <div style={styles.header}>
              <h2 className="fs-4 ">Create Owner</h2>
            </div>

            <div style={styles.question}>
              <label htmlFor="name" style={styles.label}>
                Enter Owner Name:
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Owner name"
                id="name"
                name="name"
              />
            </div>
            <div style={styles.question}>
              <label htmlFor="entityType" style={styles.label}>
                Select Entity Type:
              </label>
              <div>
                <input
                  type="radio"
                  name="entityType"
                  value="company"
                  id="company"
                  onChange={(e) => setEntityType(e.target.value)}
                />
                <label htmlFor="company">Company</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="entityType"
                  value="individual"
                  id="individual"
                  onChange={(e) => setEntityType(e.target.value)}
                />
                <label htmlFor="individual">Individual</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="entityType"
                  value="investor"
                  id="investor"
                  onChange={(e) => setEntityType(e.target.value)}
                />
                <label htmlFor="investor">Investor</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="entityType"
                  value="trust"
                  id="trust"
                  onChange={(e) => setEntityType(e.target.value)}
                />
                <label htmlFor="trust">Trust</label>
              </div>
            </div>

            <div style={styles.question}>
              <label htmlFor="ownerType" style={styles.label}>
                Select Owner Type:
              </label>
              <div>
                <input
                  type="radio"
                  name="ownerType"
                  value="competitor"
                  id="competitor"
                  onChange={(e) => setOwnerType(e.target.value)}
                />
                <label htmlFor="competitor">Competitor</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="ownerType"
                  value="seller"
                  id="seller"
                  onChange={(e) => setOwnerType(e.target.value)}
                />
                <label htmlFor="seller">Seller</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="ownerType"
                  value="investor"
                  id="investor"
                  onChange={(e) => setOwnerType(e.target.value)}
                />
                <label htmlFor="investor">Investor</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="ownerType"
                  value="professional"
                  id="professional"
                  onChange={(e) => setOwnerType(e.target.value)}
                />
                <label htmlFor="professional">Professional</label>
              </div>
            </div>
            <div style={styles.question}>
              <label htmlFor="address" style={styles.label}>
                Enter Address:
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="address"
                id="address"
                name="address"
              />
            </div>

            <Button onClick={handleSubmit} style={styles.button}>
              Create
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OwnerForm;
