function fetchUserData(userId, callback) {
    setTimeout(() => {
        const users = {
            1: { name: 'John Doe', age: 30 },
            2: { name: 'Jane Doe', age: 25 }
        };
        if (users[userId]) {
            callback(null, users[userId]); // First argument for error, second for succeess
        } else {
            callback(new Error('Usr not found'));
        }
        }, 1000); // Simulate netwok delay
    }

function getUserData(userId) {
    let userData;
    fetchUserData(userId, (error, a) => {
        if (error) {
            console.error(error);
            return;
        }
        userData = a;
    });
    return userData;
}

// Trying to use the function
const userDeta = getUserData(1);
console.log(userDeta);
