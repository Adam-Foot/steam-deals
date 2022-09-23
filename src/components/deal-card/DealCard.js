import './DealCard.css';

export default function DealCard({title, salePrice, savings, metaScore, steamScore, appID}) {
    return (
            <div className="card">
                <div className="card-header">
                    <div className="card-title">
                        <h3><a href={"https://store.steampowered.com/app/" + appID}>{title}</a></h3><p className="price">£{salePrice}</p>
                    </div>
                     <p className="savings">{Math.round(savings)}% OFF!</p>

                </div>

                <div className="card-body">
                    <p>Metacritic Score: <span>{metaScore}</span></p>
                    <p>Steam Store Reviews Score: <span>{steamScore}</span></p>
                </div>
            </div>
    );
}