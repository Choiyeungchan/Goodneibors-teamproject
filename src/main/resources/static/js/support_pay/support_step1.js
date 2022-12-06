const selected = document.querySelectorAll(".support-selects");
const layer = document.querySelectorAll(".row2");

selected.forEach((select,index) => {
  select.onclick = () => {
    layer[index].classList.toggle("invisible-area");
  }
});

// function getCheckboxValue()  {
//   // // 선택된 목록 가져오기
//   // const query = 'input[name="regular-1"]:checked';
//   // const selectedEls = 
//   //     document.querySelectorAll(query);
  
//   // // 선택된 목록에서 value 찾기
//   let result = '';
//   // selectedEls.forEach((el) => {
//   //   result = el.value + ' ';
//   // });
  
//   // // 출력

// }


  class SelectValue {

    constructor() {
      // this.getdonationvaule();
      this.getCheckboxValue();
    }

    getdonationvaule() {
      const regular1 = document.getElementById("regular-1-1").value;
      const donatepay = document.querySelector(".donationPay");

      document.getElementById('donationPay').innerText= Number(regular1) * Number(30000);
      
    }

    getCheckboxValue() {
      let regular1 = document.getElementsByName("regular-1");
      console.log(regular1[1].value);
      const donatepay = document.querySelector(".donationPay");
      for (let i = 0; i < regular1.length-1; i++) {
        regular1[i].onclick = () => {
          if(regular1[i].checked) {
            document.getElementById('donationPay').innerText = Number(regular1[i].value * 30000);
          }
        }
      }
      
    }

  }

  window.onload = () => {
    new SelectValue();
  }