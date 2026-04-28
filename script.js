import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDAZt8H6JEdxodq_rFlVyytZq40jgmGYZw",
    authDomain: "mycommunity-3b7e1.firebaseapp.com",
    projectId: "mycommunity-3b7e1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const mensagensCol = collection(db, "mensagens");

const CLOUD_NAME = "dk6yoaszb";
const UPLOAD_PRESET = "mycommunity";

let meuNome = localStorage.getItem('my_comm_name');
if (!meuNome) {
    meuNome = prompt("Digite seu nome:");
    if (meuNome) localStorage.setItem('my_comm_name', meuNome);
    else meuNome = "Visitante";
}

async function uploadParaCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, { method: 'POST', body: formData });
    const data = await res.json();
    return data.secure_url;
}

function exibirMensagens(mensagens) {
    const area = document.querySelector('.chat-area');
    if (!area) return;
    area.innerHTML = mensagens.map(msg => {
        const letra = msg.nome.charAt(0).toUpperCase();
        const ehEu = msg.nome === meuNome;
        let conteudo = msg.tipo === 'imagem' ? `<img src="${msg.url}" style="max-width:100%">` : `<div class="texto">${msg.texto}</div>`;
        return `<div class="balao ${ehEu ? 'eu' : ''}"><div class="avatar">${letra}</div><div class="conteudo"><div class="nome-usuario">${msg.nome}</div>${conteudo}</div></div>`;
    }).join('');
    area.scrollTop = area.scrollHeight;
}

const q = query(mensagensCol, orderBy("timestamp", "asc"));
onSnapshot(q, (snapshot) => exibirMensagens(snapshot.docs.map(doc => doc.data())));

document.getElementById('sendBtn').onclick = async () => {
    const input = document.getElementById('msgInput');
    if (input.value.trim()) {
        await addDoc(mensagensCol, { nome: meuNome, tipo: "texto", texto: input.value, timestamp: Date.now() });
        input.value = '';
    }
};

let mediaRecorder;
document.getElementById('voiceBtn').onmousedown = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    let chunks = [];
    mediaRecorder.ondataavailable = e => chunks.push(e.data);
    mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = await uploadParaCloudinary(blob);
        await addDoc(mensagensCol, { nome: meuNome, tipo: "audio", url, timestamp: Date.now() });
    };
    mediaRecorder.start();
    document.getElementById('voiceBtn').style.background = 'red';
};
document.getElementById('voiceBtn').onmouseup = () => { if (mediaRecorder) mediaRecorder.stop(); document.getElementById('voiceBtn').style.background = ''; };

document.getElementById('cameraBtn').onclick = () => document.getElementById('imageInput').click();
document.getElementById('imageInput').onchange = async (e) => {
    const url = await uploadParaCloudinary(e.target.files[0]);
    await addDoc(mensagensCol, { nome: meuNome, tipo: "imagem", url, timestamp: Date.now() });
};
async function limparMensagensAntigas() {
    const quinzeDiasAtras = Date.now() - (15 * 24 * 60 * 60 * 1000);
    const q = query(mensagensCol, where("timestamp", "<", quinzeDiasAtras));
    const snapshot = await getDocs(q);
    snapshot.forEach(async (doc) => {
        // Se tiver URL de imagem/áudio no Cloudinary, você pode deletar também
        const dados = doc.data();
        if (dados.url && dados.url.includes('cloudinary')) {
            // Opcional: deletar do Cloudinary (precisa do public_id)
        }
        await deleteDoc(doc.ref);
    });
}

// Chame antes de carregar as mensagens
limparMensagensAntigas();
