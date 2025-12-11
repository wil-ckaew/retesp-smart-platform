import { faker } from "@faker-js/faker";
import * as fs from "fs";
import * as path from "path";

const generateDemoSeals = (count: number) => {
  const seals = [];

  for (let i = 0; i < count; i++) {
    const healthScore = faker.number.float({
      min: 30,
      max: 100,
      precision: 0.1,
    });

    const status =
      healthScore >= 80
        ? "operating"
        : healthScore >= 60
        ? "warning"
        : "critical";

    seals.push({
      id: faker.string.uuid(),
      serial_number: `RET-${faker.string
        .alphanumeric(10)
        .toUpperCase()}`,
      batch_number: `BATCH-2024-${faker.number
        .int({ min: 1, max: 12 })
        .toString()
        .padStart(2, "0")}`,
      material_type: faker.helpers.arrayElement([
        "Nitrile",
        "Viton",
        "Silicone",
      ]),
      current_status: status,
      health_score: healthScore,
      installation_date: faker.date.past().toISOString(),
      total_operating_hours: faker.number.float({
        min: 0,
        max: 10000,
        precision: 0.1,
      }),
      customer_name: faker.helpers.arrayElement([
        "FIAT",
        "VW",
        "GM",
        "Mercedes",
      ]),
      location: faker.location.city(),
    });
  }

  return seals;
};

const run = () => {
  const count = Number(process.argv[2]) || 50;
  const outputPath = path.join(__dirname, "demo-seals.json");

  const data = generateDemoSeals(count);
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`✅ ${count} registros gerados em ${outputPath}`);
};

run();
