export default function CallToAction() {
  return (
    <div className="card image-full bg-base-100 p-5 shadow-xl">
      <figure></figure>
      <div className="card-body text-center">
        <p>What are you waiting for?</p>
        <h1 className="card-title justify-center">
          Seize the learning opportunity and get matched with your dedicated
          tutor now!
        </h1>
        <div className="flex flex-col gap-10 py-5 sm:flex-row">
          <div className="flex-1">
            <span className="text-xl font-bold">10+</span>
            <br />
            Offering varous subjects
          </div>
          <div className="flex-1">
            <span className="text-xl font-bold">20+</span>
            <br />
            Tutors from Delphis
          </div>
          <div className="flex-1">
            <span className="text-xl font-bold">24 hours</span>
            <br />
            Customer service support
          </div>
        </div>
        <div className="card-actions justify-center">
          <a
            className="btn btn-primary px-10"
            href="https://form.jotform.com/240903353188053"
            target="_blank"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}
