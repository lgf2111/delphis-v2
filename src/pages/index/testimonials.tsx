export default function Testimonials() {
  return (
    <div>
      <h1 className="text-center text-lg font-bold">
        Listen to what students and parents have to say.
      </h1>
      <div className="px-5">
        <div className="chat chat-start">
          <div className="avatar chat-image">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-bubble">
            Emma <br />
            H2 Chemistry and H2 Math <br />
            <q>It was said that you would, destroy the Sith, not join them.</q>
          </div>
        </div>
        <div className="chat chat-end">
          <div className="avatar chat-image">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-bubble">
            Sherry <br />
            JC1 H2 Biology <br />
            <q>It was you who would bring balance to the Force</q>
          </div>
        </div>
        <div className="chat chat-start">
          <div className="avatar chat-image">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-bubble">
            Jacky <br />
            OL Combined Science (physics/chem) <br />
            <q>Not leave it in Darkness</q>
          </div>
        </div>
      </div>
    </div>
  );
}
