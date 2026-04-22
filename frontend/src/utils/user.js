export const getUsers = async (token) => {
    try {
        const response = await fetch('http://localhost:8080/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

export const getUserById = async (id, token) => {
    try {
        const response = await fetch(`http://localhost:8080/users/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
    }
}

export const createUser = async (userData, token) => {
    try {
        const response = await fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

export const updateUser = async (id, userData, token) => {
    try {
        const response = await fetch(`http://localhost:8080/users/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating user:', error);
    }
}

export const deleteUser = async (id, token) => {
    try {
        const response = await fetch(`http://localhost:8080/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}
