import data from "./data.js";
import { useState } from "react";
export default function ProductRecipt({
  visibility,
  counting,
  price,
  formatCurrency,
  submit,
  isSmallScreen,
}) {
  const { hide, setHide, handleHide } = visibility;
  const { count, setCount } = counting;
  const { submitted, setSubmitted, handleSubmit } = submit;

  const [remove, setRemove] = useState(false);

  const isCartEmpty = Object.values(count).every((qty) => qty === 0);

  const totalItems = Object.values(count).reduce((sum, qty) => sum + qty, 0);

  const totalOrderPrice = Object.entries(count)
    .filter(([_, quantity]) => quantity > 0)
    .reduce((total, [name, quantity]) => {
      const item = data.find((d) => d.name === name);
      return total + (item ? item.price * quantity : 0);
    }, 0);

  return (
    <div
      className={` ${
        submitted && isSmallScreen
          ? "w-[100vw] bg-[hsl(20,1%,45%)]"
          : "px-5 md:pt-20"
      } ${
        submitted && !isSmallScreen
          ? "md:absolute md:w-[100%] top-24 z-20 px-0 flex justify-center"
          : "w-[100%] md:px-0 "
      }`}
    >
      <form
        className={`bg-white rounded-t-2xl mb-10 px-5 md:top-8 ${
          submitted && !isSmallScreen
            ? "md:m-0 md:w-[50%]"
            : "md:w-[100%] lg:w-[80%]"
        } ${submitted && isSmallScreen ? " w-[100vw] p-0 m-0" : null}`}
      >
        {!submitted && (
          <h3 className="pl-5 pt-6 font-redBold text-2xl text-[hsl(14,86%,42%)]">
            {isCartEmpty ? "Your Cart (0)" : `Your Cart (${totalItems})`}
          </h3>
        )}

        {submitted && (
          <div>
            <div className="pt-10">
              <img
                src="assets/images/icon-order-confirmed.svg"
                alt="confirmation check"
              />
              <h1 className="w-64 pt-5 pb-3 font-redBold text-5xl">
                Order Confirmed
              </h1>
              <p className="text-md font-RedRegular text-[hsl(12,20%,44%)] mb-8">
                We hope you enjoy your food!
              </p>
            </div>
          </div>
        )}

        {isCartEmpty ? (
          <div>
            <img
              src="assets/images/illustration-empty-cart.svg"
              alt="empty cart illustration"
              className="m-auto  mt-10"
            />
            <p className="font-redSemiBold text-center text-sm  text-[hsl(12,20%,44%)] pb-10">
              Your added items will appear here
            </p>
          </div>
        ) : (
          <div className="mt-5">
            {Object.entries(count)
              .filter(([_, quantity]) => quantity > 0)
              .map(([name, quantity]) => {
                const item = data.find((d) => d.name === name);
                if (remove) return null; // skip if remove is true
                if (!submitted) {
                  return (
                    <div
                      key={name}
                      className="flex align-middle justify-between mt-3 border-b pt-1 pb-3"
                    >
                      <div className="flex flex-col">
                        <p className="font-semibold text-sm text text-[ hsl(14,65%,9%)]">
                          {name}
                        </p>
                        <p>
                          <span className="font-redSemiBold text-[hsl(14,86%,42%)] mr-3">
                            {quantity}x
                          </span>
                          <span className="text-md font-normal text-[hsl(12,20%,44%)] mr-2">
                            @{item.price.toFixed(2)}
                          </span>
                          <span className="text-md font-semibold text-[hsl(12,20%,44%)] mr-2">
                            {formatCurrency(quantity * item.price)}
                          </span>
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          setCount((prev) => ({
                            ...prev,
                            [name]: 0,
                          }))
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 10 10"
                          className="w-6 aspect-square fill-current hover:text-[hsl(14,65%,9%)] hover:border-[hsl(14,65%,9%)] text-[hsl(12,20%,44%)] border-2 border-[hsl(12,20%,44%)] rounded-full p-1"
                        >
                          <path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
                        </svg>
                      </button>
                    </div>
                  );
                } else {
                  return (
                    <div className="p-3 bg-[hsl(20,50%,98%)] flex align-middle border-b">
                      <div>
                        <img
                          src={item.image.thumbnail}
                          alt={item.category}
                          className="w-16 rounded-md"
                        />
                      </div>
                      <div className="flex justify-between w-full ml-2">
                        <div>
                          <p className="font-semibold text-sm  text text-[ hsl(14,65%,9%)]">
                            {name}
                          </p>
                          <p className="mt-2">
                            <span className="font-redSemiBold text-[hsl(14,86%,42%)] mr-3">
                              {quantity}x
                            </span>
                            <span className="text-md font-normal text-[hsl(12,20%,44%)] mr-2">
                              @{item.price.toFixed(2)}
                            </span>
                          </p>
                        </div>
                        <div className="self-center">
                          <p className="text-md font-semibold text-[hsl(12,20%,44%)] w-full self-center">
                            {formatCurrency(quantity * item.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            {Object.values(count).some((qty) => qty > 0) && (
              <div>
                <div
                  className={`mt-0 flex justify-between align-middle ${
                    !submitted
                      ? "bg-white "
                      : "bg-[hsl(20,50%,98%)] px-4 py-6 mt-0 rounded-b-lg mb-8"
                  }`}
                >
                  <p className="text-md font-semibold text-[hsl(12,20%,44%)]">
                    Order Total
                  </p>
                  <p className="font-redBold text-2xl">
                    {formatCurrency(
                      Object.entries(count)
                        .filter(([_, qty]) => qty > 0)
                        .reduce((sum, [name, qty]) => {
                          const item = data.find((d) => d.name === name);
                          return sum + (item ? item.price * qty : 0);
                        }, 0)
                    )}
                  </p>
                </div>
                {!submitted && (
                  <div className="mt-5 flex justify-center py-3 rounded-lg bg-[hsl(13,31%,94%)]">
                    <img src="assets/images/icon-carbon-neutral.svg" alt="" />
                    <p className="ml-3 text-md ">
                      This is a{" "}
                      <strong className="font-semibold text-sm">
                        carbon-neutral{" "}
                      </strong>
                      delivery
                    </p>
                  </div>
                )}
                <div className="flex justify-center mt-6">
                  {!submitted ? (
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="py-4 w-full rounded-full hover:bg-[hsl(13,63%,35%)] bg-[hsl(14,86%,42%)] text-white text-md mb-6"
                    >
                      Confirm Order
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="py-4 w-full rounded-full bg-[hsl(14,86%,42%)] text-white text-md mb-6"
                    >
                      Start New Order
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
