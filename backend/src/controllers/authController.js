import catchAsync from "../utils/catchAsync.js";
import { loginUser, registerUser } from "../services/authService.js";

export const register = catchAsync(async (req, res) => {
  const result = await registerUser(req.body);
  res.status(201).json({ success: true, message: "User registered successfully", ...result });
});

export const login = catchAsync(async (req, res) => {
  const result = await loginUser(req.body);
  res.status(200).json({ success: true, message: "Login successful", ...result });
});
