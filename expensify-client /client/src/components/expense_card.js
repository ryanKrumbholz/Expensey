import React from 'react';
import './expense_card.css';

const expense_card = props => {
  var test = 0;
  //constructor
  const assign = function() {
    cardData.setDate(props.date);
    cardData.setDescrip(props.description);
    cardData.setAmount(props.amount);
    cardData.setReceiptImgLink(props.receiptImgLink);
    cardData.setCategory(props.category);
    cardData.setTag(props.tag);
    cardData.setComments(props.comments);
  };

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

  assign();

  if (cardData.getReceiptImgLink() != null) {
    cardData.setReceiptImg(cardData.getReceiptImgLink());
  } else {
    cardData.setReceiptImg(cardData.getReceiptIcon());
  }

  return (
      <div className="Card">
        <p>{cardData.getDate()}</p>
        <p>{cardData.getDescrip()}</p>
        <p>{cardData.getAmount()}</p>
        <img src={cardData.getReceiptImg()}></img>
        <p>{cardData.getCategory()}</p>
        <p>{cardData.getTag()}</p>
        <p>{cardData.getComments()}</p>
      </div>
  )
}

export default expense_card;