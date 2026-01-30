import UserModel from "../modals/usermodal.js";
import axios from "axios";

export const userdatainsertion = async (req, res) => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");

    const users = response.data;

    if (!users?.length) {
      return res.status(404).json({
        success: false,
        message: "No user data found from external API",
      });
    }

  const formatted = users.map((user) => ({
      userid: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      address: {
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
      },
      phone: user.phone,
      website: user.website,
      company: {
        name: user.company.name,
        catchPhrase: user.company.catchPhrase,
        bs: user.company.bs,
      },
    }));

     await UserModel.bulkWrite(
      formatted.map((item) => ({
        updateOne: {
          filter: { email: item.email },
          update: { $set: item },
          upsert: true,
        },
      }))
    );  
    const getusers = await UserModel.find({});


    if (!getusers?.length) {
      return res.status(404).json({
        success: false,
        message: "No user data found in the database",
      });
    }
    res.status(200).json({
      success: true,
      message: "User data fetched successfully",
        data: getusers,
    
    });
 
   
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getuserdata = (req, res) => {
  res.send("Get user data endpoint");
};
