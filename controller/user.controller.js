import { user } from "./../model/user.model.js";

const signupuser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        // Check if all fields are filled
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Check if the user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }


        const newUser = new user({
            name,
            email,
            password,
            confirmpassword: confirmPassword
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const loginfunc = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Use the User model to query the database
        const user = await user.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found. Please sign up.' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        res.status(200).json({ message: 'Login successful. Redirecting to dashboard...' });
    } catch (error) {
        console.error('Error in loginfunc:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

export { signupuser ,loginfunc};