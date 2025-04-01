import { AppDataSource } from "../ormconfig";
import { Customer } from "../entities/Customer";

const seedCustomers = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected for seeding");

    const customerRepo = AppDataSource.getRepository(Customer);

    const customers = [
      { name: "swetha", address: "123 Main St", email: "alice@example.com", phoneNo: "9876543210" },
      { name: "dd", address: "456 Oak St", email: "bob@example.com", phoneNo: "8765432109" },
      { name: "Charlie Brown", address: "789 Pine St", email: "charlie@example.com", phoneNo: "7654321098" },
    ];

    await customerRepo.clear(); // Clear existing data
    await customerRepo.save(customers);
    console.log("Customers seeded successfully");
  } catch (error) {
    console.error("Error seeding customers:", error);
  } finally {
    await AppDataSource.destroy();
    console.log("Database connection closed");
  }
};

seedCustomers();
