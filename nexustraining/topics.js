// scripts/topics.js
const topics = {
    process: [
        "P&ID Development",
        "Equipment Sizing",
        "Heat & Material Balances",
        "Hydraulics",
        "PSVs",
        "Valves",
        "Pumps",
        "Instruments"
    ],
    piping: ["3D Modeling", "Specs", "Fittings", "Flanges", "Valves"],
    mechanical: [
        "ASME Vessels",
        "API Tanks",
        "Heat Exchangers",
        "Pumps",
        "Compressors",
        "Heaters",
        "Boilers",
        "Pipe Stress"
    ],
    electrical: [
        "Power, Current/Voltage types and Uses",
        "One line diagram",
        "Motors",
        "Drives",
        "Heat Trace",
        "Motor Control",
        "MCCs",
        "Transformers",
        "NEC Codes"
    ],
    ic: [
        "Control Valves",
        "Level",
        "Flow",
        "Temperature",
        "Pressure",
        "PLC / DCS",
        "Analyzers",
        
    ],
    structural: ["Foundations","Supports","Buildings","Code Evaluation"]
};

// Friendly display names for menus and breadcrumbs
const displayNames = {
    process: "Process",
    piping: "Piping",
    mechanical: "Mechanical",
    electrical: "Electrical",
    ic: "Instrumentation & Controls",
    structural: "Structural"
};

// Export for Node.js, globally available in browser
if (typeof module !== "undefined") {
    module.exports = { topics, displayNames };
}
