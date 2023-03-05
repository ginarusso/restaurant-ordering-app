import { menuArray } from '/data.js'
// console.log(menuArray)
let orderArray = []

document.addEventListener('click', function (e) {
    // console.log("clicked")
    // console.log(e.target.dataset.add)
    if (e.target.dataset.add) {
        handleOrderItemClick(e.target.dataset.add)
        // console.log("add")
    } else if (e.target.dataset.remove) {
        // console.log("remove")
        let itemIndex = orderArray.findIndex((item) => item.id == e.target.dataset.remove)
        orderArray.splice(itemIndex, 1)
        getOrderSummary()
    } else if (e.target.id === "complete-order") {
        completeOrder()
        const menuAddButtons = document.querySelectorAll('.add-item');
        const menuRemoveButtons = document.querySelectorAll('.remove-item')

        for (const addButton of menuAddButtons) {
            addButton.setAttribute('disabled', '')
        }

        for (const removeButton of menuRemoveButtons) {
            removeButton.setAttribute('disabled', '')
        }
    }
})

function getMenuItems() {
    let menuHtml = ''
    menuArray.forEach(function(menuItem){
        const { emoji, name, ingredients, price, id } = menuItem
    // console.log(menuItem)
        menuHtml += `
        <div class="menu-items">
            <div class="emoji">${emoji}</div>
                <div class="item-description">
                    <div class="item-name">${name}</div>
                    <div class="item-ingredients">${ingredients.join(', ')}</div>
                    <div class="item-price">$${price}</div>
                </div>
            <button class="add-item" id="add-item" data-add="${id}">➕</button>
        </div>
        <hr />
        `
})
    return menuHtml
}

function handleOrderItemClick(itemId) {
    // console.log(itemId)
    let numId = parseInt(itemId)
    const targetItemObj = menuArray.filter(function (menuItem) {
            // console.log(menuItem.id)
            return menuItem.id === numId
    })[0]
    orderArray.push(targetItemObj) 
    getOrderSummary() 
} 

function getOrderSummary() {
    // console.log("order summary")
    // console.log(orderArray.length)
    let totalOrderPrice = 0;

    for (let i = 0; i < orderArray.length; i++) {
        totalOrderPrice += orderArray[i].price;
    }
    // console.log(totalOrderPrice)

    let orderHtml = ""
    let orderSummary = ""
    
    if (orderArray.length > 0) {
        // console.log(orderArray)
        document.getElementById('order-container').classList.remove('hidden')
        orderArray.forEach(function (item) {
            const { name, price, id } = item
            orderHtml += `
            <div class="order-summary">
                <div class="item-name" id="item-name">${name}</div>
                <button class="remove-item" id="remove-item" data-remove="${id}">remove</button>
                <div class="price" id="price">$${price}</div>
            </div>
            `    
        orderSummary = `
        <div class="order">Your Order</div>
            <div>${orderHtml}</div>
            <hr class="order-hr" />
            <div class="total">
                <div>Total Price:</div>
                <div class="price">$${totalOrderPrice}</div>
            </div>
            <button class="completeBtn" id="complete-order">Complete Order</button>
        `
        })
        } else if (orderArray.length === 0) {
        document.getElementById('order-container').classList.add('hidden')
        // console.log("clicked removed")
    }
    document.getElementById('order-container').innerHTML = orderSummary
}

function completeOrder() {
    // console.log("complete clicked")
    const modalContainer = document.getElementById('modal-container')
    const orderForm = document.getElementById('order-form')
    modalContainer.style.display = 'inline'
    orderForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const orderFormData = new FormData(orderForm);
        const fullName = orderFormData.get("full-name");
        showStatus(fullName)
    })
    
    const modalClose = document.getElementById('modal-close-btn')

    modalClose.addEventListener('click', function () {
    // modal.style.display = 'none'
    const modalContainer = document.getElementById('modal-container')
    modalContainer.style.display = 'none'
    document.getElementById('order-container').classList.remove('hidden')
    // console.log("close modal")
    // if modal closed, enable add buttons
        const menuAddButtons = document.querySelectorAll('.add-item');
        const menuRemoveButtons = document.querySelectorAll('.remove-item')

        for (const addButton of menuAddButtons) {
            addButton.removeAttribute("disabled", '')
        }

        for (const removeButton of menuRemoveButtons) {
            removeButton.removeAttribute("disabled", '')
        }
    })  
}

function showStatus(fullName) {
    const submitBtn = document.getElementById('submit')
    submitBtn.innerHTML = `
        <div class="loading"><img src="images/spinner.gif"></div>
        `
//     setTimeout(function () {
//         document.getElementById("modal-container").style.display = 'none'
//         document.getElementById('order-container').classList.add('success')
//         document.getElementById('order-container').innerHTML =
//             `<h4>Thanks ${fullName}!<br>Your order is on its way.</h4>`
//     }, 3500)
}

function render() {
    document.getElementById('menu-container').innerHTML = getMenuItems()
}

render()
