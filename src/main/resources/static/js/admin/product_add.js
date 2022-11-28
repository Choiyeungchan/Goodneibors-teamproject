class Option {
  static #instance = null;

  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new Option();
    }
    return this.#instance;
  }

  constructor() {
    this.numCheck();
    this.setCategorySelectOptions();
  }
  
  numCheck() {
    const price =  document.querySelectorAll(".numberChk")[0];
    const stock =  document.querySelectorAll(".numberChk")[1];

    price.oninput= () => {
      price.value = price.value.replace(/[^0-9]/g, '');
    } 
    stock.oninput= () => {
      stock.value = stock.value.replace(/[^0-9]/g, '');
    } 
  }

  setCategorySelectOptions() {
    const categorySelect = document.querySelector(".cagetory-select");
    categorySelect.innerHTML = `<option value="none">카테고리</option>`;
  
    const responseData = CommonApi.getInstance().getCategoryList();
    if(responseData != null) {
      if (responseData.length > 0) {
        responseData.forEach(product => {
          categorySelect.innerHTML += `
            <option value="${product.Id}">${product.name}</option>
          `;
        });
      }
    }
  }
}

class CommonApi {
  static #instance = null;
  
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new CommonApi();
    }
    return this.#instance;
  }

  getCategoryList() {
    let responseResult = null;

    $.ajax ({
      async: false,
      type: "get",
      url: "/api/admin/product/category",
      dataType: "json",
      success: (response) => {
        responseResult = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    });

    return responseResult;
  }
}

class ProductImgFile {
  static #instance = null;
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new ProductImgFile();
    }
    return this.#instance;
  }

  newImgList = new Array();


  constructor() {
    this.addFileInputEvent();
    // this.addUploadEvent();
  }

  addFileInputEvent() {
    const filesInput = document.querySelector(".files-input");
    const imgAddButton = document.querySelector(".img-add-button");
    imgAddButton.onclick = () => {
      filesInput.click(); // 버튼 클릭시 input 이벤트 발생
    }
    filesInput.onchange = () => {
      const formData = new FormData(document.querySelector("form"));

      let changeFlag = false;

      formData.forEach(value => {
        if(value.size != 0) { // 취소하면 사이즈가 0이 나와서 그 경우를 제외
          this.newImgList.push(value);
          changeFlag = true;
        }
      });

      if(changeFlag) {
        this.loadImgs();
        filesInput.value = null;

      }
    }
  }

  loadImgs() {
    const fileList = document.querySelector(".file-list");
    fileList.innerHTML = "";

    this.newImgList.forEach((imgFile, i) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        fileList.innerHTML += `
          <li class="file-info">
            <div class="file-img">
              <img src="${e.target.result}" alt="">
            </div>
            <div class="file-name">${imgFile.name}</div>
            <button type="button" class="btn delete-button">삭제</button>
          </li>
        `;
      }
      //readAsDataURL(); 비동기처리... 순서대로 들어오지 않음.
      setTimeout(() => {
        reader.readAsDataURL(imgFile);
      }, i * 300); // 처리를 i * 200 늦게
    });

    setTimeout(() => {
      this.addDeleteEvent();
    }, this.newImgList.length * 300);
  }
  
  addDeleteEvent() {
    const deleteButtons = document.querySelectorAll(".delete-button");

    deleteButtons.forEach((deleteButton, i) => {
      deleteButton.onclick = () => {
        if (confirm("상품이미지를 지우시겠습니까?")) {
          this.newImgList.splice(i, 1);
          this.loadImgs();
        }
      }
    });
  }
  
  // addUploadEvent() {
  //   const uploadButton = document.querySelector(".upload-button");
  //   uploadButton.onclick = () => {
  //     const formData = new FormData();
       
  //     const productId = document.querySelector(".product-select").value;
  //     formData.append("pdtId", productId);

  //     this.newImgList.forEach(imgFile => {
  //       formData.append("files", imgFile);
  //     });

  //     ProductApi.getInstance().registImgFiles(formData);
  //   }
  // }
}

window.onload = () => {
    Option.getInstance();
    ProductImgFile.getInstance();
}