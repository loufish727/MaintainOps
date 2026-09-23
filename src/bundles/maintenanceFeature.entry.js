import "../workflows/preventiveMaintenanceWorkflow.js";
import "../workflows/procedureWorkflow.js";
import "../workflows/procedureChecklistWorkflow.js";
import "../render/maintenanceListDisplay.js";
import { createMaintenanceRelations } from "../services/maintenanceRelations.mjs";
window.MaintainOpsMaintenanceRelations = { createMaintenanceRelations };
import { createChecklistResponseDrafts } from "../utils/checklistResponseDrafts.mjs";
window.MaintainOpsChecklistResponseDrafts = { createChecklistResponseDrafts };
