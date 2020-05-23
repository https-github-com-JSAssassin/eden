import React, { useState } from 'react';
import PropTypes from 'prop-types';
import iconEmail from '../assets/icon-email.svg';
import '../styles/EmailForm.css';
import $ from 'jquery';
import airtableFns from '../services/airtable';

export default function EmailForm({ className }) {
  const [email, setEmail] = useState('');

  const handleShow = () => {
    $('#notification-dialogue').modal('show');
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, before setting the email state, post email to the API
    airtableFns.writeEmailToDb(email);
    setEmail('');
    handleShow();
  };

  return (
    <div className={className}>
      <h3 className="hero-section-text hero-section-text-top  mt-5">
        Learning tailored for your
      </h3>
      <h3 className="hero-section-text mb-5">child&apos;s needs</h3>
      <h4 className="hero-section-title">Launching Summer 2020.</h4>
      <form className="input-group mb-3" onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control p-4"
          placeholder="Enter Email"
          aria-label="Recipient's email"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
          required
        />
        <div className="valid-feedback feedback-pos">Looks good!</div>
        <div className="invalid-feedback feedback-pos">
          Please input valid email ID
        </div>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="submit">
            Get Notified
          </button>

          <div
            className="modal"
            id="notification-dialogue"
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content emailform-notification-content">
                <div className="modal-header emailform-notification-header">
                  <h5 className="modal-title justify-content-center emailform-notification-title">Thank you for your interest in Eden!</h5>
                  <button
                    type="button"
                    className="emailform-notification-close-button"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body emailform-notification-body">
                  <p>We're excited to have you on board and we'll keep you updated via the email you provided.</p>
                  <div className="platform-img-wrapper justify-content-center">
                    <img
                      src={iconEmail}
                      alt="email icon"
                      className="emailform-notification-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

EmailForm.propTypes = {
  className: PropTypes.string,
};

EmailForm.defaultProps = {
  className: '',
};
