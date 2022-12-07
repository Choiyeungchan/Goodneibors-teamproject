const selected = document.querySelectorAll(".support-selects");
    const layer = document.querySelectorAll(".row2");

    selected.forEach((select,index) => {
      select.onclick = () => {
        layer[index].classList.toggle("invisible-area");
      }
    });

function printValue() {
  const inputValue = document.getElementById('regular-input');
  document.getElementById("donationPay").innerHTML = inputValue.value * 30000;

}

class SelectValue {

  constructor() {
    this.getCheckboxValue();
    this.getInputValue();
  }


  getCheckboxValue() {
    let regular1 = document.getElementsByName("regular-1");
    let donatePay = document.getElementsByName("donationPay");
      for(let j = 0; j < regular1.length; j++) {
        regular1[j].onclick = () => {
          console.log(Number(regular1[j].value))
          if(regular1[j].checked) {
            donatePay[parseInt(j/3)].innerHTML = Number(regular1[j].value) * Number(30000);
        }
      }
    }
  }

  getInputValue() {
    let donatePay = document.getElementsByName("donationPay");
    let regularInput = document.getElementById("regular-input").value;


  }
}
  window.onload = () => {
    new SelectValue();
  }