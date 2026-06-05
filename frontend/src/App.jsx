import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar/navbar";
import Hero from "./hero";
import Products from "./products";
import ProductGrid from "./productgrid";
import AboutPage from "./about";
import Mission from "./mission";
import Footer from "./footer";
import Cart from "./cart";
import Signup from "./signup";
import Profile from "./profile";
import Wishlist from "./wishlist";
import Address from "./address";
import CartAddress from "./cart-address";
import Payment from "./Payment";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AddressProvider } from "./context/AddressContext";
import { ConfirmProvider } from "./context/ConfirmContext";
import { Toaster } from "react-hot-toast";
import AddressFormModal from "./addressFormModal";
import Login from "./login";
import PrivacyPolicy from "./privacy-policy";
import TermsConditions from "./t&c";
import Success from "./success";
import GlobalTracker from "./GlobalTracker";
import ProductList from "./productList";
import CategoryProductPage from "./categoryProductPage";
import ProductDetail from "./ProductDetail";
import AdminLayout from "./admin_back_office/AdminLayout";
import Charts from "./admin_back_office/components/charts";
import AddProduct from "./admin_back_office/addProduct";
import AdminProduct from "./admin_back_office/AdminProduct";
import AdminChooseCategory from "./admin_back_office/AdminChooseCategory";
import AdminCategory from "./admin_back_office/AdminCategory";
import AdminOrders from "./admin_back_office/AdminOrders";
import AdminCustomers from "./admin_back_office/AdminCustomers";
import AdminCustomerDetails from "./admin_back_office/AdminCustomerDetails";
import AdminPayment from "./admin_back_office/AdminPayment";
import AdminPaymentDetails from "./admin_back_office/AdminPaymentDetails"
import AdminDiscounts from "./admin_back_office/AdminDiscounts";
import AdminViewDiscounts from "./admin_back_office/AdminViewDiscounts";
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";
import CategorySection from "./HeroCategory";
import HomeProducts from "./HomeProducts";
import HowItWorks from "./HowItWorks";
import Reviews from "./Reviews";
import AppDownload from "./AppDownload";
import SantheMarketTour from "./SantheMarketTour"; 
import Blog from "./OurBlog";
import SantheMarket3D from "./SantheMarketTour";
import Category from "./Categories";
import ContactUs from "./Contact";
import AboutUsPage from "./AboutUsPage";
import Works from "./HowItWorksPage";
import FAQ from "./FAQs";
import Checkout from "./Checkout";
import MyOrders from "./MyOrders";
import ProfWishlist from "./Profile_wishlist";
import AccountInfo from "./Acnt-info";
import AddVendor from "./admin_back_office/AddVendor";
import AllVendors from "./admin_back_office/AllVendors";
import VendorApplications from "./admin_back_office/VendorApplications";

import VendorApplicationDetails from "./admin_back_office/pages/VendorApplicationDetails";
import Dashboard from "./admin_back_office/dashboard";
import ActiveVendors from "./admin_back_office/ActiveVendors";
import VendorDetails from "./admin_back_office/pages/VendorDetails";
import ProductDetailsSection from "./admin_back_office/components/ProductDetailsSection";
import PricingSection from "./admin_back_office/components/PricingSection";
function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <section id="home"> <Hero /> </section>
 
      <section id="products">  <CategorySection /><HomeProducts /><HowItWorks/> </section>

      <section id="about">  <AboutPage /> </section>

      <section id="review"> <Reviews /> </section>
      <section id="appdownload"> <AppDownload /> </section>

      <section id="blog"> <Blog /> </section>

      <section id="contact"> <Footer />  </section>
    </>
  );
}

function App() {
  return (
    <>
      <CartProvider>
         <ConfirmProvider>
        <WishlistProvider>
          <AddressProvider>
            <GlobalTracker>
            {/* <Toaster position="top-center" reverseOrder={false} /> */}
            <Toaster
  position="top-center"
  toastOptions={{
    style: {
      zIndex: 99999
    }
  }}
/>
            <Routes>
            <Route path="/virtual-tour" element={<SantheMarket3D />} />
              <Route path="/" element={ <HomePage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/productList" element={<ProductList />} />
              <Route path="/categoryProductPage" element={<CategoryProductPage />} />
              <Route path="/categories" element={<Category />} />
              <Route path="/contact" element={<ContactUs />} />
               <Route path="/howitworkspage" element={<Works/>} />
              <Route path="/aboutuspage" element={<AboutUsPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
               <Route path="/MyOrders" element={<MyOrders />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profwishlist" element={<ProfWishlist />} />
              <Route path="/acntinfo" element={<AccountInfo/>} />

              <Route path="/address" element={<Address />} />
              <Route path="/cart-address" element={<CartAddress />} />
              <Route path="/address-form-modal" element={<AddressFormModal />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/t&c" element={<TermsConditions />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/success" element={<Success />} />
              <Route path="/faqs" element={<FAQ />} />
              
              <Route path="/admin/*" element={<AdminLayout />} />  
              <Route path="/chart" element={<Charts/>} />
              <Route path="/addProduct" element={<AddProduct/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/AdminProduct" element={<AdminProduct/>} />
              <Route path="/AdminChooseCategory" element={<AdminChooseCategory/>} />
              <Route path="/AdminCategory" element={<AdminCategory/>} />
              <Route path="/AdminOrders" element={<AdminOrders/>} />
              <Route path="/AdminCustomers" element={<AdminCustomers/>} />
              <Route path="/AdminCustomerDetails" element={<AdminCustomerDetails/>} />
              <Route path="/AdminPayment" element={<AdminPayment/>} />
              <Route path="/AdminPaymentDetails/:id" element={<AdminPaymentDetails/>} />
              <Route path="/AdminDiscounts" element={<AdminDiscounts/>} />
              <Route path="/AdminViewDiscounts" element={<AdminViewDiscounts/>} />
              <Route path="/addvendor" element={<AddVendor/>} />
              <Route path="/allvendors" element={<AllVendors/>} />
              <Route path="/vendorapplications" element={<VendorApplications/>}/>
              <Route path="/vendorapplicationdetails/:id" element={<VendorApplicationDetails/>}/>
               <Route path="/activevendors" element={<ActiveVendors/>}/>
               <Route path="/vendor-details" element={<VendorDetails />}/>
              

               <Route path="/add-product-details" element={<ProductDetailsSection />}/>
                <Route path="/pricingsection" element={<PricingSection />}/>

            </Routes>
            {/* <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />


  <Route path="/" element={<UserRoute><HomePage /></UserRoute>} />
  <Route path="/cart" element={<UserRoute><Cart /></UserRoute>} />
  <Route path="/productList" element={<UserRoute><ProductList /></UserRoute>} />
  <Route path="/categoryProductPage" element={<UserRoute><CategoryProductPage /></UserRoute>} />
  <Route path="/product/:id" element={<UserRoute><ProductDetail /></UserRoute>} />
  <Route path="/profile" element={<UserRoute><Profile /></UserRoute>} />
  <Route path="/wishlist" element={<UserRoute><Wishlist /></UserRoute>} />
  <Route path="/address" element={<UserRoute><Address /></UserRoute>} />
  <Route path="/cart-address" element={<UserRoute><CartAddress /></UserRoute>} />
  <Route path="/address-form-modal" element={<UserRoute><AddressFormModal /></UserRoute>} />
  <Route path="/payment" element={<UserRoute><Payment /></UserRoute>} />
  <Route path="/success" element={<UserRoute><Success /></UserRoute>} />

  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
  <Route path="/t&c" element={<TermsConditions />} />

  <Route path="/admin/*" element={
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  } />

  <Route path="/chart" element={<AdminRoute><Charts /></AdminRoute>} />
  <Route path="/addProduct" element={<AdminRoute><AddProduct /></AdminRoute>} />
  <Route path="/AdminProduct" element={<AdminRoute><AdminProduct /></AdminRoute>} />
  <Route path="/AdminChooseCategory" element={<AdminRoute><AdminChooseCategory /></AdminRoute>} />
  <Route path="/AdminCategory" element={<AdminRoute><AdminCategory /></AdminRoute>} />
  <Route path="/AdminOrders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
  <Route path="/AdminCustomers" element={<AdminRoute><AdminCustomers /></AdminRoute>} />
  <Route path="/AdminCustomerDetails" element={<AdminRoute><AdminCustomerDetails /></AdminRoute>} />
  <Route path="/AdminPayment" element={<AdminRoute><AdminPayment /></AdminRoute>} />
  <Route path="/AdminPaymentDetails/:id" element={<AdminRoute><AdminPaymentDetails /></AdminRoute>} />
  <Route path="/AdminDiscounts" element={<AdminRoute><AdminDiscounts /></AdminRoute>} />
  <Route path="/AdminViewDiscounts" element={<AdminRoute><AdminViewDiscounts /></AdminRoute>} />

</Routes> */}
            </GlobalTracker>
          </AddressProvider>
        </WishlistProvider>
        </ConfirmProvider>
      </CartProvider>
    </>
  );
}

export default App;
