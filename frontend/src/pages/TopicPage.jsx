import { useParams } from "react-router-dom";

function TopicPage() {
  const { category } = useParams();

  return <h1>Topic: {category}</h1>;
}

export default TopicPage;
