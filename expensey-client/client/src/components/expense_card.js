import React, { Component } from 'react';
import './expense_card.css';

const Expense_card   = props => {

  //function encapsulates card data
  var cardData = function () {
    var date = null;
    var description = null;
    var amount = null;
    var receiptImgLink = null;
    var category = null;
    var tag = null;
    var comments = null;
    const receiptIcon = "https://png.pngtree.com/png-vector/20190411/ourlarge/pngtree-vector-receipt-icon-png-image_927096.jpg";
    var receiptImg;
    var status = null;

    return{ 
      //getters & setters
      getDate : function () {
        return date;
      },
      getDescrip : function () {
        return description;
      },
      getAmount : function () {
        return amount;
      },
      getReceiptImgLink : function () {
        return receiptImgLink;
      },
      getCategory : function () {
        return category;
      },
      getTag : function () {
        return tag;
      },
      getComments : function () {
        return comments;
      },
      getReceiptIcon : function () {
        return receiptIcon;
      },
      getReceiptImg : function () {
        return receiptImg;
      },
      getStatus : function() {
        return status;
      },
      setStatus : function (newStatus) {
        status = newStatus;
      },
      setDate : function (newDate) {
        date = newDate;
      },
      setDescrip : function (newDescrip) {
        description = newDescrip;
      },
      setAmount : function (newAmount) {
        amount = newAmount;
      },
      setReceiptImgLink : function (newLink) {
        receiptImgLink = newLink;
      },
      setCategory : function (newCat) {
        category = newCat;
      },
      setTag : function (newTag) {
        tag = newTag;
      },
      setComments : function (newCom) {
        comments = newCom;
      },
      setReceiptImg : function (newImg) {
        receiptImg = newImg;
      }
    };
  }();

  function setExpense_card () {
    cardData.setDate(props.data[0]);
    cardData.setDescrip(props.data[1]);
    cardData.setAmount(props.data[2]);
    cardData.setReceiptImgLink(props.data[6]);
    cardData.setCategory(props.data[3]);
    cardData.setTag(props.data[5]);
    cardData.setComments(props.data[4]);
    cardData.setStatus(props.data[7]);
  }

  var cardNum = props.data[8]

  var toggleReceiptImg = () => {
    props.toggleReceiptImg(cardData.getReceiptImg());
  }

  if (props.data[6] != null) {
    cardData.setReceiptImg(props.data[6]);
  } else {
    cardData.setReceiptImg(cardData.getReceiptIcon());
  }

  var toggleDeleteButton = () => {
    var buttons  = document.getElementById(`updateButtons${cardNum}`)
    buttons.style.visibility = 'visible';
    buttons.style.width = "fit-content"
  }

  var updateExp = () => {

  }

  var delExp = () => {

  }

  setExpense_card();

  return (
      <div className="Card" onDoubleClick={toggleDeleteButton}>
        <p class="datep">{cardData.getDate()}</p>
        <div class="statusp">
          <p>{cardData.getStatus()}</p>
        </div>
        <p class="merchantp">{cardData.getDescrip()}</p>
        <div class="amountp">
          <p>${cardData.getAmount()}</p>
          <img src={cardData.getReceiptImg()} onClick={toggleReceiptImg}></img>
        </div>
        <p class="catp">{cardData.getCategory()}</p>
        <p class="commentsp">{cardData.getComments()}</p>
        <div class="updateButtons" id={`updateButtons${cardNum}`}>
          <button id="updateExp" onClick={updateExp}>Update</button>
          <button id="delExp" onClick={delExp}>delete</button>
        </div>
      </div>
  )
}



export default Expense_card;