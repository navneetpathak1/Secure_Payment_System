"use server"

import db from "@repo/db/client";
import bcrypt from "bcrypt";

export const signup = async (phone: string, password: string, name: string) => {
    try {
        const existingUser = await db.user.findFirst({
            where: {
                number: phone
            }
        });

        if (existingUser) {
            return {
                message: "User already exists",
                status: 409
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
                number: phone,
                password: hashedPassword,
                name: name,
                Balance: {
                    create: {
                        amount: 0,
                        locked: 0
                    }
                }
            }
        });

        return {
            message: "User created successfully",
            status: 201,
            userId: user.id
        }
    } catch (e) {
        console.error("Error creating user:", e);
        return {
            message: "Error while signing up",
            status: 500
        }
    }
}
