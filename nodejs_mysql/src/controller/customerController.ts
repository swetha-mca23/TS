import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { Customer } from "../entities/Customer";

const customerRepo = AppDataSource.getRepository(Customer);


export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await customerRepo.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch customers", details: (error as Error).message });
    }
};


export const getCustomer = async (req: Request, res: Response) => {
    try {
        const customer = await customerRepo.findOneBy({ id: Number(req.params.id) });

        if (!customer) {
            res.status(404).json({ error: "Customer not found" });
        } else {
            res.json(customer);
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch customer", details: (error as Error).message });
    }
};


export const addCustomer = async (req: Request, res: Response) => {
    try {
        const newCustomer = customerRepo.create(req.body);
        await customerRepo.save(newCustomer);
        res.status(201).json({ message: "Customer added successfully", customer: newCustomer });
    } catch (error) {
        res.status(500).json({ error: "Failed to add customer", details: (error as Error).message });
    }
};


export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const result = await customerRepo.update(req.params.id, req.body);

        if (result.affected === 0) {
            res.status(404).json({ error: "Customer not found" });
        } else {
            res.json({ message: "Customer updated successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update customer", details: (error as Error).message });
    }
};


export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const result = await customerRepo.delete(req.params.id);

        if (result.affected === 0) {
            res.status(404).json({ error: "Customer not found" });
        } else {
            res.json({ message: "Customer deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete customer", details: (error as Error).message });
    }
};
