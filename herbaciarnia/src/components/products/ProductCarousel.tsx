'use client';

import { Product } from '@/lib/products';
import ProductCard from './ProductCard';
// @ts-expect-error react-slick does not have up-to-date type definitions
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/**
 * Product carousel component
 * 
 * @param title - Title displayed above the carousel
 * @param products - List of products to display in the carousel
 */
const ProductCarousel = ({ title, products }: { title: string; products: Product[] }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-6 text-emerald-800">{title}</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="px-2 h-full">
            <div className="h-full">
              <ProductCard product={product} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;