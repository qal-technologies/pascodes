import axios from "axios";

export const convertCurrency = async (price: number) => {
  try {
    const { data } = await axios.get("https://ipapi.co/json/");
    const currency = data.currency;
    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/USD`
    );
    const rate = response.data.rates[currency];
    return { convertedPrice: price * rate, currency };
  } catch (error) {
    console.error("Error converting currency:", error);
    return { convertedPrice: price, currency: "USD" };
  }
};
