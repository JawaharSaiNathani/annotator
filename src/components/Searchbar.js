import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Loader } from 'semantic-ui-react'
import { server } from "../constants/constant";
import { connect } from "react-redux";
import useFullPageLoader from "../hooks/useFullPageLoader";
import "../styles/documentCard.scss"
import "../styles/searchBar.scss"
import { useHistory } from "react-router-dom";

function Card(props) {
    return (
      <div className="card" onClick={() => props.handleDocumentClick(props.id)}>
        <div className="card__body">
          <img src={props.img} className="card__image" />
          <h2 className="card__title">{props.title}</h2>
          <p className="card__description">{props.description}</p>
        </div>
        {
            (props.is_annotated) ? (<button className="card__btn">Annotated Document</button>) : (<button className="card__btn">Non Annotated Document</button>)
        }  
      </div>
    );
  };

let SearchBar = (props) => {
    const [APIData, setAPIData] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
<<<<<<< HEAD
    let history = useHistory()
=======
    const [loaderComponent, showLoader, hideLoader] = useFullPageLoader();
>>>>>>> eb648bf8e82720bd51677c3d08aa06d1f692fa17

    useEffect(() => {
        console.log("Inside use effect")
        showLoader();
        axios.get(server+"user-document-list",
        {
            headers: {
                authtoken: props.auth.token,
            }
        }).then((response) => {
                
                //for now, but will be changed later
                for(let idx=0;idx<response.data.length;idx++){
                    response.data[idx]["image"] = response.data[idx]["image"];
                }

                console.log(response.data)
                hideLoader();
                setAPIData(response.data);

            })
    }, [])

    const searchItems = (searchValue) => {
        showLoader();
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            hideLoader();
            setFilteredResults(filteredData)
        }
        else{
            hideLoader();
            setFilteredResults(APIData)
        }
    }

    const handleDocumentClick = (id) => {
        history.push(`/documents/${id}`, APIData.find((item) => item.id === id));
    }

    return (
        <div>
            <div>

                <div className="cont">
                    <input type="text" placeholder="Search..." onChange={(e) => searchItems(e.target.value)}/>
                    <div className="search"></div>
                </div>

            </div>
            {loaderComponent}
            <div className='wrapper'>
                
                    {searchInput.length >= 1 ? (
                        filteredResults.map((item) => {
                            return (
                                <Card
                                    id = {item.id}
                                    img = {item.image}
                                    title = {item.name}
                                    description = {item.description}
                                    key = {item.id}
                                    handleDocumentClick = {handleDocumentClick}
                                >
                                </Card>
                            )
                        })
                    ) : (
                        APIData.map((item) => {
                            return (
                                <Card
                                    id = {item.id}
                                    img = {item.image}
                                    title = {item.name}
                                    description = {item.description}
                                    key = {item.id}
                                    handleDocumentClick = {handleDocumentClick}
                                >
                                </Card>
                            )
                        })
                    )}
                
            </div>
        </div>

        
    )
};

let mapStateToProps = (state) => ({
    auth: state.auth,
});
  
export default connect(mapStateToProps)(SearchBar);