"use client";

import { FormEvent, useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function CtaSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="px-4 py-20 lg:py-[100px]">
      <div className="mx-auto max-w-[1200px]">
        <SectionTitle
          eyebrow="Get Started"
          title="Book an Appointment"
          align="center"
          className="[&_h2]:text-[36px] [&_h2]:leading-[46px]"
        />

        <div className="mx-auto max-w-[900px] rounded-[20px] border border-[#e5e5e5] bg-white p-6 shadow-sm md:p-10">
          {submitted ? (
            <p
              role="status"
              className="text-center font-body text-lg text-brand-navy"
            >
              Thank you. We will contact you shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    placeholder="Your first name"
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    placeholder="Your last name"
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="Phone number"
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Official email address"
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="form-label">
                    Select Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="form-label">
                    Select Time
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Message goes here..."
                  className="form-input resize-y"
                />
              </div>

              <div className="pt-2">
                <button type="submit" className="theme-btn btn-two">
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
