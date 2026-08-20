import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header_2 from "../../components/common/Header_2/Header_2";
import Footer from "../../components/common/Footer/Footer";
import ProductHeroSection from "./sections/ProductHeroSection";
import FeaturedPromoBanner from "./sections/FeaturedPromoBanner";
import FeaturesBar from "./sections/FeaturesBar";
import RelatedProductsCarousel from "./sections/RelatedProductsCarousel";
import NewsletterSection from "./sections/NewsletterSection";
import CartDrawer from "./components/CartDrawer";
import { getProductById } from "../../data/productsData";
import {
  getStoredCart,
  addItemToCart,
  updateCartItemQuantity,
  removeCartItem
} from "../../utils/cartManager";

import BackButton from "../../components/common/BackButton/BackButton";

/**
 * Complete Product Details & Cart Page matching the FASCO reference design.
 * Dynamically updates based on URL /product/:id or state and syncs with central cart.
 * Located in: src/pages/ProductDetails/ProductDetailsPage.jsx
 */
const ProductDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Find product and always resolve latest fresh data from ALL_PRODUCTS
  const getResolvedProduct = () => {
    const targetId = id || location.state?.product?.id;
    if (targetId) {
      return getProductById(targetId);
    }
    return getProductById("fash-1");
  };

  const [currentProduct, setCurrentProduct] = useState(getResolvedProduct);

  useEffect(() => {
    setCurrentProduct(getResolvedProduct());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, location.state]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(1);
  const [cartItems, setCartItems] = useState(getStoredCart);

  // Synchronize cart state on changes
  useEffect(() => {
    const handleCartSync = () => {
      setCartItems(getStoredCart());
    };

    window.addEventListener("cart_updated", handleCartSync);
    window.addEventListener("storage", handleCartSync);

    return () => {
      window.removeEventListener("cart_updated", handleCartSync);
      window.removeEventListener("storage", handleCartSync);
    };
  }, []);

  // Total quantity in cart
  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const [justAddedItem, setJustAddedItem] = useState(null);

  // Add to Cart handler
  const handleAddToCart = (product) => {
    const updated = addItemToCart(product);
    setCartItems(updated);
    
    // Find the exactly added item from the updated cart
    const added = updated.find(item => String(item.id) === String(product.id));
    if (added) {
      setJustAddedItem(added);
      setIsCartOpen(true);
    }
  };

  // Buy Now handler (Adds to cart & navigates directly to /checkout)
  const handleBuyNow = (product) => {
    const updated = addItemToCart(product);
    setCartItems(updated);
    navigate("/checkout", { state: { directBuy: true } });
  };

  // Update item quantity in cart drawer
  const handleUpdateQuantity = (itemToUpdate, newQuantity) => {
    const updated = updateCartItemQuantity(itemToUpdate.id, newQuantity);
    setCartItems(updated);
  };

  // Remove item from cart drawer
  const handleRemoveItem = (itemToRemove) => {
    const updated = removeCartItem(itemToRemove.id);
    setCartItems(updated);
  };

  // Wishlist toggle handler
  const handleWishlistToggle = (productId, isLiked) => {
    setWishlistCount((prev) => (isLiked ? prev + 1 : Math.max(0, prev - 1)));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-black selection:text-white">
      
      {/* 1. Top Navbar (Header_2 with FASCO Logo & Badges) */}
      <Header_2
        brandName="FASCO"
        activeLink="Products"
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onCartClick={() => navigate("/cart")}
      />

      <main className="flex-1">
        {/* Navigation Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <BackButton
            label="Back"
            fallbackPath="/shop"
            state={location.state?.returnState ? { returnState: location.state.returnState } : undefined}
          />
        </div>

        {/* 2. Main Dynamic Product Details Hero Section */}
        <ProductHeroSection
          product={currentProduct}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onWishlistToggle={handleWishlistToggle}
          isWishlisted={true}
        />

        {/* 3. Featured Collection Promo Banner (Peaky Blinders) */}
        <FeaturedPromoBanner
          onBuyNowClick={() =>
            handleAddToCart({
              id: "peaky-blinders-01",
              name: "Peaky Blinders Collection Set",
              price: 100.0,
              image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
              selectedSize: "M",
              selectedColor: "Black",
              quantity: 1
            })
          }
        />

        {/* 4. Value Propositions Features Bar (Quality, Warranty, Shipping, Support) */}
        <FeaturesBar />

        {/* 5. 'People Also Loved' Carousel & Flash Countdown */}
        <RelatedProductsCarousel
          onAddToCart={(product) =>
            handleAddToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              selectedSize: "Standard",
              selectedColor: "Default",
              quantity: 1
            })
          }
        />

        {/* 6. Dual-Model Newsletter Subscription Section */}
        <NewsletterSection />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* 8. Interactive Slide-Over Cart Drawer matching Reference Design */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => {
          setIsCartOpen(false);
          setJustAddedItem(null);
        }}
        cartItems={justAddedItem ? [justAddedItem] : []}
        onUpdateQuantity={(item, newQty) => {
          handleUpdateQuantity(item, newQty);
          setJustAddedItem({ ...item, quantity: newQty });
        }}
        onRemoveItem={(item) => {
          handleRemoveItem(item);
          setJustAddedItem(null);
          setIsCartOpen(false);
        }}
        onCheckout={() => navigate("/checkout")}
      />

    </div>
  );
};

export default ProductDetailsPage;
