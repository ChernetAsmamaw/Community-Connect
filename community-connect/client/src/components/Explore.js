import React from "react";
import Header from "./partials/Header";
import Footer from "./partials/Footer";

const Explore = () => {
  const gigs = [
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/74/Rock_Concert.jpg",
      title: "Rock Night",
      description:
        "Band: The Rockers, Venue: Madison Square Garden, Date: 12th Dec",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/82/Jazz_Musicians.jpg",
      title: "Jazz Evening",
      description: "Band: Smooth Jazz, Venue: Blue Note, Date: 20th Dec",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/15/Pop_Concert_in_Astana.jpg",
      title: "Pop Extravaganza",
      description: "Band: Pop Stars, Venue: Wembley Stadium, Date: 5th Jan",
    },
  ];

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Explore Gigs</h2>
        <ul className="gigs space-y-4">
          {gigs.map((gig, index) => (
            <li key={index} className="gig flex items-center space-x-4">
              <img
                src={gig.image}
                alt={gig.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h4 className="text-lg font-semibold">{gig.title}</h4>
                <p>{gig.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Explore;
