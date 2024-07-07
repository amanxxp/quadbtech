import bcrypt from 'bcryptjs'
import User from "../model/userModel.js";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
export const signup = async(req,res)=>{
    try{
        const { username, email, password } = req.body;

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: "Invalid email format" });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ error: "email is already taken" });
		}
		if (password.length < 6) {
			return res.status(400).json({ error: "Password must be at least 6 characters long" });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				username: newUser.username,
				email: newUser.email,
                shoppingcart:newUser.shoppingcart
			});
        } else {
			res.status(400).json({ error: "Invalid user data" });
		}

    }catch(error){
        console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });

    }
};

export const login = async(req,res)=>{
    try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}
		generateTokenAndSetCookie(user._id, res);
		res.status(200).json({
			_id: user._id,
			username: user.username,
			email: user.email,
            shoppingcart:user.shoppingcart
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = async(req,res)=>{
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const mycart= async(req,res)=>{
	try{
		const currentUser = await User.findById(req.user._id);
		const shoppingcart = currentUser.shoppingcart;
		res.status(200).json(shoppingcart);
	}catch(error){
		console.log("Error in getting my cart", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
export const addtocart = async(req,res)=>{
	try{
		const id =12345;
		const currentUser = await User.findById(req.user._id);
		if(!currentUser){
			return res.status(400).json({ message: "User not found" });
		}
		currentUser.shoppingcart.push(id);
		const updatedcart = await currentUser.save();
		res.status(200).json({updatedcart});
	}catch(error){
		console.log("Error in adding to mycart", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
export const dltfromcart = async(req,res)=>{
	try{
		const Id = 1234;
		const currentUser = await User.findByIdAndUpdate(
			req.user._id,
			{ $pull: { shoppingcart: Id } },
			{ new: true } // To return the updated document
		  );
		if(!currentUser){
			return res.status(400).json({ message: "User not found" });
		}
		res.status(200).json({currentUser});
	}catch(error){
		console.log("Error in deleting from mycart", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}