import { Router } from "express";
import { getAllUsers, getTimeToken, getUserByUsername, loginMethod, saveUser, updateToken, validateToken, updateUser, deleteUser } from "../controllers/auth.controllers";

const router = Router();

router.post("/login-user", loginMethod);
router.get("/time/:userId", getTimeToken);
router.post("/validate-token", validateToken);
router.put("/update-token/:userId", updateToken);

router.get("/users", getAllUsers);
router.get("/users/:username", getUserByUsername);
router.post("/users", saveUser);
router.put("/update-user/:userId", updateUser);
router.delete("/delete-user/:userId", deleteUser);


export default router;