import catchAsync from "../utils/catchAsync.js";
import {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionsByUserId,
  updateSubscriptionStatus,
} from "../services/subscriptionService.js";

export const addSubscription = catchAsync(async (req, res) => {
  const payload = {
    ...req.body,
    userId: req.user.role === "USER" ? req.user.id : req.body.userId,
  };
  const subscription = await createSubscription(payload);
  res.status(201).json({ success: true, message: "Subscription created", data: subscription });
});

export const fetchUserSubscriptions = catchAsync(async (req, res) => {
  const userId = req.user.role === "USER" ? req.user.id : req.params.id;
  const subscriptions = await getSubscriptionsByUserId(userId);
  res.status(200).json({ success: true, data: subscriptions });
});

export const fetchAllSubscriptions = catchAsync(async (req, res) => {
  const subscriptions = await getAllSubscriptions();
  res.status(200).json({ success: true, data: subscriptions });
});

export const changeSubscriptionStatus = catchAsync(async (req, res) => {
  const subscription = await updateSubscriptionStatus(req.params.id, req.body.status);
  res.status(200).json({ success: true, message: "Subscription status updated", data: subscription });
});
