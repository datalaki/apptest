document.addEventListener('DOMContentLoaded', function() {
    const postBtn = document.getElementById('postBtn');
    const postForm = document.getElementById('postForm');
    const cancelPost = document.getElementById('cancelPost');
    const postText = document.getElementById('postText');
    const likeCount = document.getElementById('likeCount');
    const likeBtn = document.getElementById('likeBtn');
    const commentBtn = document.getElementById('commentBtn');
    const contentList = document.getElementById('contentList');
    const userStatus = document.getElementById('userStatus');
    const keywordInput = document.getElementById('keywordInput');
    const addKeywordBtn = document.getElementById('addKeywordBtn');
    const keywordList = document.getElementById('keywordList');
    const userId = 'user_' + Math.random().toString(36).substr(2, 9); // Identifiant utilisateur aléatoire pour l'exemple

    let liked = false;
    let likeCountValue = 0;
    let keywords = [];
    let users = { [userId]: true }; // Tous les utilisateurs sont initialement "en vie"

    // Fonctionnalité de bataille royale
    addKeywordBtn.addEventListener('click', function() {
        const keyword = keywordInput.value.trim().toLowerCase();
        if (keyword && !keywords.includes(keyword)) {
            keywords.push(keyword);
            updateKeywordList();
            keywordInput.value = '';
        }
    });

    function updateKeywordList() {
        keywordList.innerHTML = '';
        keywords.forEach(function(keyword) {
            const li = document.createElement('li');
            li.textContent = keyword;
            keywordList.appendChild(li);
        });
    }

    function checkForElimination(text) {
        const lowerCaseText = text.toLowerCase();
        keywords.forEach(function(keyword) {
            if (lowerCaseText.includes(keyword)) {
                users[userId] = false; // Elimine l'utilisateur
                updateUserStatus();
            }
        });
    }

    function updateUserStatus() {
        userStatus.innerHTML = '';
        Object.keys(users).forEach(function(user) {
            const status = users[user] ? 'En vie' : 'Éliminé';
            userStatus.innerHTML += `<div>${user}: ${status}</div>`;
        });
        const aliveUsers = Object.values(users).filter(status => status).length;
        if (aliveUsers <= 1) {
            userStatus.innerHTML += '<div><strong>Le gagnant est ' + Object.keys(users).find(user => users[user]) + '</strong></div>';
        }
    }

    postBtn.addEventListener('click', function() {
        postForm.classList.toggle('hidden');
    });

    cancelPost.addEventListener('click', function() {
        postForm.classList.add('hidden');
    });

    likeBtn.addEventListener('click', function() {
        if (liked) {
            likeBtn.classList.remove('liked');
            liked = false;
            likeCountValue--;
        } else {
            likeBtn.classList.add('liked');
            liked = true;
            likeCountValue++;
        }
        likeCount.textContent = likeCountValue;
    });

    commentBtn.addEventListener('click', function() {
        addCommentField();
    });

    function addCommentField() {
        const commentField = document.createElement('textarea');
        commentField.placeholder = "Écrivez un commentaire...";
        commentField.classList.add('comment-input');
        
        const commentActions = document.createElement('div');
        commentActions.classList.add('comment-actions');

        const commentContainer = document.createElement('div');
        commentContainer.classList.add('comment');
        
        const commentSubmit = document.createElement('button');
        commentSubmit.textContent = "Ajouter Commentaire";
        commentSubmit.addEventListener('click', function() {
            const text = commentField.value.trim();
            if (text) {
                addComment(text, commentContainer);
                commentField.value = '';
            }
        });

        commentActions.appendChild(commentSubmit);
        commentContainer.appendChild(commentField);
        commentContainer.appendChild(commentActions);
        postForm.appendChild(commentContainer);
    }

    function addComment(text, container) {
        const commentDiv = document.createElement('div');
        const timestamp = new Date().toLocaleString();
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `
            <p>${text}</p>
            <div class="user-info">Posté par ${userId} le ${timestamp}</div>
            <div class="comment-actions">
                <button class="like-comment-btn" data-comment="${Date.now()}" data-liked="false">0</button>
                <button class="delete-comment-btn">Supprimer</button>
            </div>
        `;
        container.appendChild(commentDiv);

        commentDiv.querySelector('.like-comment-btn').addEventListener('click', function() {
            handleCommentLike(this);
        });

        commentDiv.querySelector('.delete-comment-btn').addEventListener('click', function() {
            deleteComment(this);
        });

        // Simuler l'envoi en temps réel à d'autres utilisateurs
        simulateRealTimeComment(text);
    }

    function handleCommentLike(button) {
        const liked = button.getAttribute('data-liked') === 'true';
        let likeCount = parseInt(button.textContent);

        if (liked) {
            button.classList.remove('liked');
            button.textContent = "0";
            button.setAttribute('data-liked', 'false');
            likeCount--;
        } else {
            button.classList.add('liked');
            button.textContent = "1";
            button.setAttribute('data-liked', 'true');
            likeCount++;
        }

        button.textContent = likeCount;
    }

    function deleteComment(button) {
        const commentDiv = button.closest('.comment');
        if (commentDiv) {
            commentDiv.remove();
        }
    }

    function simulateRealTimeComment(commentText) {
        // Simulez l'envoi du commentaire à d'autres utilisateurs (en pratique, utilisez WebSocket ou autre technologie en temps réel)
        // Pour cet exemple, nous supposons que tous les commentaires sont instantanément visibles pour tous les utilisateurs
        setTimeout(() => {
            const newComment = document.createElement('div');
            newComment.classList.add('comment');
            newComment.innerHTML = `
                <p>${commentText}</p>
                <div class="user-info">Posté par Autre Utilisateur le ${new Date().toLocaleString()}</div>
                <div class="comment-actions">
                    <button class="like-comment-btn" data-comment="${Date.now()}" data-liked="false">0</button>
                    <button class="delete-comment-btn">Supprimer</button>
                </div>
            `;
            contentList.appendChild(newComment);

            newComment.querySelector('.like-comment-btn').addEventListener('click', function() {
                handleCommentLike(this);
            });

            newComment.querySelector('.delete-comment-btn').addEventListener('click', function() {
                deleteComment(this);
            });
        }, 500); // Simuler un délai pour l'exemple
    }
});
