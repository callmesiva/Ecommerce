import { eventVenue } from "../constants";
import Header from "./Header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="p-16 2xl:container w-full bg-fuchsia-300 mx-auto flex flex-col items-center gap-y-5">
        <h1 className="text-8xl text-center">The Generics</h1>

        <div className="w-52 h-10 border-2 border-slate-950 flex flex-col justify-around items-center">
          <h3>Get Our Latest Album </h3>
        </div>
        <div className="w-16 h-16 border-2 rounded-full border-slate-950 flex flex-col justify-around items-center">
          <h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
          </h3>
        </div>
      </div>

      <section className="2xl:container text-black mx-auto  p-10 flex justify-center">
        <table class="table-auto border-collapse">
          <thead>
            <tr>
              <th className="text-center text-xl font-bold" colSpan="4">
                Tours
              </th>
            </tr>
          </thead>
          <tbody>
            {eventVenue.map((data) => {
              return (
                <tr className="border-b-2 border-black" key={data.id}>
                  <td className="p-5">{data.date}</td>
                  <td className="p-5">{data.city}</td>
                  <td className="p-5">{data.place}</td>
                  <td className="w-60 pl-28">
                    <button className="p-2 bg-blue-500 text-white rounded-md">
                      BUY TICKET
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Home;
