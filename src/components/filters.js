import React from 'react';
import './filters.css';

const filters = props => {
  //TODO connect database and table and finish writing appropriate functions
  function fetchListData(databaseVar /* temp var name for whatever I end up passing here */) {
    function fetchCatList(databaseListItems) {
      for (var i = 0; i <= databaseListItems.length(); i++) {
        listData.setCatList(databaseListItems[i]);
      }
    }
    function fetchCcList(databaseListItems) {
      for (var i = 0; i <= databaseListItems.length(); i++) {
        listData.setCctList(databaseListItems[i]);
      }
    }
    function fetchTagList(databaseListItems) {
      for (var i = 0; i <= databaseListItems.length(); i++) {
        listData.setTagList(databaseListItems[i]);
      }
    }
    function fetchAllList() {
      fetchCatList(); 
      fetchCcList(); 
      fetchTagList();
    }
    fetchAllList();
  }

  function listData (){
    var tagList = [];
    var categoriesList = [];
    var ccList = [];

    return {
      setTagList : function (newTagList) {
        tagList = newTagList;
      },
      setCatList : function (newCatList) {
        categoriesList = newCatList;
      },
      setCcList : function (newCcList) {
        ccList = newCcList;
      },
      getCategoriesList : function () {
        return categoriesList;
      },
      getCcList : function () {
        return  ccList;
      },
      getTagList : function () {
        return tagList;
      }
    };
  }
  
  return (
      <div className="Filters">
        <ul class="DatesFiltersList">
          <li>
            <form action="">
              <label for="From">From:</label>
              <input type="date" id="" name=""/>
              <input type="submit"/>
            </form>
          </li>
          <li>
            <form action="">
              <label for="To">To:</label>
              <input type="date" id="" name=""/>
              <input type="submit"/>
            </form>
          </li>
        </ul>
        <ul class="TypeFiltersList">
          <li>
            <form onSubmit="">
              <label>
                <input type="text" value="Merchant" onChange="" />
              </label>
              <input type="submit" value="Submit" />
          </form>
        </li>
          <li>
            <button>idk rn</button>
          </li>
        </ul>
        <ul class="CategoryTagList">
          <li>
            <select>
              {listData.getCategoriesList}
            </select>
          </li>
          <li>
            <select>
              {listData.getTagList}
            </select>
          </li>
          <li>
            <select>
              {listData.getCcList}
            </select>
          </li>
        </ul>
        <ul class="StatusList">
          <li>
            <label class="container">Unreported
              <input type="checkbox" checked="checked"/>
              <span class="checkmark"></span>
            </label>
          </li>
          <li>
            <label class="container">Open
              <input type="checkbox" checked="checked"/>
              <span class="checkmark"></span>
            </label>
          </li>
          <li>
            <label class="container">Processing
              <input type="checkbox" checked="checked"/>
              <span class="checkmark"></span>
            </label>
          </li>
          <li>
            <label class="container">Approved
              <input type="checkbox" checked="checked"/>
              <span class="checkmark"></span>
            </label>
          </li>
          <li>
            <label class="container">Reimbursed
              <input type="checkbox" checked="checked"/>
              <span class="checkmark"></span>
            </label>
          </li>
          <li>
            <label class="container">Closed
              <input type="checkbox" checked="checked"/>
              <span class="checkmark"></span>
            </label>
          </li>
          <li>
            <label class="container">Deleted
              <input type="checkbox" checked=""/>
              <span class="checkmark"></span>
            </label>
          </li>
        </ul>
      </div>
  )
}

export default filters;