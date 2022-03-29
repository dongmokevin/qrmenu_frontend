import { IoMdArrowBack } from "react-icons/io";
import { MdDelete, MdOutlineQrCode2 } from "react-icons/md";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  fetchPlace,
  removeCategory,
  removeMenuItem,
  removePlace,
  updatePlace,
} from "../apis";
import AuthContext from "../contexts/AuthContex";
import MainLayout from "../layouts/MainLayouts";
import MenuItemForm from "../containers/MenuItemForm";
import { useContext, useEffect, useState } from "react";
import MenuItem from "../components/MenuItem";
import QRCodeModel from "../components/QRCodeModel";

const Panel = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.05);
`;

const Place = () => {
  const [place, setPlace] = useState({});
  const [menuItemFormShow, setMenuItemFormShow] = useState(false);
  const [selectedItem, setSelecteditem] = useState(null);
  const [qrCode, setQrCode] = useState(false);

  const showModal = () => setMenuItemFormShow(true);
  const hideModal = () => setMenuItemFormShow(false);

  const showQRModal = () => setQrCode(true);
  const hideQRModal = () => setQrCode(false);

  console.log(place.categories);

  const auth = useContext(AuthContext);
  const params = useParams();
  const history = useNavigate();

  const onBack = () => history("/places");

  const onFetchPlace = async () => {
    const json = await fetchPlace(params.id, auth.token);
    if (json) {
      setPlace(json.data);
    }
  };

  const onRemovePlace = () => {
    const c = window.confirm("Are You sure to Delete this Restaurant ?");

    if (c) {
      removePlace(params.id, auth.token).then(onBack);
    }
  };

  const onRemoveCategory = (id) => {
    const c = window.confirm("Are You sure to Delete this Category ?");

    if (c) {
      removeCategory(id, auth.token).then(onFetchPlace);
    }
  };

  const onRemoveMenuItem = (id) => {
    const c = window.confirm("Are You sure to Delete this Menu Item ?");

    if (c) {
      removeMenuItem(id, auth.token).then(onFetchPlace);
    }
  };

  const onUpdatePlace = (tables) => {
    updatePlace(place.id, { number_of_tables: tables }, auth.token).then(
      (json) => {
        if (json) {
          setPlace(json.data);
        }
      }
    );
  };

  useEffect(() => {
    onFetchPlace();
  }, []);

  return (
    <MainLayout>
      <Row>
        <Col lg={12}>
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <Button variant="link" onClick={onBack}>
                <IoMdArrowBack size={25} color="black" />
              </Button>
              <h3 className="mb-0 mx-2">{place.name}</h3>

              <Button variant="link" onClick={onRemovePlace}>
                <MdDelete size={25} color="red" />
              </Button>
            </div>

            <Button variant="link" onClick={showQRModal}>
              <MdOutlineQrCode2 size={25} />
            </Button>
          </div>
        </Col>
        <Col md={4}>
          <Panel>
            <MenuItemForm place={place} onDone={onFetchPlace} />
          </Panel>
        </Col>

        <Col md={8}>
          {place?.categories?.map((category) => (
            <div key={category.id} className="mb-5">
              <div className="d-flex align-items-center mb-4">
                <h4 className="mb-0 mr-2">
                  <b>{category.name}</b>
                </h4>
                <Button
                  variant="link"
                  onClick={() => onRemoveCategory(category.id)}
                >
                  <MdDelete size={25} color="red" />
                </Button>
              </div>
              {category.menu_items.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onEdit={() => {
                    setSelecteditem(item);
                    showModal();
                  }}
                  onRemove={() => onRemoveMenuItem(item.id)}
                />
              ))}
            </div>
          ))}
        </Col>
      </Row>
      <Modal show={menuItemFormShow} onHide={hideModal} centered>
        <Modal.Body>
          <h4 className="text-center">Menu Item</h4>
          <MenuItemForm
            place={place}
            onDone={() => {
              onFetchPlace();
              hideModal();
            }}
            item={selectedItem}
          ></MenuItemForm>
        </Modal.Body>
      </Modal>

      <QRCodeModel
        show={qrCode}
        onHide={hideQRModal}
        place={place}
        centered
        onUpdatePlace={onUpdatePlace}
      />
    </MainLayout>
  );
};

export default Place;
