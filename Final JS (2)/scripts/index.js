localStorage.setItem("shoppingCard", JSON.stringify([]));
localStorage.setItem("info", JSON.stringify({}));
let listId = [];
let total = 0;


function isPassField(elementId, alertId, message, min, max, greatValue) {
  // find element input id
  const element = $("#" + elementId);
  // find element alert id
  const alert = $("#" + alertId);

  // if value none |undified | ... 
  // or value < number great than 
  // => error + message for this input
  if (!element.val() || element.val() < greatValue) {
    alert.html(message);
    return "error";
  } else {
    //  if lenght value < min or > max  => error + message for this input
    if (element.val().length < min || element.val().length > max) {
      alert.html("Have to enter character min:" + min + ",max:" + max);
      return "error";
    }
    // else  alert = "" return value is validated
    alert.html("");
    return element.val();
  }
}
// reference https://www.telerik.com/blogs/how-module-pattern-works-javascript\
function isValid() {
  // init message 
  const validMessage = {
    textMessage: "Please enter this field",
    dateMessage: "Please choose date",
    totalMessage: "Please choose items below",
  };

  // argument 1 isPassField(id,span element to display error , message, min, max )

  const validName = isPassField(
    "name",
    "nameError",
    validMessage.textMessage,
    3,
    20
  );

  const validAddress = isPassField(
    "address",
    "addressError",
    validMessage.textMessage,
    3,
    40
  );

  const validAge = isPassField(
    "age",
    "ageError",
    validMessage.textMessage,
    1,
    2,
    1
  );

  const validDate = isPassField("date", "dateError", validMessage.dateMessage);

  const validTotal = isPassField(
    "total",
    "totalError",
    validMessage.totalMessage
  );


  // case 1 data = error 
  // case 2 data = value
  // if all not error = is validated
  if (
    validName != "error" &&
    validAddress != "error" &&
    validAge != "error" &&
    validDate != "error" &&
    validTotal != "error"
  ) {
    return {
      name: validName,
      address: validAddress,
      age: validAge,
      date: validDate,
      total: validTotal,
    };
  }
  // one of all = error => error
  return "error";
}

function renderByJSON(products) {
  let html = "";
  const getElements = () => {
    for (let i = 0; i < products.length; i++) {
      const item = products[i];
      const total = item.value * item.amount;
      html += `
                         <div class="grid-5 item-product" id=${item.id}>
                            <div class="img-table"> <img src=${item.url} alt="anh"></div>
                            <p data-name=${item.name} >${item.name}</p>
                            <p data-value=${item.value}>${item.value}</p>
                            <p data-amount=${item.amount}>${item.amount}</p>
                            <p data-total=${total}>${total}</p>
                            <div>
                             <button type='button' class="choose">choose</button>
                             <button type='button' class="edit">edit</button>
                            </div>
                         </div>`;
    }
    return html;
  };

  return {
    html,
    getStringData: () => getElements(),
  };
}

$(document).ready(function () {
  // refer https://api.jquery.com/jquery.getjson/
  // using getJSON to get data from data.json
  $.getJSON("data.json", function (data) {
    const render = $("#render-products");
    // get list prodicts from object data
    const products = data.products;


    // call renderByJSON func to string product by template
    const html = renderByJSON(products).getStringData();
    // append html to div id=render-products
    render.append(html);


    $('.edit').click(function () {
      // find div container of edit button (<div class="grid-5 item-product" id=${item.id}>)
      const parent = $(this).parent().parent()

      // if text != done display input else display text and set text edit
      // case 1 : done 
      // case 2: edit
      if ($(this).text() != 'done') {
        // data-[set] find  <p data-amount=${item.amount}>${item.amount}</p>
        const amountItem = parent.find("[data-amount]")

        // change text data-amount => input
        amountItem.html(`<input type="number" value=1 min=1 max=100 >`)
        $(this).html('done')

      } else {
        // find input elemnt in data-amount
        const input = parent.find("[data-amount]").find('input')

        // data-[set] find  <p data-amount=${item.amount}>...</p>
        const amountItem = parent.find("[data-amount]")

        // get unit price  <p data-value=${item.value}>${item.value}</p>
        const unitPrice = parent.find("[data-value]").attr("data-value");

        // fint total elemnt  <p data-total=${total}>${total}</p>
        const subTotal = parent.find("[data-total]")

        amountItem.html(input.val())

        subTotal.html(1 * input.val() * unitPrice)
        $(this).html('edit')

      }

    })

    $(".choose").click(function () {
      // get shopping card 
      const card = JSON.parse(localStorage.getItem("shoppingCard")) || [];

      // find div container of choose button (<div class="grid-5 item-product" id=${item.id}>)
      // same edit
      const parent = $(this).parent().parent()
      const id = parent.attr("id");
      const totalItem = parent.find("[data-total]").attr("data-total");
      const nameItem = parent.find("[data-name]").attr("data-name");
      const amountItem = parent.find("[data-amount]").attr("data-amount");
      // 

      const item = {
        nameItem,
        amountItem,
        totalItem,
      };
      // if id not in list add id into list
      if (!listId.includes(id)) {
        // set backend id 
        parent.css("background", "#98b4c8");
        // caculator total and appent to element id =#total
        total += Number(totalItem);
        $("#total").val(total);
        $(this).html('undo')

        // add id into list
        listId.push(id);

        // shopping cart  add item 
        card.push(item);

        // save new shoping card 
        // will use it in page summary
        localStorage.setItem("shoppingCard", JSON.stringify(card));
      } else {

        // undo -> remore out to shopping cart
        // filter item != item
        const newCard = card.filter((_item) => _item != item);
        // filter id != id
        listId = listId.filter((_id) => _id != id);

        // change background
        parent.css("background", "none");


        if (listId.length >= 0) {
          total -= Number(totalItem);
          $("#total").val(total);
        }

        $(this).html('choose')
        localStorage.setItem("shoppingCard", JSON.stringify(newCard));
      }
    });

  });


  // listener click button reset 
  $("#btn-reset").click(function () {
    //  init value
    $("#total").val(0);
    listId = [];
    total = 0;
    // reset all background item 
    $(".item-product").css("background", "none");
  });

  $("#privacy").change(function () {
    // if checkbox is checked enable button else disable button
    //  and set background for it
    if (!$(this).is(":checked")) {
      $("#btn-submit").prop("disabled", true);
      $("#btn-submit").css("background-color", "#cbcbcb");
    } else {
      $("#btn-submit").prop("disabled", false);
      $("#btn-submit").css("background-color", "#294286");
    }
  });


  // listener submit form
  $("#form").on("submit", function (e) {
    // validate data before submit
    // case 1: error
    // case 2: 
    // {
    //  name: validName,
    //  address: validAddress,
    //  age: validAge,
    //  date: validDate,
    //  total: validTotal,
    // };
    const data = isValid();

    // if data = error validate and stop submit
    if (data == "error") {
      e.preventDefault();
      return false;
    } else {
      // set data to localStorage
      localStorage.setItem("info", JSON.stringify(data));
      // Ajax redirect to page sumary
      $.get(`summary.html`);
    }
  });
});
