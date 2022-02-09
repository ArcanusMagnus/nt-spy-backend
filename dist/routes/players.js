"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const players_1 = require("../controllers/players");
const router = (0, express_1.Router)();
router.put('/:playerId', players_1.updatePlayer);
router.delete('/:playerId', players_1.deletePlayer);
exports.default = router;
