import { movieService } from "@/services/movie.service";
import MainHeader from "../main-header";

const DetailPage = async ({ params }: any) => {
  const slug = (await params).slug;
  const [type, id] = slug || [];

  return (
    <div>
      <MainHeader type={type} id={id} />
    </div>
  );
};

export default DetailPage;
