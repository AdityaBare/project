const User = require("../model/UserModel.js");
const addToCart = async (req, res) => {
  try {
    const product_ID = req.params.id;

    const token = req.cookies.token;
    const userProduct = await User.findOne({ token });


    userProduct.cart.push(product_ID);

    await userProduct.save();

    return res
      .status(202)
      .json({ message: "Product is added to cart...", success: true });
  } catch (e) {
    return res
      .status(404)
      .json({ message: "Product not found", success: false, error: e.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const product_ID = req.params.id;

    const token = req.cookies.token;
    const userProduct = await User.findOne({ token });
    if (!userProduct) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    await userProduct.updateOne({ $pull: { cart: product_ID } });

    return res
      .status(202)
      .json({ message: "Product is remove from cart...", success: true });
  } catch (e) {
    return res
      .status(404)
      .json({ message: "Product not found", success: false, error: e.message });
  }
};

const showCart = async (req,res)=>{
    try{
        const token = req.cookies.token;
    const user = await User.findOne({ token }).populate("cart");
    if(!user){
        return res.status(404).json({message:"User not found",success:false});
    }
    return res.status(200).json({ success: true, user });

    }catch(e){
      res.status(404).json({message:"Internal error",success:false,error:e.message});
    }

}
module.exports = { addToCart, removeFromCart ,showCart};
