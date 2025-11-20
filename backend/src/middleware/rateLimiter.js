import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  // Skip rate limiting in development
  if (process.env.NODE_ENV === "development") {
    return next();
  }

  try {
    const { success } = await ratelimit.limit("my-rate-limit");

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }

    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
