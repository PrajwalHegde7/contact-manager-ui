import React, { useReducer } from "react";
import axios from "../../api/axios";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    CLEAR_ERRORS,
} from "../types";
/**
 * @todo constrain axios requests by strict config
 */

const ContactState = (props) => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null,
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get Contacts
    const getContacts = async () => {
        await axios
            .get("/api/contacts")
            .then((res) => {
                dispatch({
                    type: GET_CONTACTS,
                    payload: res.data,
                });
            })
            .catch((err) => {
                dispatch({
                    type: CONTACT_ERROR,
                    payload: err.response?.err?.msg||err.response?.err?.msg,
                });
            });
    };

    // Add Contact
    const addContact = async (contact) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        await axios
            .post("/api/contacts", contact, config)
            .then((res) => {
                dispatch({
                    type: ADD_CONTACT,
                    payload: res.data,
                });
            })
            .catch((err) => {
                dispatch({
                    type: CONTACT_ERROR,
                    payload: err.response.msg,
                });
            });
    };

    // Delete Contact
    const deleteContact = async (id) => {
        await axios
            .delete(`/api/contacts/${id}`)
            .then((res) => {
                dispatch({
                    type: DELETE_CONTACT,
                    payload: id,
                });
            })
            .catch((err) => {
                dispatch({
                    type: CONTACT_ERROR,
                    payload: err.response.msg,
                });
            });
    };

    // Update Contact
    const updateContact = async (contact) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        await axios
            .put(`/api/contacts/${contact._id}`, contact, config)
            .then((res) => {
                dispatch({
                    type: UPDATE_CONTACT,
                    payload: res.data,
                });
            })
            .catch((err) => {
                dispatch({
                    type: CONTACT_ERROR,
                    payload: err.response.err.msg || err.response.err[0].msg,
                });
            });
    };

    // Clear Contacts
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS });
    };

    // Clear errors
    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS });
    };

    // Set Current Contact
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Filter Contacts
    const filterContacts = (text) => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                getContacts,
                clearContacts,
                clearErrors,
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
