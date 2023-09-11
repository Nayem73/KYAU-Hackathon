import { Card } from "react-bootstrap";
import mango from "../imgs/mango.jpg";
import { createSubscription } from "../actions/subscriptionActions";
import { useDispatch } from "react-redux";

const AdvertiseCard = ({ item }) => {
  const dispatch = useDispatch();

  const subscripHandler = (e) => {
    e.preventDefault();
    dispatch(createSubscription());
  };
  return (
    <Card className="shadow-lg p-3 mb-5 bg-dark rounded-lg order-sm-1 mb-sm-0">
      <div className="image-container">
        <Card.Img className="shadow-sm mt-3 object-fit" src={mango} />
      </div>

      <Card.Body>
        <Card.Title as="div">
          <strong>{item.title}</strong>
        </Card.Title>
        <div className="flex">
          <Card.Text className="flex-1" as="h3">
            Post Date: {item.created}
          </Card.Text>
          <Card.Text className="flex-2" as="h3">
            Price: {item.price}TK
          </Card.Text>
        </div>
        <div className="flex">
          <Card.Text className="flex-1" as="h6">
            {item.description}
          </Card.Text>
          <Card.Text className="flex-2" as="h6">
            {item.userName}
          </Card.Text>
        </div>

        <button
          onClick={subscripHandler}
          type="button"
          className="btn btn-outline-info justify-center"
        >
          Buy Now
        </button>
      </Card.Body>
    </Card>
  );
};

export default AdvertiseCard;
