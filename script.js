const products = [
  {id:1,name:"Chaos Order Tee",cat:"Clothing",price:850,badge:"NEW"},
  {id:2,name:"Auric Noir Watch",cat:"Watches",price:3450,badge:"BESTSELLER"},
  {id:3,name:"Elite Weekender Bag",cat:"Bags",price:4950,badge:"NEW"},
  {id:4,name:"Minimal Club Hoodie",cat:"Clothing",price:1450,badge:""},
  {id:5,name:"Gold Pendant Chain",cat:"Accessories",price:1250,badge:""},
  {id:6,name:"TP Signature Cap",cat:"Accessories",price:950,badge:""},
  {id:7,name:"Midnight Essential Tee",cat:"Clothing",price:900,badge:""},
  {id:8,name:"Obsidian Chrono",cat:"Watches",price:6500,badge:"LIMITED"},
  {id:9,name:"Noir Crossbody",cat:"Bags",price:2850,badge:""},
  {id:10,name:"Monarch Runner",cat:"Footwear",price:3200,badge:"NEW"},
  {id:11,name:"Black Gold Bracelet",cat:"Accessories",price:1100,badge:""},
  {id:12,name:"TradePost Signature Tee",cat:"Clothing",price:1000,badge:""},
  {id:13,name:"Velvet Night Shirt",cat:"Clothing",price:1800,badge:""},
  {id:14,name:"Executive Leather Bag",cat:"Bags",price:5900,badge:"PREMIUM"},
  {id:15,name:"Goldline Classic",cat:"Watches",price:5200,badge:""},
  {id:16,name:"Royal Street Sneaker",cat:"Footwear",price:4100,badge:""},
  {id:17,name:"TP Chain Ring",cat:"Accessories",price:850,badge:""},
  {id:18,name:"Black Label Overshirt",cat:"Clothing",price:2400,badge:"NEW"},
  {id:19,name:"Noir Mini Bag",cat:"Bags",price:2650,badge:""},
  {id:20,name:"Apex Automatic",cat:"Watches",price:6250,badge:"LIMITED"},
  {id:21,name:"Gold Edge Sunglasses",cat:"Accessories",price:1450,badge:""},
  {id:22,name:"Monogram Polo",cat:"Clothing",price:1650,badge:""},
  {id:23,name:"Prestige Loafer",cat:"Footwear",price:3800,badge:""},
  {id:24,name:"Signature Duffel",cat:"Bags",price:5600,badge:"PREMIUM"},
  {id:25,name:"Nightfall Tee",cat:"Clothing",price:850,badge:""},
  {id:26,name:"Imperial Steel Watch",cat:"Watches",price:4750,badge:""},
  {id:27,name:"Gold Buckle Belt",cat:"Accessories",price:1350,badge:""},
  {id:28,name:"Street Luxe Hoodie",cat:"Clothing",price:2100,badge:""},
  {id:29,name:"Onyx Trainer",cat:"Footwear",price:3500,badge:"NEW"},
  {id:30,name:"Classic Shoulder Bag",cat:"Bags",price:4300,badge:""},
  {id:31,name:"Aurelia Mesh Watch",cat:"Watches",price:5500,badge:""},
  {id:32,name:"TP Signet Pendant",cat:"Accessories",price:1550,badge:""},
  {id:33,name:"Gold Script Tee",cat:"Clothing",price:950,badge:""},
  {id:34,name:"Blackout Cargo",cat:"Clothing",price:1950,badge:"NEW"},
  {id:35,name:"Crown Leather Sneaker",cat:"Footwear",price:4600,badge:"PREMIUM"}
];

let cart = JSON.parse(localStorage.getItem("tradepostCart") || "[]");
let activeFilter = "All";

const money = n => "₱" + n.toLocaleString("en-PH");
const grid = document.getElementById("productGrid");

function productCard(p){
  return `<article class="product">
    ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
    <div class="product-image"><div class="symbol">TP</div></div>
    <div class="product-info">
      <h3>${p.name}</h3>
      <div class="product-meta"><span class="price">${money(p.price)}</span><button class="add" onclick="addToCart(${p.id})">ADD TO BAG</button></div>
    </div>
  </article>`;
}
function renderProducts(){
  let list = products.filter(p => activeFilter==="All" || p.cat===activeFilter);
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  if(q) list = list.filter(p => `${p.name} ${p.cat}`.toLowerCase().includes(q));
  const sort = document.getElementById("sort").value;
  if(sort==="low") list.sort((a,b)=>a.price-b.price);
  if(sort==="high") list.sort((a,b)=>b.price-a.price);
  grid.innerHTML = list.map(productCard).join("");
}
function saveCart(){localStorage.setItem("tradepostCart",JSON.stringify(cart)); renderCart();}
function addToCart(id){
  const item = cart.find(x=>x.id===id);
  if(item) item.qty++;
  else cart.push({id,qty:1});
  saveCart(); openCart();
}
function removeFromCart(id){cart=cart.filter(x=>x.id!==id);saveCart();}
function changeQty(id,delta){
  const item=cart.find(x=>x.id===id); if(!item)return;
  item.qty+=delta; if(item.qty<=0) removeFromCart(id); else saveCart();
}
function renderCart(){
  const box=document.getElementById("cartItems");
  if(!cart.length) box.innerHTML=`<div style="color:#777;text-align:center;padding:70px 10px;font-size:11px">YOUR BAG IS EMPTY.</div>`;
  else box.innerHTML=cart.map(x=>{
    const p=products.find(p=>p.id===x.id);
    return `<div class="cart-row"><div class="cart-thumb">TP</div><div><h4>${p.name}</h4><p>${money(p.price)} · ${p.cat}</p><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span style="padding:0 8px;font-size:10px">${x.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div></div><button class="icon-btn" onclick="removeFromCart(${p.id})">×</button></div>`;
  }).join("");
  const total=cart.reduce((s,x)=>s+(products.find(p=>p.id===x.id).price*x.qty),0);
  document.getElementById("cartTotal").textContent=money(total);
  document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
}
function openCart(){document.getElementById("cartPanel").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cartPanel").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("overlay").onclick=closeCart;

document.querySelectorAll("[data-filter]").forEach(el=>el.addEventListener("click",e=>{
  e.preventDefault(); activeFilter=el.dataset.filter;
  document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.filter===activeFilter));
  renderProducts(); document.getElementById("shop").scrollIntoView({behavior:"smooth"});
}));
document.getElementById("sort").onchange=renderProducts;

const searchBox=document.getElementById("searchBox");
document.getElementById("searchBtn").onclick=()=>{searchBox.classList.add("show");document.getElementById("searchInput").focus()};
document.getElementById("closeSearch").onclick=()=>{searchBox.classList.remove("show");document.getElementById("searchInput").value="";renderProducts()};
document.getElementById("searchInput").oninput=renderProducts;

const checkoutModal=document.getElementById("checkoutModal");
document.getElementById("checkoutBtn").onclick=()=>{
  if(!cart.length){alert("Your bag is empty.");return;}
  const summary=cart.map(x=>{const p=products.find(p=>p.id===x.id);return `${p.name} × ${x.qty} — ${money(p.price*x.qty)}`}).join("<br>");
  const total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);
  document.getElementById("checkoutSummary").innerHTML=summary+`<hr><strong style="color:#e9c45e">TOTAL: ${money(total)}</strong>`;
  checkoutModal.classList.add("open"); closeCart();
};
document.getElementById("closeCheckout").onclick=()=>checkoutModal.classList.remove("open");
document.getElementById("checkoutForm").onsubmit=e=>{
  e.preventDefault();
  const data=new FormData(e.target);
  alert(`Thank you, ${data.get("name")}! Your TradePost order request has been recorded in this demo.`);
  cart=[];saveCart();checkoutModal.classList.remove("open");e.target.reset();
};
document.getElementById("newsletterForm").onsubmit=e=>{e.preventDefault();alert("You're on the TradePost list. Thank you!");e.target.reset()};
document.getElementById("accountBtn").onclick=()=>alert("Customer accounts can be connected here when you add a backend.");
document.querySelector(".mobile-menu").onclick=()=>document.querySelector(".nav").classList.toggle("mobile-open");

renderProducts();renderCart();
