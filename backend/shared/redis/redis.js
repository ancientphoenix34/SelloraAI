import Redis from "ioredis";

const redis = new Redis(
    process.env.REDIS_URL || "redis://localhost:6379",
    {
        maxRetriesPerRequest: null,
        enableReadyCheck: false,
    }
);

redis.on("connect", () => {
    console.log("Redis connected");
});

redis.on("error", (err) => {
    console.log("Redis error:", err);
});

redis.on("reconnecting", () => {
    console.log("Redis reconnecting");
});

export default redis;
