export const generateSensorData = () => {
  const now = new Date().toISOString();
  return [
    {
      measurement: "air",
      tags: { sensor_type: "airSensor", sensor: "air" },
      fields: {
        co: Math.random() * 100,
        no2: Math.random() * 300,
        pm10: Math.random() * 250,
      },
      timestamp: now,
    },
    {
      measurement: "temperature",
      tags: { sensor_type: "temperatureSensor", sensor: "temperature" },
      fields: { temperature: Math.random() * 50 + 20 },
      timestamp: now,
    },
    {
      measurement: "noise-level",
      tags: { sensor_type: "noiseSensor", sensor: "noise-level" },
      fields: {
        "noise-level": parseFloat((50 + Math.random() * 40).toFixed(1)),
      },
      timestamp: now,
    },
    {
      measurement: "vibration",
      tags: { sensor_type: "vibrationSensor", sensor: "vibration" },
      fields: { vibration: Math.random() * 7 },
      timestamp: now,
    },
    {
      measurement: "motion-detected",
      tags: { sensor_type: "motionSensor", sensor: "motion_detected" },
      fields: { motion_detected: Math.random() > 0.7 },
      timestamp: now,
    },
    {
      measurement: "light-intensity",
      tags: { sensor_type: "lightSensor", sensor: "light-intensity" },
      fields: {
        "light-intensity": parseFloat((Math.random() * 1000).toFixed(2)),
      },
      timestamp: now,
    },
    {
      measurement: "gas",
      tags: { sensor_type: "gasSensor", sensor: "gas" },
      fields: {
        methane: Math.random() * 50,
        propane: Math.random() * 50,
        hydrogen: Math.random() * 50,
        ammonia: Math.random() * 50,
        ozone: Math.random() * 30,
      },
      timestamp: now,
    },
    {
      measurement: "emergency",
      tags: { sensor_type: "emergencySensor", sensor: "emergency" },
      fields: { emergency: parseFloat((Math.random() * 100).toFixed(2)) },
      timestamp: now,
    },
    {
      measurement: "population",
      tags: { sensor_type: "populationSensor", sensor: "population" },
      fields: {
        reception: Math.floor(40 + Math.random() * 20),
        sauna: Math.floor(20 + Math.random() * 15),
        woodshed: Math.floor(60 + Math.random() * 20),
        restaurant: Math.floor(60 + Math.random() * 20),
        office: Math.floor(60 + Math.random() * 20),
        lakeside: Math.floor(60 + Math.random() * 20),
        cottage: Math.floor(60 + Math.random() * 20),
        firepit: Math.floor(60 + Math.random() * 20),
      },
      timestamp: now,
    },
    {
      measurement: "humidity",
      tags: { sensor_type: "humiditySensor", sensor: "humidity" },
      fields: {
        reception: Math.random() * 100,
        sauna: Math.random() * 100,
        woodshed: Math.random() * 100,
        restaurant: Math.random() * 100,
        office: Math.random() * 100,
        lakeside: Math.random() * 100,
        cottage: Math.random() * 100,
        firepit: Math.random() * 100,
      },
      timestamp: now,
    },
    {
      measurement: "water-flow",
      tags: { sensor_type: "waterFlowDetector", sensor: "water-flow" },
      fields: { "water-flow": Math.random() * 60 },
      timestamp: now,
    },
    {
      measurement: "water-level",
      tags: { sensor_type: "waterLevelDetector", sensor: "water-level" },
      fields: { "water-level": getRandom(-10, 20) },
      timestamp: now,
    },
  ];
};
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
