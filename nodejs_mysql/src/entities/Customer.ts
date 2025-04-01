import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import bcrypt from "bcryptjs";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: "varchar", length: 15 })
    phoneNo: string;

    @Column({ default: "user" }) 
    role: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password && !this.password.startsWith("$2b$")) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    async comparePassword(plainText: string): Promise<boolean> {
        return bcrypt.compare(plainText, this.password);
    }
}
