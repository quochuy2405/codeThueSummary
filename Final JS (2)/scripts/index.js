localStorage.setItem("shoppingCard", JSON.stringify([]));
localStorage.setItem("info", JSON.stringify({}));
let listId = [];
let total = 0;

function isPassField(elementId, alertId, message, min, max, greatValue) {
  const element = $("#" + elementId);
  const alert = $("#" + alertId);
  if (!element.val() || element.val() < greatValue) {
    alert.html(message);
    return "error";
  } else {
    if (
      (min || max) &&
      (element.val().length < min || element.val().length > max)
    ) {
      const messageMinMax =
        "Have to enter character min:" + min + ",max:" + max;
      alert.html(messageMinMax);
      return "error";
    }
    alert.html("");
    return element.val();
  }
}
// reference https://www.telerik.com/blogs/how-module-pattern-works-javascript\
function isValid() {
  const validMessage = {
    textMessage: "Please enter this field",
    dateMessage: "Please choose date",
    totalMessage: "Please choose items below",
  };
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
  if (
    validName !== "error" &&
    validAddress !== "error" &&
    validAge !== "error" &&
    validDate !== "error" &&
    validTotal !== "error"
  ) {
    return {
      name: validName,
      address: validAddress,
      age: validAge,
      date: validDate,
      total: validTotal,
    };
  }
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
  $.getJSON("data.json", function (data) {
    const render = $("#render-products");
    const products = data.products;
    if (products.length) {
      const html = renderByJSON(products).getStringData();
      render.append(html);
      $('.edit').click(function () {
        const parent = $(this).parent().parent()
        if ($(this).text() !== 'done') {
          const amountItem = parent.find("[data-amount]")
          amountItem.html(`<input type="number" value=1 min=1 max=100 >`)
          $(this).html('done')
        } else {
          const input = parent.find("[data-amount]").find('input')
          const amountItem = parent.find("[data-amount]")
          const unitPrice = parent.find("[data-value]").attr("data-value");
          const subTotal = parent.find("[data-total]")
          amountItem.html(input.val())
          subTotal.html(1 * input.val() * unitPrice)
          $(this).html('edit')

        }

      })
      $(".choose").click(function () {
        const card = JSON.parse(localStorage.getItem("shoppingCard")) || [];
        const parent = $(this).parent().parent()
        const id = parent.attr("id");
        const totalItem = parent.find("[data-total]").attr("data-total");
        const nameItem = parent.find("[data-name]").attr("data-name");
        const amountItem = parent.find("[data-amount]").attr("data-amount");
        const item = {
          nameItem,
          amountItem,
          totalItem,
        };
        if (!listId.includes(id)) {
          parent.css("background", "#98b4c8");
          total += Number(totalItem);
          $("#total").val(total);
          $(this).html('undo')

          listId.push(id);
          card.push(item);
          localStorage.setItem("shoppingCard", JSON.stringify(card));
        } else {
          const newCard = card.filter((_item) => _item !== item);
          listId = listId.filter((_id) => _id !== id);
          parent.css("background", "none");
          if (listId.length >= 0) {
            total -= Number(totalItem);
            $("#total").val(total);
          }
          $(this).html('choose')
          localStorage.setItem("shoppingCard", JSON.stringify(newCard));
        }
      });
    }
  });

  $("#btn-reset").click(function () {
    $("#total").val(0);
    listId = [];
    total = 0;
    $(".item-product").css("background", "none");
  });
  $("#privacy").change(function () {
    console.log($(this).is(":checked"));
    if (!$(this).is(":checked")) {
      $("#btn-submit").prop("disabled", true);
      $("#btn-submit").css("background-color", "#cbcbcb");
    } else {
      $("#btn-submit").prop("disabled", false);
      $("#btn-submit").css("background-color", "#294286");
    }
  });

  $("#form").on("submit", function (e) {
    const data = isValid();
    console.log(data);
    if (data === "error") {
      e.preventDefault();
      return false;
    } else {
      localStorage.setItem("info", JSON.stringify(data));
      $.get(`summary.html`);
    }
  });
});
