const fs = require("fs");
const path = require("path");
const { topics, displayNames } = require("./topics");

// Create shared CSS if missing
const cssDir = "./styles";
const cssPath = path.join(cssDir, "topicPage.css");
if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir);
if (!fs.existsSync(cssPath)) {
    const cssContent = `
body { font-family: Arial, sans-serif; margin:0; padding:0; }
.breadcrumbs { font-size:14px; color:#0b577a; opacity:0.85; margin:24px; }
.breadcrumbs a { color:#0b577a; text-decoration:none; font-weight:600; }
.breadcrumbs a:hover { text-decoration:underline; }
.topic-title { font-size:28px; margin:6px 24px 20px 24px; }
.content { max-width:900px; line-height:1.6; padding:0 24px 24px 24px; }
.back-btn { margin-top:18px; display:inline-block; padding:10px 12px; background:#0b577a; color:white; border-radius:8px; text-decoration:none; }
`;
    fs.writeFileSync(cssPath, cssContent, "utf8");
    console.log("✔ Created shared CSS file:", cssPath);
}

// Helper
function toSlug(name) {
    return name.toLowerCase().replace(/&/g,"and").replace(/\//g,"-").replace(/ /g,"-");
}

function createFile(filePath, content) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("✔ Written:", filePath);
}

// Generate HTML
function generateHTML(topicTitle, discipline) {
    const disciplineTitle = displayNames[discipline] || (discipline.charAt(0).toUpperCase() + discipline.slice(1));
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${topicTitle}</title>
<link rel="stylesheet" href="../../styles/headerR.css">
<link rel="stylesheet" href="../../styles/topicPage.css">
</head>
<body>
<header>
  <div class="header-logo">
    <a href="../../homepage.html" onclick="resetMenuState();">
      <img src="../../images/NEXUS-Logo-Rev-2024.png" alt="Logo">
    </a>
  </div>
</header>
<div class="breadcrumbs">
  <a href="../../homepage.html" onclick="resetMenuState(); localStorage.setItem('menuPanel',1);">Home</a>
  &nbsp;→&nbsp;
  <a href="../../homepage.html" onclick="localStorage.setItem('menuPanel',2);">Technical Disciplines</a>
  &nbsp;→&nbsp;
  <a href="../../homepage.html" onclick="localStorage.setItem('selectedDiscipline','${discipline}'); localStorage.setItem('menuPanel',3);">${disciplineTitle}</a>
  &nbsp;→&nbsp;
  ${topicTitle}
</div>
<h1 class="topic-title">${topicTitle}</h1>
<div class="content">
    <p>Content coming soon for <strong>${topicTitle}</strong> in <em>${disciplineTitle}</em>.</p>
    <p>
      <a class="back-btn" href="../../homepage.html"
         onclick="localStorage.setItem('selectedDiscipline','${discipline}'); localStorage.setItem('menuPanel',3);">
         Return to Topics
      </a>
    </p>
    <hr style="margin:24px 0;">
    <p>— Topic content placeholder —</p>
</div>
<script>
function resetMenuState() {
    localStorage.removeItem('menuPanel');
    localStorage.removeItem('selectedDiscipline');
}
</script>
</body>
</html>`;
}

// Generate pages, always overwrite
const baseDir = "./disciplines";
if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir);

for (const discipline in topics) {
    const folder = path.join(baseDir, discipline);
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);

    topics[discipline].forEach(topic => {
        const slug = toSlug(topic);
        const filePath = path.join(folder, `${slug}.html`);
        createFile(filePath, generateHTML(topic, discipline));
    });
}

console.log("\n✔ All topic pages generated/updated successfully!\n");
