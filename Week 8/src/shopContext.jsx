import { createContext, useState } from "react";
import smartphones from "./smartphones.json";

export const ShopValues = createContext();
export const UpdateShopValues = createContext();

// eslint-disable-next-line react/prop-types
export function ShopContext({ children }) {
  const [items, setItems] = useState(smartphones);

  return (
    <ShopValues.Provider value={items}>
      <UpdateShopValues.Provider value={setItems}>
        {children}
      </UpdateShopValues.Provider>
    </ShopValues.Provider>
  );
}

export default ShopContext;
