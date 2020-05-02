import React from 'react';
import './new_expense.css';

const new_expense = props => {

    return (
        <div className="bg">
            <div className="window">
                <a href='#' class="toggleButton" onClick={props.toggleWindow}>×</a>
                <div class="windowContents">
                    <div class="textboxes">
                        <h3>Date</h3>
                        <form action="">
                        <label for="From"></label>
                        <input type="date" id="" name=""/>
                    </form>
                        <h3>Merchant</h3>
                        <form onSubmit="">
                            <label>
                            <input class="emailAddress" type="text" onChange="" placeholder="Type your email address" />
                            </label>
                        </form>
                        <h3>Amount</h3>
                        <form onSubmit="">
                            <label>
                            <input class="emailAddress" type="text" onChange="" placeholder="Type your email address" />
                            </label>
                        </form>
                        <h3>Category</h3>
                        <form onSubmit="">
                            <label>
                            <input class="emailAddress" type="text" onChange="" placeholder="Type your email address" />
                            </label>
                        </form>
                        <h3>Description</h3>
                        <form onSubmit="">
                            <label>
                            <input class="emailAddress" type="text" onChange="" placeholder="Type your email address" />
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
                <button onClick={props.toggleWindow}>Save</button>
            </div>
        </div>
    )
  }
  
  export default new_expense;