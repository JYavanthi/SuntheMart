// briahti e commerce logic and this code is perfect

// import { createContext, useContext, useEffect, useState } from "react";
// import { API_URLS } from "../API-Urls";
// import { toast } from "react-hot-toast";
// import { showToast } from "../components/CustomToast";
// import bulk from "../assets/bulk_orders.png"
// import removeCart from "../assets/remove_cart.png"

// const API_URL = API_URLS.BASE_URL; 

// export type CartItem = {
//   cartId: number;
//   id: number; 
//   title: string;
//   price: number;
//   discount:number;
//   qty: number;
//   img: string;
//   weight: string;
//    gstPercent: number;
//    categoryName: string;
// };

// type CartContextType = {
//   cartItems: CartItem[];
//   addToCart: (product: any) => Promise<void>;
//   removeFromCart: (cartId: number) => Promise<void>;
//   increaseQty: (cartId: number) => Promise<void>;
//   decreaseQty: (cartId: number) => Promise<void>;
//   isInCart: (productId: number) => boolean;
//   clearCart:()=> Promise<void>;
// };

// const CartContext = createContext<CartContextType | null>(null);

// export const CartProvider = ({ children }: { children: React.ReactNode }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   // 🔑 Always read userId dynamic
//   const getUserId = () => {
//     return localStorage.getItem("userId");
//   };



//   const loadCart = async () => {
//   const userId = getUserId();
//   if (!userId) {
//     setCartItems([]);
//     return;
//   }

//   try {
//     const res = await fetch(`${API_URL}${API_URLS.CART}/${userId}`);
//     const result = await res.json();

//     // 👇 IMPORTANT FIX
//     const cartArray = Array.isArray(result)
//       ? result                // if backend returns array
//       : result.data || [];    // if backend returns { success, data }

//     const mapped = cartArray.map((item: any) => ({
//       cartId: item.CartID,
//       id: item.ProductID,
//       title: item.ProductName,
//       price: Number(item.Price),
//       discount: Number(item.DiscountPrice),
//       qty: item.Quantity,
//       img: item.ImageUrl || "",
//       weight: item.ProductWeight || "",
//        gstPercent: Number(item.GSTPercent || 0),
//         categoryName: item.CategoryName || "",
//     }));

//     setCartItems(mapped);
//   } catch (error) {
//     console.error("Load cart error:", error);
//     setCartItems([]);
//   }
// };

 

//   useEffect(() => {

//   const syncCart = () => {
//     loadCart();
//   };

//   // initial load
//   loadCart();

//   // listen login/logout
//   window.addEventListener("userChanged", syncCart);

//   return () => {
//     window.removeEventListener("userChanged", syncCart);
//   };

// }, []);

//   //  ADD
//   const addToCart = async (product: any) => {
//     const userId = getUserId();
//     if (!userId) {
//       alert("Please login to add items to cart");
//       return;
//     }

//     await fetch(`${API_URL}${API_URLS.CART}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         UserID: Number(userId),
//         ProductID: product.id,
//         Quantity: 1,
//       }),
//     });

//     loadCart();
//   };

//   // 🔹 REMOVE
//   const removeFromCart = async (cartId: number) => {
//     await fetch(`${API_URL}${API_URLS.CART}/${cartId}`, {
//       method: "DELETE",
//     });
//     loadCart();
//                    showToast(
//         removeCart,
//         "Cart Updated",
//         "Removed from cart successfully",
//         "cart-removed"
//       );
//   };

 

//   const increaseQty = async (cartId: number) => {
//   const userId = getUserId();
//   if (!userId) return;

//   // 🔥 Find current item
//   const item = cartItems.find(i => i.cartId === cartId);

//   if (!item) return;

//   if (item.qty >= 10) {
//   showToast(
//     bulk,
//     "Bulk Order Limit",
//     "For bulk orders (>10), please contact: 9876543210 📞",
//     "bulk-limit-toast"
//   );

//   return; // 🚫 STOP API CALL
// }

//   await fetch(`${API_URL}${API_URLS.CART}/${cartId}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       action: "increase",
//       userId: Number(userId),
//     }),
//   });

//   loadCart();
// };

//   // 🔹 DECREASE
//   const decreaseQty = async (cartId: number) => {
//     const userId = getUserId();
//     if (!userId) return;

//     await fetch(`${API_URL}${API_URLS.CART}/${cartId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         action: "decrease",
//         userId: Number(userId),
//       }),
//     });

//     loadCart();
//   };

//   const isInCart = (productId: number) =>
//     cartItems.some(item => item.id === productId);

//    const clearCart = async () => {
//     try {
//       for (const item of cartItems) {
//         await fetch(`${API_URL}${API_URLS.CART}/${item.cartId}`, {
//           method: "DELETE",
//         });
//       }

//       setCartItems([]);
//     } catch (error) {
//       console.error("Clear cart error:", error);
//       toast.error("Failed to empty cart");
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         increaseQty,
//         decreaseQty,
//         isInCart,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used inside CartProvider");
//   return ctx;
// };


import { createContext, useContext, useEffect, useState } from "react";
import { API_URLS } from "../API-Urls";
import { toast } from "react-hot-toast";
import { showToast } from "../components/CustomToast";
import bulk from "../assets/bulk_orders.png";
import removeCart from "../assets/remove_cart.png";

const API_URL = API_URLS.BASE_URL;

export type CartItem = {
  cartId: number;
  id: number;
  title: string;
  price: number;
  discount: number;
  qty: number;
  img: string;
  weight: string;
  gstPercent: number;
  categoryName: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: any) => Promise<void>;
  removeFromCart: (cartId: number) => Promise<void>;
  increaseQty: (cartId: number) => Promise<void>;
  decreaseQty: (cartId: number) => Promise<void>;
  isInCart: (productId: number) => boolean;
  clearCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const getUserId = () => {
    return localStorage.getItem("userId");
  };

  const loadCart = async () => {
    const userId = getUserId();

    if (!userId) {
      setCartItems([]);
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}${API_URLS.CART}/${userId}`
      );

      const result = await res.json();

      const cartArray = Array.isArray(result)
        ? result
        : result.data || [];

      const mapped = cartArray.map((item: any) => {
        // 🔥 weight from virtual env
        const savedWeight =
          Number(
            localStorage.getItem(
              `weight_${item.ProductID}`
            )
          ) || item.Quantity || 1;

        return {
          cartId: item.CartID,

          id: item.ProductID,

          title: item.ProductName,

          // 🔥 PRICE × WEIGHT
          price: Number(item.Price) ,

          discount:
            Number(item.DiscountPrice),

          qty: savedWeight,

          img: item.ImageUrl || "",

          weight: `${savedWeight} kg`,

          gstPercent: Number(item.GSTPercent || 0),

          categoryName: item.CategoryName || "",
        };
      });

      setCartItems(mapped);
    } catch (error) {
      console.error("Load cart error:", error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    const syncCart = () => {
      loadCart();
    };

    loadCart();

    window.addEventListener("userChanged", syncCart);

    return () => {
      window.removeEventListener(
        "userChanged",
        syncCart
      );
    };
  }, []);

  // ADD TO CART
  const addToCart = async (product: any) => {
    const userId = getUserId();

    if (!userId) {
      alert("Please login");
      return;
    }

    await fetch(`${API_URL}${API_URLS.CART}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        UserID: Number(userId),
        ProductID: product.id,
        Quantity: 1,
      }),
    });

    loadCart();
  };

  // REMOVE
  const removeFromCart = async (cartId: number) => {
    await fetch(`${API_URL}${API_URLS.CART}/${cartId}`, {
      method: "DELETE",
    });

    loadCart();

    showToast(
      removeCart,
      "Cart Updated",
      "Removed from cart successfully",
      "cart-removed"
    );
  };

  // 🔥 INCREASE WEIGHT
  const increaseQty = async (cartId: number) => {
    const item = cartItems.find(
      (i) => i.cartId === cartId
    );

    if (!item) return;

    const currentWeight =
      Number(
        localStorage.getItem(`weight_${item.id}`)
      ) || 1;

    if (currentWeight >= 10) {
      showToast(
        bulk,
        "Bulk Order Limit",
        "For bulk orders (>10kg), contact support 📞",
        "bulk-limit-toast"
      );

      return;
    }

    const newWeight = currentWeight + 1;

    localStorage.setItem(
      `weight_${item.id}`,
      newWeight.toString()
    );

    loadCart();
  };

  // 🔥 DECREASE WEIGHT
  const decreaseQty = async (cartId: number) => {
    const item = cartItems.find(
      (i) => i.cartId === cartId
    );

    if (!item) return;

    const currentWeight =
      Number(
        localStorage.getItem(`weight_${item.id}`)
      ) || 1;

    if (currentWeight <= 1) return;

    const newWeight = currentWeight - 1;

    localStorage.setItem(
      `weight_${item.id}`,
      newWeight.toString()
    );

    loadCart();
  };

  const isInCart = (productId: number) =>
    cartItems.some((item) => item.id === productId);

  const clearCart = async () => {
    try {
      for (const item of cartItems) {
        await fetch(
          `${API_URL}${API_URLS.CART}/${item.cartId}`,
          {
            method: "DELETE",
          }
        );
      }

      setCartItems([]);
    } catch (error) {
      console.error("Clear cart error:", error);
      toast.error("Failed to empty cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        isInCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx)
    throw new Error(
      "useCart must be used inside CartProvider"
    );

  return ctx;
};