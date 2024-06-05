function fetchUserData(userId, callback) {
    setTimeout(() => {
        const users = {
            1: { name: 'John Doe', age: 30 },
            2: { name: 'Jane Doe', age: 25 }
        };
        if (users[userId]) {
            callback(null, users[userId]); // First argument for error, second for success
        } else {
            callback(new Error('User not found'));
        }
        }, 1000); // Simulate network delay
    }

function getUserData(userId) {
    let userData;
    fetchUserData(userId, (error, data) => {
        if (error) {
        console.error(error);
        return;
        }
        userData = data;
    });
    return userData;
}

// Trying to use the function
const userData = getUserData(1);
console.log(userData);