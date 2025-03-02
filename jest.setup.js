import "@testing-library/jest-dom";


// Pour que le test d'UI ne panique pas quand il essaye d'appeler du backend
let mockTasks = [];

global.fetch = jest.fn((url, options) => {
    if (options?.method === "POST") { //Ajouter une tache
        const newTask = { id: mockTasks.length + 1, title: "New Task", completed: false };
        mockTasks.push(newTask);
        return Promise.resolve({
            json: () => Promise.resolve(newTask),
        });
    }

    return Promise.resolve({ //Fetch
        json: () => Promise.resolve(mockTasks), 
    });
});

