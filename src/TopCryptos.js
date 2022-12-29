import React from "react";
import useFetch from "./useFetch";

const TopCryptos = () => {
  let url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=20&page=1&sparkline=false";

  const { loading, isError, data } = useFetch(url);

  if (loading) {
    return <h1 className="loading-message">Loading...</h1>;
  } else if (isError) {
    return <h1 className="loading-message">Ooops...Something went wrong</h1>;
  } else {
    return (
      <>
        <section id="top-cryptos">
          <h1>Top 20</h1>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr id="first-row" className="info">
                  <th>Coin</th>
                  <th>Price</th>
                  <th>24H</th>
                  <th>24H Volume</th>
                  <th>Mrkt Cap</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  const {
                    id,
                    symbol,
                    current_price,
                    image,
                    market_cap,
                    total_volume,
                    price_change_percentage_24h,
                  } = item;
                  return (
                    <tr className="info" key={id}>
                      <td className="coin">
                        <img src={image} alt="none" className="icon" />
                        <span>{symbol.toUpperCase()}</span>
                      </td>
                      <td>
                        {current_price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </td>
                      <td>
                        {price_change_percentage_24h > 0 ? (
                          <span style={{ color: "lightgreen" }}>
                            {`+${price_change_percentage_24h} %`}
                          </span>
                        ) : (
                          <span style={{ color: "red" }}>
                            {`${price_change_percentage_24h.toLocaleString(
                              "en-US"
                            )} %`}
                          </span>
                        )}
                      </td>
                      <td>
                        {total_volume.toLocaleString("en-US", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </td>
                      <td>
                        {market_cap.toLocaleString("en-US", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </>
    );
  }
};

export default TopCryptos;
