// Inicializa o carrinho a partir do localStorage
let cart = JSON.parse(localStorage.getItem("cart"));
// Seletores
const cartCount = document.getElementById("cart-count");
const cartContainer = document.getElementById("cart-container");
const cartItems = document.getElementById("cart-items");
const cartBtn = document.getElementById("cart-btn");
const closeCartBtn = document.getElementById("close-cart");
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
const clearCartBtn = document.getElementById("clear-cart");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

function updateCartCount() {
  //o reduce percorre todos os itens no cart e soma a quantidade de cada item armazenada em item.quantity. O 0 no final é o valor inicial do  count
  if (cart.length > 0) {
    const totalItems = cart.reduce((count, item) => count + item.quantity, 0);
    cartCount.textContent = totalItems;
  } else {
    cartCount.textContent = 0;
  }
}
// Função para calcular o valor total do carrinho
function calculateTotal() {
  return cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace("R$", "").replace(",", "."));
    return total + price * item.quantity; // Multiplica o preço pelo total de quantidade
  }, 0);
}

// Função para atualizar o conteúdo do carrinho
function updateCartItems() {
  cartItems.innerHTML = ""; // Limpa o conteúdo do carrinho
  if (cart.length === 0) {
    cartItems.innerHTML = "Carrinho vazio!";
    cartTotal.textContent = "Total: R$ 0,00";
  } else {
    cart.forEach((item) => {
      // Cria um item de lista mostrando a quantidade, nome e preço do item
      const listItem = document.createElement("li");
      listItem.textContent = `${item.quantity} - ${item.name} - ${item.price}`;
      cartItems.appendChild(listItem);
    });

    // Atualiza o total do carrinho
    const total = calculateTotal();
    cartTotal.textContent = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
  }
}
// Função para limpar o carrinho
function clearCart() {
  cart = []; // Limpa o array do carrinho
  localStorage.setItem("cart", JSON.stringify(cart)); // Atualiza no Local Storage
  updateCartCount();
  updateCartItems();
}

// Função para abrir o carrinho
function openCart() {
  cartContainer.style.display = "block";
  updateCartItems(); // Atualiza os itens ao abrir o carrinho
}

// Função para fechar o carrinho
function closeCart() {
  cartContainer.style.display = "none";
}

// Função para adicionar um item ao carrinho
function addToCart(event) {
  const menuItem = event.target.closest(".menu-item");
  const itemName = menuItem.querySelector(".item-name").textContent;
  const itemPrice = menuItem.querySelector(".item-price").textContent;

  const existingItem = cart.find((item) => item.name === itemName);
  if (existingItem) {
    //se existir aumenta a qtd
    existingItem.quantity += 1;
    existingItem.totalPrice =
      parseFloat(existingItem.price.replace("R$", "").replace(",", ".")) *
      existingItem.quantity;
  } else {
    // Se o item não existir, adiciona o item com quantidade 1
    cart.push({
      name: itemName,
      price: itemPrice,
      quantity: 1,
      totalPrice: parseFloat(itemPrice.replace("R$", "").replace(",", ".")),
    });
  }

  // Atualiza o localStorage com a versão modificada do carrinho
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount(); // Atualiza o contador do carrinho

  // Se o carrinho estiver aberto, atualiza a lista de itens
  if (cartContainer.style.display === "block") {
    updateCartItems();
  }
}
function completePurchase() {
  if (cart.length === 0) {
    alert(
      "Seu carrinho está vazio! Adicione itens antes de concluir a compra."
    );
  } else {
    alert(
      "Compra concluída com sucesso! Obrigado por escolher o Recife Burguer."
    );
    clearCart();
    closeCart();
  }
}
// Eventos
cartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
clearCartBtn.addEventListener("click", clearCart);
checkoutBtn.addEventListener("click", completePurchase);

// Adiciona evento de clique ao botao Adicionar ao carrinho
addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", addToCart);
});
updateCartCount();
