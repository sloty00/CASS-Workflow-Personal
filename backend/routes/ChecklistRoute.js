import express from "express";
import {
        getChecklist,
        getChecklistJoin, 
        getChecklistById, 
        createChecklist, 
        updateChecklist,
        deleteChecklist
        } from "../Controllers/ChecklistController.js";

const router = express.Router();

router.get('/checklist', getChecklist);
router.get('/checklistJoin', getChecklistJoin);
router.get('/checklist/:Id', getChecklistById);
router.post('/checklist/', createChecklist);
router.patch('/checklist/:Id', updateChecklist);
router.delete('/checklist/:Id', deleteChecklist);

export default router;