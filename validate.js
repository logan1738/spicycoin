import Ajv from "ajv";
import addFormats from "ajv-formats";
import fetch from "node-fetch";
import { schema } from "@uniswap/token-lists";

async function validateList(url) {
  const ajv = new Ajv({ allErrors: true, verbose: true });
  addFormats(ajv);
  const validate = ajv.compile(schema);

  const response = await fetch(url);
  const data = await response.json();

  if (validate(data)) {
    console.log("✅ Token list is valid!");
  } else {
    console.error("❌ Errors:", validate.errors);
  }
}

validateList("https://raw.githubusercontent.com/logan1738/spicycoin/refs/heads/main/spicy-token-list.json");