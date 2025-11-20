import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import dotenv from "dotenv";

dotenv.config();

let ratelimit = null;

try {
  // create a ratelimiter that allows 100 requests per minute
  ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s"),
  });
} catch (error) {
  console.warn("Upstash Redis not configured. Rate limiting disabled.", error.message);
}

export default ratelimit;
