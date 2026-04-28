/* Reset e base */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Roboto, Arial, sans-serif;
    background: #f4f4f4;
    display: flex;
    flex-direction: column;
    height: 100vh;
}

/* ========== HEADER DEGRADÊ ========== */
header {
    background: linear-gradient(135deg, #001f3f, #0074D9);
    color: white;
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.logo {
    font-size: 1.6rem;
    font-weight: bold;
    letter-spacing: 1px;
}

.btn-inscrever {
    background: white;
    color: #0074D9;
    border: none;
    padding: 8px 20px;
    border-radius: 30px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
}

.btn-inscrever:hover {
    background: #e0e0e0;
    transform: scale(1.02);
}

/* ========== ABAS (HORIZONTAIS, COM SCROLL NO CELULAR) ========== */
.tabs-container {
    background: white;
    border-bottom: 1px solid #ddd;
    overflow-x: auto;
    white-space: nowrap;
    padding: 0 10px;
}

.tabs {
    display: inline-flex;
    list-style: none;
    gap: 8px;
    padding: 10px 0;
}

.tabs li {
    display: inline-block;
    padding: 8px 18px;
    background: #f0f0f0;
    border-radius: 40px;
    cursor: pointer;
    font-weight: 500;
    transition: 0.2s;
    font-size: 0.9rem;
}

.tabs li.active {
    background: #0074D9;
    color: white;
}

.add-tab {
    background: #0074D9 !important;
    color: white !important;
    font-weight: bold;
}

/* ========== MAIN (70/30) ========== */
.main-container {
    display: flex;
    flex: 1;
    overflow: hidden;
    gap: 20px;
    padding: 20px;
}

/* Coluna de posts (70%) */
.posts-area {
    flex: 7;
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    overflow: hidden;
    position: relative;
}

.posts-list {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

/* Cada post (estilo balão) */
.post {
    background: white;
    border-radius: 20px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    display: flex;
    gap: 12px;
    transition: 0.2s;
    border-left: 4px solid transparent;
}

/* ACS verificado */
.post.acs-verified {
    border-left: 4px solid #2ecc71;
    background: #f9fff9;
}

.avatar {
    width: 48px;
    height: 48px;
    background: #0074D9;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    flex-shrink: 0;
}

.post-content {
    flex: 1;
}

.post-header {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 6px;
}

.username {
    font-weight: bold;
    color: #001f3f;
}

.badge-acs {
    background: #2ecc71;
    color: white;
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 20px;
}

.post-text {
    color: #333;
    line-height: 1.4;
    word-break: break-word;
}

/* Espaço para anúncio entre posts */
.ad-insert {
    background: #f8f8f8;
    border: 1px dashed #ccc;
    text-align: center;
    padding: 20px;
    border-radius: 16px;
    color: #777;
    font-size: 12px;
    margin: 12px 0;
}

/* Input fixo na parte inferior */
.input-fixo {
    border-top: 1px solid #eee;
    background: white;
    padding: 12px 20px;
}

.input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 24px;
    font-family: inherit;
    resize: none;
    font-size: 0.9rem;
}

.input-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
}

.input-actions button {
    background: none;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
    padding: 6px;
    border-radius: 50%;
    transition: 0.2s;
}

.btn-enviar {
    background: #0074D9 !important;
    color: white !important;
    padding: 6px 16px !important;
    border-radius: 30px !important;
    font-size: 0.9rem !important;
}

/* Sidebar de anúncios (30%) */
.sidebar-ads {
    flex: 3;
    background: white;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.ad-placeholder {
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 40px 20px;
    text-align: center;
    color: #aaa;
}

/* ========== RESPONSIVO (CELULAR) ========== */
@media (max-width: 768px) {
    .main-container {
        flex-direction: column;
        padding: 10px;
        gap: 16px;
    }
    
    .sidebar-ads {
        flex: auto;
        order: 2;
    }
    
    .posts-area {
        order: 1;
    }
    
    .tabs li {
        padding: 6px 14px;
        font-size: 0.8rem;
    }
    
    .logo {
        font-size: 1.2rem;
    }
    
    .btn-inscrever {
        padding: 5px 12px;
        font-size: 0.8rem;
    }
    
    .post {
        gap: 8px;
    }
    
    .avatar {
        width: 36px;
        height: 36px;
        font-size: 1rem;
    }
}
