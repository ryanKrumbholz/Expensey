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
  };


  if (cardData.getReceiptImgLink() != null) {
    cardData.setReceiptImg(cardData.getReceiptImgLink());
  } else {
    cardData.setReceiptImg(cardData.getReceiptIcon());
  }

  setExpense_card();

  return (
      <div className="Card">
        <p>{cardData.getDate()}</p>
        <p>{cardData.getDescrip()}</p>
        <div class="amount">
          <p>{cardData.getAmount()}</p>
          <img src={cardData.getReceiptImg()}></img>
        </div>
        <p>{cardData.getCategory()}</p>
        <p>{cardData.getComments()}</p>
      </div>
  )
}



export default Expense_card;