import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";
import axios from "axios";

const HomePage = () => {
    let [data, setData] = useState(null);
    let [input, setInput] = useState("");
    let [page, setPage] = useState(1);
    let [currentSearch, setCurrentSearch] = useState("");
    const APIkey = "GtiAzYurdes1CbR1P1NFYjXhHZhZUdlgn2JuvwCuCQk6aMVzuz0NaWon";
    const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
    let searchURL = `https://api.pexels.com/v1/search?query=${input}&page=1&per_page=15`;

    const search = async (url) => {
        let result = await axios.get(url, { headers: { Authorization: APIkey } });
        setData(result.data.photos);

        // 確認按下搜尋後會依照所輸入的值跑出相對應的圖片
        setCurrentSearch(input);
    };

    const morePicture = async () => {
        let newURL;
        setPage(page + 1);
        if (!currentSearch) {
            newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=15`;
        } else {
            newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&page=${
                page + 1
            }&per_page=15`;
        }
        let result = await axios.get(newURL, { headers: { Authorization: APIkey } });
        setData(data.concat(result.data.photos));
    };

    useEffect(() => {
        search(initialURL);
    }, []);
    // 空 []，表示僅在第一次 render 才會執行而已

    return (
        <div style={{ minHeight: "100vh" }}>
            <Search
                search={() => {
                    search(searchURL);
                }}
                setInput={setInput}
            />
            <div className="pictures">
                {data &&
                    data.map((d) => {
                        return <Picture data={d} />;
                    })}
            </div>
            <div className="morePicture">
                <button onClick={morePicture}>更多圖片</button>
            </div>
        </div>
    );
};

export default HomePage;
