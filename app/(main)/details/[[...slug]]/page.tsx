import Hero from "../hero";

const DetailPage = async ({ params }: any) => {
  const slug = (await params).slug;
  const [type, id] = slug || [];

  return (
    <div className="lg:p-5">
      <Hero type={type} id={id} />
    </div>
  );
};

export default DetailPage;
