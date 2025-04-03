import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../ormconfig";
import { Customer } from "../entities/Customer";

const SECRET_KEY = process.env.JWT_SECRET || "yourSecretKey";
const customerRepo = AppDataSource.getRepository(Customer);


export const register = async (req: Request, res: Response) => {
    try {
        const { name, address, email, password, phoneNo, role } = req.body;
        const existingCustomer = await customerRepo.findOneBy({ email });
        if (existingCustomer) {
             {res.status(400).json({ error: "Email already exists" });
         return }};

        const hashedPassword = await bcrypt.hash(password, 10);
        const newCustomer = customerRepo.create({ 
            name, address, email, password: hashedPassword, phoneNo,role 
        });
        await customerRepo.save(newCustomer);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        // console.error("Registration Error:", error);
        res.status(500).json({ error: "Registration failed", details: (error as Error).message });
    }
};


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

       
        const user = await customerRepo.findOneBy({ email });

        if (!user) {
             {res.status(401).json({ error: "Invalid email or password" });
            return}
        }

      
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
             {res.status(401).json({ error: "Invalid email or password" });
            return}
        }

      
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: "Login failed", details: (error as Error).message });
    }
};
