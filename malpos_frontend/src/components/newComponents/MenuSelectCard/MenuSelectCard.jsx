import { Box } from "../../elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faGripVertical,
  faCircleDot,
  faFile,
  faTrash,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function MenuSelectCard({
  item,
  open,
  alertModal,
  handleWindow,
  setAlertModal,
}) {
  return (
    <Box className="searchBar-constructure-details-p">
      <Box className="searchBar-constructure-details">
        <Box className="searchBar-constructure-details-left">
          <span className="constructure-details-icon">
            <FontAwesomeIcon icon={faGripVertical} />
          </span>
          <span className="constructure-details-image">
            {/* Placeholder image */}
            <img src="/images/product/expresso.jpg" alt="img" />
          </span>
          <span className="constructure-details-icon-dot">
            <FontAwesomeIcon icon={faCircleDot} />
          </span>
        </Box>
        <Box className="searchBar-constructure-details-center">
          <span className="constructure-details-text">{item}</span>
          {/* Add more placeholder details if needed */}
        </Box>

        <Box className="searchBar-constructure-details-right">
          <span className="constructure-details-options">
            <Link to={"/constructure-edit"}>
              <span>
                <FontAwesomeIcon icon={faPenToSquare} />
              </span>
            </Link>
            <span className="constructure-details-options-edit">
              <FontAwesomeIcon icon={faPlus} onClick={handleWindow} />
              {open ? (
                <Box className="dotsmenu">
                  <Box className="dotsmenu-inner">
                    <Link to={"/constructure-product"}>
                      <Box className="dotsmenu-items">
                        <FontAwesomeIcon icon={faFile} />
                        &nbsp;Product
                      </Box>
                    </Link>
                    <Link to={"/constructure-dish"}>
                      <Box className="dotsmenu-items">
                        <FontAwesomeIcon icon={faFile} />
                        &nbsp;Dish
                      </Box>
                    </Link>
                  </Box>
                </Box>
              ) : (
                ""
              )}
            </span>
            <span onClick={() => setAlertModal(true)}>
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </span>
        </Box>
      </Box>
    </Box>
  );
}

export default MenuSelectCard;
