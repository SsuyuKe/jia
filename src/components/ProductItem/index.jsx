import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProductModal from "@/components/ProductModal";

const ProductItem = ({ image, category, name, price, description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { t } = useTranslation();

  const handleCardClick = (e) => {
    if (!e.target.closest(".quantity-controls")) {
      setIsModalOpen(true);
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(0, prev + change));
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="bg-[rgb(120,117,117)] rounded-[10px] overflow-hidden 
                 shadow-[0_0_5px_rgba(0,0,0,0.1)] 
                 transition-all duration-300 ease-in-out 
                 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,170,13,0.5)]
                 active:scale-95 cursor-pointer"
      >
        <div>
          <div className="relative">
            <img
              src={image}
              alt={t(`products.items.${name}.name`)}
              className="w-full h-[250px] object-cover"
            />
            <div
              className="absolute top-0 right-0 bg-main-color-yellow px-[15px] py-[5px] text-xl
                    rounded-tr-[10px] rounded-bl-[10px]"
            >
              <span className="text-black font-extrabold">${price}</span>
            </div>
          </div>
          <div className="p-2">
            <h3 className="text-2xl text-[rgb(240,201,130)] font-bold tracking-[2px] mb-2.5 h-[60px] flex items-center justify-center">
              {t(`products.items.${name}.name`)}
            </h3>
            <div className="rounded-lg p-3">
              <div
                className="quantity-controls flex justify-center items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-[30px] h-[30px] text-xl bg-[rgb(245,222,180)] rounded-[5px] 
                                 text-black cursor-pointer transition-all duration-300 
                                 hover:bg-[rgba(255,170,13,0.8)] active:scale-95"
                >
                  -
                </button>
                <div
                  className="mx-1.5 text-2xl text-main-color-yellow font-bold w-[50px] 
                               border-2 border-[rgba(255,170,13,0.5)] 
                               rounded-[5px] py-1.5
                               bg-[rgba(0,0,0,0.2)] 
                               flex items-center justify-center"
                >
                  {quantity}
                </div>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-[30px] h-[30px] text-xl bg-[rgb(245,222,180)] rounded-[5px] 
                                 text-black cursor-pointer transition-all duration-300 
                                 hover:bg-[rgba(255,170,13,0.8)] active:scale-95"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={{
          image,
          category,
          name,
          price,
          description,
        }}
      />
    </>
  );
};

export default ProductItem;
