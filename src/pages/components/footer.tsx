import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="footer bg-base-200 text-base-content p-10">
      <aside>
        <img src="/Delphis-Full.png" alt="Delphis Icon" className="h-10" />
        <p>
          <a
            href="mailto:jeff.lee@delphistech.com"
            className="flex items-center gap-1"
          >
            <MdEmail /> Email: jeff.lee@delphistech.com
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=6588128123&text&type=phone_number&app_absent=0"
            target="_blank"
            className="flex items-center gap-1"
          >
            <FaWhatsapp /> Whatsapp: +65 8812 8123
          </a>
        </p>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end"></nav>
      </aside>
      <nav>
        <h6 className="footer-title">Enquiries</h6>
        <a className="link link-hover">FAQ (Tutor)</a>
        <a className="link link-hover">FAQ (Student)</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About Delphis</a>
      </nav>
      <nav>
        <h6 className="footer-title">Others</h6>
        <a className="link link-hover">Tutors Join Telegram</a>
        <a className="link link-hover">Follow Latest Assignment</a>
      </nav>
    </footer>
  );
}
