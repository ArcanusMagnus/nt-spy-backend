"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teams_1 = require("../controllers/teams");
const router = (0, express_1.Router)();
router.get('/', teams_1.getTeams);
router.post('/upload', teams_1.uploadCsvFile);
exports.default = router;
