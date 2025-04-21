import React, { useState } from "react";
import axios from "axios";
import "../components/Style/CreateActionPlan.css";

const CreateActionPlan = () => {
  const [formData, setFormData] = useState({
    designerName: "",
    roleAffiliation: "",
    projectName: "",
    mainChallenge: "",
    description: "",
    sdgs: [],
    impacts: [],
    reason: "",
    comparison: "",
    steps: ["", "", "", "", "", ""],
    resources: "",
    skills: "",
    avenues: "",
    risks: "",
    mitigation: "",
  });

  const sdgOptions = Array.from({ length: 17 }, (_, i) => `SDG ${i + 1}`);
  const impactTypes = [
    "Education Impact", "Research Impact", "Social Impact",
    "Local community Impact", "Commercial Impact", "Environmental Impact",
    "Family Impact", "Leadership Impact", "Policy Impact"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, key) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [key]: checked
        ? [...prev[key], value]
        : prev[key].filter(item => item !== value),
    }));
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...formData.steps];
    updatedSteps[index] = value;
    setFormData(prev => ({ ...prev, steps: updatedSteps }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("accessToken");

  if (!token) {
    alert("You must be logged in to submit an action plan.");
    return;
  }

  try {
    await axios.post(
      "http://localhost:8000/api/action-plans/",
      {
        designer_name: formData.designerName,
        role_and_org: formData.roleAffiliation,
        plan_name: formData.projectName,
        challenges: formData.mainChallenge,
        project_description: formData.description,
        sdg_goals: formData.sdgs,
        impact_types: formData.impacts,
        importance: formData.reason,
        similar_projects: formData.comparison,
        implementation_steps: formData.steps,
        resources_partners: formData.resources,
        required_skills: formData.skills,
        avenues: formData.avenues,
        risks: formData.risks,
        mitigation: formData.mitigation,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    alert("Action plan submitted!");
  } catch (err) {
    console.error("Submission failed:", err.response?.data || err.message);
    alert("Submission failed. See console for details.");
  }
};

  return (
    <div className="action-plan-container">
      <h2 className="section-title">Create Action Plan</h2>
      <form onSubmit={handleSubmit}>
        <div className="question-block">
          <label>Name of Designer(s)</label>
          <input name="designerName" value={formData.designerName} onChange={handleChange} />
        </div>

        <div className="question-block">
          <label>Current Role and Affiliation</label>
          <input name="roleAffiliation" value={formData.roleAffiliation} onChange={handleChange} />
        </div>

        <div className="question-block">
          <label>Name of Impact Project (max 10 words)</label>
          <input name="projectName" value={formData.projectName} onChange={handleChange} />
        </div>

        <div className="question-block">
          <label>Main Challenge Your Project Tries to Solve (max 50 words)</label>
          <textarea name="mainChallenge" value={formData.mainChallenge} onChange={handleChange} rows={2} />
        </div>

        <div className="question-block">
          <label>Description of Impact Project (max 200 words)</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={4} />
        </div>

        <div className="question-block">
          <label>Select Top 3 SDGs your project impacts</label>
          <div className="checkbox-group">
            {sdgOptions.map((sdg, index) => (
              <label key={index} className="checkbox-item">
                <input
                  type="checkbox"
                  value={sdg}
                  checked={formData.sdgs.includes(sdg)}
                  onChange={(e) => handleArrayChange(e, "sdgs")}
                />
                {sdg}
              </label>
            ))}
          </div>
        </div>

        <div className="question-block">
          <label>Types of Impact (pick top 3)</label>
          <div className="checkbox-group">
            {impactTypes.map((impact, index) => (
              <label key={index} className="checkbox-item">
                <input
                  type="checkbox"
                  value={impact}
                  checked={formData.impacts.includes(impact)}
                  onChange={(e) => handleArrayChange(e, "impacts")}
                />
                {impact}
              </label>
            ))}
          </div>
        </div>

        <div className="question-block">
          <label>Why is the impact project important? (max 200 words)</label>
          <textarea name="reason" value={formData.reason} onChange={handleChange} rows={4} />
        </div>

        <div className="question-block">
          <label>Provide a similar impact example and compare (max 200 words)</label>
          <textarea name="comparison" value={formData.comparison} onChange={handleChange} rows={4} />
        </div>

        <div className="question-block">
          <label>Implementation Steps (up to 6, max 100 words each)</label>
          {formData.steps.map((step, index) => (
            <textarea
              key={index}
              placeholder={`Step ${index + 1}`}
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              rows={2}
              style={{ marginBottom: "10px" }}
            />
          ))}
        </div>

        <div className="question-block">
          <label>Top 3 resources or partnerships required (max 200 words)</label>
          <textarea name="resources" value={formData.resources} onChange={handleChange} rows={4} />
        </div>

        <div className="question-block">
          <label>Top 3 skills and capabilities required (max 200 words)</label>
          <textarea name="skills" value={formData.skills} onChange={handleChange} rows={4} />
        </div>

        <div className="question-block">
          <label>Top 3 impact avenues to demonstrate impact (max 200 words)</label>
          <textarea name="avenues" value={formData.avenues} onChange={handleChange} rows={4} />
        </div>

        <div className="question-block">
          <label>Top 3 risks or inhibitors (max 200 words)</label>
          <textarea name="risks" value={formData.risks} onChange={handleChange} rows={4} />
        </div>

        <div className="question-block">
          <label>Mitigation strategies for the risks (max 200 words)</label>
          <textarea name="mitigation" value={formData.mitigation} onChange={handleChange} rows={4} />
        </div>

        <button type="submit" className="submit-button">Submit Action Plan</button>
      </form>
    </div>
  );
};

export default CreateActionPlan;
