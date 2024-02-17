import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import BottomNav from "@/components/BottomNav";

export default function HomePage({
  featueredProduct,
  newProducts,
  wishedNewProducts,
}) {
  return (
    <div>
      <div className="desktop-header">
        <Header />
      </div>
      <div className="mobile-bottom-nav">
        <BottomNav />
      </div>
      <Featured product={featueredProduct} />
      <NewProducts products={newProducts} WishedProducts={wishedNewProducts} />
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
