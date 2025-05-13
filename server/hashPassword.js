const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
        console.log(`Hashed Password: ${hashedPassword}`);
    } catch (err) {
        console.error("Error hashing password:", err);
    }
};

// Replace 'yourPasswordHere' with the actual password you want to hash
hashPassword("anir");