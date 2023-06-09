import QRCode from "qrcode";
import productModel from "../../models/product.js";

const formatSearchKey = (searchVal) => {
  // const searchVal = query.trim().split(' ');
  const n = searchVal.length;
  let val = ``;
  for (let i = 0; i < n; i++) {
    if (i === n - 1) {
      val += `%${searchVal[i]}%`;
    } else {
      val += `%${searchVal[i]}`;
    }
  }
  return val;
};

const insertProduct = async (req, res) => {
  if (req.role === 0) {
    return res.status(400).json({
      message: "Not Allowed to connect",
    });
  }

  try {
    const { productName, brand, measure, quantity, code } = req.body;

    await productModel.create({
      mfgId: req.userId,
      productName,
      brand,
      measure,
      quantity,
      code,
    });

    return res.status(200).json({
      message: "Product Added Successfully!!",
    });
  } catch (err) {
    log.error({ err }, "[insertProduct][error]");

    return res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};

const searchProduct = async (req, res) => {
  const { query } = req.query;
  const userId = req.userId;
  try {
    console.log(query);
    const q = formatSearchKey(query);
    const [r] = await searchProductDb({ query: q, userId });
    console.log(r);

    return res.status(200).json({
      messgae: "succcess",
      respose: r,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ messgae: "error" });
  }
};

const generateQR = async (req, res) => {
  const { uuid } = req.query;

  try {
    let data = `http://localhost:5000/product/${uuid}`;
    let stringdata = JSON.stringify(data);
    //getting qr code from the qrdata by calling function
    QRCode.toDataURL(stringdata, function (err, code) {
      if (err) {
        console.log("error occurred");
        return res.status(500).json({
          message: "error",
          error: "INTERNAL SERVER ERROR",
        });
      }

      // Printing the code
      console.log(code);
      return res.status(200).json({
        message: "success",
        code,
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: "error",
    });
  }
};

const updateIpfs = async (req, res) => {
  const { uuid, ipfs } = req.body;

  try {
    // const re = await changeIpfs({ ipfs, uuid });

    const finduuid = await productModel.findOne({ uuid });
    var resp;
    if (finduuid) {
      resp = await productModel.findOneAndUpdate(
        {
          uuid,
        },
        { ipfs }
      );
    } else {
      resp = await productModel.create({
        uuid,
        ipfs,
      });
    }

    const latestuuid = await productModel.findOne({ uuid });
    return res.status(200).json({
      message: "success",
      response: latestuuid,
    });
  } catch (err) {
    return res.status(500).json({
      message: "error",
    });
  }
};

const fetchIpfs = async (req, res) => {
  const { uuid } = req.query;

  try {
    const finduuid = await productModel.find({ uuid });

    return res.status(200).json({
      message: "success",
      response: finduuid,
    });
  } catch (err) {
    log.error({ err }, "[fetchIpfs][error]");

    return res.status(500).json({
      message: "INTRENAL SERVER ERROR",
    });
  }
};

export { insertProduct, searchProduct, generateQR, updateIpfs, fetchIpfs };
