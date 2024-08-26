import SEO from "../common/seo";
import Home from "../components/homes/home-2";
import Wrapper from "../layout/wrapper";


const index = () => {
  return (
    <Wrapper>
      <SEO pageTitle={'Apesys'} />
      <Home />
    </Wrapper>
  );
};

export default index;