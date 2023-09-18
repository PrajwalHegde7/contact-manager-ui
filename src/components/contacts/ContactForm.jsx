import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import { toast } from "react-toastify";
// import AlertContext from "../../context/alert/alertContext";

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    // const alertContext = useContext(AlertContext);

    const {
        error,
        clearErrors,
        addContact,
        updateContact,
        clearCurrent,
        current,
    } = contactContext;
    // const { setAlert, removeAlerts } = alertContext;

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: "",
                email: "",
                phone: "",
                type: "personal",
            });
        }
    }, [contactContext, current]);

    useEffect(() => {
        if (error) {
            // removeAlerts();
            // setAlert(error, "danger");
            toast.error(error);
            clearErrors();
        }
    });

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        type: "personal",
    });

    const { name, email, phone, type } = contact;

    // useEffect(() => {
    //     removeAlerts();
    //     // eslint-disable-next-line
    // }, [name, email, phone, type]);

    const onChange = (e) =>
        setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        // removeAlerts();
        if (name === "" || email === "" || phone === "") {
            // setAlert("Enter all the details", "danger");
            toast.error("Enter all the details", "danger");
        } else {
            if (current === null) {
                addContact(contact);
                toast.success("Contact created")
            } else {
                updateContact(contact);
                toast.info("Contact updated")
            }
            clearAll();
        }
    };

    const clearAll = () => {
        clearCurrent();
    };

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">
                {current ? "Edit Contact" : "Add Contact"}
            </h2>
            <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={onChange}
            />
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={phone}
                onChange={onChange}
            />
            <h5>Contact Type</h5>
            <input
                type="radio"
                name="type"
                id="personal"
                value="personal"
                checked={type === "personal"}
                onChange={onChange}
            />{" "}
            <label htmlFor="personal">Personal</label>{" "}
            <input
                type="radio"
                name="type"
                id="professional"
                value="professional"
                checked={type === "professional"}
                onChange={onChange}
            />{" "}
            <label htmlFor="professional">Professional</label>
            <div>
                <input
                    type="submit"
                    value={current ? "Update Contact" : "Add Contact"}
                    className="btn btn-primary btn-block"
                />
            </div>
            {current && (
                <div>
                    <button
                        className="btn btn-light btn-block"
                        onClick={clearAll}
                    >
                        Clear
                    </button>
                </div>
            )}
        </form>
    );
};

export default ContactForm;
