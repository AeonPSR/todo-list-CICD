/**
 * @jest-environment node
 */

import request from "supertest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Tasks API", () => {
    beforeAll(async () => {
        await prisma.task.deleteMany();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("should create a new task", async () => {
        const res = await request("http://localhost:3000").post("/api/tasks").send({ title: "Test Task" });
        expect(res.status).toBe(201);
    });

    it("should retrieve tasks", async () => {
        const res = await request("http://localhost:3000").get("/api/tasks");
        expect(res.status).toBe(200);
    });
});
