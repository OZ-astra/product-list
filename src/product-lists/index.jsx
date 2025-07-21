import { useEffect, useState } from "react";
import data from "./data.js";
import ProductLists from "./product-lists.jsx";
import ProductRecipt from "./product-recipt.jsx";
export default function GeneralProduct() {
  const [myArray, setMyArray] = useState(data);
  const [hide, setHide] = useState(false);
  const [count, setCount] = useState(() => {
    return data.reduce((acc, item) => {
      acc[item.name] = 0;
      return acc;
    }, {});
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(true);

  function handleHide(name) {
    const updated = myArray.map((dataItem) =>
      dataItem.name === name ? { ...dataItem, hide: true } : dataItem
    );
    setMyArray(updated);
  }

  useEffect(() => {
    const checkScreen = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div>
      <div className={`${!submitted ? "md:flex " : "md:relative"}`}>
        <ProductLists
          dataProps={{ myArray, setMyArray }}
          visibility={{ hide, setHide, handleHide }}
          counting={{ count, setCount }}
          price={1500}
          formatCurrency={formatCurrency}
          submit={{ submitted, setSubmitted, handleSubmit }}
          isSmallScreen={isSmallScreen}
        />
        <ProductRecipt
          visibility={{ hide, setHide, handleHide }}
          counting={{ count, setCount }}
          price={1500}
          formatCurrency={formatCurrency}
          submit={{ submitted, setSubmitted, handleSubmit }}
          isSmallScreen={isSmallScreen}
        />
      </div>
      <div className="mb-4 text-center text-[12px]">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          className="text-[hsl(14,86%,42%)]"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a href="#" className="text-[hsl(14,86%,42%)]">
          Ozil
        </a>
        .
      </div>
    </div>
  );
}
