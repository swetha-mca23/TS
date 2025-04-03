import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Customer } from "../entities/Customer";

interface AuthRequest extends Request {
  user?: { id: number; role: string };
}


export const getCustomers = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "admin") {
       {res.status(403).json({ error:" Access denied" }); 
    return}
    }
    const customers = await AppDataSource.getRepository(Customer).find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error:"Server Error" });
  }
};


export const getCustomer = async (req: AuthRequest, res: Response) => {
  try {
    const customer = await AppDataSource.getRepository(Customer).findOne({
      where: { id: req.user?.id },
    });
    if (!customer) {res.status(404).json({ error: "Customer not found" });
 return}
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};


export const addCustomer = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "admin") {
       {res.status(403).json({ error: " Access denied" });
     return}
    }

    const { name, email, role } = req.body;

    const newCustomer = AppDataSource.getRepository(Customer).create({
      name,
      email,
      role,
    });

    await AppDataSource.getRepository(Customer).save(newCustomer);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const updateCustomer = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    let customer = await AppDataSource.getRepository(Customer).findOne({
      where: { id: parseInt(id) },
    });

    if (!customer) {
      {res.status(404).json({ error: "Customer not found" });
     return}
    }

    if (req.user?.role !== "admin" && customer.id !== req.user?.id) {
      {res.status(403).json({ error: " update only your data" }); 
    return}
    }

    customer.name = name || customer.name;
    customer.email = email || customer.email;

    await AppDataSource.getRepository(Customer).save(customer);

    res.json({ message: "Customer updated successfully", customer });
  } catch (error) {
    res.status(500).json({ error: " Server Error" });
  }
};

export const deleteCustomer = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "admin") {
      { res.status(403).json({ error: " Access denied" });
     return}
    }

    const { id } = req.params;

    const customer = await AppDataSource.getRepository(Customer).findOne({
      where: { id: parseInt(id) },
    });

    if (!customer) {
      {res.status(404).json({ error: "Customer not found" });
     return}
    }

    await AppDataSource.getRepository(Customer).remove(customer);

    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
