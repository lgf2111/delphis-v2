export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-content flex-col gap-6 lg:flex-row">
        <div>
          <h1 className="text-5xl font-bold">Find your desired tutors here</h1>
          <ul className="list-inside list-disc py-6 text-justify">
            <li>Take customisable 1-on-1 lessons trusted by many users</li>
            <li>Learn from tutors that fit your budget and schedule</li>
            <li>Wide variety of tutors and subject for you to choose from</li>
          </ul>
          <a
            className="btn btn-primary px-10"
            href="https://form.jotform.com/240903353188053"
            target="_blank"
          >
            Learn more
          </a>
        </div>
        <img src="/Landing.png" className="max-w-sm rounded-lg" />
      </div>
    </div>
  );
}
