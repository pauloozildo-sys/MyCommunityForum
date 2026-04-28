import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, where, Timestamp } from "firebase/firestore";

// Configuração do Firebase (SUBSTITUA PELOS DADOS DO SEU PROJETO)
const firebaseConfig = {
  apiKey: "AIzaSyB0sNCqeITOja_2WmtJi-exUMRMtdVdgQk",
  authDomain: "mycommunityforum-3912a.firebaseapp.com",
  databaseURL: "https://mycommunityforum-3912a-default-rtdb.firebaseio.com",
  projectId: "mycommunityforum-3912a",
  storageBucket: "mycommunityforum-3912a.firebasestorage.app",
  messagingSenderId: "815011709524",
  appId: "1:815011709524:web:93aed4d972d2ad90a5a3c1",
  measurementId: "G-9FRFQW00WT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const postsRef = collection(db, "posts");

// Lista de ACSs (pode vir do Firebase Auth no futuro)
const acsUsers = ["Rosilene", "Paulo", "Dra. Marta"];

let categoriaAtual = "hipertensao";
let usuarioAtual = localStorage.getItem("forum_user");

if (!usuarioAtual) {
    usuarioAtual = prompt("Digite seu nome:");
    if (usuarioAtual) localStorage.setItem("forum_user", usuarioAtual);
    else usuarioAtual = "Anônimo";
}

// DOM elements
const postsList = document.getElementById("postsList");
const msgInput = document.getElementById("msgInput");
const enviarBtn = document.getElementById("enviarBtn");
const tabs = document.querySelectorAll(".tabs li[data-categoria]");
const novaCategoriaBtn = document.getElementById("novaCategoriaBtn");

// Marca aba ativa
function setActiveTab(categoria) {
    tabs.forEach(tab => {
        if (tab.getAttribute("data-categoria") === categoria) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }
    });
}

// Carregar posts da categoria atual
function carregarPosts() {
    const q = query(postsRef, where("categoria", "==", categoriaAtual), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
        const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderizarPosts(posts);
    });
}

// Renderizar posts com espaços para anúncios
function renderizarPosts(posts) {
    postsList.innerHTML = "";
    if (posts.length === 0) {
        postsList.innerHTML = "<div class='loading'>Nenhuma discussão ainda. Seja o primeiro!</div>";
        return;
    }
    
    posts.forEach((post, index) => {
        const isAcs = acsUsers.includes(post.autor);
        const postDiv = document.createElement("div");
        postDiv.className = `post ${isAcs ? "acs-verified" : ""}`;
        
        const avatar = document.createElement("div");
        avatar.className = "avatar";
        avatar.textContent = post.autor.charAt(0).toUpperCase();
        
        const content = document.createElement("div");
        content.className = "post-content";
        
        const header = document.createElement("div");
        header.className = "post-header";
        header.innerHTML = `
            <span class="username">${escapeHtml(post.autor)}</span>
            ${isAcs ? '<span class="badge-acs">ACS ✓</span>' : ''}
            <small style="color:#888;">${new Date(post.timestamp?.toDate()).toLocaleString()}</small>
        `;
        
        const textDiv = document.createElement("div");
        textDiv.className = "post-text";
        textDiv.innerHTML = escapeHtml(post.texto);
        
        content.appendChild(header);
        content.appendChild(textDiv);
        postDiv.appendChild(avatar);
        postDiv.appendChild(content);
        postsList.appendChild(postDiv);
        
        // Adicionar anúncio a cada 4 posts (FASE DE TESTE)
        if ((index + 1) % 4 === 0 && index + 1 < posts.length) {
            const adDiv = document.createElement("div");
            adDiv.className = "ad-insert";
            adDiv.innerHTML = "📢 Espaço para anúncio (AdSense)";
            postsList.appendChild(adDiv);
        }
    });
}

// Enviar novo post
async function enviarPost() {
    const texto = msgInput.value.trim();
    if (!texto) return;
    
    try {
        await addDoc(postsRef, {
            autor: usuarioAtual,
            texto: texto,
            categoria: categoriaAtual,
            timestamp: Timestamp.now()
        });
        msgInput.value = "";
    } catch (error) {
        alert("Erro ao enviar: " + error.message);
    }
}

// Helper de segurança
function escapeHtml(texto) {
    if (!texto) return "";
    return texto.replace(/[&<>]/g, function(m) {
        if (m === "&") return "&amp;";
        if (m === "<") return "&lt;";
        if (m === ">") return "&gt;";
        return m;
    });
}

// Eventos
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        categoriaAtual = tab.getAttribute("data-categoria");
        setActiveTab(categoriaAtual);
        carregarPosts();
    });
});

enviarBtn.addEventListener("click", enviarPost);
msgInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        enviarPost();
    }
});

novaCategoriaBtn.addEventListener("click", () => {
    const novaCat = prompt("Digite o nome da nova categoria:");
    if (novaCat) alert("Funcionalidade de criação será implementada no futuro.");
});

setActiveTab(categoriaAtual);
carregarPosts();

// Placeholder para futuros botões de mídia
document.getElementById("anexarBtn")?.addEventListener("click", () => alert("Anexar imagem em breve"));
document.getElementById("microfoneBtn")?.addEventListener("click", () => alert("Áudio em breve"));
document.getElementById("cameraBtn")?.addEventListener("click", () => alert("Foto em breve"));
