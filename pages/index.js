import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import BottomNav from "@/components/BottomNav";
import Carousel from "@/components/Carousel";
import Details from "@/components/Details";
import Footer from "@/components/Footer";

const desktopImages = [
  {
    src: "https://www.inweaveindia.com/cdn/shop/files/Galantine_1600x550.gif?v=1706886290",
    link: "/categories",
  },
  {
    src: "https://www.inweaveindia.com/cdn/shop/files/Winter-banner_1600x550.gif?v=1702024751",
    link: "/categories",
  },
  {
    src: "https://www.inweaveindia.com/cdn/shop/files/desktop-banner_1600x550.jpg?v=1695371132",
    link: "/products",
  },
  {
    src: "https://www.inweaveindia.com/cdn/shop/files/inweave-banner---2_1600x550.gif?v=1695370817",
    link: "/bag",
  },
];

const mobileImages = [
  {
    src: "https://www.inweaveindia.com/cdn/shop/files/Mobile_fcef4528-203e-485a-aa82-f861980ad523_600x600.gif?v=1706886364",
    link: "/categories",
  },
  {
    src: "https://www.inweaveindia.com/cdn/shop/files/Mobile__1_600x600.gif?v=1702024946",
    link: "/categories",
  },
  {
    src: "https://www.inweaveindia.com/cdn/shop/files/mobile-banner_600x600.jpg?v=1695371151",
    link: "/products",
  },
  {
    src: "https://www.inweaveindia.com/cdn/shop/files/navratri-mobile-banner_600x600.gif?v=1695370903",
    link: "/bag",
  },
];

export default function HomePage({
  featueredProduct,
  newProducts,
  wishedNewProducts,
}) {
  return (
    <div>
      <div className="desktop-header">
        <Header />
        <Carousel images={desktopImages} />
      </div>
      <div className="mobile-bottom-nav">
        <BottomNav />
        <Carousel images={mobileImages} />
      </div>
      <NewProducts products={newProducts} WishedProducts={wishedNewProducts} />
      <div className="desktop-header">
        <img
          style={{ width: "100%", marginTop: "50px" }}
          src="https://cdn.shopify.com/s/files/1/1746/5485/files/hn.jpg?v=1675403410"
        />
      </div>
      <div className="mobile-bottom-nav">
        <img
          style={{ width: "100%", marginTop: "50px" }}
          src="https://cdn.shopify.com/s/files/1/1746/5485/files/image_2.png?v=1675403265"
        />
      </div>
      <Details />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const featuredProductId = "65c5111d004782dc40887bb9";
  await mongooseConnect();
  const featueredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedNewProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session.user.email,
        product: newProducts.map((p) => p._id.toString()),
      })
    : [];
  return {
    props: {
      featueredProduct: JSON.parse(JSON.stringify(featueredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map((i) => i.product.toString()),
    },
  };
}
