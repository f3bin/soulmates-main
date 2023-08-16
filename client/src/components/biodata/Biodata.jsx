import React from "react";
import jsPDF from "jspdf";


const Biodata = ({filteredSelfProfile,paramsUser}) => {

  const generateBiodataPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(12);

    const data = [
        { label: "Name", value: paramsUser.name },
        { label: "Age", value: filteredSelfProfile.age },
        { label: "email", value: paramsUser.email },
        { label: "phone", value: filteredSelfProfile.phone },
        { label: "place", value: filteredSelfProfile.city },
        { label: "religion", value: filteredSelfProfile.religion },
        { label: "height", value: filteredSelfProfile.height },
        { label: "gender", value: filteredSelfProfile.gender },
        { label: "diet", value: filteredSelfProfile.diet },
        { label: "highest-qualification", value: filteredSelfProfile.highestQualification },
        { label: "job-role", value: filteredSelfProfile.jobRole },
        { label: "works-at", value: filteredSelfProfile.worksAt },
        { label: "yearly-income", value: filteredSelfProfile.yearlyIncome },
      ];

    let yOffset = 10;

    data.forEach((item) => {
      doc.text(`${item.label}: ${item.value}`, 10, yOffset);
      yOffset += 10; // Increment the y-coordinate for the next item
    });     
    // Save the PDF to a file
    doc.save("biodata.pdf");
  };

  return (
    <div>
      <button onClick={generateBiodataPDF}>Download Biodata PDF</button>
    </div>
  );
};

export default Biodata;
