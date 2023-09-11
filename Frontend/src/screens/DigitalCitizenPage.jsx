import React, { useState } from "react";

const DigitalCitizenPage = () => {
  // State for input fields
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    village: "",
    thana: "",
    district: "",
    division: "",
    country: "",
    birthDate: "",
    deathDate: "",
  });

  // State for online voting
  const [voted, setVoted] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can process the form data or perform online voting here
    // For now, let's just set voted to true
    setVoted(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">
        Digital Citizen Registration
      </h1>
      {voted ? (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
          Thank you for voting!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border rounded p-2"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              {/* Add more input fields for fatherName, motherName, etc. */}
            </div>
          </div>

          {/* Address Information */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Address Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Village"
                className="border rounded p-2"
                value={formData.village}
                onChange={(e) =>
                  setFormData({ ...formData, village: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Thana"
                className="border rounded p-2"
                value={formData.thana}
                onChange={(e) =>
                  setFormData({ ...formData, thana: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="District"
                className="border rounded p-2"
                value={formData.district}
                onChange={(e) =>
                  setFormData({ ...formData, district: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Dates */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Important Dates</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                placeholder="Birth Date"
                className="border rounded p-2"
                value={formData.birthDate}
                onChange={(e) =>
                  setFormData({ ...formData, birthDate: e.target.value })
                }
                required
              />
              <input
                type="date"
                placeholder="Death Date"
                className="border rounded p-2"
                value={formData.deathDate}
                onChange={(e) =>
                  setFormData({ ...formData, deathDate: e.target.value })
                }
              />
            </div>
          </div>

          {/* Online Voting */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Online Voting</h2>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Vote Now
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DigitalCitizenPage;
