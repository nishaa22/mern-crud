export const signup = async (signupData) => {
    try {
        const response = await fetch('http://localhost:8080/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during registration:', error);
    }
}

export const login = async (loginData) => {
    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during login:', error);
    }
}

export const getProfile = async (token) => {
    try {
        const response = await fetch('http://localhost:8080/auth/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
}