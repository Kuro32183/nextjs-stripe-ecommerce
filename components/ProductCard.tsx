import { FunctionComponent, useContext } from "react";
import Stripe from "stripe";
import CartContext from "./context/CartContext";
import {
  getPriceTotal,
  getProductDescription,
  getProductImage,
  getProductName,
} from "../utils/computed";

type CardProps = {
  price: Stripe.Price;
};

const ProductCard: FunctionComponent<CardProps> = ({ price }) => {
  const { add } = useContext(CartContext);

  const addToCart = (p: Stripe.Price) => {
    if (add) {
      add(p);
    }
  };

  return (
    <div>
      <div className="relative mx-4">
        <div className="relative w-full h-72 rounded-lg overflow-hidden">
          <img
            src={getProductImage(price.product)}
            alt={getProductDescription(price.product)}
            className="w-full h-full object-center object-cover"
          />
        </div>
        <div className="relative mt-4">
          <h3 className="text-sm font-medium text-gray-900">
            {getProductName(price.product)}
          </h3>
          <h4 className="text-sm font-medium text-gray-900">
            {getProductDescription(price.product)}
          </h4>
        </div>
        <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
          />
          <p className="relative text-lg font-semibold text-white">
            ${getPriceTotal(price)}
          </p>
        </div>
      </div>
      <div className="mt-6 mx-4">
        <button
          onClick={() => addToCart(price)}
          className="relative w-full text-white bg-indigo-600 flex border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
        >
          Add to Cart
          <span className="sr-only">, {getProductName(price.product)}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
