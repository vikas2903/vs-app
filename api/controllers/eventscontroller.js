import Event from "../modals/tracker.js";

 export const eventsinsertion = async (req, res) => {
  try {
    const { shop, type, productHandle, variantId, cartItems } = req.body;

    if (!shop || !type) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const ts = Date.now();
    const day = new Date().toISOString().slice(0, 10);

  const newEvent =   await Event.create({
      shop,
      type,
      productHandle: productHandle || null,
      variantId: variantId || null,
      cartItems,
      ts,
      day,
    });

    res.status(200).json({
      success: true,
      message: "Events inserted successfully",
      data: {newEvent},
    });
  } catch (error) {
    console.error("Error during events insertion:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

