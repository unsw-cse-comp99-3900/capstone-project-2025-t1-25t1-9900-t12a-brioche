import React, { useState } from "react";
import axios from "axios";
import "../components/Style/CreateActionPlan.css";
import PptxGenJS from "pptxgenjs";

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
  const handleExportPPT = () => {
      const pptx = new PptxGenJS();
      const safe = (val) => (typeof val === "string" ? val : val ? String(val) : "-");
    
      const titleStyle = { fontSize: 20, bold: true, x: 0.5, y: 0.4 };
      const labelStyle = { fontSize: 12, bold: true, color: "333333" };
      const textStyle = { fontSize: 11, color: "444444" };
      const addHeaderFooter = (slide, pageNum) => {
        // 顶部横条
        slide.addShape(pptx.ShapeType.rect, {
          x: 0, y: 0, w: 10, h: 0.2,
          fill: { color: "007ACC" }
        });
        // 页码
        slide.addText(`Page ${pageNum}`, {
          x: 8.6, y: 6.8,
          fontSize: 10,
          color: "888888"
        });
      };
    
      let page = 1;
    
      // ===== Slide 1: Summary =====
      const slide1 = pptx.addSlide();
      addHeaderFooter(slide1, page++);
      slide1.addText("Action Plan Summary", titleStyle);
    
      const summaryPairs = [
        ["Project Name", formData.projectName],
        ["Designer", formData.designerName],
        ["Role & Affiliation", formData.roleAffiliation],
        ["Date", new Date().toLocaleDateString()]
      ];
      summaryPairs.forEach((pair, i) => {
        const [label, value] = pair;
        const x = i % 2 === 0 ? 0.5 : 5;
        const y = 1.0 + Math.floor(i / 2) * 0.5;
        slide1.addText(`${label}: ${safe(value)}`, {
          x, y, w: 4.4, fontSize: 11, color: "333333"
        });
      });
    
      const descriptionFields = [
        ["Main Challenge", formData.mainChallenge],
        ["Project Description", formData.description],
        ["Why Important", formData.reason],
        ["Example & Compare", formData.comparison]
      ];
      descriptionFields.forEach(([label, value], i) => {
        slide1.addText([
          { text: `${label}\n`, options: labelStyle },
          { text: safe(value), options: textStyle }
        ], {
          x: 0.5 + (i % 2) * 4.5,
          y: 2.2 + Math.floor(i / 2) * 1.4,
          w: 4.2, h: 1.5, margin: 0.1
        });
      });
    
      // ===== Slide 2: SDG & Impact =====
      const slide2 = pptx.addSlide();
      addHeaderFooter(slide2, page++);
      slide2.addText("Selected SDGs and Types of Impact", titleStyle);
    
      slide2.addText("SDG Goals:", { ...labelStyle, x: 0.5, y: 1.0 });
      (formData.selectedSDGs || []).forEach((goal, i) => {
        slide2.addText(`• ${goal}`, { ...textStyle, x: 0.7, y: 1.3 + i * 0.3 });
      });
    
      slide2.addText("Impact Types:", { ...labelStyle, x: 5, y: 1.0 });
      (formData.selectedImpacts || []).forEach((impact, i) => {
        slide2.addText(`• ${impact}`, { ...textStyle, x: 5.2, y: 1.3 + i * 0.3 });
      });
    
      // 插入 SDG logo（远程图）
      slide2.addImage({
        x: 7.5, y: 0.3, w: 2, h: 2,
        url: "https://sdgs.un.org/sites/default/files/2020-09/SDG_Logo_Color_0.png"
      });
    
      // ===== Slide 3: Roadmap =====
      const slide3 = pptx.addSlide();
      addHeaderFooter(slide3, page++);
      slide3.addText("Implementation Roadmap", titleStyle);
      const steps = formData.steps || [];
    
      const roadmapColors = ["DCEEF7", "D9EAD3", "FFF2CC", "F4CCCC", "EAD1DC", "CFE2F3"];
    
      steps.forEach((step, index) => {
        const boxHeight = 0.6;
        const yPos = 1.0 + index * (boxHeight + 0.2);
        slide3.addShape(pptx.ShapeType.roundRect, {
          x: 0.5,
          y: yPos,
          w: 9,
          h: boxHeight,
          fill: { color: roadmapColors[index % roadmapColors.length] },
          line: { color: "AAAAAA" },
          round: true,
        });
        slide3.addText(`Step ${index + 1}: ${safe(step)}`, {
          x: 0.6,
          y: yPos + 0.15,
          w: 8.8,
          fontSize: 11,
          color: "222222"
        });
      });
    
      // ===== Slide 4: Resources / Risks =====
      const slide4 = pptx.addSlide();
      addHeaderFooter(slide4, page++);
      slide4.addText("Resources, Skills & Mitigation", titleStyle);
    
      const analysisFields = [
        ["Resources Needed", formData.resources],
        ["Skills Required", formData.skills],
        ["Impact Avenues", formData.avenues],
        ["Risks", formData.risks],
        ["Mitigation", formData.mitigation]
      ];
      analysisFields.forEach(([label, value], i) => {
        slide4.addText([
          { text: `${label}\n`, options: labelStyle },
          { text: safe(value), options: textStyle }
        ], {
          x: 0.5 + (i % 2) * 4.5,
          y: 1.0 + Math.floor(i / 2) * 1.5,
          w: 4.2, h: 1.5, margin: 0.1
        });
      });
    
      pptx.writeFile("ActionPlan.pptx");
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
        <button type="button" onClick={handleExportPPT} className="submit-button" style={{ marginTop: "12px" }}>
            Export as PPT
        </button>
      </form>
    </div>
  );
};

export default CreateActionPlan;
