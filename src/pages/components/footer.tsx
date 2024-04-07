import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="footer bg-base-200 p-10 text-base-content">
      <aside>
        <img src="/Delphis-Full.png" alt="Delphis Icon" className="h-10" />
        <p>
          <a
            href="mailto:jeff.lee@delphistech.com"
            className="link-hover link flex items-center gap-1"
          >
            <MdEmail /> Email: felix.liang@delphistech.com
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=6588128123&text&type=phone_number&app_absent=0"
            target="_blank"
            className="link-hover link flex items-center gap-1"
          >
            <FaWhatsapp /> Whatsapp: +65 9383 6972
          </a>
        </p>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end"></nav>
      </aside>
      <nav>
        <h6 className="footer-title">Enquiries</h6>
        <a
          className="link-hover link"
          href="https://docs.google.com/document/d/1LU9kvJnY_ErwBlbB96az-21lYwQCPu5OonXNaXOij78/edit?usp=sharing"
          target="_blank"
        >
          FAQ (Tutor)
        </a>
        <a
          className="link-hover link"
          href="https://docs.google.com/document/d/1XWLKzH327W9giLrnQbecroyeTXxGpfq1RqWfgtKM32E/edit?usp=sharing"
          target="_blank"
        >
          FAQ (Student)
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link-hover link">About Delphis</a>
      </nav>
      <nav>
        <h6 className="footer-title">Others</h6>
        <a className="link-hover link">Tutors Join Telegram</a>
        <a className="link-hover link">Follow Latest Assignment</a>
      </nav>
    </footer>
  );
}
