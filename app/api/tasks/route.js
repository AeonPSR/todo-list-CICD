import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const tasks = await prisma.task.findMany();
        return new Response(JSON.stringify(tasks), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch tasks" }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { title } = await req.json();
        const newTask = await prisma.task.create({
            data: { title },
        });
        return new Response(JSON.stringify(newTask), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to create task" }), { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { id, title, completed } = await req.json();
        const updatedTask = await prisma.task.update({
            where: { id },
            data: { title, completed },
        });
        return new Response(JSON.stringify(updatedTask), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to update task" }), { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const { id } = await req.json();
        await prisma.task.delete({ where: { id } });
        return new Response(null, { status: 204 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to delete task" }), { status: 500 });
    }
}
