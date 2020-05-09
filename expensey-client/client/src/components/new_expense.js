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
        var ccNum = document.getElementsByClassName("cardNum")[0].value;
        var ccType = detectCardType(ccNum);
        var tags = document.getElementsByClassName("tags")[0].value;
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
            if (ccNum == "")  {
                return false;
            }
            if (!dateNum) {
                return false;
            }           
            return true;
        }

        function getLastFour(cardNum){
            var length = cardNum.length
            var lastFour = "" + cardNum[length-4] + cardNum[length-3] + cardNum[length-2] + cardNum[length-1];
            return lastFour
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
            ccData: ccType + ' x ' + getLastFour(ccNum),
            description: desc,
            tags: tags.split(','),
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

    function detectCardType(number) {
        var re = {
            electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
            maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
            dankort: /^(5019)\d+$/,
            interpayment: /^(636)\d+$/,
            unionpay: /^(62|88)\d+$/,
            visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
            mastercard: /^5[1-5][0-9]{14}$/,
            amex: /^3[47][0-9]{13}$/,
            diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
            discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
            jcb: /^(?:2131|1800|35\d{3})\d{11}$/
        }
    
        for(var key in re) {
            if(re[key].test(number)) {
                return key
            }
        }
    }
    
    return (
        <div className="bg">
            <div className="window">
                <a href='/' class="toggleButton" onClick={props.toggleWindow}>×</a>
                <div class="windowContents">
                    <div class="textboxes">
                        <h3>Date</h3>
                        <label for="From"></label>
                        <input class="date" type="date" id="" name=""/>
                        <h3>Merchant</h3>
                            <label>
                            <input class="merchant" type="text" onChange="" placeholder="ex. Expensey" />
                            </label>
                        <h3>Amount</h3>
                            <label>
                            <input class="amt" type="text" onChange="" placeholder="ex. 9.99" />
                            </label>
                        <h3>Category</h3>
                            <label>
                            <input class="cat" type="text" onChange="" placeholder="ex. Food" />
                            </label>
                        <h3>Description</h3>
                            <label>
                            <input class="desc" type="text" onChange="" placeholder="Stuff about the expense goes here!" />
                            </label>
                            </div>

                    <div class="receiptUpload">
                        <h3>Card Number</h3>
                                <label>
                                <input class="cardNum" type="text" onChange="" placeholder="ex. 1234567890123456" />
                                </label>
                        <h3>Tags</h3>
                                <label>
                                <input class="tags" type="text" onChange="" placeholder="ex. John Smith, Clients, idk" />
                                </label>
                        <h3>Receipt</h3>
                        <form class="box" method="post" action="" enctype="multipart/form-data">
                            <div class="box_input">
                                <div class="fileUp" onClick="action_page.php">
                                <input class="box_file" type="file" name="files[]" id="file" data-multiple-caption="{count} files selected" multiple />
                                    <label for="file"><strong>Choose a file</strong><span class="box__dragndrop"> or drag it here</span>.</label>
                                </div>
                            </div>
                            {/* <div class="box_uploading">Uploading&hellip;</div>
                            <div class="box_success">Done!</div>
                            <div class="box_error">Error! <span></span>.</div> */}
                        </form>
                    </div>
                    
                </div>
                <button onClick={createExpense}>Save</button>
            </div>
        </div>
    )
  }
  
  export default new_expense;