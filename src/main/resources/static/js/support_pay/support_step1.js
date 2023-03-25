class DonationApi {
  static #instance = null;
  static getInstance() {
      if(this.#instance == null) {
          this.#instance = new DonationApi();
      }
      return this.#instance;
  }

  getApi() {
      let responseData = null;

      $.ajax({
          async: false,
          type: "get",
          url: "/api/support",
          dataType: "json",
          success: (response) => {
              responseData = response.data;
          },
          error: (error) => {
              console.log(error);
          }
      });
      return responseData;
  }
}

class DonationSelect {

  constructor() {
    this.addDonationListEvent();
  }

  addDonationListEvent() {
    let responseData = DonationApi.getInstance().getApi();
    console.log(responseData);
    const donates = document.querySelector(".support-donate-table");

    donates.innerHTML = ``;

    responseData.forEach(category => {
        donates.innerHTML += `
        <div class="donate-payInput regular-pay">
          <div class="row1">
              <div class="check-box">
                  <div class="check">
                      <input type="checkbox" id="regular-${category.categoryId}" class="support-selects" value="${category.categoryId}">
                      <label for="regular-${category.categoryId}">${category.categoryName}</label>
                  </div>
              </div>
          </div>
          <div id="invisible-${category.categoryId}" class="row2 invisible-area">
            <div class="donate-pay-radio">
              <div>
                <input type="radio" id="regular-${category.categoryId}-1" name="regular-" class="regular-1" value="1" title="1명">
                <label for="regular-${category.categoryId}-1">1명</label>
              </div>
              <div>
                  <input type="radio" id="regular-${category.categoryId}-2" name="regular-" class="regular-1" value="2" title="2명">
                  <label for="regular-${category.categoryId}-2">2명</label>
              </div>
              <div>
                  <input type="radio" id="regular-${category.categoryId}-3" name="regular-" class="regular-1" value="3" title="3명">
                  <label for="regular-${category.categoryId}-3">3명</label>
              </div>
            </div>
            <div class="donate-pay-input input-box outline-box">
                <input type="number" id="regular-input" onchange class="maxLengthNext onlyPrice" name="regular-input-1" placeholder="아동 수 직접 입력" title="아동 수를 직접입력해주세요.">
                <label>명</label>
            </div>
            <div class="donate-pay-sinfo">
                후원금액(1명) 월 30,000원
            </div>
            <div class="donate-pay-total">
              총
              <span class="donationPay" name="donationPay"></span>
              원
            </div>
          </div>
        </div>
        `;

    });

    const selected = document.querySelectorAll(".support-selects");
    
    selected.forEach((select,index) => {
      select.addEventListener("click", () => {
        const layer = document.querySelectorAll(".row2")[index];
        layer.classList.toggle("invisible-area");
      });
    });

  }

  }

class ValueSum {

  constructor() {
    this.getTotalValue();
  }

  getTotalValue() {
    const selected = document.querySelectorAll(".support-selects");
    const layers = document.querySelectorAll(".row2");

    selected.forEach((select, index) => {
      select.onclick = () => {
        const layer = layers[index];
        const checkbox = layer.querySelector(".support-selects");
        const inputRadio = layer.querySelectorAll(".regular-1");
        const inputNumber = layer.querySelector(".onlyPrice");
        const donationPay = layer.querySelector(".donationPay");
        let totalAmount = 0;
        
        // radio 버튼 처리
        inputRadio.forEach((radio) => {
          radio.onclick = () => {
            if (radio.checked) {
              totalAmount = parseInt(radio.value) * 30000;
              donationPay.innerHTML = totalAmount;
              this.updateTotalPay();
            }
          }
        });
    
        // number input 처리
        inputNumber.oninput = () => {
          totalAmount = inputNumber.value * 30000;
          donationPay.innerHTML = totalAmount;
          this.updateTotalPay();
        }
    
        // checkbox 처리 
        checkbox.onclick = () => {
          if (!checkbox.checked) {
            totalAmount = 0;
            donationPay.innerHTML = totalAmount;
            this.updateTotalPay();
          }
        };
      };
    });
  }

  updateDonationPay() {
    const checkbox = document.querySelectorAll(".support-selects");

    
  }

  updateTotalPay() {
    let totalAmount = 0;
    const donationPay = document.querySelectorAll(".donationPay");
    donationPay.forEach((donationPay) => {
      totalAmount += Number(donationPay.innerHTML);
    });
    document.querySelector(".totalPay").innerHTML = totalAmount;
  }

}


window.onload = () => {
DonationApi.getInstance().getApi();
new DonationSelect();
new ValueSum();
}