import { useEffect, useState } from "react";
import data from "./data";
import "./styles.css";
export default function ProductLists({
  dataProps,
  visibility,
  counting,
  price,
  formatCurrency,
  submit,
  isSmallScreen,
}) {
  const { myArray, setMyArray } = dataProps;
  const { hide, setHide, handleHide } = visibility;
  const { count, setCount } = counting;
  const { submitted, setSubmitted, handleSubmit } = submit;
  const [showBorder, setShowBorder] = useState(() =>
    data.reduce((acc, item) => {
      acc[item.name] = false;
      return acc;
    }, {})
  );

  const toggleBorder = (name) => {
    setShowBorder((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return submitted && isSmallScreen ? (
    <div className="md:hidden">
      <h1 className=" w-screen py-7 pl-6 md:m-auto md:w-80 md:py-14 font-redBold text-4xl bg-[hsl(20,1%,45%)]">
        Desserts
      </h1>
    </div>
  ) : (
    <div
      className={`md:pt-12 min-w-screen ${
        submitted && !isSmallScreen ? "md:ml-0" : "md:ml-14 lg:ml-20 mx-5"
      }`}
    >
      <h1
        className={`w-64 py-7 font-redBold text-5xl ${
          submitted && !isSmallScreen ? "ml-5 " : null
        }`}
      >
        Desserts
      </h1>
      <section
        className={`md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3 lg:gap-6 ${
          submitted && !isSmallScreen
            ? "md:grid md:grid-cols-3 md:w-[95%] md:mx-auto"
            : "md:w-[55vw]"
        }`}
      >
        {myArray.map((dataItem) => {
          return (
            <div key={dataItem.name}>
              <img
                src={dataItem.image.mobile}
                alt={dataItem.name}
                className={`rounded-lg mb-7 hidden sm:block ${
                  showBorder[dataItem.name] && count[dataItem.name] > 0
                    ? "border-2 border-[hsl(14,86%,42%)]"
                    : ""
                }`}
              />

              <img
                src={dataItem.image.tablet}
                alt={dataItem.name}
                className="rounded-md sm:hidden lg:hidden md:block"
              />

              <img
                src={dataItem.image.desktop}
                alt={dataItem.name}
                className="rounded-md hidden lg:block"
              />
              {!dataItem.hide && (
                <button
                  key={dataItem.name}
                  onClick={() => {
                    toggleBorder(dataItem.name);
                    handleHide(dataItem.name);
                  }}
                  className="flex border hover:border-red-500 border-[hsl(14,25%,72%)] rounded-full py-3 px-7 mx-auto -mt-11 relative z-2 bg-white border-1 "
                >
                  <img
                    src="./assets/images/icon-add-to-cart.svg"
                    alt="shopping cart"
                  />
                  <p className="text-sm font-semibold pl-3">Add to Cart</p>
                </button>
              )}

              {dataItem.hide && (
                <div
                  onClick={() => handleHide(dataItem.name)}
                  className="w-48 py-3 bg-[hsl(14,86%,42%)] rounded-full flex justify-evenly mx-auto -mt-11 relative z-2"
                >
                  <button
                    onClick={() =>
                      setCount((prev) => ({
                        ...prev,
                        [dataItem.name]:
                          prev[dataItem.name] > 0 ? prev[dataItem.name] - 1 : 0,
                      }))
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 10 2"
                      className="w-6 aspect-square fill-current text-white hover:text-orange-600 hover:bg-white border-2 rounded-full p-1"
                    >
                      <path d="M0 .375h10v1.25H0V.375Z" />
                    </svg>
                  </button>
                  <p className="text-white">{count[dataItem.name]}</p>
                  <button
                    onClick={() =>
                      setCount((prev) => ({
                        ...prev,
                        [dataItem.name]: prev[dataItem.name] + 1,
                      }))
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 10 10"
                      className="w-6 aspect-square fill-current text-white hover:text-orange-600 hover:bg-white border-2 rounded-full p-1"
                    >
                      <path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
                    </svg>
                  </button>
                </div>
              )}
              <p className="text-sm text-[hsl(12,20%,44%)]">
                {dataItem.category}
              </p>
              <p className="font-redBold text text-[ hsl(14, 65%, 9%)]">
                {dataItem.name}
              </p>
              <p className="font-redSemiBold text-lg mb-8 text-[hsl(14,86%,42%)]">
                {formatCurrency(dataItem.price)}
              </p>
            </div>
          );
        })}
      </section>
      {submitted && !isSmallScreen && (
        <div className="absolute inset-0 bg-[hsl(14,65%,9%)] opacity-50 z-10"></div>
      )}
    </div>
  );
}
