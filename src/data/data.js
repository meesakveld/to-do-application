

export const home = (req, res) => {
    const data = [
        {
            id: '1a7d9f1b-8055-4f5d-9722-5e0a13b989e1',
            title: 'Complete homework assignment',
            category: 'School',
            isCompleted: false,
            isDeleted: false,
            createdAt: new Date(),
            lastUpdatedAt: new Date()
        },
        {
            id: '2f8e4364-faf1-4210-8331-d54b2b648f6b',
            title: 'Buy groceries',
            category: 'General',
            isCompleted: false,
            isDeleted: false,
            createdAt: new Date(),
            lastUpdatedAt: new Date()
        },
        {
            id: '3d4d84f3-1247-4a9e-b3ff-930c247899a6',
            title: 'Go to the gym',
            category: 'General',
            isCompleted: false,
            isDeleted: false,
            createdAt: new Date(),
            lastUpdatedAt: new Date()
        },
        {
            id: '4f93c8aa-fcb5-4b58-8967-f30e7fb1a1d3',
            title: 'Read a book',
            category: 'General',
            isCompleted: false,
            isDeleted: false,
            createdAt: new Date(),
            lastUpdatedAt: new Date()
        },
        {
            id: '5e32497b-5aae-4920-bf80-54e8e55dc90d',
            title: 'Prepare for presentation',
            category: 'School',
            isCompleted: false,
            isDeleted: false,
            createdAt: new Date(),
            lastUpdatedAt: new Date()
        },
        {
            id: '6f575fa2-9646-4be7-9b95-c7087e79ef4b',
            title: 'Call Mom',
            category: 'General',
            isCompleted: false,
            isDeleted: false,
            createdAt: new Date(),
            lastUpdatedAt: new Date()
        },
        {
            id: '7c185176-c3b0-48d7-bc5a-05f800f69a9d',
            title: 'Study for exam',
            category: 'School',
            isCompleted: false,
            isDeleted: false,
            createdAt: new Date(),
            lastUpdatedAt: new Date()
        },
        {
            id: '8e389ac2-aa2d-46e5-9ab7-1dc3a9466ed5',
            title: 'Clean the house',
            category: 'General',
            isCompleted: false,
            isDeleted: false,
            createdAt: new Date(),
            lastUpdatedAt: new Date()
        },
        {
            id: '9d2039cb-39b4-4fc9-a588-5f8f78de6f5e',
            title: 'Attend online meeting',
            category: 'School',
            isCompleted: false,
            isDeleted: false,
            createdAt: new Date(),
            lastUpdatedAt: new Date()
        },
        {
            id: '10c7dabc-5091-4f80-8f97-77e5822c5945',
            title: 'Start a new project',
            category: 'General',
            isCompleted: false,
            isDeleted: false,
            createdAt: new Date(),
            lastUpdatedAt: new Date()
        }
    ];
    
    res.json(data);
};