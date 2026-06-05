

import React, { useEffect, useRef, useState } from "react";
import { useCart } from "./context/CartContext";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "./API-Urls";
import { showToast } from "./components/CustomToast";
import add_cart from "./assets/add_cart.png";
import tst_bfr from "./assets/toast_bfr_lgn.jpeg";

declare global {
  interface Window {
    pannellum: any;
  }
}

interface Product {
  id: number;
  title: string;
  price: number;
  weight: string;
  img: string;
}

const SantheMarketTour: React.FC = () => {
  const viewerRef = useRef<any>(null);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [selectedWeight, setSelectedWeight] =
    useState("1");

  // PLAYER POSITION
  const [playerX, setPlayerX] = useState(50);
  const [playerY, setPlayerY] = useState(78);

  const userId = localStorage.getItem("userId");

  // FETCH PRODUCTS
  useEffect(() => {
    fetch(`${API_URLS.BASE_URL}${API_URLS.PRODUCTS}`)
      .then((res) => res.json())
      .then((response) => {
        if (!response.success) return;

        const mapped = response.data.map(
          (item: any) => ({
            id: item.ProductID,
            title: item.ProductName,
            price:
              item.DiscountPrice || item.Price,
            weight:
              item.ProductWeight || "",
            img: item.ImageUrl || "",
          })
        );

        setProducts(mapped);
      });
  }, []);

  // PRODUCTS
  const tomato = products.find((p) =>
    p.title.toLowerCase().includes("tomato")
  );

  const banana = products.find((p) =>
    p.title.toLowerCase().includes("banana")
  );

  const rice = products.find((p) =>
    p.title.toLowerCase().includes("rice")
  );

  const wheat = products.find((p) =>
    p.title.toLowerCase().includes("wheat")
  );

  // INIT PANNELLUM
  useEffect(() => {
    if (!window.pannellum) return;

    viewerRef.current = window.pannellum.viewer(
      "panorama-container",
      {
        default: {
          firstScene: "entrance",
          autoLoad: true,
          sceneFadeDuration: 1000,
          showControls: false,
          hfov: 150,
        },

        scenes: {
          // ENTRANCE
          entrance: {
            panorama:
              "/market_entrance.png",
                

            type: "equirectangular",

            hotSpots: [
              {
                pitch: -10,
                yaw: 0,
                type: "scene",
                text: "Go Inside Market",
                sceneId: "path_midway",
              },

              ...(tomato
                ? [
                    {
                      pitch: -45,
                      yaw: -68,
                      type: "info",
                      text: `🍅 ${tomato.title}`,
                      clickHandlerFunc: () =>
                        setSelectedProduct(
                          tomato
                        ),
                    },
                  ]
                : []),

              ...(banana
                ? [
                    {
                      pitch: -18,
                      yaw: 40,
                      type: "info",
                      text: `🍌 ${banana.title}`,
                      clickHandlerFunc: () =>
                        setSelectedProduct(
                          banana
                        ),
                    },
                  ]
                : []),
            ],
          },

          // PATH MID
          path_midway: {
            panorama:
              "/market_path_mid.png",

            type: "equirectangular",

            hotSpots: [
              {
                pitch: -10,
                yaw: 180,
                type: "scene",
                text: "Back To Entrance",
                sceneId: "entrance",
              },

              {
                pitch: -5,
                yaw: -93,
                type: "scene",
                text: "Go To Grains Stall",
                sceneId: "grains_stall",
              },

              {
                pitch: -8,
                yaw: 90,
                type: "scene",
                text: "Go To Goods Section",
                sceneId: "goods_section",
              },
            ],
          },

          // GRAINS STALL
          grains_stall: {
            panorama:
              "/grains-stall.png",

            type: "equirectangular",

            hotSpots: [
              {
                pitch: -10,
                yaw: 180,
                type: "scene",
                text: "Back",
                sceneId: "path_midway",
              },

              ...(rice
                ? [
                    {
                      pitch: -15,
                      yaw: -20,
                      type: "info",
                      text: `🌾 ${rice.title}`,
                      clickHandlerFunc: () =>
                        setSelectedProduct(rice),
                    },
                  ]
                : []),

              ...(wheat
                ? [
                    {
                      pitch: -12,
                      yaw: 35,
                      type: "info",
                      text: `🌾 ${wheat.title}`,
                      clickHandlerFunc: () =>
                        setSelectedProduct(wheat),
                    },
                  ]
                : []),
            ],
          },

          // GOODS SECTION
          goods_section: {
            panorama:
              "/market_goods_section.png",

            type: "equirectangular",

            hotSpots: [
              {
                pitch: -10,
                yaw: 180,
                type: "scene",
                text: "Back",
                sceneId: "path_midway",
              },
            ],
          },
        },
      }
    );

    return () =>
      viewerRef.current?.destroy();
  }, [products]);

  // ADD TO CART
  const handleAddToCart = async () => {
    if (!userId) {
      showToast(
        tst_bfr,
        "Login Required",
        "Please login",
        "cart-login"
      );

      navigate("/login");

      return;
    }

    if (!selectedProduct) return;

    await addToCart({
      id: selectedProduct.id,
    });

    localStorage.setItem(
      `weight_${selectedProduct.id}`,
      selectedWeight
    );

    showToast(
      add_cart,
      "Cart Updated",
      `${selectedProduct.title} added successfully`,
      "cart-added"
    );

    setSelectedProduct(null);
  };

  // PLAYER MOVEMENT
  useEffect(() => {
    const movePlayer = (
      e: KeyboardEvent
    ) => {
      if (e.key === "ArrowLeft") {
        setPlayerX((prev) =>
          Math.max(prev - 2, 5)
        );
      }

      if (e.key === "ArrowRight") {
        setPlayerX((prev) =>
          Math.min(prev + 2, 95)
        );
      }

      if (e.key === "ArrowUp") {
        setPlayerY((prev) =>
          Math.max(prev - 2, 55)
        );
      }

      if (e.key === "ArrowDown") {
        setPlayerY((prev) =>
          Math.min(prev + 2, 85)
        );
      }
    };

    window.addEventListener(
      "keydown",
      movePlayer
    );

    return () => {
      window.removeEventListener(
        "keydown",
        movePlayer
      );
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
    

      {/* CONTROLS */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 2000,
          background: "rgba(0,0,0,0.6)",
          color: "white",
          padding: "10px 15px",
          borderRadius: "10px",
          fontSize: "14px",
        }}
      >
        🎮 Use Arrow Keys To Explore Market
      </div>

      {/* PRODUCT POPUP */}
      {selectedProduct && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "rgba(0,0,0,0.6)",

            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#f4f4f4",

              padding: "25px",

              borderRadius: "16px",

              width: "320px",

              textAlign: "center",
            }}
          >
            <h2>
              {selectedProduct.title}
            </h2>

            <select
              value={selectedWeight}
              onChange={(e) =>
                setSelectedWeight(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "20px",
              }}
            >
              <option value="1">
                1 kg
              </option>

              <option value="2">
                2 kg
              </option>

              <option value="5">
                5 kg
              </option>
            </select>

            <p
              style={{
                marginTop: "20px",
              }}
            >
              Price: ₹
              {selectedProduct.price *
                Number(
                  selectedWeight
                )}
            </p>

            <button
              onClick={
                handleAddToCart
              }
              style={{
                width: "100%",
                padding: "12px",
                background: "green",
                color: "#fff",
                marginTop: "15px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Add To Cart
            </button>

            <button
              onClick={() =>
                setSelectedProduct(
                  null
                )
              }
              style={{
                marginTop: "10px",
                padding: "10px",
                width: "100%",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* PANORAMA */}
      <div
        id="panorama-container"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default SantheMarketTour;



// import React, { useEffect, useRef, useState } from "react";
// import { Viewer } from "@photo-sphere-viewer/core";
// import "@photo-sphere-viewer/core/index.css";

// import { useCart } from "./context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { API_URLS } from "./API-Urls";
// import { showToast } from "./components/CustomToast";

// import add_cart from "./assets/add_cart.png";
// import tst_bfr from "./assets/toast_bfr_lgn.jpeg";

// interface Product {
//   id:number;
//   title:string;
//   price:number;
//   weight:string;
//   img:string;
// }

// const SantheMarketTour:React.FC=()=>{

// const viewerRef=useRef<any>(null);

// const {addToCart}=useCart();
// const navigate=useNavigate();

// const [products,setProducts]=useState<Product[]>([]);
// const [selectedProduct,setSelectedProduct]=
// useState<Product|null>(null);

// const [selectedWeight,setSelectedWeight]=
// useState("1");

// const [currentScene,setCurrentScene]=
// useState("entrance");

// const userId=
// localStorage.getItem("userId");



// useEffect(()=>{

// fetch(
// `${API_URLS.BASE_URL}${API_URLS.PRODUCTS}`
// )
// .then(res=>res.json())
// .then(response=>{

// if(!response.success)return;

// const mapped=response.data.map(
// (item:any)=>({

// id:item.ProductID,
// title:item.ProductName,
// price:item.DiscountPrice || item.Price,
// weight:item.ProductWeight || "",
// img:item.ImageUrl || ""

// })
// );

// setProducts(mapped);

// });

// },[]);



// const tomato=products.find(
// p=>p.title.toLowerCase()
// .includes("tomato")
// );

// const banana=products.find(
// p=>p.title.toLowerCase()
// .includes("banana")
// );

// const rice=products.find(
// p=>p.title.toLowerCase()
// .includes("rice")
// );

// const wheat=products.find(
// p=>p.title.toLowerCase()
// .includes("wheat")
// );



// const scenes:any={

// entrance:"/market_entrance.png",

// path_midway:"/market_path_mid.png",

// grains_stall:"/grains-stall.png",

// goods_section:"/market_goods_section.png"

// };



// /* CREATE VIEWER ONCE */

// useEffect(()=>{

// const container=
// document.getElementById(
// "panorama-container"
// );

// if(!container) return;

// if(viewerRef.current) return;

// viewerRef.current=
// new Viewer({

// container,

// panorama:
// scenes[currentScene],

// navbar:false,

// defaultYaw:0

// });


// return ()=>{

// if(viewerRef.current){

// viewerRef.current.destroy();

// viewerRef.current=null;

// }

// };

// },[]);



// /* CHANGE PANORAMA ONLY */

// useEffect(()=>{

// if(
// viewerRef.current
// ){

// viewerRef.current
// .setPanorama(
// scenes[currentScene]
// );

// }

// },[currentScene]);




// const handleAddToCart=async()=>{

// if(!userId){

// showToast(
// tst_bfr,
// "Login Required",
// "Please login",
// "cart-login"
// );

// navigate("/login");

// return;

// }

// if(!selectedProduct)
// return;


// await addToCart({

// id:selectedProduct.id

// });


// localStorage.setItem(

// `weight_${selectedProduct.id}`,

// selectedWeight

// );


// showToast(

// add_cart,

// "Cart Updated",

// `${selectedProduct.title}
// added successfully`,

// "cart-added"

// );


// setSelectedProduct(null);

// };



// return(

// <div
// style={{

// width:"100vw",
// height:"100vh",
// position:"relative"

// }}
// >


// <div
// style={{

// position:"absolute",
// top:20,
// left:20,
// zIndex:1000,
// display:"flex",
// gap:"10px"

// }}
// >

// <button
// onClick={()=>
// setCurrentScene(
// "entrance"
// )}
// >
// Entrance
// </button>


// <button
// onClick={()=>
// setCurrentScene(
// "path_midway"
// )}
// >
// Midway
// </button>


// <button
// onClick={()=>
// setCurrentScene(
// "grains_stall"
// )}
// >
// Grains
// </button>


// <button
// onClick={()=>
// setCurrentScene(
// "goods_section"
// )}
// >
// Goods
// </button>

// </div>



// <div
// style={{

// position:"absolute",
// bottom:20,
// left:20,
// zIndex:1000,
// display:"flex",
// gap:"10px"

// }}
// >

// {tomato&&(
// <button
// onClick={()=>
// setSelectedProduct(
// tomato
// )}
// >
// 🍅 Tomato
// </button>
// )}

// {banana&&(
// <button
// onClick={()=>
// setSelectedProduct(
// banana
// )}
// >
// 🍌 Banana
// </button>
// )}

// {rice&&(
// <button
// onClick={()=>
// setSelectedProduct(
// rice
// )}
// >
// 🌾 Rice
// </button>
// )}

// {wheat&&(
// <button
// onClick={()=>
// setSelectedProduct(
// wheat
// )}
// >
// 🌾 Wheat
// </button>
// )}

// </div>


// {selectedProduct&&(

// <div
// style={{

// position:"absolute",
// top:0,
// left:0,
// width:"100%",
// height:"100%",
// background:
// "rgba(0,0,0,.6)",

// display:"flex",
// justifyContent:"center",
// alignItems:"center",
// zIndex:9999

// }}
// >

// <div
// style={{

// background:"#fff",
// padding:"25px",
// borderRadius:"15px",
// width:"320px",
// textAlign:"center"

// }}
// >

// <h2>
// {selectedProduct.title}
// </h2>

// <select
// value={selectedWeight}
// onChange={(e)=>
// setSelectedWeight(
// e.target.value
// )
// }
// >

// <option value="1">
// 1kg
// </option>

// <option value="2">
// 2kg
// </option>

// <option value="5">
// 5kg
// </option>

// </select>


// <p>

// Price ₹
// {
// selectedProduct.price*
// Number(selectedWeight)
// }

// </p>


// <button
// onClick=
// {handleAddToCart}
// >

// Add To Cart

// </button>


// <button
// onClick={()=>
// setSelectedProduct(
// null
// )
// }
// >

// Cancel

// </button>

// </div>

// </div>

// )}


// <div
// id="panorama-container"
// style={{
// width:"100%",
// height:"100%"
// }}
// />

// </div>

// );

// };

// export default SantheMarketTour;