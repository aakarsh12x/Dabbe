import catchAsync from "../utils/catchAsync.js";
import { getAllUsers } from "../services/userService.js";

export const fetchUsers = catchAsync(async (req, res) => {
  const users = await getAllUsers();
  res.status(200).json({ success: true, data: users });
});
