import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";
import { toast } from "react-toastify";
// import AlertContext from '../../context/alert/alertContext';

const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    // const alertContext = useContext(AlertContext);
    const { deleteContact, setCurrent, clearCurrent } = contactContext;
    // const { setAlert } = alertContext;

    const { _id, name, email, phone, type } = contact;

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
        // setAlert("Contact deleted","success")
        toast.success("Contact deleted");
    };

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}{" "}
                <span
                    style={{ float: "right" }}
                    className={
                        "badge " +
                        (type === "professional"
                            ? "badge-success"
                            : "badge-primary")
                    }
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className="list">
                {email && (
                    <li>
                        <i className="fas fa-envelope-open" /> {email}
                    </li>
                )}
                {phone && (
                    <li>
                        <i className="fas fa-phone" /> {phone}
                    </li>
                )}
            </ul>
            <p>
                <button
                    className="btn btn-dark btn-sm"
                    onClick={() => setCurrent(contact)}
                >
                    Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>
                    Delete
                </button>
            </p>
        </div>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
};

export default ContactItem;
