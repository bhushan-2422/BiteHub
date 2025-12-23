import { Hotel } from "../models/hotel.model.js";
import { Item } from "../models/items.model.js";
import { Order } from "../models/orders.model.js";
import { Otp } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import twilio from "twilio";

const sayMyName = async (req, res) => {
  return res.status(200).json({
    name: "bhushan",
    age: 20,
  });
};

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (e) {
    throw new ApiError(500, "something went wrong while generating tokens...");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //req -> body
  //username, fullname, email, password
  //check everything
  //check if user is present already
  //create if not present
  //return the response

  const {
    phone,
    email,
    fullname,
    latitude = "0",
    longitude = "0",
    otp,
  } = req.body;
  console.log("email is --> ", email);

  if (!(phone && email && fullname && otp)) {
    throw new ApiError(400, "all fields are required");
  }
  const storedOtp = await Otp.findOne({ phone, OTP: otp });
  if (!storedOtp) {
    throw new ApiError(400, "failed to validate otp..");
  }

  const present = await User.findOne({ email });
  if (present) {
    throw new ApiError(400, "user already exist");
  }

  const user = await User.create({
    phone,
    email,
    fullname,
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
  });

  const createdUser = await User.findById(user._id);
  if (!createdUser) {
    throw new ApiError(400, "failed to create a new User");
  }
  console.log(createdUser);

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "user created succesfully.."));
});

const userLogin = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    throw new ApiError(400, "phone and otp is required..");
  }
  const storedOtp = await Otp.findOne({ phone, OTP: otp });

  if (!storedOtp) {
    throw new ApiError(400, "failed to validate otp..");
  }

  const user = await User.findOne({ phone });
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select("-refreshToken");
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "user logged in succesfully.."
      )
    );
});

const sendOtp = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    throw new ApiError(400, "phone number is required..");
  }
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  const client = twilio(accountSid, authToken);
  let digits = "0123456789";
  let OTP = "";
  let len = digits.length;
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * len)];
  }

  const data = await client.messages.create({
    body: `your requested OTP is ${OTP}`,
    messagingServiceSid: "MG73b960a7d591760eeaf4365d35eae47f",
    to: `+91${phone}`,
  });

  console.log(data);
  const storeOtp = await Otp.create({ phone, OTP });
  const isOtpSaved = await Otp.findById(storeOtp._id).select("-OTP");

  return res
    .status(200)
    .json(new ApiResponse(200, isOtpSaved, "otp send and saved succesfully.."));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "user fetched succesfully.."));
});

const logOutUser = asyncHandler(async(req,res)=>{
  await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {refreshToken: undefined}
        },
        {new: true}
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .cookie("accessToken",options)
    .cookie("refreshToken",options)
    .json(new ApiResponse(200,{},"user logged out succesfully..."))
})


const deleteUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const deletedUser = await User.deleteMany({ email });
  return res
    .status(200)
    .json(new ApiResponse(200, deletedUser, "user deleted succesfully.."));
});



const viewHotels = asyncHandler(async(req,res)=>{
  
  const hotels = await Hotel.find({city: req.user?.city})

  return res
  .status(200)
  .json(new ApiResponse(200,hotels,"hotels fetched succesfully..."))
})

const changeCity = asyncHandler(async(req,res)=>{
  const {city} = req.body

  const user = await User.findByIdAndUpdate(req.user?._id, {city: city})
  return res
  .status(200)
  .json(new ApiResponse(200,{},"city changed succesfully"))
})

const viewMenu = asyncHandler(async (req, res) => {
  const { hotelId } = req.params;
  if (!hotelId) {
    throw new ApiError(400, "hotel id is required");
  }

  const menu = await Item.find({ owner: hotelId });
  if (!menu) {
    throw new ApiError(400, "items are not available in this restraunt..");
  }

  return res.status(200).json(new ApiResponse(200, menu, "menu is visible.."));
});

const addToCart = asyncHandler(async (req, res) => {
  const { hotelId, itemId, quantity = 1 } = req.body;
  if (!(hotelId && itemId)) {
    throw new ApiError(400, "all fields are required..");
  }

  const item = await Item.findById(itemId);
  if (!item) {
    throw new ApiError(400, "item is not available..");
  }

  let cart = await Order.findOne({
    user: req.user?._id,
    hotel: hotelId,
    status: "cart",
  });
  if (!cart) {
    cart = new Order({
      user: req.user._id,
      hotel: hotelId,
      items: [],
      total: 0,
      status: "cart",
    });
  }
  const existingItem = cart.items.find(
    (i) => i.item.toString() === item._id.toString()
  );
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      item: item._id,
      quantity,
      priceAtPurchase: item.price,
    });
  }

  cart.total = cart.items.reduce(
    (sum, i) => sum + i.quantity * i.priceAtPurchase,
    0
  );

  await cart.save();

  return res.status(200).json(new ApiResponse(200, cart, "added to cart"));
});

const makeOrder = asyncHandler(async (req, res) => {
  const { orderId, paymentMethod } = req.body;
  if (!orderId || !paymentMethod) {
    throw new ApiError(400, "order id and paymentMethod is required..");
  }

  const order = await Order.findOne({
    user: req.user?._id,
    _id: orderId,
    status: "cart",
  });
  if (!order) {
    throw new ApiError(400, "cart not found or already placed..");
  }
  if (order.items.length == 0) {
    throw new ApiError(400, "no items in cart");
  }

  order.status = "placed";
  order.paymentMethod = paymentMethod;
  order.paymentStatus = "pending";

  await order.save();

  return res.status(200).json(new ApiResponse(200, order, "order is made.."));
});

export {
  sayMyName,
  registerUser,
  sendOtp,
  userLogin,
  deleteUser,
  viewHotels,
  viewMenu,
  makeOrder,
  addToCart,
  getCurrentUser,
  logOutUser,
  changeCity
};
