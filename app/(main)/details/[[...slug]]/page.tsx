import Hero from "../hero";

const DetailPage = async ({ params }: any) => {
  const slug = (await params).slug;
  const [type, id] = slug || [];

  return (
    <div className="bg-black">
      <div className="lg:max-w-7xl mx-auto">
        <Hero type={type} id={id} />
      </div>
    </div>
  );
};

export default DetailPage;
