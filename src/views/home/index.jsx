import { ArrowRightOutlined } from '@ant-design/icons';
import { MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { FEATURED_PRODUCTS, RECOMMENDED_PRODUCTS, SHOP } from '@/constants/routes';
import {
  useDocumentTitle, useFeaturedProducts, useRecommendedProducts, useScrollTop
} from '@/hooks';
import bannerImg from '@/images/banner-girl.png';
import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '@/components/common/Carousel';
import CarouselCard from '@/components/common/CarouselCard';
import HomeGrid from '@/components/common/HomeGrid';
import HomeNav from '@/components/common/HomeNav';
// Data for carousel
const carouselSlidesData = [
  {
    content:
      "Introduce a little anarchy, upset the established order and everything becomes chaos. I'm an agent of chaos. Oh, and you know the thing about chaos? It's fair.",
    author: "Joker",
    source: "facebook",
    image: "/assets/slide_3.jpg",
  }, {
    content:
      "I can't do that as Bruce Wayne... as a man. I'm flesh and blood. I can be ignored, destroyed. But as a symbol, I can be incorruptible, I can be everlasting.",
    author: "Bruce Wayne",
    source: "facebook",
    image: "/assets/slide_4.jpg",
  }, {
    content:
      "But it's not who you are underneath... it's what you do that defines you.",
    author: "Rachel Dawes",
    source: "twitter",
    image: "/assets/slide_5.jpg",
  }, {
    content:
      "When their enemies were at the gates the Romans would suspend democracy and appoint one man to protect the city. It wasn't considered an honor, it was a public service.",
    author: "John Blake",
    source: "Google+",
    image: "/assets/slide_6.jpg",
  }, {
    content:
      "Master Wayne, you've been gone a long time. You look very fashionable. Apart from the mud.",
    author: "Alfred Pennyworth",
    source: "twitter",
    image: "/assets/slide_7.jpg",
  }
];

const Home = () => {
  useDocumentTitle('CureCart | Home');
  useScrollTop();

  const {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured
  } = useFeaturedProducts(6);
  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingRecommended,
    error: errorRecommended
  } = useRecommendedProducts(6);

  return (
    <main className="content">
       
      <div className="home">
      <HomeNav />
        <Carousel slides={carouselSlidesData} />
        <HomeGrid />
        <CarouselCard items={[
          { name: "Diabetes Care", description: "", startFrom: "199", source: "https://onemg.gumlet.io/a_ignore,w_150,h_150,c_fit,q_auto,f_auto/c2a0598f-483c-48ff-9783-71e402aa28d3.png" },
          { name: "Cardiac Care", description: "", startFrom: "199", source: "https://onemg.gumlet.io/a_ignore,w_150,h_150,c_fit,q_auto,f_auto/ab1da5f4-c074-47d2-b278-a5fbd2c93f1f.png" },
          { name: "Stomach Care", description: "", startFrom: "99", source: "https://onemg.gumlet.io/a_ignore,w_150,h_150,c_fit,q_auto,f_auto/702457a8-ff7d-43a6-bd1d-6bcb278ce686.png" },
          { name: "Liver Care", description: "", startFrom: "299", source: "https://onemg.gumlet.io/a_ignore,w_150,h_150,c_fit,q_auto,f_auto/995e64ba-5bd9-42bc-8db6-5dc0b821c89d.png" },
          { name: "Bone Joint Care", description: "", startFrom: "99", source: "https://onemg.gumlet.io/a_ignore,w_150,h_150,c_fit,q_auto,f_auto/ba975795-98dc-4cd8-8b55-3c20230d70e3.png" },
          { name: "Kidney Care", description: "", startFrom: "199", source: "https://onemg.gumlet.io/a_ignore,w_150,h_150,c_fit,q_auto,f_auto/ba975795-98dc-4cd8-8b55-3c20230d70e3.png" },
          { name: "Skin Care", description: "", startFrom: "299", source: "https://onemg.gumlet.io/a_ignore,w_150,h_150,c_fit,q_auto,f_auto/ba975795-98dc-4cd8-8b55-3c20230d70e3.png" },
          { name: "ENT Care", description: "", startFrom: "199", source: "https://onemg.gumlet.io/a_ignore,w_150,h_150,c_fit,q_auto,f_auto/4a788b46-97f3-460e-afb6-428368f779ee.png" },
          { name: "item9", description: "", startFrom: "199", source: "https://onemg.gumlet.io/a_ignore,w_150,h_150,c_fit,q_auto,f_auto/631e3dca-3d5b-49f8-832b-8341ec4784e7.png" },
          { name: "item10", description: "", startFrom: "199", source: "" },

        ]} headerTitle="Top offers" redirectlink="" />
        <CarouselCard items={[
          { name: "Top Deals", description: "", source: "https://onemg.gumlet.io/a_ignore,w_150,h_150,c_fit,q_auto,f_auto/700ef116-c9c9-4567-b607-5ec05ba46da6.webp" },
          { name: "Vitamins", description: "", source: "https://onemg.gumlet.io/a_ignore,w_150,h_150,c_fit,q_auto,f_auto/4bffbf6d-6d75-45f2-8b3c-962e3a7aec56.png" },
          { name: "Nutritional Drink", description: "", startFrom: "99", source: "https://onemg.gumlet.io/a_ignore,w_150,h_150,c_fit,q_auto,f_auto/702457a8-ff7d-43a6-bd1d-6bcb278ce686.png" },
          { name: "Personal Care", description: "", startFrom: "299", source: "https://onemg.gumlet.io/a_ignore,w_150,h_150,c_fit,q_auto,f_auto/995e64ba-5bd9-42bc-8db6-5dc0b821c89d.png" },
          { name: "Eye Care", description: "", startFrom: "99", source: "https://onemg.gumlet.io/a_ignore,w_150,h_150,c_fit,q_auto,f_auto/ba975795-98dc-4cd8-8b55-3c20230d70e3.png" },
          { name: "Sexual Wellness", description: "", source: "https://onemg.gumlet.io/a_ignore,w_150,h_150,c_fit,q_auto,f_auto/4bffbf6d-6d75-45f2-8b3c-962e3a7aec56.png" },
          { name: "Skin Care", description: "", startFrom: "299", source: "https://onemg.gumlet.io/a_ignore,w_150,h_150,c_fit,q_auto,f_auto/ba975795-98dc-4cd8-8b55-3c20230d70e3.png" },
          { name: "ENT Care", description: "", source: "https://onemg.gumlet.io/a_ignore,w_150,h_150,c_fit,q_auto,f_auto/4a788b46-97f3-460e-afb6-428368f779ee.png" },
          { name: "item9", description: "", source: "https://onemg.gumlet.io/a_ignore,w_150,h_150,c_fit,q_auto,f_auto/631e3dca-3d5b-49f8-832b-8341ec4784e7.png" },
          { name: "item10", description: "", source: "" },

        ]} headerTitle="Popular Categories" redirectlink="" />
        <div className="banner">
          <div className="banner-desc">
            <h1 className="text-thin">
              <strong>See</strong>
              &nbsp;everything with&nbsp;
              <strong>Clarity</strong>
            </h1>
            <p>
              Buying eyewear should leave you happy and good-looking, with money in your pocket.
              Glasses, sunglasses, and contacts—we’ve got your eyes covered.
            </p>
            <br />
            <Link to={SHOP} className="button">
              Shop Now &nbsp;
              <ArrowRightOutlined />
            </Link>
          </div>
          <div className="banner-img"><img src={bannerImg} alt="" /></div>
        </div>
        <div className="display">
          <div className="display-header">
            <h1>Featured Products</h1>
            <Link to={FEATURED_PRODUCTS}>See All</Link>
          </div>
          {(errorFeatured && !isLoadingFeatured) ? (
            <MessageDisplay
              message={errorFeatured}
              action={fetchFeaturedProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductShowcaseGrid
              products={featuredProducts}
              skeletonCount={6}
            />
          )}
        </div>
        <div className="display">
          <div className="display-header">
            <h1>Recommended Products</h1>
            <Link to={RECOMMENDED_PRODUCTS}>See All</Link>
          </div>
          {(errorRecommended && !isLoadingRecommended) ? (
            <MessageDisplay
              message={errorRecommended}
              action={fetchRecommendedProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductShowcaseGrid
              products={recommendedProducts}
              skeletonCount={6}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
