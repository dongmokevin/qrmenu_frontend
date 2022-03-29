import styled from "styled-components";
import MenuItem from "./MenuItem";

const Place = styled.div`
  text-align: center;
  img {
    border-radius: 5px;
    margin_bottom: 20px;
  }
`;
function MenuList({ place, shoppingCart, onOrder }) {
  return (
    <>
      <Place>
        <img src={place.image} width={200} heigth={200} />
        <h3>
          <b>{place.name}</b>
        </h3>
      </Place>
      {place?.categories
        ?.filter(
          (category) => category.menu_items.filter((i) => i.is_available).length
        )
        .map((category) => (
          <div key={category.id} className="mt-5">
            <h4 className="mb-4">
              <b>{category.name}</b>
            </h4>
            {category.menu_items
              .filter((i) => i.is_available)
              .map((item) => (
                <MenuItem
                  key={item.id}
                  item={{ ...item, quantity: shoppingCart[item.id]?.quantity }}
                  onOrder={onOrder}
                />
              ))}
          </div>
        ))}
    </>
  );
}

export default MenuList;
