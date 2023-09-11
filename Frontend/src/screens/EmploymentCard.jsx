import { Link } from "react-router-dom";

import { Card } from "react-bootstrap";
import employmentImg from "../imgs/employment.jpg";

const EmploymentCard = ({ item }) => {
  return (
    <Card className="shadow-lg p-3 mb-5 bg-dark rounded-lg order-sm-1 mb-sm-0">
      <Link to="/">
        <div className="image-container">
          <Card.Img
            className="shadow-sm mt-3 object-fit"
            src={employmentImg}
            alt="employmentImg"
          />
        </div>

        <Card.Body>
          <Card.Title as="div">
            <strong>{item.title}</strong>
          </Card.Title>

          <Card.Text as="h6">Description: {item.description}</Card.Text>
          <Card.Text as="h6">Owner: {item.userName}</Card.Text>
          <Card.Text as="h6">Phone: {item.number}</Card.Text>
          <Card.Text as="h3">Post Date: {item.created}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default EmploymentCard;
