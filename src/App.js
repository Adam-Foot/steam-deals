import './App.css';
import {useState, useEffect, Fragment} from "react";
import axios from "axios";

import DealCard from "./components/deal-card/DealCard";

const baseURL = "https://www.cheapshark.com/api/1.0/deals?storeID=1";

export default function App() {
    const [page, setPage] = useState(0);
    const [price, setPrice] = useState(1);
    const [sortBy, setSortBy] = useState('Metacritic');
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getDeals() {
        try {
            setLoading(true);
            const response = await axios.get(baseURL + "&upperPrice=" + price.toString() + "&pageNumber=" + page.toString() + "&sortBy=" + sortBy.toString() + "&desc=0");
            setDeals(response.data);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getDeals();
    }, []);

    const handleSortSelectChange = e => {
        setSortBy(e.target.value);
        getDeals();
    }

    const handlePriceChange = e => {
        setPrice(e.target.value);
        getDeals();
    }

    // API call after soft is changed
    useEffect(() => {
        getDeals();
    }, [sortBy]);

    // API call after page is changed
    useEffect(() => {
        getDeals();
    }, [page]);

    // API call after price is changed
    useEffect(() => {
        getDeals();
    }, [price]);

    return (
        <>
            <div className="container">
                <div className="card-100">
                    <h2>Steam Game Deals</h2>

                    <div className="header-selects">
                        <label htmlFor="sort">Sort Games By</label>
                        <select className="mb-10" name="sort" id="sort" value={sortBy} onChange={handleSortSelectChange}>
                            <option value="Metacritic">Metacritic Score</option>
                            <option value="Reviews">Steam Reviews</option>
                            <option value="Price">Price</option>
                            <option value="Savings">Savings</option>
                        </select>

                        <label htmlFor="price">Maximum Price (£)</label>
                        <input value={price} type="number" name="price" id="price" onChange={handlePriceChange} min="1"/>
                    </div>

                </div>
            </div>

            <div className="button-container">
                <button disabled={page === 0} className={page === 0 ? "button-style-disabled" : "button-style"} type="button" onClick={() => setPage(page - 1)}>Previous Page</button>
                <button className="button-style" type="button" onClick={() => setPage(page + 1)}>Next Page</button>
            </div>

            {loading ? <h3>Loading...</h3> :
            <div className="container">
                {deals.map((deal, index) => (
                    <Fragment key={index}>
                        <DealCard title={deal.title} salePrice={deal.salePrice} savings={deal.savings}
                                  metaScore={deal.metacriticScore}
                                  steamScore={deal.steamRatingPercent} appID={deal.steamAppID} />
                    </Fragment>
                ))}
            </div>}


        </>

    )

}