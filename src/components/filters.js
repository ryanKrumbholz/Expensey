import React from 'react';
import './filters.css';

const filters = props => {
  //TODO create filters list and tie them into the elements
  var cardList = [];
  var tagList = [];
  var policyList = [];
  var categoriesList = [];
  var typesList = [];

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
          <li><button>idk rn</button></li>
          <li>
            <select>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option selected value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </li>
          <li>
            <select>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option selected value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </li>
        </ul>
        <ul class="CategoryTagList">
          <li>
            <select>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option selected value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </li>
          <li>
            <select>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option selected value="coconut">Coconut</option>
              <option value="mango">Mango</option>
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