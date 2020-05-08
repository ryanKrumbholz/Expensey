import React from 'react';
import './new_expense.css';

const new_expense = props => {

    var getCookie = cname => {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

    var  createExpense = () => {

        var userEmail = getCookie('email');
        var eid = Date.now();
        var date = document.getElementsByClassName("date")[0].value;
        var dateNum = document.getElementsByClassName("date")[0].valueAsNumber;
        var merchant = document.getElementsByClassName("merchant")[0].value;
        var amt = document.getElementsByClassName("amt")[0].value;
        var cat = document.getElementsByClassName("cat")[0].value;
        var desc = document.getElementsByClassName("desc")[0].value;
        var tag = "";
        var link = "";

        function checkFields() {
            if (userEmail  == "")  {
                return false;
            }
            if (merchant  == "")  {
                return false;
            }
            if (amt  == "")  {
                return false;
            }
            if (!parseFloat(amt)){
                return false;
            }
            if (cat  == "")  {
                return false;
            }
            if (desc == "")  {
                return false;
            }
            return true;
        }
        
        const requestOptions =
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email : userEmail,
            id: eid,
            date: date,
            dateNum: dateNum,
            merchant: merchant,
            amount: parseFloat(amt),
            category: cat,
            description: desc,
            tag: tag,
            receiptImgLink: link,
            status : "unreported"
            })};
    
        if (checkFields()==true) {
          fetch('https://api.expensey.app/users/expenses/add_expense',requestOptions) 
              .then(res => res.json())
              .then (data => 
                {
                    console.log(data);
                    if (data == 'Expense saved successfully.'){
                        props.toggleWindow();
                        window.location.reload();
                    }
                    
                })
              .catch(error => console.log(error));
          }
        else {
            console.log("Field missing");
        }
    }
    
    return (
        <div className="bg">
            <div className="window">
                <a href='/' class="toggleButton" onClick={props.toggleWindow}>×</a>
                <div class="windowContents">
                    <div class="textboxes">
                        <h3>Date</h3>
                        <form action="">
                        <label for="From"></label>
                        <input class="date" type="date" id="" name=""/>
                    </form>
                        <h3>Merchant</h3>
                        <form onSubmit="">
                            <label>
                            <input class="merchant" type="text" onChange="" placeholder="ex. Expensey" />
                            </label>
                        </form>
                        <h3>Amount</h3>
                        <form onSubmit="">
                            <label>
                            <input class="amt" type="text" onChange="" placeholder="ex. 9.99" />
                            </label>
                        </form>
                        <h3>Category</h3>
                        <form onSubmit="">
                            <label>
                            <input class="cat" type="text" onChange="" placeholder="ex. Food" />
                            </label>
                        </form>
                        <h3>Description</h3>
                        <form onSubmit="">
                            <label>
                            <input class="desc" type="text" onChange="" placeholder="Stuff about the expense goes here!" />
                            </label>
                        </form>
                    </div>
                    <div class="receiptUpload">
                        <h3>Receipt</h3>
                        <form class="box" method="post" action="" enctype="multipart/form-data">
                            <div class="box_input">
                                <div class="fileUp" onClick="action_page.php">
                                <input class="box_file" type="file" name="files[]" id="file" data-multiple-caption="{count} files selected" multiple />
                                    <label for="file"><strong>Choose a file</strong><span class="box__dragndrop"> or drag it here</span>.</label>
                                </div>
                            </div>
                            <div class="box_uploading">Uploading&hellip;</div>
                            <div class="box_success">Done!</div>
                            <div class="box_error">Error! <span></span>.</div>
                        </form>
                    </div>
                </div>
                <button onClick={createExpense}>Save</button>
            </div>
        </div>
    )
  }
  
  export default new_expense;