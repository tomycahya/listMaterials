🔷 SAP Fiori Application - Inventory Material Viewer
This project is a custom SAP Fiori application built using SAPUI5 framework with integration to SAP On-Premise OData services. The app provides a responsive and user-friendly interface for displaying and filtering inventory material data.

🚀 Technologies Used : <br>
<ul>
  <li>SAPUI5 (XML Views + MVC pattern)</li>
  <li>HTML5 (custom UI enhancements)</li>
  <li>CSS3 (for styling custom elements and responsiveness)</li>
  <li>JavaScript (event handling and UI logic)</li>
  <li>OData V2 (SAP On-Premise) for data retrieval via ABAP Gateway</li>
</ul>

📦 Features <br>
🔍 SmartFilterBar Integration
<ul>
  <li>Filter materials by Material No, Type, Group, Storage Location, etc.</li>
</ul>

📋 SmartTable with ResponsiveTable type
<ul>
  <li>Displays material list with growing scroll, sorting, filtering, and Excel export.</li>
</ul>

🧭 Row Navigation
<ul>
  <li>Tap or click on a material row to navigate to detailed view.</li>
</ul>

🔐 Login Validation
<ul>
  <li>Integrated login flow using OData service and session storage.</li>
</ul>

📱 Mobile & Tablet Friendly
<ul>
  <li>Fully responsive layout using SAP Fiori design principles and responsive containers.</li>
</ul>

⏳ Session Timeout Logic
<ul>
  <li>Auto logout after inactivity, with toast message and redirect.</li>
</ul>

🔗 Backend Integration <br>
<ul>
  <li>The frontend is tightly integrated with SAP On-Premise via OData V2, consuming a custom entity set built via SAP Gateway SEGW project</li>
</ul>

